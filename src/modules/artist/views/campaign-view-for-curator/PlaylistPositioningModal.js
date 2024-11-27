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
  InputGroupAddon, InputGroup, InputGroupText, Col, CustomInput, Container, Row, Card, CardBody, Badge, Table
} from 'reactstrap'
import _ from "lodash"
import AsyncSelect from "react-select/async"
import moment from "moment/moment"

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import {useTrans} from '@hooks/useTrans'
import {_getAllRolesWithQ} from '@modules/rolespermissions'

const PlaylistSubmissionModal = (props) => {

  const loading = useSelector(state => state.app.loading)
  const { errors, handleSubmit, control, getValues, setValue, register } = useForm()
  const [isEditAction, setIsEditAction] = useState(props.data.id)
  const [open, setOpen] = useState(true)
  const [valErrors, setValErrors] = useState({})

  const _close = () => {
    setOpen(false)
    props.onClose()
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
      <ModalHeader toggle={_close} className='mb-1'>
        Position History
      </ModalHeader>
      <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
        <Container>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <Label className='form-label text-center'>
                  {props.data.campaign.campaign_type_id === 1 ? <span className={'font-weight-bolder'}>Playlist Name</span> : <span className={'font-weight-bolder'}>Influencer Name</span>} : {_.get(props, 'data.playlist_name')}
                </Label>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <Label className='form-label text-center'>
                  {props.data.campaign.campaign_type_id === 1 ? <span className={'font-weight-bolder'}>Playlist URL</span> : <span className={'font-weight-bolder'}>TikTok URL</span>} : <a href={_.get(props, 'data.playlist_url')}>URL</a>
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Table>
            <thead>
            <tr>
              <th>#</th>
              <th>{props.data.campaign.campaign_type_id === 1 ? 'Current Position' : 'Currently Placed'}</th>
              <th>{props.data.campaign.campaign_type_id === 1 ? 'Streams' : 'Views '}</th>
              <th>Followers</th>
              <th className={'text-nowrap'}>At</th>
            </tr>
            </thead>
            <tbody>
            {
              _.map(props.data.positions, (x, i) => {
                return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{props.data.campaign.campaign_type_id === 1 ? x.current_position : (x.current_position > 0 ? 'Yes' : 'No')}</td>
                      <td>{x.number_of_views}</td>
                      <td>{x.followers}</td>
                      <td className={'text-nowrap'}>{moment(x.created_at).format('DD-MM-Y')}</td>
                    </tr>
                )
              })
            }
            </tbody>
            <tfoot>
            {props.data.positions.length > 0 && (
                <tr>
                  <th>Average: </th>
                  <th>{props.data.campaign.campaign_type_id === 1 ? _.mean(_.map(props.data.positions, x => x.current_position)) : (props.data.positions[props.data.positions.length - 1].current_position > 0 ? 'Yes' : 'No')}</th>
                  <th>{props.data.positions[props.data.positions.length - 1].number_of_views}</th>
                  <th>{props.data.positions[props.data.positions.length - 1].followers}</th>
                  <th></th>
                </tr>
            )}
            </tfoot>
          </Table>
        </Container>
      </ModalBody>
      <ModalFooter className='justify-content-center'>
        <Button.Ripple type='submit' className='flex-grow-1' color='primary' disabled={loading}>
          { loading ? <ButtonSpinner/> : null}
          <span>Submit</span>
        </Button.Ripple>
        <Button.Ripple type='button' className='flex-grow-1' color='secondary' disabled={loading} onClick={_close}>
          <span>{trans('gen.actions.cancel')}</span>
        </Button.Ripple>
      </ModalFooter>
    </Modal>
  )
}

export default PlaylistSubmissionModal

