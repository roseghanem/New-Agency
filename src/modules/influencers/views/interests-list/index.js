import React, { Fragment, Component, memo } from 'react'
import { connect } from 'react-redux'
import {FileText, MoreVertical, Send, Plus, Key, User, Trash} from 'react-feather'
import {
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Badge
} from 'reactstrap'
//************************************//
import Breadcrumbs from '@src/components/breadcrumbs'
import DataTable from '@src/components/datatable'
import {trans, _confirm} from '@utils'
import {AbilityContext, _hasAnyAbility } from '@src/utility/context/Can'
import Avatar from '@components/avatar'
import {_getAllRolesWithQ} from '@modules/rolespermissions'
import {CanCall} from '@authModule'
//************************************//
import {_deleteGenre, _deleteInterest, _getAllUserTypesWithQ} from '../../redux/actions'
import BasicInfoModal from './BasicInfoModal'
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
              <span className='d-block font-weight-bold text-muted'>{row.email}</span>
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
    name: 'User Type',
    selector: 'name',
    sortable: true,
    minWidth: '225px',
    filter: {
      enabled: true,
      type: 'asyncSelect',
      loadOptions: _getAllUserTypesWithQ
    },
    cell: (row, index, column, id) => {
      return row.user_type.name
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
              {/*<CanCall action='NoPermissionCode' id={`updateUser_${row.id}`}>*/}
                <DropdownItem className='w-100' onClick={e => _editBasicInfoModal(row)} >
                  <FileText size={15} />
                  <span className='align-middle ml-50'>{trans('gen.actions.edit')}</span>
                </DropdownItem>
              {/*</CanCall>*/}
              {/*<CanCall action='NoPermissionCode' id={`deleteUser_${row.id}`}>*/}
                <DropdownItem className='w-100 btn-flat-danger' onClick={e => _deleteUser(row.id)}>
                  <Trash size={15}/>
                  <span className='align-middle ml-50'>{trans('gen.actions.delete')}</span>
                </DropdownItem>
              {/*</CanCall>*/}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }
]
const tableActions = ['NoPermissionCode']
//************************************//
class UserList extends Component {
  static contextType = AbilityContext
  constructor(props) {
    super(props)
    this.state = {
      userId: props.userId,
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
        _deleteInterest(id, () => {
          this.dataTableRef._refresh()
          c()
        })
      }
    })
  }
  //************************************//
  render () {
    const {basicInfoModalShow, basicInfoModalData} = this.state.basicInfoModal
    const hasAction = _hasAnyAbility(this.context, tableActions)
    return (
      <Fragment>
        <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={'Interests List'} breadCrumbParent='' breadCrumbActive='' >
          {/*<CanCall action='NoPermissionCode' id='addUserBtn'>*/}
            <Button.Ripple className='btn-icon' color='primary' onClick={this._openBasicInfoModal}>
              <Plus size={14} />
              <span className='ml-25'>{trans('gen.actions.add')}</span>
            </Button.Ripple>
          {/*</CanCall>*/}
        </Breadcrumbs>
        <Row>
          <Col sm='12'>
            <DataTable ref={(ref) => { this.dataTableRef = ref }} uri={'interests'} columns={tableColumns(this.state, this._editBasicInfoModal, this._deleteUser, hasAction)} hasIndexing={true} hasFilter={true} defaultCollapse={true}/>
          </Col>
        </Row>
        {basicInfoModalShow && <BasicInfoModal  successCallback={this.dataTableRef._refresh} data={basicInfoModalData} onClose={this._closeBasicInfoModal}/>}
      </Fragment>
    )
  }
}
//************************************//
const mapStateToProps = store => ({
  loading: store.app.loading,
  userId: _.get(store, `${process.env.REACT_APP_AUTH_MODULE}.userData.id`)
})
export default connect(mapStateToProps, null, null, { forwardRef: true })(UserList)
