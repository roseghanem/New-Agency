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
  Col,
  Container,
  Row
} from 'reactstrap'
import _ from "lodash"

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'

import {
  _editCampaign
} from "../../redux/actions"
import Flatpickr from "react-flatpickr"
import moment from "moment"

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
    if (data.start_date === _.get(props, 'data.start_date')) {
      data.start_date = _.reverse(data.start_date.split('/')).join('-')
    } else if (moment(data.start_date[0]).format('Y-MM-DD') !== 'Invalid date') {
      data.start_date = moment(data.start_date[0]).format('Y-MM-DD')
    } else {
      data.start_date = ''
    }
    _editCampaign(
        {
          id:props.data.id,
          ...data
        },
        () => {
          props.successCallback()
          _close()
        },
        (err) => {}
    )
  }
  const minDate = new Date()
  // add a day
  minDate.setDate(minDate.getDate() + 1)
  return (
    <Modal
      isOpen={open}
      toggle={_close}
      unmountOnClose={true}
      backdrop={true}
      className='modal-lg modal-dialog-centered'
      contentClassName='p-0'
      modalClassName=''
    >
      <Form action='/' className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={_close} className='mb-1'>
          Start Date
        </ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
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
                      className={classnames('form-control', { 'is-invalid': errors[`start_date`] })}
                      defaultValue={_.get(props, 'data.start_date') ?? ''}
                      options={{
                        dateFormat: 'Y-m-d',
                        minDate,
                        disable: [
                          function(date) {
                            // return true to disable
                            return (date.getDay() === 0 || date.getDay() === 6)
                          }
                        ]
                      }}
                      rules={{ required: true }}
                  />
                  <ErrorMessages errors={errors} name={'start_date'} />
                </FormGroup>
              </Col>
            </Row>
          </Container>
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

