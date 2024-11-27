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
import BasicInfoModal from './BasicInfoModal'
import {statusesColors} from "../../../../utility/Constants"
import BasicInfoWizardModal from "./BasicInfoWizardModal"
import _ from "lodash"
//************************************//
const tableColumns = (state, _editBasicInfoModal, _deleteUser, hasAction) => [
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

            <div className='user-info text-truncate'>
              <span className='d-block font-weight-bold text-truncate'>{row.name}</span>
              {/*<span className='d-block font-weight-bold text-muted'>{row.email}</span>*/}
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
      return <Badge color={row.invoice ? row.invoice.is_paid ? 'success' : 'warning' : 'warning'}>{row.invoice?.id > 0 ? row.invoice?.is_paid ? 'Paid' : 'Pending' : 'Pending'}</Badge>
    }
  },
  {
    name: trans('gen.actions.actions'),
    allowOverflow: true,
    // omit: !hasAction,
    cell: (row, index, column, id) => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <CanCall action='INFLUENCER_VIEW_CAMPAIGN_PROFILE' id={`updateUser_${row.id}`}>
                <Link to={`/campaigns/${row.id}`} className='w-100 dropdown-item'>
                  <Eye size={15}/>
                  <span className='align-middle ml-50'>View</span>
                </Link>
              </CanCall>
              {
                !state.isArtist && (
                  <>
                    <CanCall action='INFLUENCER_EDIT_CAMPAIGN' id={`updateUser_${row.id}`}>
                      <DropdownItem className='w-100' onClick={e => _editBasicInfoModal(row)}>
                        <FileText size={15} />
                        <span className='align-middle ml-50'>{trans('gen.actions.edit')}</span>
                      </DropdownItem>
                    </CanCall>
                    <CanCall action='INFLUENCER_DELETE_CAMPAIGN' id={`deleteUser_${row.id}`}>
                      <DropdownItem className='w-100 btn-flat-danger' onClick={e => _deleteUser(row.id)} disabled={statusesColors[row.status].id > 1}>
                        <Trash size={15}/>
                        <span className='align-middle ml-50'>{trans('gen.actions.delete')}</span>
                      </DropdownItem>
                    </CanCall>
                  </>
                )
              }
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }
]
const tableActions = ['INFLUENCER_VIEW_CAMPAIGN_PROFILE', 'INFLUENCER_EDIT_CAMPAIGN', 'INFLUENCER_DELETE_CAMPAIGN']
//************************************//
class UserList extends Component {
  static contextType = AbilityContext
  constructor(props) {
    super(props)
    this.state = {
      userId: props.userId,
      user: props.user,
      basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}},
      isArtist: this.props.isArtist
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
    const {basicInfoModalShow, basicInfoModalData} = this.state.basicInfoModal
    const hasAction = _hasAnyAbility(this.context, tableActions)
    return (
      <Fragment>
        <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={'Campaigns List'} breadCrumbParent='' breadCrumbActive='' >
          <CanCall action='INFLUENCER_ADD_CAMPAIGN' id='addUserBtn'>
          {
              (process.env.REACT_APP_AUTH_MODULE === 'user' || this.props.user.user_type_id === 1) && (
                  <Button.Ripple className='btn-icon' color='primary' onClick={this._openBasicInfoModal}>
                    <Plus size={14} />
                    <span className='ml-25'>{trans('gen.actions.add')}</span>
                  </Button.Ripple>
              )
          }
          </CanCall>
        </Breadcrumbs>
        <Row>
          <Col sm='12'>
            <DataTable ref={(ref) => { this.dataTableRef = ref }} uri={this.props.link ?? 'campaigns'} columns={tableColumns(this.state, this._editBasicInfoModal, this._deleteUser, hasAction)} hasIndexing={true} hasFilter={true} defaultCollapse={true}/>
          </Col>
        </Row>
        {basicInfoModalShow && <BasicInfoWizardModal successCallback={this.dataTableRef._refresh} data={basicInfoModalData} onClose={this._closeBasicInfoModal}/>}
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
export default connect(mapStateToProps, null, null, { forwardRef: true })(UserList)
