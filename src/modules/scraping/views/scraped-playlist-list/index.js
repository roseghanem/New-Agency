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
    DownloadCloud
} from 'react-feather'
import {
    Row,
    Col,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge, FormGroup, UncontrolledTooltip, ButtonGroup
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
    _deleteScrapingJob,
    _getPlaylistDetails,
    _scrapeEmails,
    _startScrapingJob
} from '../../redux/actions'
import CanCall from '../../components/CanCall'
import BasicInfoModal from './BasicInfoModal'
import EditInfoModal from './EditInfoModal'
import ScrapingStats from "./ScrapingStats"
import LoadingModal from "../loading-modal"
import EditEmailModal from "./EmailModal"
import ScrapingStatsOverview from "./ScrapingStatsOverview"
//************************************//
const tableColumns = (state, editEmail, hasAction) => [
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
        minWidth: '250px',
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
                    </div>
                </div>
            )
        }
    },
    {
        name: 'Primary Email',
        selector: 'email',
        sortable: true,
        minWidth: '250px',
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
            return (
                <>
                    <a href={row.artist_url} target={'_blank'} id={`spotify-${row.id}`}>
                        <img style={{height: 25, width: 25}} src={require('../../assets/images/spotify.png').default}  alt={'no'}/>
                    </a>
                    <UncontrolledTooltip placement='top' target={`spotify-${row.id}`}>
                        {row.artist_url}
                    </UncontrolledTooltip>
                </>
            )
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
    {
        name: 'Email status',
        selector: 'proccessed',
        sortable: true,
        minWidth: '250px',
        filter: {
            enabled: true,
            type: 'select',
            options: [{label: 'Done', value: 2}, {label: 'In Progress', value: 1}, {label: 'Pending', value: 0}]
        },
        cell: (row, index, column, id) => {
            return (
                <Badge color={row.proccessed === 0 ? 'info' : row.proccessed === 1 ? 'warning' : 'success'}>
                    {row.proccessed === 0 ? 'Not found yet' : row.proccessed === 1 ? 'Not Found' : 'Found'}
                </Badge>
            )
        }
    },
    {
        name: 'Moved to CRM',
        selector: 'moved_to_crm',
        sortable: true,
        minWidth: '250px',
        filter: {
            enabled: true,
            type: 'select',
            options: [{label: 'Yes', value: 1}, {label: 'No', value: 0}]
        },
        cell: (row, index, column, id) => {
            return (
                <Badge color={row.moved_to_crm === 0 ? 'warning' :  'success'}>
                    {row.moved_to_crm === 0 ? 'Not yet' : 'Moved'}
                </Badge>
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
                            <CanCall action='SCRAPING_EDIT_ARTIST_EMAIL' id={`deleteUser_${row.id}`}>
                                <DropdownItem className='w-100' onClick={e => editEmail(row)}>
                                    <FileText size={15}/>
                                    <span className='align-middle ml-50'>{trans('gen.actions.edit')}</span>
                                </DropdownItem>
                            </CanCall>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        }
    }
]
const tableActions = ['SCRAPING_EDIT_ARTIST_EMAIL']

//************************************//
class UserList extends Component {
    static contextType = AbilityContext

    constructor(props) {
        super(props)
        this.state = {
            userId: props.userId,
            basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}},
            editInfoModal: {editInfoModalShow: false, editInfoModalData: {}},
            editEmailModal: {editEmailModalShow: false, editEmailModalData: {}},
            playlist: {},
            currentTrackForScrapeEmails: -1,
            selectedItems: {},
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
    _editEmailModal = (data) => {
        this.setState({editEmailModal: {editEmailModalShow: true, editEmailModalData: {...data}}})
    }
    //************************************//
    _closeEmailModal = () => {
        this.setState({editEmailModal: {editEmailModalShow: false, editEmailModalData: {}}})
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
                _getPlaylistDetails(
                    this.props.match.params.scrapingId,
                    (playlist) => {
                        this.setState({playlist})
                    }
                )
                this.dataTableRef._refresh()
                this.setState({loadingModal: false})
                c()
            }
        })
    }
    //************************************//
    _startScrapingEmails = () => {
        _confirm({
            callback: (c) => {
                this.setState({currentTrackForScrapeEmails: 0, loadingModal: true}, () => {
                    this._scrapingEmails(_.get(this.state.playlist?.tracks, `${this.state.currentTrackForScrapeEmails}.id`), c)
                })
            }
        })
    }

    //************************************//
    componentDidMount() {
        _getPlaylistDetails(
            this.props.match.params.scrapingId,
            (playlist) => {
                this.setState({playlist})
            }
        )
    }

    //************************************//
    render() {
        const {basicInfoModalShow, basicInfoModalData} = this.state.basicInfoModal
        const {editEmailModalShow, editEmailModalData} = this.state.editEmailModal
        const hasAction = _hasAnyAbility(this.context, tableActions)
        return (
            <Fragment>
                <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={trans('user.nav.scrapingJobs')} breadCrumbParent='' breadCrumbActive=''></Breadcrumbs>
                <FormGroup>
                    <Row className={'match-height'}>
                        <Col xs={6}>
                            {this.state.playlist?.id ? <iframe style={{borderRadius:"12px"}}
                                                               src={`https://open.spotify.com/embed/playlist/${this.state.playlist.url.split('/')[this.state.playlist.url.split('/').length - 1]}?utm_source=generator`}
                                                               width="100%" height="380" frameBorder="0" allowFullScreen=""
                                                               allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
                            </iframe> : null}
                        </Col>
                        <Col xs={6}>
                            {this.state.playlist?.id ? <ScrapingStatsOverview remoteData={this.state.playlist}  /> : null}
                        </Col>
                    </Row>
                </FormGroup>
                <Row>
                    <Col className={'d-flex justify-content-end'}>
                        <ButtonGroup className='mb-1'>
                            <CanCall action='SCRAPING_SCRAPE_EMAILS' id='addUserBtn'>
                                <Button className='btn-icon' color='primary' onClick={this._startScrapingEmails}>
                                    <span className='ml-25'>Scrape Emails</span>
                                </Button>
                            </CanCall>
                            {this.state.selectedItems?.selectedCount > 0 && <CanCall action='SCRAPING_MOVE_TO_CRM' id='addUserBtn'>
                                <Button className='btn-icon' color='secondary' onClick={this._openBasicInfoModal}>
                                    <span className='ml-25'>Move To CRM</span>
                                </Button>
                            </CanCall>}
                            <CanCall action='SCRAPING_DOWNLOAD_CRM_CSV' id='addUserBtn'>
                                <Button color={'success'} onClick={() => {
                                    window.open(
                                        `https://api-all-in-one.libertyinfluencers.com/api/playlist-artists-csv/${this.state.playlist.id}`,
                                        '_blank' // <- This is what makes it open in a new window.
                                    )
                                }}>
                                    <DownloadCloud size={14} />
                                    <span className='ml-25'>Export CSV</span>
                                </Button>
                            </CanCall>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm='12'>
                        <DataTable ref={(ref) => { this.dataTableRef = ref }} uri={`playlist/scraping/${this.props.match.params.scrapingId}`}
                                   columns={tableColumns(this.state, this._editEmailModal, hasAction)}
                                   hasIndexing={true} hasFilter={true}
                                   hasSelectedRow={true}
                                   onSelectedChange={(data) => this.setState({selectedItems: data})}
                                   showAll={true}
                                   defaultCollapse={true}
                        />
                    </Col>
                </Row>
                {basicInfoModalShow && <BasicInfoModal successCallback={this.dataTableRef._refresh} data={this.state.selectedItems} onClose={this._closeBasicInfoModal}/>}
                {editEmailModalShow && <EditEmailModal successCallback={this.dataTableRef._refresh} data={editEmailModalData} onClose={this._closeEmailModal}/>}
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
export default connect(mapStateToProps, null, null, {forwardRef: true})(withRouter(UserList))
