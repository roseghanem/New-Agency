import React, {useState} from 'react'
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
  InputGroupAddon, InputGroup, InputGroupText, Col, CustomInput
} from 'reactstrap'
import _ from "lodash"

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import {useTrans} from '@hooks/useTrans'
import {_getAllRolesWithQ} from '@modules/rolespermissions'

import {_addAdmin, _editAdminInfo, _getAllResponsiblesWithQ} from "../../redux/actions"
import AsyncSelect from "react-select/async"
import PasswordStrengthBar from "react-password-strength-bar"
import PhoneInput from "react-phone-input-2"

const BasicInfoModal = (props) => {

  const loading = useSelector(state => state.app.loading)
  const { errors, handleSubmit, control, getValues, setValue, register } = useForm()
  const [isEditAction, setIsEditAction] = useState(props.data.id)
  const [open, setOpen] = useState(true)
  const [valErrors, setValErrors] = useState({})
  const strongPasswordRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
  const [password, setPassword] = useState('')
  const [twoFactorCheck, setTwoFactorCheck] = useState(_.get(props, 'data.two_fa') ?? false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(_.get(props, 'data.is_super_admin') ?? false)
  const [phone, setPhone] = useState(_.get(props, 'data.phone_number', ''))

  const _close = () => {
    setOpen(false)
    props.onClose()
  }

  const onSubmit = (data) => {
    if (!_.isEmpty(errors)) {
      return
    }
    setValErrors({})
    if (_.isEmpty(data.password)) {
      delete data.password
    }
    data.phone_number = phone
    if (data.role_id) {
      data.role_id = data.role_id.value
    }
    data.two_fa = twoFactorCheck
    data.is_super_admin = isSuperAdmin
    if (isEditAction) {
      _editAdminInfo(
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
      _addAdmin(
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
      className='sidebar-lg'
      contentClassName='p-0'
      modalClassName='modal-slide-in sidebar-todo-modal'
    >
      <Form action='/' className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={_close} className='mb-1'>
          {trans(isEditAction ? 'user.actions.editAdmin' : 'user.actions.addAdmin')}
        </ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
          <FormGroup>
            <Label className='form-label' for='name'>
              {trans('user.name')}
            </Label>
            <Controller
              as={Input}
              control={control}
              autoFocus
              type='text'
              placeholder='John'
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
          <FormGroup>
            <Label className='form-label' for='password'>
              {trans('user.password')}
            </Label>
            <Input
              type='password'
              id='new-password'
              name='password'
              placeholder={useTrans('user.password')}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setValue('password', e.target.value)
              }}
              innerRef={register({
                validate: {
                  required: value => (isEditAction || value.length > 0) || trans('user.validation.required'),
                  strong: value => ((isEditAction && value.length === 0) || strongPasswordRegExp.test(value)) || trans('user.validation.weakPassword')
                }
              })}
              className={classnames({ 'is-invalid': errors['password'] || _.get(valErrors, 'password') })}
            />
            <PasswordStrengthBar
                password={password}
                scoreWords={["Too Weak", "Weak", "Not Enough", "Good", "Strong"]}
                shortScoreWord={"Empty"}
                minLength={1}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'password'} />
          </FormGroup>
          <FormGroup>
            <Label className='form-label' for='phone_number'>
              {trans('user.mobile')}
            </Label>

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
            {/*    as={Cleave}*/}
            {/*    id='phone_number'*/}
            {/*    name='phone_number'*/}
            {/*    control={control}*/}
            {/*    className={'form-control'}*/}
            {/*    defaultValue={_.get(props, 'data.phone_number') ? _.get(props, 'data.phone_number') : ''}*/}
            {/*    placeholder='+1 234 567 8900'*/}
            {/*    options={{ phone: true, phoneRegionCode: 'LB' }}*/}
            {/*    rules={{*/}
            {/*    required: trans('user.validation.required')*/}
            {/*  }}*/}
            {/*  />*/}
            {/*</InputGroup>*/}
            <ErrorMessages valErrors={valErrors} errors={errors} name={'phone_number'} />
          </FormGroup>
          <FormGroup>
            <CustomInput
                type='checkbox'
                id='two_fa'
                name='two_fa'
                checked={twoFactorCheck}
                onChange={e => setTwoFactorCheck(e.target.checked)}
                label={'Enable Two factor Authentication '}
            />
          </FormGroup>
          <FormGroup>
            <CustomInput
                type='checkbox'
                id='is_super_admin'
                name='is_super_admin'
                checked={isSuperAdmin}
                onChange={e => setIsSuperAdmin(e.target.checked)}
                label={'Set As Super Admin'}
            />
          </FormGroup>
          {_.get(props, 'data.id') !== 1 &&
            <FormGroup>
              <Label className='form-label' for='role_id'>
                {trans('user.role')}
              </Label>
              <Controller
                as={AsyncSelect}
                control={control}
                name={'role_id'}
                isClearable={false}
                isMulti={false}
                classNamePrefix='select'
                defaultOptions
                cacheOptions
                loadOptions={_getAllRolesWithQ}
                className={classnames('react-select', { 'is-invalid': errors['role_id'] || _.get(valErrors, 'role_id') })}
                defaultValue={_.get(props, 'data.role_id') ? {label: _.get(props, 'data.role_name').replace("_", " "), value: _.get(props, 'data.role_id')} : ''}
                rules={{
                  required: trans('user.validation.required')
                }}
              />
              <ErrorMessages valErrors={valErrors} errors={errors} name={'role_id'} />
            </FormGroup>
          }
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

