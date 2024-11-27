import React, { Fragment, Component, memo } from 'react'
import { connect } from 'react-redux'
import {FileText, MoreVertical, Send, Plus, Key, User, Trash, Eye} from 'react-feather'
import {
    Row,
    Col,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Badge
} from 'reactstrap'
import {Link} from "react-router-dom"
//************************************//
import Breadcrumbs from '@src/components/breadcrumbs'
import DataTable from '@src/components/datatable'
import {trans, _confirm} from '@utils'
import {AbilityContext, _hasAnyAbility } from '@src/utility/context/Can'
import Avatar from '@components/avatar'
import {_getAllRolesWithQ} from '@modules/rolespermissions'
import {CanCall} from '@authModule'
//************************************//
import {_deleteGenre} from '../../redux/actions'
import {statusesColors} from "../../../../utility/Constants"
import _ from "lodash"
//************************************//
const tableColumns = (state, hasAction) => [
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
        selector: 'name',
        cell: (row) => {
            return (
                row.campaign_type_id === 1 ? <img width={22} src={require('@fwsrc/assets/images/spotify.png').default} /> : <img width={22} src={require('@fwsrc/assets/images/tiktok.png').default} />
            )
        }
    },
    {
        name: trans('user.name'),
        selector: 'name',
        sortable: true,
        minWidth: '350px',
        cell: (row, index, column, id) => {
            return (
                <div className='d-flex align-items-center'>
                    <Avatar content={row.name} initials />

                    <div className='user-info text-truncate ml-1'>
                        <span className='d-block font-weight-bold text-truncate'>{row.name}</span>
                        {/*<span className='d-block font-weight-bold text-muted'>{row.email}</span>*/}
                    </div>
                </div>
            )
        }
    },
    {
        name: trans('user.name'),
        selector: 'name',
        sortable: true,
        minWidth: '225px',
        omit:true,
        filter: {
            enabled: true,
            type: 'text'
        }
    },
    {
        name: 'Artist Name',
        selector: 'artist_name',
        sortable: false,
        filter: {
            enabled: true,
            type: 'text'
        },
        cell: (row) => {
            return (
                <span>{row.artist?.name}</span>
            )
        }
    },
    {
        name: 'Tier',
        selector: 'tier',
        sortable: false,
        minWidth: '200px',
        cell: (row) => {
            return <Badge color={'info'}>{row?.tier?.name}</Badge>
        }
    },
    {
        name: 'Status',
        selector: 'status',
        sortable: false,
        minWidth: '200px',
        cell: (row) => {
            return <Badge color={statusesColors[row.status].color}>{row.status}</Badge>
        }
    },
    {
        name: 'Invoice Status',
        selector: 'status',
        minWidth: '200px',
        sortable: false,
        omit: state.user.user_type_id > 1,
        cell: (row) => {
            return <Badge color={row.invoice ? row.invoice.is_paid ? 'success' : 'warning' : 'warning'}>{row.invoice ? row.invoice.is_paid ? 'Paid' : 'Pending' : 'Waiting Admin Approval'}</Badge>
        }
    }
]
const tableActions = ['NoPermissionCode']
//************************************//
class ArtistLastFIveCampaignsList extends Component {
    static contextType = AbilityContext
    constructor(props) {
        super(props)
        this.state = {
            userId: props.userId,
            user: props.user,
            basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}}
        }
        this._editBasicInfoModal = this._editBasicInfoModal.bind(this)
        this._deleteUser = this._deleteUser.bind(this)
    }
    //************************************//
    _closeBasicInfoModal = () => {
        this.setState({basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}}})
    }
    //************************************//
    _openBasicInfoModal = () => {
        this.setState({basicInfoModal: {basicInfoModalShow: true, basicInfoModalData: {}}})
    }
    //************************************//
    _editBasicInfoModal = (data) => {
        this.setState({basicInfoModal: {basicInfoModalShow: true, basicInfoModalData: data}})
    }
    //************************************//
    _deleteUser = (id) => {
        _confirm({
            callback: (c) => {
                // _deleteGenre(id, () => {
                //   this.dataTableRef._refresh()
                //   c()
                // })
            }
        })
    }
    //************************************//
    render () {
        const hasAction = _hasAnyAbility(this.context, tableActions)
        return (
            <Fragment>
                <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={'Campaigns'} breadCrumbParent='' breadCrumbActive='' >
                </Breadcrumbs>
                <Row>
                    <Col sm='12'>
                        <DataTable
                            ref={(ref) => { this.dataTableRef = ref }}
                            uri={`artist/campaigns/indexAllListByAdminForArtist/${this.props.artist?.id}`}
                            columns={tableColumns(this.state, hasAction)}
                            hasIndexing={true}
                            hasFilter={true}
                            defaultCollapse={true}
                        />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}
//************************************//
const mapStateToProps = store => ({
    loading: store.app.loading,
    userId: _.get(store, `${process.env.REACT_APP_AUTH_MODULE}.userData.id`),
    user: _.get(store, `${process.env.REACT_APP_AUTH_MODULE}.userData`)
})
export default connect(mapStateToProps, null, null, { forwardRef: true })(ArtistLastFIveCampaignsList)
