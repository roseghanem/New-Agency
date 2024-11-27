import React, { Fragment, Component, memo } from 'react'
import { connect } from 'react-redux'
import {FileText, MoreVertical, Send, Plus, Key, User, Trash, CheckSquare, CheckCircle} from 'react-feather'
import {
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Badge
} from 'reactstrap'
import {withRouter} from "react-router-dom"
import moment from "moment/moment"
//************************************//
import Breadcrumbs from '@src/components/breadcrumbs'
import DataTable from '@src/components/datatable'
import {trans, _confirm} from '@utils'
import {AbilityContext, _hasAnyAbility } from '@src/utility/context/Can'
import Avatar from '@components/avatar'
import {CanCall} from '@authModule'
//************************************//
import {
  _approveCuratorVsCampaign,
  _changeCuratorVsCampaignStatus,
  _declineCuratorVsCampaign,
  _deleteGenre
} from '../../../redux/actions'
import BasicInfoModal from "./CuratorVsCampaignModal"
import {curatorVsCampaignStatusesColors} from "../../../../../utility/Constants"
import PlaylistSubmissionModal from "./PlaylistSubmissionModal"
import PlaylistPositioningModal from "./PlaylistPositioningModal"
//************************************//
const tableColumns = (state, _approve, _decline, _changeCuratorVsCampaignStatus, _editVerifySubmissionModal, _editSubmitPositioningModal, _editBasicInfoModal, hasAction) => [
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
    name: 'Curator Details',
    selector: 'name',
    sortable: true,
    minWidth: '350px',
    cell: (row, index, column, id) => {
      return (
          <div className='d-flex align-items-center'>
                <Avatar content={row.curator.name} initials />

            <div className='user-info text-truncate ml-1'>
              <span className='d-block font-weight-bold text-truncate'>{row.curator.name}</span>
              <span className='d-block font-weight-bold text-muted'>{row.curator.email}</span>
            </div>
          </div>
      )
    }
  },
  {
    name: "Status",
    selector: 'name',
    minWidth: '200px',
    cell: (row) => {
      return (
          <Badge color={curatorVsCampaignStatusesColors[row.status.name].color}>{row.status.name}</Badge>
      )
    }
  },
  {
    name: "Start Date",
    selector: 'name',
    minWidth: '150px',
    cell: (row) => {
      return (
          <Badge color={'info'}>{moment(row.campaign.start_date).format('Y-MM-DD')}</Badge>
      )
    }
  },
  {
    name: "Due Date",
    selector: 'name',
    cell: (row) => {
      return (
          <Badge color={'info'}>{moment(row.campaign.start_date).add(14, 'days').format('Y-MM-DD')}</Badge>
      )
    }
  },
  {
    name: "Payout Amount",
    selector: 'payout_amount',
    omit: !state.approved,
    cell: (row) => {
      return (
          <span>${row.payout_amount}</span>
      )
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
              {
                row.status.id === 1 && (
                    <>
                      {/*<CanCall action='NoPermissionCode' id={`approve_${row.id}`}>*/}
                        <DropdownItem className='w-100 btn-flat-success' onClick={e => _approve(row.id)}>
                          <CheckCircle size={15}/>
                          <span className='align-middle ml-50'>Approve</span>
                        </DropdownItem>
                      {/*</CanCall>*/}
                    </>
                  )
              }
              {
                (row.status.id === 2 || row.status.id === 3) && (
                    <>
                      {/*<CanCall action='NoPermissionCode' id={`approve_${row.id}`}>*/}
                        <DropdownItem className='w-100 btn-flat-success' onClick={e => _editVerifySubmissionModal(row)}>
                          <CheckCircle size={15}/>
                          <span className='align-middle ml-50'>Verify Submission</span>
                        </DropdownItem>
                      {/*</CanCall>*/}
                    </>
                  )
              }
              {
                (row.status.id === 4 || row.status.id === 5 || row.status.id === 6) && (
                    <>
                      {/*<CanCall action='NoPermissionCode' id={`approve_${row.id}`}>*/}
                        <DropdownItem className='w-100 btn-flat-primary' onClick={e => _editSubmitPositioningModal(row)}>
                          <FileText size={15}/>
                          <span className='align-middle ml-50'>Position History</span>
                        </DropdownItem>
                      {/*</CanCall>*/}
                    </>
                  )
              }
              {/*<CanCall action='NoPermissionCode' id={`editCuVsCa_${row.id}`}>*/}
                <DropdownItem className='w-100 btn-flat-primary' onClick={e => _editBasicInfoModal(row)}>
                  <FileText size={15}/>
                  <span className='align-middle ml-50'>{state.approved ? 'Edit' : 'Change Curator'}</span>
                </DropdownItem>
              {/*</CanCall>*/}
              {/*{*/}
              {/*  row.status.id === 3 && (*/}
              {/*      <>*/}
              {/*        <CanCall action='NoPermissionCode' id={`approve_${row.id}`}>*/}
              {/*          <DropdownItem className='w-100 btn-flat-success' onClick={e => _changeCuratorVsCampaignStatus(row.id, 4)}>*/}
              {/*            <CheckCircle size={15}/>*/}
              {/*            <span className='align-middle ml-50'>On Going</span>*/}
              {/*          </DropdownItem>*/}
              {/*        </CanCall>*/}
              {/*      </>*/}
              {/*    )*/}
              {/*}*/}
              {/*{*/}
              {/*  row.status.id === 4 && (*/}
              {/*      <>*/}
              {/*        <CanCall action='NoPermissionCode' id={`approve_${row.id}`}>*/}
              {/*          <DropdownItem className='w-100 btn-flat-success' onClick={e => _changeCuratorVsCampaignStatus(row.id, 5)}>*/}
              {/*            <CheckCircle size={15}/>*/}
              {/*            <span className='align-middle ml-50'>Auditing</span>*/}
              {/*          </DropdownItem>*/}
              {/*        </CanCall>*/}
              {/*      </>*/}
              {/*    )*/}
              {/*}*/}
              {/*{*/}
              {/*  row.status.id === 5 && (*/}
              {/*      <>*/}
              {/*        <CanCall action='NoPermissionCode' id={`approve_${row.id}`}>*/}
              {/*          <DropdownItem className='w-100 btn-flat-success' onClick={e => _changeCuratorVsCampaignStatus(row.id, 6)}>*/}
              {/*            <CheckCircle size={15}/>*/}
              {/*            <span className='align-middle ml-50'>Complete</span>*/}
              {/*          </DropdownItem>*/}
              {/*        </CanCall>*/}
              {/*      </>*/}
              {/*    )*/}
              {/*}*/}
              {/*{*/}
              {/*    row.status.id !== 6 && row.status.id !== 7 && row.status.id !== 8  && (*/}
              {/*        <>*/}
              {/*          <CanCall action='NoPermissionCode' id={`decline_${row.id}`}>*/}
              {/*            <DropdownItem className='w-100 btn-flat-danger' onClick={e => _decline(row.id)}>*/}
              {/*              <Trash size={15}/>*/}
              {/*              <span className='align-middle ml-50'>Decline</span>*/}
              {/*            </DropdownItem>*/}
              {/*          </CanCall>*/}
              {/*        </>*/}
              {/*    )*/}
              {/*}*/}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }
]
const tableActions = ['NoPermissionCode']
//************************************//
class CuratorsVsCampaignList extends Component {
  static contextType = AbilityContext
  constructor(props) {
    super(props)
    this.state = {
      campaign: props.campaign,
      userId: props.userId,
      approved: this.props.approved,
      basicInfoModal: {basicInfoModalShow: false, basicInfoModalData: {}},
      verifySubmissionModal: {verifySubmissionModalShow: false, verifySubmissionModalData: {}},
      submitPositioningModal: {submitPositioningModalShow: false, submitPositioningModalData: {}}
    }
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
    this.setState({basicInfoModal: {basicInfoModalShow: true, basicInfoModalData: {...data, applied: !this.state.approved}}})
  }
  //************************************//
  _editVerifySubmissionModal = (data) => {
    this.setState({verifySubmissionModal: {verifySubmissionModalShow: true, verifySubmissionModalData: data}})
  }
  //************************************//
  _closeVerifySubmissionModal = () => {
    this.setState({verifySubmissionModal: {verifySubmissionModalShow: false, verifySubmissionModalData: {}}})
  }
  //************************************//
  _editSubmitPositioningModal = (data) => {
    this.setState({submitPositioningModal: {submitPositioningModalShow: true, submitPositioningModalData: data}})
  }
  //************************************//
  _closeSubmitPositioningModal = () => {
    this.setState({submitPositioningModal: {submitPositioningModalShow: false, submitPositioningModalData: {}}})
  }
  //************************************//
  approve = (id) => {
    _confirm({
      callback: (c) => {
        _approveCuratorVsCampaign(id, () => {
          this.dataTableRef._refresh()
          c()
        })
      }
    })
  }
  //************************************//
  decline = (id) => {
    _confirm({
      callback: (c) => {
        _declineCuratorVsCampaign(id, () => {
          this.dataTableRef._refresh()
          c()
        })
      }
    })
  }
  //************************************//
  changeCuratorVsCampaignStatus = (id, status) => {
    _confirm({
      callback: (c) => {
        _changeCuratorVsCampaignStatus(id, status, () => {
          this.dataTableRef._refresh()
          c()
        })
      }
    })
  }
  //************************************//
  render () {
    const {basicInfoModalShow, basicInfoModalData} = this.state.basicInfoModal
    const {verifySubmissionModalShow, verifySubmissionModalData} = this.state.verifySubmissionModal
    const {submitPositioningModalShow, submitPositioningModalData} = this.state.submitPositioningModal
    const hasAction = _hasAnyAbility(this.context, tableActions)
    return (
      <Fragment>
        <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={''} breadCrumbParent='' breadCrumbActive='' >
          {
            this.state.campaign.status === 'Published' ?
            this.props.approved !== 1 && (
              // <CanCall action='NoPermissionCode' id='addUserBtn'>
                <Button.Ripple className='btn-icon' color='primary' onClick={this._openBasicInfoModal}>
                  <Plus size={14} />
                  <span className='ml-25'>{trans('gen.actions.add')}</span>
                </Button.Ripple>
              // </CanCall>
            )
                : ''
          }
        </Breadcrumbs>
        <Row>
          <Col sm='12'>
            <DataTable
                ref={(ref) => { this.dataTableRef = ref }}
                uri={`campaign/curators_vs_campaigns/${this.props.match.params.campaignId}/${this.props.approved}`}
                columns={tableColumns(this.state, this.approve, this.decline, this.changeCuratorVsCampaignStatus, this._editVerifySubmissionModal, this._editSubmitPositioningModal, this._editBasicInfoModal, hasAction)}
                hasIndexing={true} hasFilter={false} defaultCollapse={true}/>
          </Col>
        </Row>
        {basicInfoModalShow && <BasicInfoModal successCallback={this.dataTableRef._refresh} campaign={this.state.campaign} data={basicInfoModalData} onClose={this._closeBasicInfoModal}/>}
        {verifySubmissionModalShow && <PlaylistSubmissionModal successCallback={this.dataTableRef._refresh} data={verifySubmissionModalData} onClose={this._closeVerifySubmissionModal}/>}
        {submitPositioningModalShow && <PlaylistPositioningModal successCallback={this.dataTableRef._refresh} data={submitPositioningModalData} onClose={this._closeSubmitPositioningModal}/>}
      </Fragment>
    )
  }
}
//************************************//
const mapStateToProps = store => ({
  loading: store.app.loading,
  userId: _.get(store, `${process.env.REACT_APP_AUTH_MODULE}.userData.id`)
})
export default connect(mapStateToProps, null, null, { forwardRef: true })(withRouter(CuratorsVsCampaignList))
