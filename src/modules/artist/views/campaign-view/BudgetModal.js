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
  InputGroupAddon, InputGroup, InputGroupText, Col, CustomInput, Container, Row, Card, CardBody, Badge
} from 'reactstrap'
import _ from "lodash"

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import {useTrans} from '@hooks/useTrans'
import {_getAllRolesWithQ} from '@modules/rolespermissions'

import {
  _addAdmin,
  _addGenre,
  _editAdminInfo,
  _editGenre,
  _getAllResponsiblesWithQ,
  _storeCampaignBudget
} from "../../redux/actions"
import AsyncSelect from "react-select/async"
import PasswordStrengthBar from "react-password-strength-bar"

const BasicInfoModal = (props) => {

  const loading = useSelector(state => state.app.loading)
  const { errors, handleSubmit, control, getValues, setValue, register } = useForm()
  const [isEditAction, setIsEditAction] = useState(props.data.id)
  const [open, setOpen] = useState(true)
  const [valErrors, setValErrors] = useState({})
  const [budget, setBudget] = useState(_.get(props, 'data.budget') ?? 0)
  const [number_of_influencers, setNumber_of_influencers] = useState(_.get(props, 'data.number_of_influencers') ?? 0)
  const [base_fees, setBase_fees] = useState(_.get(props, 'data.base_fees') ?? 0)
  const [commission_fees, setCommission_fees] = useState(_.get(props, 'data.commission_fees') ?? 0)

  const _close = () => {
    setOpen(false)
    props.onClose()
  }

  const onSubmit = (data) => {
    if (!_.isEmpty(errors)) {
      return
    }
    setValErrors({})
    _storeCampaignBudget(
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
      className='modal-lg modal-dialog-centered'
      contentClassName='p-0'
      modalClassName=''
    >
      <Form action='/' className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={_close} className='mb-1'>
          Budget
        </ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
          <Container>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <Label className='form-label' for='budget'>
                    Campaign Amount
                  </Label>
                  <Input
                      innerRef={register({
                        required: trans('user.validation.required')
                      })}
                      autoFocus
                      type='number'
                      id='budget'
                      name='budget'
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className={classnames({ 'is-invalid': errors['budget'] || _.get(valErrors, 'budget')})}
                  />
                  <ErrorMessages valErrors={valErrors} errors={errors} name={'budget'} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <FormGroup>
                  <Label className='form-label' for='number_of_influencers'>
                    Number of Influencers
                  </Label>
                  <Input
                      innerRef={register({
                        required: trans('user.validation.required')
                      })}
                      type='number'
                      id='number_of_influencers'
                      name='number_of_influencers'
                      value={number_of_influencers}
                      onChange={(e) => setNumber_of_influencers(Number(e.target.value))}
                      className={classnames({ 'is-invalid': errors['number_of_influencers'] || _.get(valErrors, 'number_of_influencers')})}
                  />
                  <ErrorMessages valErrors={valErrors} errors={errors} name={'number_of_influencers'} />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <Label className='form-label' for='base_fees'>
                    Base Fees
                  </Label>
                  <Input
                      innerRef={register({
                        required: trans('user.validation.required'),
                        max: {
                          value:(val) => Math.floor(budget / number_of_influencers),
                          message: `Base fees shouldn't be greater than $${Math.floor(budget / number_of_influencers)}`
                        },
                        validate: {
                          min: val => val > 0 || 'Base fees should be greater than $0'
                        }
                      })}
                      type='number'
                      id='base_fees'
                      name='base_fees'
                      value={base_fees}
                      onChange={(e) => setBase_fees(Number(e.target.value))}
                      className={classnames({ 'is-invalid': errors['base_fees'] || _.get(valErrors, 'base_fees')})}
                  />
                  <ErrorMessages valErrors={valErrors} errors={errors} name={'base_fees'} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <Label className='form-label' for='commission_fees'>
                    Liberty Commission Fees(%)
                  </Label>
                  <Input
                      innerRef={register({
                        required: trans('user.validation.required'),
                        min: 0
                      })}
                      type='number'
                      id='commission_fees'
                      name='commission_fees'
                      value={commission_fees}
                      onChange={(e) => setCommission_fees(Number(e.target.value))}
                      className={classnames({ 'is-invalid': errors['commission_fees'] || _.get(valErrors, 'commission_fees')})}
                  />
                  <ErrorMessages valErrors={valErrors} errors={errors} name={'commission_fees'} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <Row>
                      <Col className={'mb-25'} sm={6} md={3}>
                        <Badge className={'w-100 p-1'} color={'light-secondary'}>
                          Total Amount
                          <p className={'mb-0'}>{budget ? `$${Math.ceil(budget + (budget * (commission_fees / 100)))}` : `$0`}</p>
                        </Badge>
                      </Col>
                      <Col className={'mb-25'} sm={6} md={3}>
                        <Badge className={'w-100 p-1'} color={'light-secondary'}>
                          Campaign Amount
                          <p className={'mb-0'}>{budget}</p>
                        </Badge>
                      </Col>
                      <Col className={'mb-25'} sm={6} md={3}>
                        <Badge className={'w-100 p-1'} color={'light-secondary'}>
                          Each Campaign
                          <p className={'mb-0'}>{budget && number_of_influencers ? Math.floor(budget / number_of_influencers) : 0}</p>
                        </Badge>
                      </Col>
                      <Col className={'mb-25'} sm={6} md={3}>
                        <Badge className={'w-100 p-1'} color={'light-secondary'}>
                          Performance Fees
                          <p className={'mb-0'}>{budget && number_of_influencers ? `$${Math.floor(budget / number_of_influencers) - base_fees}` : '$0'}</p>
                        </Badge>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
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

