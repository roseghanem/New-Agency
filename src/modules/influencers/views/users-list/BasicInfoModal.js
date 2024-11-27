import React, {useEffect, useState} from 'react'
import classnames from 'classnames'
import {Controller, useForm} from 'react-hook-form'
import { useSelector } from 'react-redux'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import {
  FormGroup,
  Label,
  Button,
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroupAddon, InputGroup, InputGroupText, Col, CustomInput, Row
} from 'reactstrap'
import _ from "lodash"

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import {useTrans} from '@hooks/useTrans'
import UploadProfileImage from "@fwsrc/components/UploadProfileImage"

import {
  _addUser,
  _editUser, _getAllGenresWithQ, _getAllTiersWithQ, _getAllUserTypesWithQ
} from "../../redux/actions"
import AsyncSelect from "react-select/async"
import PasswordStrengthBar from "react-password-strength-bar"
import PhoneInput from "react-phone-input-2"

const BasicInfoModal = (props) => {

  const loading = useSelector(state => state.app.loading)
  const { errors, handleSubmit, control, getValues, setValue, register, watch } = useForm()
  const [isEditAction, setIsEditAction] = useState(props.data.id)
  const [open, setOpen] = useState(true)
  const [valErrors, setValErrors] = useState({})
  const [phone, setPhone] = useState(_.get(props, 'data.phone_number', ''))

  const watchAllFields = watch()

  const _close = () => {
    setOpen(false)
    props.onClose()
  }

  const onSubmit = (data) => {
    if (!_.isEmpty(errors)) {
      return
    }
    setValErrors({})
    data.user_type_id = data.user_type_id?.value
    data.tier_id = data.tier_id?.value
    data.genre_ids = _.map(data.genre_ids, x => x.value)
    data.phone_number = phone
    if (isEditAction) {
      _editUser(
        {id:props.data.id, ...data},
        () => {
          props.successCallback()
          _close()
        },
        (err) => {
          if (err) {
            const arr = {}
            for (const f in err) {
              if (err[f] !== null) arr[f] = err[f][0]
            }
            setValErrors(arr)
          }
        }
      )
    } else {
      _addUser(
        data,
        () => {
          props.successCallback()
          _close()
        },
        (err) => {
          if (err) {
            const arr = {}
            for (const f in err) {
              if (err[f] !== null) arr[f] = err[f][0]
            }
            setValErrors(arr)
          }
        }
      )
    }
  }

  return (
    <Modal
      isOpen={open}
      toggle={_close}
      unmountOnClose={true}
      backdrop={true}
      className='modal-lg'
      contentClassName='p-0'
      modalClassName=''
    >
      <Form action='/' className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={_close} className='mb-1'>
          {isEditAction ? 'Edit User' : 'Add User'}
        </ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
          <FormGroup>
            <UploadProfileImage name={'image'} defaultValue={_.get(props, 'data.image')} register={register} setValue={setValue} rules={{type:['jpg', 'jpeg', 'png']}}/>
          </FormGroup>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <Label className='form-label' for='name'>
                  Name
                </Label>
                <Controller
                  as={Input}
                  control={control}
                  autoFocus
                  type='text'
                  id='name'
                  name='name'
                  rules={{
                    required: trans('user.validation.required')
                  }}
                  defaultValue={_.get(props, 'data.name') ?? ''}
                  className={classnames({ 'is-invalid': errors['name'] || _.get(valErrors, 'name')})}
                />
                <ErrorMessages valErrors={valErrors} errors={errors} name={'name'} />
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <Label className='form-label' for='email'>
                  {trans('user.email')}
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='email'
                    placeholder={useTrans('user.email')}
                    id='email'
                    name='email'
                    rules={{
                      required: trans('user.validation.required')
                    }}
                    defaultValue={_.get(props, 'data.email') ?? ''}
                    className={classnames({ 'is-invalid': errors['email'] || _.get(valErrors, 'email') })}
                />
                <ErrorMessages valErrors={valErrors} errors={errors} name={'email'} />
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                {/*<Label className='form-label' for='phone_number'>*/}
                {/*  {trans('user.mobile')}*/}
                {/*</Label>*/}
                <PhoneInput
                  placeholder="Phone Number"
                  country={"us"}
                  value={phone}
                  // onChange={(phone) => this.setState({ phone })}
                  onChange={(phone) => {
                    phone = `+${phone}`
                    setPhone(phone)
                  }}
                />
                {/*<InputGroup className='input-group-merge'>*/}
                {/*  /!*<InputGroupAddon addonType='prepend'>*!/*/}
                {/*  /!*  <InputGroupText*!/*/}
                {/*  /!*    className={''}*!/*/}
                {/*  /!*  >*!/*/}
                {/*  /!*    LB (+961)*!/*/}
                {/*  /!*  </InputGroupText>*!/*/}
                {/*  /!*</InputGroupAddon>*!/*/}
                {/*  <Controller*/}
                {/*      as={Cleave}*/}
                {/*      id='phone_number'*/}
                {/*      name='phone_number'*/}
                {/*      control={control}*/}
                {/*      className={'form-control'}*/}
                {/*      defaultValue={_.get(props, 'data.phone_number') ? _.get(props, 'data.phone_number') : ''}*/}
                {/*      placeholder='+1 234 567 8900'*/}
                {/*      options={{ phone: true, phoneRegionCode: 'LB' }}*/}
                {/*      rules={{*/}
                {/*        // required: trans('user.validation.required')*/}
                {/*      }}*/}
                {/*  />*/}
                {/*</InputGroup>*/}
                <ErrorMessages valErrors={valErrors} errors={errors} name={'phone_number'} />
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <Label className='form-label' for='user_type_id'>
                  User Type
                </Label>
                <Controller
                  as={AsyncSelect}
                  control={control}
                  name={'user_type_id'}
                  isClearable={false}
                  isMulti={false}
                  classNamePrefix='select'
                  defaultOptions
                  cacheOptions
                  loadOptions={_getAllUserTypesWithQ}
                  className={classnames('react-select', { 'is-invalid': errors['user_type_id'] || _.get(valErrors, 'user_type_id') })}
                  defaultValue={_.get(props, 'data.user_type_id') ? {label: _.get(props, 'data.user_type.name'), value: _.get(props, 'data.user_type.id')} : ''}
                  rules={{
                    required: trans('user.validation.required')
                  }}
                />
                <ErrorMessages valErrors={valErrors} errors={errors} name={'user_type_id'} />
              </FormGroup>
            </Col>
            {
              watchAllFields?.user_type_id?.value !== 1 && (
                <Col xs={6}>
                  <FormGroup>
                    <Label className='form-label' for='tier_id'>
                      Tier
                    </Label>
                    <Controller
                        as={AsyncSelect}
                        control={control}
                        name={'tier_id'}
                        isClearable={false}
                        isMulti={false}
                        classNamePrefix='select'
                        defaultOptions
                        cacheOptions
                        loadOptions={_getAllTiersWithQ}
                        className={classnames('react-select', { 'is-invalid': errors['tier_id'] || _.get(valErrors, 'tier_id') })}
                        defaultValue={_.get(props, 'data.tier_id') ? {label: _.get(props, 'data.tier.name'), value: _.get(props, 'data.tier.id')} : ''}
                        rules={{
                          required: trans('user.validation.required')
                        }}
                    />
                    <ErrorMessages valErrors={valErrors} errors={errors} name={'tier_id'} />
                  </FormGroup>
                </Col>
              )
            }
            <Col xs={6}>
              <FormGroup>
                <Label className='form-label' for='genre_ids'>
                  Genre
                </Label>
                <Controller
                    as={AsyncSelect}
                    control={control}
                    name={'genre_ids'}
                    isClearable={false}
                    isMulti={true}
                    classNamePrefix='select'
                    defaultOptions
                    cacheOptions
                    loadOptions={_getAllGenresWithQ}
                    className={classnames('react-select', { 'is-invalid': errors['genre_id'] || _.get(valErrors, 'genre_ids') })}
                    defaultValue={_.get(props, 'data.genres') ? _.map(_.get(props, 'data.genres'), x => ({label: x.name, value: x.id})) : ''}
                    rules={{
                      required: trans('user.validation.required')
                    }}
                />
                <ErrorMessages valErrors={valErrors} errors={errors} name={'genre_ids'} />
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <Label className='form-label' for='spotify_link'>
                  Spotify Link
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='text'
                    id='spotify_link'
                    name='spotify_link'
                    rules={{
                      // required: trans('user.validation.required')
                    }}
                    defaultValue={_.get(props, 'data.spotify_link') ?? ''}
                    className={classnames({ 'is-invalid': errors['spotify_link'] || _.get(valErrors, 'spotify_link')})}
                />
                <ErrorMessages valErrors={valErrors} errors={errors} name={'spotify_link'} />
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <Label className='form-label' for='instagram_link'>
                  Instagram Link
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='text'
                    id='instagram_link'
                    name='instagram_link'
                    rules={{
                      // required: trans('user.validation.required')
                    }}
                    defaultValue={_.get(props, 'data.instagram_link') ?? ''}
                    className={classnames({ 'is-invalid': errors['instagram_link'] || _.get(valErrors, 'instagram_link')})}
                />
                <ErrorMessages valErrors={valErrors} errors={errors} name={'instagram_link'} />
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <Label className='form-label' for='facebook_link'>
                  Facebook Link
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='text'
                    id='facebook_link'
                    name='facebook_link'
                    rules={{
                      // required: trans('user.validation.required')
                    }}
                    defaultValue={_.get(props, 'data.facebook_link') ?? ''}
                    className={classnames({ 'is-invalid': errors['facebook_link'] || _.get(valErrors, 'facebook_link')})}
                />
                <ErrorMessages valErrors={valErrors} errors={errors} name={'facebook_link'} />
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <Label className='form-label' for='twitter_link'>
                  Twitter Link
                </Label>
                <Controller
                    as={Input}
                    control={control}
                    type='text'
                    id='twitter_link'
                    name='twitter_link'
                    rules={{
                      // required: trans('user.validation.required')
                    }}
                    defaultValue={_.get(props, 'data.twitter_link') ?? ''}
                    className={classnames({ 'is-invalid': errors['twitter_link'] || _.get(valErrors, 'twitter_link')})}
                />
                <ErrorMessages valErrors={valErrors} errors={errors} name={'twitter_link'} />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className='justify-content-center'>
          <Button.Ripple type='submit' className='flex-grow-1' color='primary' disabled={loading}>
            { loading ? <ButtonSpinner/> : null}
            <span>{trans('gen.actions.save')}</span>
          </Button.Ripple>
          <Button.Ripple type='button' className='flex-grow-1' color='secondary' disabled={loading} onClick={_close}>
            <span>{trans('gen.actions.cancel')}</span>
          </Button.Ripple>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default BasicInfoModal

