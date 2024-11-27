// ** React Imports
import React from "react"
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import {_url} from '@utils'

// ** Third Party Components
import {Card, CardBody, CardText, Button, Row, Col, Badge} from 'reactstrap'
import {DollarSign, TrendingUp, User, Check, Star, Flag, Phone, Hash, Percent, Eye} from 'react-feather'
import BasicInfoModal from "../genres-list/BasicInfoModal"

import AvatarGroup from '@components/avatar-group'

import {statusesColors} from "../../../../utility/Constants"

const CampaignInfoCard = ({ campaign, approve, decline }) => {
  // ** render user img
  const renderUserImg = () => {
    if (campaign !== null && campaign?.artist?.image?.length) {
      return <img src={_url(campaign?.artist?.image)} alt='user-avatar' className='img-fluid rounded avatar' height='104' width='104' />
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          // className='rounded'
          content={campaign?.artist?.name ?? ''}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '90px',
            width: '90px',
            borderRadius:'45px !important',
            overflow:'hidden'
          }}
        />
      )
    }
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col xl='4' lg='12' className='d-flex flex-column justify-content-between border-container-lg'>
            <div className='user-avatar-section'>
              <div className='d-flex justify-content-start'>
                {renderUserImg()}
                <div className='d-flex flex-column ml-1'>
                  <div className='user-info mb-1'>
                    <h4 className='mb-0'>
                      {campaign.artist?.name}
                      <Link className={'ml-50'} to={`/users/${campaign.artist?.id}`}>
                        <Eye size={15} />
                      </Link>
                    </h4>
                    <CardText tag='span'>
                      {campaign?.artist?.email}
                    </CardText>
                  </div>
                  {
                    (campaign.status === 'Pending' || campaign.status === 'Pending for Approval') &&
                      <div className='d-flex flex-wrap align-items-center'>
                        <Button.Ripple color='primary' onClick={approve}>
                          Approve
                        </Button.Ripple>
                        <Button.Ripple className='ml-1' color='danger' outline onClick={decline}>
                          Decline
                        </Button.Ripple>
                      </div>
                  }
                </div>
              </div>
            </div>
            <div className={'mt-1'}>
              <span className={'text-muted'}>{campaign.pitch}</span>
            </div>
            <div className={'mt-1'}>
              <span className={'mb-50'}>Campaign Managers: </span>
              <div>
                <AvatarGroup data={_.map(campaign.admins, (x) => { return {title: `${x.name}`, img: require('../../assets/images/default.jpg').default} })} />
              </div>
            </div>
          </Col>
          <Col xl='4' lg='12' className='mt-2 mt-xl-0'>
            <div className='user-info-wrapper'>
              <div className='d-flex flex-wrap align-items-center'>
                <h4 className={'w-100'}>Campaign Details</h4>
              </div>
              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  {/*<Check className='mr-1' size={14} />*/}
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Campaign name
                  </CardText>
                </div>
                <CardText className='text-capitalize mb-0' style={{overflowWrap: 'anywhere'}}>
                  {campaign.name}
                </CardText>
              </div>

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  {/*<Flag className='mr-1' size={14} />*/}
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Campaign Type
                  </CardText>
                </div>
                <CardText className='mb-0'>{campaign.campaign_type_id ? 'Spotify' : 'Tiktok'} ({campaign.is_released ? 'Released' : 'Not Released'})</CardText>
              </div>

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  {/*<Flag className='mr-1' size={14} />*/}
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Released Date
                  </CardText>
                </div>
                <CardText className='mb-0'>{new Date(campaign.released_date).toLocaleDateString()}</CardText>
              </div>

              <div className='d-flex flex-wrap align-items-center my-50'>
                <div className='user-info-title'>
                  {/*<Flag className='mr-1' size={14} />*/}
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Tier
                  </CardText>
                </div>
                <CardText className='mb-0'>{campaign.tier?.name}</CardText>
              </div>
              <div className='d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  {/*<Phone className='mr-1' size={14} />*/}
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Genre
                  </CardText>
                </div>
                <CardText className='mb-0'>
                  {_.map(campaign.genres, (x, _i) => {
                    return (
                        <Badge className={'mx-25'} key={_i} pill color={'primary'}>
                          {x.name}
                        </Badge>
                    )
                  })}
                </CardText>
              </div>
            </div>
          </Col>
          <Col xl='4' lg='12' className='mt-2 mt-xl-0'>
            <div className='user-info-wrapper'>
              <div className='d-flex flex-wrap align-items-center'>
                <h4 className={'w-100'}>&nbsp;</h4>
                <div className='user-info-title'>
                  {/*<User className='mr-1' size={14} />*/}
                  {/*<CardText tag='span' className='user-info-title font-weight-bold mb-0'>*/}
                  {/*  Campaign Type*/}
                  {/*</CardText>*/}
                </div>
                <CardText className='mb-0'>
                  {/*{campaign.campaign_type_id ? 'Spotify' : 'Tiktok'}*/}
                </CardText>
              </div>
            </div>

            {/*<div className='d-flex flex-wrap align-items-center my-50 justify-content-between'>*/}
            {/*  <div className='user-info-title'>*/}
            {/*    /!*<Flag className='mr-1' size={14} />*!/*/}
            {/*    <CardText tag='span' className='user-info-title font-weight-bold mb-0'>*/}
            {/*      Current Date*/}
            {/*    </CardText>*/}
            {/*  </div>*/}
            {/*  <CardText className='mb-0'>*/}
            {/*    <Badge id='plan-expiry-date' color='light-secondary'>*/}
            {/*      {new Date(campaign.created_at).toLocaleDateString()}*/}
            {/*    </Badge>*/}
            {/*  </CardText>*/}
            {/*</div>*/}

            <div className='d-flex flex-wrap align-items-center my-50 justify-content-between'>
              <div className='user-info-title'>
                {/*<Flag className='mr-1' size={14} />*/}
                <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                  Requested Start Date
                </CardText>
              </div>
              <CardText className='mb-0'>
                <Badge id='plan-expiry-date' color='light-secondary'>
                  {new Date(campaign.start_date).toLocaleDateString()}
                </Badge>
              </CardText>
            </div>

            <div className='d-flex flex-wrap align-items-center my-50 justify-content-between'>
              <div className='user-info-title'>
                {/*<Flag className='mr-1' size={14} />*/}
                <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                  Published Date
                </CardText>
              </div>
              <CardText className='mb-0'>
                <Badge id='plan-expiry-date' color='light-secondary'>
                  {campaign.status === 'Published' ? new Date(campaign.publish_date).toLocaleDateString() : 'Pending'}
                </Badge>
              </CardText>
            </div>

            <div className='d-flex flex-wrap align-items-center my-50 justify-content-between'>
              <div className='user-info-title'>
                {/*<Flag className='mr-1' size={14} />*/}
                <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                  Status
                </CardText>
              </div>
              <CardText className='mb-0'>
                <Badge id='plan-expiry-date' color={statusesColors[campaign.status].color}>
                  {campaign.status}
                </Badge>
              </CardText>
            </div>

            <div className='d-flex flex-wrap align-items-center my-50 justify-content-between'>
              <div className='user-info-title'>
                {/*<Flag className='mr-1' size={14} />*/}
                <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                  Invoice {campaign.invoice !== null ?
                    <Link className={'ml-50'} to={`/Invoices/${campaign.invoice?.id}`}>
                      <Eye size={15}/>
                    </Link>
                    :
                    ''
                }
                </CardText>
              </div>
              <CardText className='mb-0'>
                <Badge id='plan-expiry-date' color={campaign.invoice?.is_paid ? 'success' : 'warning'}>
                  {campaign.invoice?.is_paid ? 'Paid' : 'Pending'}
                </Badge>
              </CardText>
            </div>

          </Col>
        </Row>
        {/*<Row className={'mt-1'}>*/}
        {/*  <Col>*/}
        {/*    <div className='d-flex align-items-center'>*/}
        {/*      <div className='color-box bg-light-primary'>*/}
        {/*        <DollarSign className='text-primary' />*/}
        {/*      </div>*/}
        {/*      <div className='ml-1'>*/}
        {/*        <h5 className='mb-0'>${campaign.invoice_budget}</h5>*/}
        {/*        <small>Invoice Amount</small>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </Col>*/}

        {/*  <Col>*/}
        {/*    <div className='d-flex align-items-center'>*/}
        {/*      <div className='color-box bg-light-success'>*/}
        {/*        <Percent className='text-success' />*/}
        {/*      </div>*/}
        {/*      <div className='ml-1'>*/}
        {/*        <h5 className='mb-0'>%{campaign.commission_fees}</h5>*/}
        {/*        <small>Commission</small>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </Col>*/}

        {/*  <Col>*/}
        {/*    <div className='d-flex align-items-center'>*/}
        {/*      <div className='color-box bg-light-success'>*/}
        {/*        <DollarSign className='text-success' />*/}
        {/*      </div>*/}
        {/*      <div className='ml-1'>*/}
        {/*        <h5 className='mb-0'>${campaign.budget}</h5>*/}
        {/*        <small>Budget</small>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </Col>*/}

        {/*  <Col>*/}
        {/*    <div className='d-flex align-items-center'>*/}
        {/*      <div className='color-box bg-light-success'>*/}
        {/*        <Hash className='text-success' />*/}
        {/*      </div>*/}
        {/*      <div className='ml-1'>*/}
        {/*        <h5 className='mb-0'>{campaign.number_of_influencers}</h5>*/}
        {/*        <small>Allowed Influencers</small>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </Col>*/}

        {/*  <Col>*/}
        {/*    <div className='d-flex align-items-center'>*/}
        {/*      <div className='color-box bg-light-success'>*/}
        {/*        <DollarSign className='text-success' />*/}
        {/*      </div>*/}
        {/*      <div className='ml-1'>*/}
        {/*        <h5 className='mb-0'>${campaign.base_fees}</h5>*/}
        {/*        <small>Base fees</small>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </Col>*/}

        {/*  <Col>*/}
        {/*    <div className='d-flex align-items-center'>*/}
        {/*      <div className='color-box bg-light-success'>*/}
        {/*        <DollarSign className='text-success' />*/}
        {/*      </div>*/}
        {/*      <div className='ml-1'>*/}
        {/*        <h5 className='mb-0'>${campaign.performance_fees}</h5>*/}
        {/*        <small>Performance Fees</small>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </Col>*/}

        {/*</Row>*/}
      </CardBody>
    </Card>
  )
}

export default CampaignInfoCard
