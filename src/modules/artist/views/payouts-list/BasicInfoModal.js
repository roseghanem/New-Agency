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

import {_payInvoice, _payPayout} from "../../redux/actions"
import AsyncSelect from "react-select/async"
import PasswordStrengthBar from "react-password-strength-bar"

const BasicInfoModal = (props) => {

  const loading = useSelector(state => state.app.loading)
  const { errors, handleSubmit, control, getValues, setValue, register } = useForm()
  const [isEditAction, setIsEditAction] = useState(props.data.id)
  const [open, setOpen] = useState(true)
  const [valErrors, setValErrors] = useState({})

  const _close = () => {
    setOpen(false)
    props.onClose()
  }

  const onSubmit = (data) => {
    if (!_.isEmpty(errors)) {
      return
    }
    setValErrors({})
    _payPayout(
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
          Pay Invoice Manually
        </ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
          <FormGroup>
            <Label className='form-label' for='payer_email'>
                Payer Email
            </Label>
            <Controller
              as={Input}
              control={control}
              autoFocus
              type='email'
              id='payer_email'
              name='payer_email'
              rules={{
                required: trans('user.validation.required')
              }}
              defaultValue={_.get(props, 'data.payer_email') ?? ''}
              className={classnames({ 'is-invalid': errors['payer_email'] || _.get(valErrors, 'payer_email')})}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'payer_email'} />
          </FormGroup>
          <FormGroup>
            <Label className='form-label' for='payer_firstname'>
                Payer first name
            </Label>
            <Controller
              as={Input}
              control={control}
              type='text'
              id='payer_firstname'
              name='payer_firstname'
              rules={{
                required: trans('user.validation.required')
              }}
              defaultValue={_.get(props, 'data.payer_firstname') ?? ''}
              className={classnames({ 'is-invalid': errors['payer_firstname'] || _.get(valErrors, 'payer_firstname')})}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'payer_firstname'} />
          </FormGroup>
          <FormGroup>
            <Label className='form-label' for='payer_surname'>
                Payer surname
            </Label>
            <Controller
              as={Input}
              control={control}
              type='text'
              id='payer_surname'
              name='payer_surname'
              rules={{
                required: trans('user.validation.required')
              }}
              defaultValue={_.get(props, 'data.payer_surname') ?? ''}
              className={classnames({ 'is-invalid': errors['payer_surname'] || _.get(valErrors, 'payer_surname')})}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'payer_surname'} />
          </FormGroup>
          <FormGroup>
            <Label className='form-label' for='transaction_id'>
                Transaction ID
            </Label>
            <Controller
              as={Input}
              control={control}
              type='text'
              id='transaction_id'
              name='transaction_id'
              rules={{
                required: trans('user.validation.required')
              }}
              defaultValue={_.get(props, 'data.transaction_id') ?? ''}
              className={classnames({ 'is-invalid': errors['transaction_id'] || _.get(valErrors, 'transaction_id')})}
            />
            <ErrorMessages valErrors={valErrors} errors={errors} name={'num'} />
          </FormGroup>
          <FormGroup>
            <Label className='form-label' for='attachment_link'>
                Attachment
            </Label>
            <CustomInput
                type='file'
                id='attachment_link'
                name='attachment_link'
                accept="*"
                innerRef={register()}
            />
            {/*<ErrorMessages valErrors={valErrors} errors={errors} name={'payer_surname'} />*/}
          </FormGroup>
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

