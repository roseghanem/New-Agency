import React, {Fragment, Component, memo} from 'react'
import {connect} from 'react-redux'
import {FileText, MoreVertical, Send, Plus, Play, User, Trash, DownloadCloud} from 'react-feather'
import {
    Row,
    Col,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge, UncontrolledTooltip, ButtonGroup
} from 'reactstrap'
//************************************//
import Breadcrumbs from '@src/components/breadcrumbs'
import DataTable from '@src/components/datatable'
import {trans, _confirm} from '@utils'
import {AbilityContext, _hasAnyAbility} from '@src/utility/context/Can'
//************************************//
import {_deleteScrapingJob, _startScrapingJob} from '../../redux/actions'
import CanCall from '../../components/CanCall'
import BasicInfoModal from './BasicInfoModal'
import EditInfoModal from './EditInfoModal'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faLink} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"
import LoadingModal from "../loading-modal"
//************************************//
const tableColumns = (state, _editBasicInfoModal, _deleteUser, _startScraping, hasAction) => [
    {
        name: 'ID',
        selector: 'id',
        sortable: false,
        minWidth: '225px',
        omit: true,
        filter: {
            enabled: false
        }
    },
    {
        name: 'Type',
        selector: 'url',
        sortable: true,
        cell: (row, index, column, id) => {
            return (
                <img style={{height: 25, width: 25}} src={require('../../assets/images/spotify.png').default}  alt={'no'}/>
            )
        }
    },
    {
        name: 'Playlist name',
        selector: 'playlist_name',
        sortable: true,
        filter: {
            enabled: true,
            type: 'text'
        }
    },
    {
        name: 'URL',
        selector: 'url',
        sortable: true,
        filter: {
            enabled: true,
            type: 'text'
        },
        cell: (row, index, column, id) => {
            return (
                <>
                    <a href={row.url} target={'_blank'} id={`link-${row.id}`}>
                        <FontAwesomeIcon icon={faLink} />
                    </a>
                    <UncontrolledTooltip placement='top' target={`link-${row.id}`}>
                        {row.url}
                    </UncontrolledTooltip>
                </>
            )
        }
    },
    {
        name: trans('user.status.status'),
        selector: 'proccessed',
        sortable: true,
        minWidth: '250px',
        filter: {
            enabled: true,
            type: 'select',
            options: [{label: 'Done', value: 2}, {label: 'Waiting for Email Scraping', value: 1}, {label: 'Pending', value: 0}]
        },
        cell: (row, index, column, id) => {
            return (
                <Badge color={row.proccessed === 0 ? 'info' : row.proccessed === 1 ? 'warning' : 'success'}>
                    {row.proccessed === 0 ? 'Pending' : row.proccessed === 1 ? 'Waiting for Email Scraping' : 'Done'}
                </Badge>
            )
        }
    },
    {
        name: trans('user.createdBy'),
        selector: '',
        sortable: true,
        minWidth: '250px',
        cell: (row, index, column, id) => {
            return (
                <Badge color={'primary'}>
                    {row.admin ? row.admin.name : ''}
                </Badge>
            )
        }
    },
    {
        name: trans('user.createdAt'),
        selector: '',
        sortable: true,
        minWidth: '250px',
        cell: (row, index, column, id) => {
            return (
                <div>
                    {/*{row.created_at}*/}
                    {new Date(row.created_at).toDateString()}
                </div>
            )
        }
    },
    {
        name: trans('gen.actions.actions'),
        allowOverflow: true,
        omit: !hasAction,
        cell: (row, index, column, id) => {
            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <DropdownToggle className='pr-1' tag='span'>
                            <MoreVertical size={15}/>
                        </DropdownToggle>
                        <DropdownMenu right>
                            {row.proccessed ? <CanCall action='SCRAPING_VIEW_SCRAPED_PLAYLIST' id={`updateUser_${row.id}`}>
                                <Link to={`/playlist/scraping/${row.id}`} className='w-100 dropdown-item'>
                                    <Play size={15}/>
                                    <span className='align-middle ml-50'>View</span>
                                </Link>
                            </CanCall> : <CanCall action='SCRAPING_SCRAPE_PLAYLIST' id={`updateUser_${row.id}`}>
                                <DropdownItem className='w-100' onClick={e => _startScraping(row.id)}
                                              disabled={row.proccessed > 0}>
                                    <Play size={15}/>
                                    <span className='align-middle ml-50'>{'Start Scraping'}</span>
                                </DropdownItem>
                            </CanCall>}
                            <CanCall action='SCRAPING_EDIT_PLAYLIST' id={`updateUser_${row.id}`}>
                                <DropdownItem className='w-100' onClick={e => _editBasicInfoModal(row)}
                                              disabled={row.proccessed > 0}>
                                    <FileText size={15}/>
                                    <span className='align-middle ml-50'>{trans('gen.actions.edit')}</span>
                                </DropdownItem>
                            </CanCall>
                            <CanCall action='SCRAPING_DELETE_PLAYLIST' id={`deleteUser_${row.id}`}>
                                <DropdownItem className='w-100 btn-flat-danger' onClick={e => _deleteUser(row.id)}
                                              disabled={row.proccessed > 0}>
                                    <Trash size={15}/>
                                    <span className='align-middle ml-50'>{trans('gen.actions.delete')}</span>
                                </DropdownItem>
                            </CanCall>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        }
    }
]
const tableActions = ['SCRAPING_SCRAPE_PLAYLIST', 'SCRAPING_VIEW_SCRAPED_PLAYLIST', 'SCRAPING_EDIT_PLAYLIST', 'SCRAPING_DELETE_PLAYLIST']

