// ** Reactstrap
import { Card, CardHeader, CardBody, Badge, UncontrolledTooltip, Button } from 'reactstrap'

import {statusesColors} from "../../../../utility/Constants"

const PlanCard = ({ campaign, openBudgetModal, publishCampaign }) => {
  return (
    <Card className='plan-card border-primary'>
      <CardHeader className='pt-75 pb-1'>
        <div className={'w-100 d-flex justify-content-between align-items-center mb-1'}>
          <h5 className='mb-0'>Current Date</h5>
          <Badge id='plan-expiry-date' color='light-secondary'>
            {new Date(campaign.created_at).toLocaleDateString()}
          </Badge>
          {/*<UncontrolledTooltip placement='top' target='plan-expiry-date'>*/}
          {/*  Expiry Date*/}
          {/*</UncontrolledTooltip>*/}
        </div>
        <div className={'w-100 d-flex justify-content-between align-items-center mb-1'}>
          <h5 className='mb-0'>Requested Start Date</h5>
          <Badge id='plan-expiry-date' color='light-secondary'>
            {new Date(campaign.start_date).toLocaleDateString()}
          </Badge>
        </div>
        <div className={'w-100 d-flex justify-content-between align-items-center mb-1'}>
          <h5 className='mb-0'>Published Date</h5>
          <Badge id='plan-expiry-date' color='light-secondary'>
            {campaign.status === 'Published' ? new Date(campaign.published_date).toLocaleDateString() : 'Pending'}
          </Badge>
        </div>
        <div className={'w-100 d-flex justify-content-between align-items-center mb-1'}>
          <h5 className='mb-0'>Status</h5>
          <Badge id='plan-expiry-date' color={statusesColors[campaign.status].color}>
            {campaign.status}
          </Badge>
        </div>
        <div className={'w-100 d-flex justify-content-between align-items-center mb-1'}>
          <h5 className='mb-0'>Invoice</h5>
          <Badge id='plan-expiry-date' color={campaign.invoice?.is_paid ? 'success' : 'warning'}>
            {campaign.invoice?.is_paid ? 'Paid' : 'Pending'}
          </Badge>
        </div>
      </CardHeader>
      <CardBody>
        {/*<Badge className='text-capitalize' color='light-primary'>*/}
        {/*  {campaign !== null ? campaign.currentPlan : 'Basic'}*/}
        {/*</Badge>*/}
        {/*<ul className='list-unstyled my-1'>*/}
        {/*  <li className='d-flex justify-content-between align-items-center pt-75 pb-1'>*/}
        {/*    <span className='align-middle'>5 Users</span>*/}
        {/*    <span className='align-middle'>5 Users</span>*/}
        {/*  </li>*/}
        {/*  <li className='my-25'>*/}
        {/*    <span className='align-middle'>10 GB Storage</span>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <span className='align-middle'>Basic Support</span>*/}
        {/*  </li>*/}
        {/*</ul>*/}
        {
          statusesColors[campaign.status].id < 3 &&
            (
                <Button.Ripple className='text-center' color='primary' block onClick={openBudgetModal}>
                  Add Budget
                </Button.Ripple>
            )
        }
        {
          statusesColors[campaign.status].id === 6 &&
            (
                <>
                  <Button.Ripple className='text-center' color='primary' block onClick={publishCampaign}>
                    Publish
                  </Button.Ripple>
                </>
            )
        }
      </CardBody>
    </Card>
  )
}

export default PlanCard
