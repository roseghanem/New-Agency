import React from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from "react-player"
import {DollarSign, Eye, Link as Link3} from "react-feather"
import {Badge, Button, Card, CardBody, CardText, Col, Row} from "reactstrap"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"

import {ButtonSpinner, ErrorMessages} from '@src/components'

const CuratorCampaignListItem = ({curatorVsCampaign, curatorVsCampaigndeclined, plyrProps, item, applyOnCampaign}) => {
  const loading = useSelector(state => state.app.loading)
  return (
    <Card key={item.name} className='ecommerce-card'>
      <div className='item-img' style={{height: 190}}>
        {/*<a href={`${item.link}`} target={'_blank'}>*/}
        {/*    <Link3 size={12} /> Campaing Link*/}
        {/*</a>*/}
        {(item.media_link) ? (
          item.media_link.split('.')[1] === 'mp4' ?
            <ReactPlayer url={plyrProps.source} style={{maxWidth: 300, maxHeight: 217}} controls={true}/>
            :
            <ReactPlayer url={plyrProps.source} style={{maxWidth: 300, maxHeight: 217}} controls={true}/>
        ) : (
          item.campaign_type_id === 1 && item.is_released === 1 ? (
            <iframe
              style={{borderRadius: 12, padding: 10, paddingTop: 20}}
              className={'d-flex justify-content-center align-items-center'}
              src={`${item.link.replace('/open.spotify.com/track/', '/open.spotify.com/embed/track/')}?utm_source=generator`}
              width="100%" height="190"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy">
            </iframe>
          ) : (
            <a href={`${item.link}`} target={'_blank'}>
              <Link3 size={12}/>
              <span className={'ml-25'}>Campaign Link</span>
            </a>
          )
        )
        }
      </div>
      <CardBody>
        <div className='item-name'>
          <div className={'d-flex justify-content-between'}>
            <div>
              <h6 className='mb-0 d-flex'>
                {item.name}
                {(curatorVsCampaigndeclined && curatorVsCampaigndeclined.curators_vs_campaigns_status_id === 7) ? (
                  <Link className={'ml-50'} to={`/pending/campaigns/${item.id}`}>
                    <Eye size={15}/>
                  </Link>
                ) : (
                  curatorVsCampaign ? (
                    ''
                  ) : (
                    <Link className={'ml-50'} to={`/pending/campaigns/${item.id}`}>
                      <Eye size={15}/>
                    </Link>
                  )
                )
                }
              </h6>

              <span className='item-company'>
                  Artist:
                  <span className='ml-25 text-primary font-weight-bolder'>
                    {item.artist?.name}
                  </span>
              </span>
            </div>
            <div className='d-flex align-items-center'>
              <div className='ml-1'>
                <h5 className='mb-0'>
                  {item.genres.map(brand => {
                    return (
                      <Badge className={'mx-25'} pill color={'primary'}>
                        {brand.name}
                      </Badge>
                    )
                  })}
                </h5>
              </div>
            </div>
          </div>

          <Row className={'mt-1'}>
            <Col>
              <div className='d-flex align-items-center'>
                <div className='color-box bg-light-primary'>
                  <DollarSign className='text-primary'/>
                </div>
                <div className='ml-1'>
                  <h5 className='mb-0'>${item.base_fees}</h5>
                  <small>Base Fees</small>
                </div>
              </div>
            </Col>
            <Col>
              <div className='d-flex align-items-center'>
                <div className='color-box bg-light-warning'>
                  <DollarSign className='text-warning'/>
                </div>
                <div className='ml-1'>
                  <h5 className='mb-0'>${item.performance_fees}</h5>
                  <small>Performance Fees</small>
                </div>
              </div>
            </Col>
          </Row>
          <Row className={'mt-1'}>
            <Col>
              <h6>
                {item.is_released === 1 ? <Badge className={'mx-25'} pill color={'success'}>
                  Released
                </Badge> : <Badge className={'mx-25'} pill color={'danger'}>
                  Not Released
                </Badge> }
              </h6>
            </Col>
          </Row>
        </div>
      </CardBody>
      <div className='item-options text-center'>
        <div className='item-wrapper'>
          <div className='item-cost'>
            {item.hasFreeShipping ? (
              <CardText className='shipping'>
                <Badge color='light-success' pill>
                  Free Shipping
                </Badge>
              </CardText>
            ) : null}
          </div>
        </div>
        {
          (curatorVsCampaigndeclined && curatorVsCampaigndeclined.curators_vs_campaigns_status_id === 7) ?
            <Button className='mt-1 remove-wishlist' color='success'
                    onClick={() => applyOnCampaign({campaign_id: item.id})} disabled={loading}>
              {loading ? <ButtonSpinner/> : null}
              <span>ReApply</span>
            </Button>
            :
            (curatorVsCampaign ?
              <Button tag={Link} to={`/campaigns/${curatorVsCampaign.id}`} className='mt-1 remove-wishlist'
                      color='warning' disabled={loading}>
                {loading ? <ButtonSpinner/> : null}
                <span>View</span>
              </Button>
              :

              <Button className='mt-1 remove-wishlist' color='success'
                      onClick={() => applyOnCampaign({campaign_id: item.id})} disabled={loading}>
                {loading ? <ButtonSpinner/> : null}
                <span>Apply</span>
              </Button>)
        }
      </div>
    </Card>
  )
}

CuratorCampaignListItem.propTypes = {}

export default CuratorCampaignListItem