//************************************//
class UserList extends Component {
    static contextType = AbilityContext

    constructor(props) {
        super(props)
        this.state = {
            userId: props.userId,
            basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}},
            editInfoModal: {editInfoModalShow: false, editInfoModalData: {}},
            loadingModal: false
        }
        this._editBasicInfoModal = this._editBasicInfoModal.bind(this)
        this._deleteUser = this._deleteUser.bind(this)
    }

    //************************************//
    _closeBasicInfoModal = () => {
        this.setState({basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}}})
    }
    _closeEditInfoModal = () => {
        this.setState({editInfoModal: {editInfoModalShow: false, editInfoModalData: {}}})
    }
    //************************************//
    _openBasicInfoModal = () => {
        this.setState({basicInfoModal: {basicInfoModalShow: true, basicInfoModalData: {}}})
    }
    //************************************//
    _editBasicInfoModal = (data) => {
        this.setState({editInfoModal: {editInfoModalShow: true, editInfoModalData: {...data}}})
    }
    //************************************//
    _deleteUser = (id) => {
        _confirm({
            callback: (c) => {
                _deleteScrapingJob(id, () => {
                    this.dataTableRef._refresh()
                    c()
                })
            }
        })
    }
    //************************************//
    _startScraping = (id) => {
        _confirm({
            callback: (c) => {
                this.setState({loadingModal: true})
                _startScrapingJob(id, () => {
                    this.dataTableRef._refresh()
                    this.setState({loadingModal: false})
                    c()
                })
            }
        })
    }

    //************************************//
    render() {
        const {basicInfoModalShow, basicInfoModalData} = this.state.basicInfoModal
        const {editInfoModalShow, editInfoModalData} = this.state.editInfoModal
        const hasAction = _hasAnyAbility(this.context, tableActions)
        return (
            <Fragment>
                <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={trans('user.nav.scrapingJobs')} breadCrumbParent='' breadCrumbActive=''>

                    <ButtonGroup className='mb-1'>
                        <CanCall action='SCRAPING_ADD_PLAYLIST' id='addPlaylistBtn'>
                            <Button.Ripple className='btn-icon' color='secondary' onClick={this._openBasicInfoModal}>
                                <Plus size={14}/>
                                <span className='ml-25'>Create Job</span>
                            </Button.Ripple>
                        </CanCall>

                        <CanCall action='SCRAPING_DOWNLOAD_CRM_CSV' id='addUserBtn'>
                            <Button color={'primary'} onClick={() => {
                                window.open(
                                    `https://api-all-in-one.libertyinfluencers.com/api/scrape-jobs-csv`,
                                    '_blank' // <- This is what makes it open in a new window.
                                )
                            }}>
                                <DownloadCloud size={14} />
                                <span className='ml-25'>Export CSV</span>
                            </Button>
                        </CanCall>
                    </ButtonGroup>

                </Breadcrumbs>
                <Row>
                    <Col sm='12'>
                        <DataTable ref={(ref) => {
                            this.dataTableRef = ref
                        }} uri={'scrapingjobs'}
                                   columns={tableColumns(this.state, this._editBasicInfoModal, this._deleteUser, this._startScraping, hasAction)}
                                   hasIndexing={true} hasFilter={true}
                                   defaultCollapse={true}
                        />
                    </Col>
                </Row>
                {basicInfoModalShow &&
                    <BasicInfoModal successCallback={this.dataTableRef._refresh} data={basicInfoModalData}
                                    onClose={this._closeBasicInfoModal}/>}
                {editInfoModalShow &&
                    <EditInfoModal successCallback={this.dataTableRef._refresh} data={editInfoModalData}
                                   onClose={this._closeEditInfoModal}/>}
                {this.state.loadingModal && <LoadingModal />}
            </Fragment>
        )
    }
}

//************************************//
const mapStateToProps = store => ({
    loading: store.app.loading,
    userId: _.get(store, `${process.env.REACT_APP_AUTH_MODULE}.userData.id`)
})
export default connect(mapStateToProps, null, null, {forwardRef: true})(UserList)
