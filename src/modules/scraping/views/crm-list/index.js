import React, {Fragment, Component, memo} from 'react'
import {connect} from 'react-redux'
import {
    FileText,
    MoreVertical,
    Send,
    Plus,
    Play,
    User,
    Trash,
    Link2,
    Facebook,
    Instagram,
    Twitter,
    Eye, DownloadCloud, ChevronDown
} from 'react-feather'
import {
    Row,
    Col,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge, FormGroup, UncontrolledTooltip, UncontrolledButtonDropdown, ButtonGroup
} from 'reactstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faLink} from "@fortawesome/free-solid-svg-icons"
import {Link, withRouter} from "react-router-dom"
//************************************//
import Breadcrumbs from '@src/components/breadcrumbs'
import DataTable from '@src/components/datatable'
import {trans, _confirm} from '@utils'
import {AbilityContext, _hasAnyAbility} from '@src/utility/context/Can'
import Avatar from '@components/avatar'
//************************************//
import {
    _deleteAdmin, _deleteCrmArtist,
    _deleteScrapingJob,
    _getPlaylistDetails,
    _scrapeEmails,
    _startScrapingJob
} from '../../redux/actions'
import CanCall from '../../components/CanCall'
import UploadExcelFiles from "./UploadExcelFiles"
import InfoModal from "./InfoModal"
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
        name: 'Artist',
        selector: 'artist',
        sortable: true,
        minWidth: '350px',
        cell: (row, index, column, id) => {
            return (
                <div className='d-flex align-items-center'>
                    {!row.artist_image ? (
                        <Avatar content={row.artist_name} initials />
                    ) : (
                        <Avatar img={row.artist_image} />
                    )}
                    <div className='user-info text-truncate ml-1'>
                        <span className='d-block font-weight-bold text-truncate'>{row.artist_name}</span>
                        <span className='d-block font-weight-bold text-muted'>{row.email}</span>
                    </div>
                </div>
            )
        }
    },
    {
        name: 'Email',
        selector: 'email',
        omit: true,
        filter: {
            enabled: true,
            type: 'text'
        }
    },
    {
        name: 'Artist Name',
        selector: 'artist_name',
        omit: true,
        filter: {
            enabled: true,
            type: 'text'
        }
    },
    {
        name: 'Spotify URL',
        selector: 'url',
        sortable: true,
        filter: {
            enabled: true,
            type: 'text'
        },
        cell: (row, index, column, id) => {
            return  row.artist_url ? <>
                        <a href={row.artist_url} target={'_blank'} id={`spotify-${row.id}`}>
                            <img style={{height: 25, width: 25}} src={require('../../assets/images/spotify.png').default}  alt={'no'}/>
                        </a>
                        <UncontrolledTooltip placement='top' target={`spotify-${row.id}`}>
                            {row.artist_url}
                        </UncontrolledTooltip>
                    </> : null
        }
    },
    {
        name: 'Instagram',
        selector: 'artist_instagram',
        sortable: true,
        filter: {
            enabled: true,
            type: 'text'
        },
        cell: (row, index, column, id) => {
            return (
                row.artist_instagram ? <>
                    <a href={row.artist_instagram} target={'_blank'} id={`insta-${row.id}`}>
                        <Instagram size={18} />
                    </a>
                    <UncontrolledTooltip placement='top' target={`insta-${row.id}`}>
                        {row.artist_instagram}
                    </UncontrolledTooltip>
                </> : null
            )
        }
    },
    {
        name: 'Facebook',
        selector: 'artist_facebook',
        sortable: true,
        filter: {
            enabled: true,
            type: 'text'
        },
        cell: (row, index, column, id) => {
            return (
                row.artist_facebook ? <>
                    <a href={row.artist_facebook} target={'_blank'} id={`face-${row.id}`}>
                        <Facebook size={18} />
                    </a>
                    <UncontrolledTooltip placement='top' target={`face-${row.id}`}>
                        {row.artist_facebook}
                    </UncontrolledTooltip>
                </> : null
            )
        }
    },
    {
        name: 'Twitter',
        selector: 'artist_twitter',
        sortable: true,
        filter: {
            enabled: true,
            type: 'text'
        },
        cell: (row, index, column, id) => {
            return (
                row.artist_twitter ? <>
                    <a href={row.artist_twitter} target={'_blank'} id={`twitter-${row.id}`}>
                        <Twitter size={18} />
                    </a>
                    <UncontrolledTooltip placement='top' target={`twitter-${row.id}`}>
                        {row.artist_twitter}
                    </UncontrolledTooltip>
                </> : null
            )
        }
    },
    // {
    //     name: '# of followers',
    //     selector: 'artist_number_of_followers',
    //     sortable: false
    // },
    // {
    //     name: 'Monthly Listeners',
    //     selector: 'artist_monthly_listeners',
    //     sortable: false
    // },
    {
        name: 'Date from',
        selector: 'from_date',
        sortable: false,
        omit: true,
        filter: {
            id: 'from_date',
            enabled: true,
            type: 'date'
        }
    },
    {
        name: 'Date to',
        selector: 'to_date',
        sortable: false,
        omit: true,
        filter: {
            id: 'to_date',
            enabled: true,
            type: 'date'
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
                            <CanCall action='SCRAPING_VIEW_ARTIST_PROFILE' id={`updateUser_${row.id}`}>
                                <Link to={`/artist/profile/${row.id}`} className='w-100 dropdown-item'>
                                    <Eye size={15}/>
                                    <span className='align-middle ml-50'>View</span>
                                </Link>
                            </CanCall>
                            <CanCall action='SCRAPING_DELETE_CRM_ARTIST' id={`updateUser_${row.id}`}>
                                <DropdownItem onClick={() => _deleteUser(row.id)} to={`/artist/profile/${row.id}`} className='w-100 btn-flat-danger'>
                                    <Trash size={15}/>
                                    <span className='align-middle ml-50'>Delete</span>
                                </DropdownItem>
                            </CanCall>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        }
    }
]
const tableActions = ['SCRAPING_VIEW_ARTIST_PROFILE', 'SCRAPING_DELETE_CRM_ARTIST']

