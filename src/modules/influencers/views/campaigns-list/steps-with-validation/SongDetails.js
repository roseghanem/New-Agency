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

const SongDetails = ({ stepper, type, formState }) => {
  const { register, errors, handleSubmit, trigger, control, setValue, getValues, setError, clearErrors } = useForm()
  const  {campaignType, formData, setFormData} = formState
  const loading = useSelector(state => state.app.loading)

  const [released, setReleased] = useState(formData?.is_released)
  const [linkError, setLinkError] = useState(false)
  const [scrapeMsg, setScrapeMsg] = useState('')

  const onSubmit = (data) => {
    trigger()
    if (_.isEmpty(errors)) {
      setFormData(prevState => {
        if (typeof data.released_date === 'string') {
          data.released_date = data.released_date
        } else if (moment(data.released_date[0]).format('Y-MM-DD') !== 'Invalid date') {
          data.released_date = moment(data.released_date[0]).format('Y-MM-DD')
        } else {
          data.released_date = ''
        }
        return {
        ...prevState,
        ...data,
            language_id: data.language_id.value,
            is_released: released,
            released_date:data.released_date,
            genre_ids: _.map(data.genre_ids, x => x.value)
        }
      })
      stepper.next()
    }
  }
  function changeState(isreleased) {

    setFormData(prevState => (
      {
        ...prevState,
        media_link:'',
        released_date:'',
        link:'',
        name:'',
        language_id: [],
        genre_ids: []
      }
    ))
    setValue('media_link', '')
    setValue('released_date', '')
    setValue('link', '')
    setValue('name', '')
    setValue('language_id', '')
    setValue('genre_ids', '')

if (isreleased === 1) {
  setReleased(1)

} else {
  setReleased(0)
}

  }

  const minDate = new Date()
// add a day
  minDate.setDate(minDate.getDate() - 1)
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Song Details</h5>
        <small className='text-muted'>Enter Your Song Details.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <Label className='form-label'>
                  Song released?
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row className={'mb-1'}>
            <Col xs={6}>
              <Button block outline onClick={() => changeState(1)} style={{backgroundColor: released ? 'rgba(115, 103, 240, 0.12)' : 'transparent'}}>
                Yes, Released
              </Button>
            </Col>
            <Col xs={6}>
              <Button block outline onClick={() => changeState(0)} style={{backgroundColor: !released ? 'rgba(115, 103, 240, 0.12)' : 'transparent'}}>
                No, Not yet
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <Label className='form-label' for={`link`}>
                  {campaignType === 1 ? 'Spotify' : 'Campaign'} Link {released ? 'URL' : 'URI'}
                </Label>
                <Input
                    innerRef={register({required: true, validate: val => !linkError || 'Link Is Wrong'})}
                    name={`link`}
                    id={`link`}
                    defaultValue={formData?.link}
                    // valid={!linkError}
                    // invalid={linkError}
                  onFocus={() => setLinkError(false)}
                    className={classnames({ 'is-invalid': errors[`link`] || linkError, 'is-valid': !errors[`link`] && !linkError && (getValues('link') && getValues('link')?.length > 0) })}
                    onBlur={e => {
                      if (campaignType === 1 && released) {
                        _checkUriUrl(
                            e.target.value,
                            (data) => {
                              if (data.code === 1 && data.other && data.other?.album) {
                                setValue('name', data.other.name)
                                setValue('released_date', data.other.album.release_date)
                                setLinkError(false)
                                setScrapeMsg("")
                                trigger()
                              } else {
                                setValue('name', '')
                                setValue('released_date', '')
                                setLinkError(true)
                                setScrapeMsg('Not A valid Track')
                                trigger()
                              }
                            }
                        )
                      } else {
                        setLinkError(false)
                      }
                    }}
                />
                <ErrorMessages errors={errors} name={'link'} />
                <small className={'text-danger'}>{scrapeMsg}</small>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <Label className='form-label' for={`name`}>
                  {campaignType === 1 ? <span>Song Name {!released && <small className={'text-danger'}>*</small>}</span> : <span>Video Name <small className={'text-danger'}>*</small></span>}
                </Label>
                <Controller
                    control={control}
                    readOnly={campaignType === 1 && released}
                    as={Input}
                    name={`name`}
                    id={`name`}
                    defaultValue={formData?.name}
                    rules={{ required: !released }}
                    className={classnames({ 'is-invalid': errors[`name`] })}
                />
              </FormGroup>
            </Col>
            <Col xs={6} style={{zIndex:99}}>
              <FormGroup>
                <Label className='form-label' for={`language_id`}>
                  Song Language
                </Label>
                <Controller
                    as={AsyncSelect}
                    control={control}
                    name={'language_id'}
                    isClearable={false}
                    isMulti={false}
                    classNamePrefix='select'
                    defaultOptions
                    cacheOptions
                    loadOptions={_getAllLanguagesWithQ}
                    className={classnames('react-select', { 'is-invalid': errors['language_id']})}
                    defaultValue={formData?.language_id}
                    rules={{
                      required: trans('user.validation.required')
                    }}
                />
              </FormGroup>
            </Col>
          </Row>
          {
              !released && (
                  <Row>
                    <Col xs={12}>
                      <FormGroup>
                        <Label className='form-label' for={`media_link`}>
                          Upload your song file
                        </Label>
                        <CustomInput
                            type='file'
                            id='media_link'
                            name='media_link'
                            accept=".mp3,.mp4"
                            innerRef={register({ required: !released && !formData.media_link })}
                            style={{zIndex:1}}
                        />
                        <Label className={classnames('form-label', {'text-danger': errors[`media_link`]})} for={`media_link`}>
                          Please upload an mp3/mp4 file with 50Mb maximum {formData.media_link && `(If you don't want to change file then leave it)`}
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
              )
          }
          <Row>
            <Col xs={12}>
              <FormGroup>
                <Label className='form-label' for={`released_date`}>
                  Released Date {!released && <small className={'text-danger'}>*</small>}
                </Label>
                {
                    campaignType === 1 ? (
                        released ? (
                            <Controller
                                key={`released_date${released}`}
                                id={'released_date'}
                                as={Input}
                                control={control}
                                readOnly={true}
                                name={'released_date'}
                                className={classnames('form-control', { 'is-invalid': errors[`released_date`] })}
                                defaultValue={formData.released_date}
                                rules={{ required: true }}
                            />
                        ) : (
                            <Controller
                                key={`released_date${released}`}
                                id={'released_date'}
                                as={Flatpickr}
                                control={control}
                                name={'released_date'}
                                className={classnames('form-control', { 'is-invalid': errors[`released_date`] })}
                                defaultValue={formData.released_date}
                                options={{
                                  dateFormat: 'Y-m-d',
                                  minDate
                                }}
                                rules={{ required: true }}
                            />
                        )
                    ) : (

                        <Controller
                            key={`released_date${released}`}
                            id={'released_date'}
                            as={Flatpickr}
                            control={control}
                            readOnly={campaignType === 1 && released}
                            name={'released_date'}
                            className={classnames('form-control', { 'is-invalid': errors[`released_date`] })}
                            defaultValue={formData.released_date}
                            options={{
                              dateFormat: 'Y-m-d'
                            }}
                            rules={{ required: true }}
                        />
                    )
                }
              </FormGroup>
            </Col>
          </Row>
          {campaignType === 1 && (
              <Row>
                <Col xs={12}>
                  <FormGroup>
                    <Label className='form-label' for={`genre_ids`}>
                      Genres <small className={'text-danger'}>*</small>
                    </Label>
                    <Controller
                        as={AsyncSelect}
                        control={control}
                        name={'genre_ids'}
                        isClearable={false}
                        isMulti={true}
                        defaultOptions
                        cacheOptions
                        loadOptions={_getAllGenresWithQ}
                        classNamePrefix='select'
                        className={classnames('react-select', { 'is-invalid': errors['genre_ids']})}
                        defaultValue={formData.genre_ids}
                        rules={{
                          required: campaignType === 1
                        }}
                        style={{zIndex:1}}
                    />
                  </FormGroup>
                </Col>
              </Row>
          )}
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

export default SongDetails
