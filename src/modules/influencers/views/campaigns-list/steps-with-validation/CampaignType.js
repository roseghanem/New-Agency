import React, {Fragment, useState} from 'react'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import {Label, FormGroup, Row, Col, Button, Form, Input, Container} from 'reactstrap'
import _ from "lodash"

const CampaignType = ({ stepper, type, formState }) => {
  const { register, errors, handleSubmit, trigger } = useForm()
  const {campaignType, setCampaignType} = formState

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Campaign Type</h5>
        <small>Choose Campaign Type</small>
      </div>
      <Container>
        <Row className={'mb-1'}>
          <Col xs={6}>
            <Button block outline onClick={() => {
              setCampaignType(1)
              stepper.next()
            }} style={{backgroundColor: campaignType === 1 ? 'rgba(115, 103, 240, 0.12)' : 'transparent', height:100}}>
              <img width={25} src={require('@fwsrc/assets/images/spotify.png').default} />
              <span className={'ml-25'}>Spotify</span>
            </Button>
          </Col>
          <Col xs={6}>
            <Button block outline onClick={() => {
              setCampaignType(2)
              stepper.next()
            }} style={{backgroundColor: campaignType === 2 ? 'rgba(115, 103, 240, 0.12)' : 'transparent', height:100}}>
              <img width={25} src={require('@fwsrc/assets/images/tiktok.png').default} />
              <span className={'ml-25'}>Tiktok</span>
            </Button>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default CampaignType