//************************************//
class UserList extends Component {
    static contextType = AbilityContext

    constructor(props) {
        super(props)
        this.state = {
            userId: props.userId,
            basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}},
            editInfoModal: {editInfoModalShow: false, editInfoModalData: {}},
            playlist: {},
            currentTrackForScrapeEmails: -1,
            selectedItems: {}
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
                _deleteCrmArtist(id, () => {
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
                _startScrapingJob(id, () => {
                    this.dataTableRef._refresh()
                    c()
                })
            }
        })
    }
    //************************************//
    _scrapingEmails = (id, c = () => {}) => {
        _scrapeEmails(id, () => { }, () => { }, () => {
            if (_.get(this.state.playlist?.tracks, `${this.state.currentTrackForScrapeEmails + 1}.id`)) {
                this.setState({currentTrackForScrapeEmails: this.state.currentTrackForScrapeEmails + 1}, () => {
                    this._scrapingEmails(_.get(this.state.playlist?.tracks, `${this.state.currentTrackForScrapeEmails}.id`), c)
                })
            } else {
                this.dataTableRef._refresh()
                c()
            }
        })
    }
    //************************************//
    _startScrapingEmails = () => {
        _confirm({
            callback: (c) => {
                this.setState({currentTrackForScrapeEmails: 0}, () => {
                    this._scrapingEmails(_.get(this.state.playlist?.tracks, `${this.state.currentTrackForScrapeEmails}.id`), c)
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
                <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={'Artists Crm'} breadCrumbParent='' breadCrumbActive=''>

                        <ButtonGroup className='mb-1'>
                            <CanCall action='SCRAPING_ADD_ARTIST' id='addArtist'>
                                <Button onClick={this._openBasicInfoModal}>
                                    <Plus size={14}/>
                                    <span className='ml-25'>Add</span>
                                </Button>
                            </CanCall>
                            <CanCall action='SCRAPING_DOWNLOAD_CRM_CSV'>
                                {/*<DropdownItem className='w-100'>*/}
                                <UploadExcelFiles uploadSuccess={() => this.dataTableRef._refresh()} rules={{type:['xlsx', 'xls', 'csv']}} />
                                {/*</DropdownItem>*/}
                            </CanCall>
                            <CanCall action='SCRAPING_DOWNLOAD_CRM_CSV' id='addUserBtn'>
                                <Button color={'primary'} onClick={() => {
                                    window.open(
                                        `https://api-all-in-one.libertyinfluencers.com/api/all-crm-artists-csv?from_date=${document.getElementById('from_date').value}&to_date=${document.getElementById('to_date').value}`,
                                        '_blank' // <- This is what makes it open in a new window.
                                    )
                                }}>
                                    <DownloadCloud size={14} />
                                    <span className='ml-25'>Export</span>
                                </Button>
                            </CanCall>
                        </ButtonGroup>
                </Breadcrumbs>
                <Row>
                    <Col sm='12'>
                        <DataTable ref={(ref) => { this.dataTableRef = ref }} uri={`artists/crm/index`}
                                   columns={tableColumns(this.state, this._editBasicInfoModal, this._deleteUser, this._startScraping, hasAction)}
                                   hasIndexing={true} hasFilter={true}
                                   defaultCollapse={true}
                        />
                    </Col>
                </Row>

                {basicInfoModalShow &&
                    <InfoModal successCallback={this.dataTableRef._refresh} data={basicInfoModalData}
                                    onClose={this._closeBasicInfoModal}/>}
            </Fragment>
        )
    }
}

//************************************//
const mapStateToProps = store => ({
    loading: store.app.loading,
    userId: _.get(store, `${process.env.REACT_APP_AUTH_MODULE}.userData.id`)
})
export default connect(mapStateToProps, null, null, {forwardRef: true})(withRouter(UserList))
