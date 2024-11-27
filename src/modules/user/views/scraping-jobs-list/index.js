import React, { Fragment, Component, memo } from 'react'
import { connect } from 'react-redux'
import {FileText, MoreVertical, Send, Plus, Play, User, Trash} from 'react-feather'
import {
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from 'reactstrap'
//************************************//
import Breadcrumbs from '@src/components/breadcrumbs'
import DataTable from '@src/components/datatable'
import {trans, _confirm} from '@utils'
import {AbilityContext, _hasAnyAbility } from '@src/utility/context/Can'
//************************************//
import {_deleteAdmin, _deleteScrapingJob, _startScrapingJob} from '../../redux/actions'
import CanCall from '../../components/CanCall'
import BasicInfoModal from './BasicInfoModal'
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
    name: trans('user.url'),
    selector: 'url',
    sortable: true,
    filter: {
      enabled: true,
      type: 'text'
    }
  },
  {
    name: "URL",
    selector: 'url',
    sortable: true,
    filter: {
      enabled: false,
      type: 'text'
    },
    cell: (row, index, column, id) => {
      return (
        <a href={`https://open.spotify.com/search/${row.url}/playlists`} target={'_blank'} color={row.proccessed ? 'success' : 'warning'}>
          {`URL`}
        </a>
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
      options:[{label:'Done', value:2}, {label:'In Progress', value:1}, {label:'Pending', value:0}]
    },
    cell: (row, index, column, id) => {
      return (
        <Badge color={row.proccessed === 0 ? 'info' : row.proccessed === 1 ? 'warning' : 'success'}>
          {row.proccessed === 0 ? 'Pending' : row.proccessed === 1 ? 'In Progress' : 'Done'}
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
          {'Admin'}
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
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <CanCall action='ADMINS_EDIT_ADMIN' id={`updateUser_${row.id}`}>
                <DropdownItem className='w-100' onClick={e => _startScraping(row.id)} disabled={row.proccessed}>
                  <Play size={15}/>
                  <span className='align-middle ml-50'>{'Start Scraping'}</span>
                </DropdownItem>
              </CanCall>
              <CanCall action='ADMINS_EDIT_ADMIN' id={`updateUser_${row.id}`}>
                <DropdownItem className='w-100' onClick={e => _editBasicInfoModal(row)} disabled={row.proccessed}>
                  <FileText size={15} />
                  <span className='align-middle ml-50'>{trans('gen.actions.edit')}</span>
                </DropdownItem>
              </CanCall>
              <CanCall action='ADMINS_DELETE_ADMIN' id={`deleteUser_${row.id}`}>
                <DropdownItem className='w-100 btn-flat-danger' onClick={e => _deleteUser(row.id)} disabled={row.proccessed}>
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
const tableActions = ['ADMINS_EDIT_ADMIN', 'ADMINS_DELETE_ADMIN']
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
  render () {
    const {basicInfoModalShow, basicInfoModalData} = this.state.basicInfoModal
    const hasAction = _hasAnyAbility(this.context, tableActions)
    return (
      <Fragment>
        <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={trans('user.nav.scrapingJobs')} breadCrumbParent='' breadCrumbActive='' >
          <CanCall action='ADMINS_ADD_ADMIN' id='addUserBtn'>
            <Button.Ripple className='btn-icon' color='primary' onClick={this._openBasicInfoModal}>
              <Plus size={14} />
              <span className='ml-25'>{'Create New'}</span>
            </Button.Ripple>
          </CanCall>
        </Breadcrumbs>
        <Row>
          <Col sm='12'>
            <DataTable ref={(ref) => { this.dataTableRef = ref }} uri={'scrapingjobs'} columns={tableColumns(this.state, this._editBasicInfoModal, this._deleteUser, this._startScraping, hasAction)} hasIndexing={true} hasFilter={true}/>
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
