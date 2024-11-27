import React, {Fragment, useEffect, useState} from 'react'
import classnames from 'classnames'
import {Controller, useForm} from 'react-hook-form'
import {ArrowLeft} from 'react-feather'
import {Label, FormGroup, Row, Col, Button, Form, Input, Container} from 'reactstrap'
import _ from "lodash"
import Flatpickr from "react-flatpickr"
import AsyncSelect from "react-select/async"
import moment from "moment/moment"
import {useSelector} from "react-redux"

import {getUserData} from '@authModule'

import {ButtonSpinner, ErrorMessages} from '@src/components'
import {trans} from '@utils'

import {
    _addCampaign,
    _editCampaign,
    _getAllTiers
} from "../../../redux/actions"

const CampaignDetails = ({stepper, formState, successCallback, _close}) => {
    const {register, errors, handleSubmit, trigger, control, setValue, setError} = useForm()
    const {formData, setFormData, campaignType} = formState
    const loading = useSelector(state => state.app.loading)
    const [tiers, setTiers] = useState([])
    const [pitch, setPitch] = useState(formData.pitch)

    const [valErrors, setValErrors] = useState({})
    const onSubmit = (data) => {
        trigger()
        if (pitch.length > 140) {
            setValErrors({pitch: 'Pitch too long'})
            return
        }
        if (_.isEmpty(errors)) {
            setFormData(prevState => {
                if (data.start_date === _.get(formData, 'start_date')) {
                    data.start_date = _.reverse(data.start_date.split('/')).join('-')
                } else if (moment(data.start_date[0]).format('Y-MM-DD') !== 'Invalid date') {
                    data.start_date = moment(data.start_date[0]).format('Y-MM-DD')
                } else {
                    data.start_date = ''
                }

                if (process.env.REACT_APP_AUTH_MODULE === 'artist') {
                    data.user_id = getUserData().id
                }
                if (formData.id) {
                    _editCampaign(
                        {
                            ...prevState,
                            ...data,
                            start_date: data.start_date,
                            tier_id: data.tier_id,
                            campaign_type_id: campaignType
                        },
                        () => {
                            successCallback()
                            _close()
                        },
                        (err) => {
                        }
                    )
                } else {
                    _addCampaign(
                        {
                            ...prevState,
                            ...data,
                            start_date: data.start_date,
                            tier_id: data.tier_id,
                            campaign_type_id: campaignType
                        },
                        () => {
                            successCallback()
                            _close()
                        },
                        (err) => {
                        }
                    )
                }
                return {
                    ...prevState,
                    ...data,
                    start_date: data.start_date,
                    tier_id: data.tier_id.value,
                    campaign_type_id: campaignType
                }
            })
        }
    }
    const minDate = new Date()
// add a day
    minDate.setDate(minDate.getDate())

    useEffect(() => {
        register('tier_id', {required: "Tier is required"})
        if (formData.tier_id > 0) {
            setValue('tier_id', formData.tier_id)
        }
    }, [])

    const [firstInit, setFirstInit] = useState(true)
    useEffect(() => {
        if (!firstInit) {
            setValue('tier_id', null)
        } else {
            setFirstInit(false)
        }
        _getAllTiers('', campaignType, (data) => {
            setTiers(data)
        })
    }, [campaignType])

    return (
        <Fragment>
            <div className='content-header'>
                <h5 className='mb-0'>Campaign Details</h5>
                {/*<small>Enter Your Social Links.</small>*/}
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                <Label className='form-label' for={`start_date`}>
                                    Select campaign start date <small className={'text-danger'}>*</small>
                                </Label>
                                <Controller
                                    id={'start_date'}
                                    as={Flatpickr}
                                    control={control}
                                    name={'start_date'}
                                    style={{backgroundColor:'transparent'}}
                                    className={classnames('form-control', {'is-invalid': errors[`start_date`]})}
                                    defaultValue={formData?.start_date ?? ''}
                                    options={{
                                        dateFormat: 'Y-m-d',
                                        minDate,
                                        disable: [
                                            function (date) {
                                                // return true to disable
                                                return (date.getDay() === 0 || date.getDay() === 6)
                                            }
                                        ]
                                    }}
                                    rules={{required: true}}
                                />
                                <ErrorMessages errors={errors} name={'start_date'}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                <Label className='form-label' for={`tier_id`}>
                                    Select your campaign tier <small className={'text-danger'}>*</small>
                                </Label>
                                <Row>
                                    {_.map(tiers, (x, index) => {
                                        return (
                                            <Col xs={4} key={index}>
                                                <Button block outline onClick={() => {
                                                    setFormData(prevState => ({
                                                        ...prevState,
                                                        tier_id: x.id
                                                    }))
                                                    setValue('tier_id', x.id)
                                                }} style={{
                                                    backgroundColor: formData?.tier_id === x.id ? 'rgba(29,8,215,0.12)' : 'transparent',
                                                    height: 100
                                                }}>
                                                    <Label className={'d-inline-bloc'}>
                                                        <span
                                                            className={'w-100 d-flex justify-content-center text-center'}>{x.name}</span>
                                                        <br/>
                                                        <span
                                                            className={'w-100 d-flex justify-content-center text-center'}><span
                                                            className={'text-primary'}>Budget : </span> ${x.price}</span>
                                                        <br/>
                                                        <span
                                                            className={'w-100 d-flex justify-content-center text-center'}>{x.description}</span>
                                                    </Label>
                                                </Button>
                                            </Col>
                                        )
                                    })}
                                </Row>
                                <ErrorMessages errors={errors} name={'tier_id'}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className={'mb-1'}>
                            <FormGroup>
                                {/*<Controller*/}
                                {/*    control={control}*/}
                                {/*    as={Input}*/}
                                {/*    type="textarea"*/}
                                {/*    name={`pitch`}*/}
                                {/*    id={`pitch`}*/}
                                {/*    defaultValue={formData.pitch}*/}
                                {/*    rules={{ required: true }}*/}
                                {/*    className={classnames({ 'is-invalid': errors[`pitch`] })}*/}
                                {/*/>*/}
                                <div className='form-label-group mb-0 mt-1'>
                                    <Input
                                        type='textarea'
                                        name='pitch'
                                        id='pitch'
                                        innerRef={register({max: 140})}
                                        rows='3'
                                        value={pitch}
                                        placeholder={'Write a brief description about your song here....'}
                                        onChange={e => {
                                            setValue('pitch', e.target.value)
                                            setPitch(e.target.value)
                                        }}
                                    />
                                    <Label>Pitch</Label>
                                </div>
                                <span
                                    className={classnames('textarea-counter-value float-right', {
                                        'bg-danger': pitch?.length > 140
                                    })}
                                >
                                  {`${pitch?.length ?? 0}/140`}
                                </span>
                                <ErrorMessages valErrors={valErrors} errors={errors} name={'pitch'}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Container>
                <div className='d-flex justify-content-between'>
                    <Button.Ripple color='primary' className='btn-prev' outline onClick={() => stepper.previous()}>
                        <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                        <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                    </Button.Ripple>
                    <Button.Ripple type='submit' color='success' className='btn-submit' disabled={loading}>
                        {loading ? <ButtonSpinner/> : null}
                        <span>Submit</span>
                    </Button.Ripple>
                </div>
            </Form>
        </Fragment>
    )
}

export default CampaignDetails
