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
import {curatorVsCampaignStatusesColors} from "@fwsrc/utility/Constants"
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
              {/*<span className='d-block font-weight-bold text-muted'>{row.curator.email}</span>*/}
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
  }
  // {
  //   name: "Start Date",
  //   selector: 'name',
  //   minWidth: '150px',
  //   cell: (row) => {
  //     return (
  //         <Badge color={'info'}>{moment(row.campaign.start_date).format('DD-MM-Y')}</Badge>
  //     )
  //   }
  // },
  // {
  //   name: "Due Date",
  //   selector: 'name'
  // },
  // {
  //   name: "Payout Amount",
  //   selector: 'payout_amount',
  //   cell: (row) => {
  //     return (
  //         <span>${row.payout_amount}</span>
  //     )
  //   }
  // }
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
    this.setState({basicInfoModal: {basicInfoModalShow: true, basicInfoModalData: data}})
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
  render () {
    const {basicInfoModalShow, basicInfoModalData} = this.state.basicInfoModal
    const {verifySubmissionModalShow, verifySubmissionModalData} = this.state.verifySubmissionModal
    const {submitPositioningModalShow, submitPositioningModalData} = this.state.submitPositioningModal
    const hasAction = _hasAnyAbility(this.context, tableActions)
    return (
      <Fragment>
        <Breadcrumbs breadCrumbMainTitle={''} breadCrumbTitle={''} breadCrumbParent='' breadCrumbActive='' >
          <CanCall action='NoPermissionCode' id='addUserBtn'>
            <Button.Ripple className='btn-icon' color='primary' onClick={this._openBasicInfoModal}>
              <Plus size={14} />
              <span className='ml-25'>{trans('gen.actions.add')}</span>
            </Button.Ripple>
          </CanCall>
        </Breadcrumbs>
        <Row>
          <Col sm='12'>
            <DataTable
                ref={(ref) => { this.dataTableRef = ref }}
                uri={`artist/campaign/curators_vs_campaigns/${this.props.match.params.campaignId}/${this.props.approved}`}
                columns={tableColumns(this.state, hasAction)}
                hasIndexing={true} hasFilter={false} defaultCollapse={true}/>
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
export default connect(mapStateToProps, null, null, { forwardRef: true })(withRouter(CuratorsVsCampaignList))
