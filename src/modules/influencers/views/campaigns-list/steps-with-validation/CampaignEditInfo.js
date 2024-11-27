import * as yup from 'yup'
import React, {Fragment, useEffect, useState} from 'react'
import classnames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import {Form, Label, Input, FormGroup, Row, Col, Button, Container, CustomInput} from 'reactstrap'
import _ from "lodash"
import AsyncSelect from "react-select/async"
import Flatpickr from "react-flatpickr"
import moment from "moment/moment"
import {useSelector} from "react-redux"

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'

import {_checkUriUrl, _getAllGenresWithQ, _getAllLanguagesWithQ} from "../../../redux/actions"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import {_getAllAdminsWithQ} from "../../../../artist/redux/actions"

const CampaignEditInfo = ({ stepper, type, formState }) => {
    const { register, errors, handleSubmit, trigger, control, setValue, getValues, setError, clearErrors } = useForm()
    const  {campaignType, formData, setFormData} = formState
    const loading = useSelector(state => state.app.loading)
    const [linkError, setLinkError] = useState(false)
    //const campain_status = ['Pending', 'Pending for Approval', 'Approved', 'Declined', 'Deleted', 'Pending for Publishing', 'Published']
    const campain_status = [
        {
            value: 1,
            label: 'Pending'
        },
        {
            value: 2,
            label: 'Pending for Approval'
        },
        {
            value: 3,
            label: 'Approved'
        },
        {
            value: 4,
            label: 'Declined'
        },
        {
            value: 5,
            label: 'Deleted'
        },
        {
            value: 6,
            label: 'Pending for Publishing'
        },
        {
            value: 7,
            label: 'Published'
        }
    ]
    // const returncampainstatus = async () => {
    //     return _.map(campain_status, (v, k) => {
    //         console.log(v)
    //         return {value: v.value, label: v.label}
    //     })
    // }
    const onSubmit = (data) => {
        trigger()
        if (_.isEmpty(errors)) {
            data.admin_ids = _.map(data.admin_ids, x => x.value)
            setFormData(prevState => {
                if (typeof data.publish_date === 'string') {
                    data.publish_date = data.publish_date
                } else if (moment(data.publish_date[0]).format('Y-MM-DD') !== 'Invalid date') {
                    data.publish_date = moment(data.publish_date[0]).format('Y-MM-DD')
                } else {
                    data.publish_date = ''
                }
                return {
                    ...prevState,
                    ...data,
                    status: data.status.value,
                    publish_date:data.publish_date,
                    auditing_days: data.auditing_days,
                    playlist_submission_days: data.playlist_submission_days,
                    on_going_days: data.on_going_days,
                    admin_ids: data.admin_ids
                }
            })
            stepper.next()
        }
    }
    const minDate = new Date()
// add a day
    minDate.setDate(minDate.getDate() - 1)
    //console.log(campain_status)
    return (
        <Fragment>
            <div className='content-header'>
                <h5 className='mb-0'>Campaign Setting </h5>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <Label className='form-label' for={`playlist_submission_days`}>
                                     <span>Playlist Submission Days <small className={'text-danger'}>*</small></span>
                                </Label>
                                <Controller
                                    control={control}
                                    as={Input}
                                    name={`playlist_submission_days`}
                                    type={'number'}
                                    id={`playlist_submission_days`}
                                    defaultValue={formData.id > 0 ? formData.playlist_submission_days : 3}
                                    className={classnames({ 'is-invalid': errors[`playlist_submission_days`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <Label className='form-label' for={`on_going_days`}>
                                    <span>On Going Days <small className={'text-danger'}>*</small></span>                                </Label>
                                <Controller
                                    control={control}
                                    as={Input}
                                    name={`on_going_days`}
                                    type={'number'}
                                    id={`on_going_days`}
                                    defaultValue={formData.id > 0 ? formData.on_going_days : 28}
                                    className={classnames({ 'is-invalid': errors[`on_going_days`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <Label className='form-label' for={`auditing_days`}>
                                    <span>Auditing Days <small className={'text-danger'}>*</small></span>                                </Label>
                                <Controller
                                    control={control}
                                    as={Input}
                                    type={'number'}
                                    name={`auditing_days`}
                                    id={`auditing_days`}
                                    defaultValue={formData.id > 0 ? formData.auditing_days : 3}
                                    className={classnames({ 'is-invalid': errors[`auditing_days`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <Label className='form-label' for={`publish_date`}>
                                Publish Date
                            </Label>
                            <Controller
                              id={'publish_date'}
                              as={Flatpickr}
                              control={control}
                              readOnly={true}
                              name={'publish_date'}
                              disabled={formData.id > 0 ? '' : 'disabled'}
                              className={classnames('form-control', { 'is-invalid': errors[`publish_date`] })}
                              defaultValue={formData.publish_date}
                            />
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <Label className='form-label' for={`status`}>
                                    Status
                                </Label>
                                <Controller
                                    as={AsyncSelect}
                                    control={control}
                                    name={'status'}
                                    isClearable={false}
                                    isMulti={false}
                                    classNamePrefix='select'
                                    defaultOptions
                                    cacheOptions
                                    loadOptions={async () => campain_status}
                                    defaultValue={formData.status}
                                    isDisabled={!((formData.id > 0))}
                                    className={classnames('react-select', { 'is-invalid': errors['status']})}
                                    style={{zIndex: 2}}
                                />

                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                        <FormGroup>
                            <Label className='form-label' for={`admin_ids`}>
                                Select your Admins
                            </Label>
                            <Controller
                                as={AsyncSelect}
                                control={control}
                                name={'admin_ids'}
                                isClearable={false}
                                isMulti={true}
                                defaultOptions
                                cacheOptions
                                loadOptions={_getAllAdminsWithQ}
                                classNamePrefix='select'
                                className={classnames('react-select', { 'is-invalid': errors['admin_ids']})}
                                defaultValue={formData.admin_ids}
                            />
                        </FormGroup>
                        </Col>
                    </Row>
                </Container>
                <div className='d-flex justify-content-between'>
                    <Button.Ripple color='primary' className='btn-prev' outline onClick={() => stepper.previous()}>
                        <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                        <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                    </Button.Ripple>
                    <Button.Ripple type='submit' color='primary' className='btn-next' disabled={loading}>
                        { loading ? <ButtonSpinner/> : null}
                        <span className='align-middle d-sm-inline-block d-none'>Next</span>
                        <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
                    </Button.Ripple>
                </div>
            </Form>
        </Fragment>
    )
}

export default CampaignEditInfo
