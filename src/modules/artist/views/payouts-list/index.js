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
    name: 'Invoice #',
    selector: 'num',
    sortable: false,
    filter: {
      enabled: true,
      type:'text'
    },
    cell: (row) => {
      return (
          <span className={'text-primary'}>#{row.num}</span>
      )
    }
  },
  {
    name: 'Campaign name',
    selector: 'num',
    sortable: false,
    cell: (row) => {
      return (
          <span>{row.curator_vs_campaign.campaign.name}</span>
      )
    }
  },
  {
    name: 'Invoice Date',
    selector: 'created_at',
    sortable: false,
    cell: (row) => {
      return (
          <span>{new Date(row.created_at).toLocaleDateString()}</span>
      )
    }
  },
  {
    name: 'Budget',
    selector: 'budget',
    sortable: false,
    cell: (row) => {
      return (
          <span>${row.amount}</span>
      )
    }
  },
  {
    name: 'Paid',
    selector: 'is_paid',
    sortable: false,
    cell: (row) => {
      return (
          <Badge color={row.is_paid ? 'success' : 'warning'}>{row.is_paid ? 'Paid' : 'Pending'}</Badge>
      )
    }
  },
  {
    name: trans('gen.actions.actions'),
    allowOverflow: true,
    cell: (row, index, column, id) => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <Link to={`/payouts/${row.id}`} className='w-100 dropdown-item'>
                <Eye size={15}/>
                <span className='align-middle ml-50'>View</span>
              </Link>
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

  }
  //************************************//
  render () {
    const {basicInfoModalShow, basicInfoModalData} = this.state.basicInfoModal
    const hasAction = _hasAnyAbility(this.context, tableActions)
    return (
      <Fragment>
        <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={'Payouts List'} breadCrumbParent='' breadCrumbActive='' ></Breadcrumbs>
        <Row>
          <Col sm='12'>
            <DataTable ref={(ref) => { this.dataTableRef = ref }} uri={'curator/payouts'} columns={tableColumns(this.state, this._editBasicInfoModal, this._deleteUser, hasAction)} hasIndexing={true} hasFilter={true} defaultCollapse={true}/>
          </Col>
        </Row>
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
