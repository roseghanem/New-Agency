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
  _storeCuratorVsCampaignPlaylist
} from "../../redux/actions"

import {
  _checkPlaylistIfTrackIsValid
} from "@modules/influencers"

const PlaylistSubmissionModal = (props) => {

  const loading = useSelector(state => state.app.loading)
  const { errors, handleSubmit, control, getValues, setValue, register } = useForm()
  const [isEditAction, setIsEditAction] = useState(props.data.id)
  const [open, setOpen] = useState(true)
  const [valErrors, setValErrors] = useState({})
  const [playlistUrl, setPlaylistUrl] = useState(_.get(props, 'data.playlist_url', ''))
  const [validTrackInPlaylist, setValidTrackInPlaylist] = useState(!(props.data.campaign.campaign_type_id === 1 && props.data.campaign.is_released === 1))
  const [curatorReview, setCuratorReview] = useState(_.get(props, 'data.review'))

  const _close = () => {
    setOpen(false)
    props.onClose()
  }

  const onSubmit = (data) => {
    if (!_.isEmpty(errors)) {
      return
    }
    setValErrors({})
    _storeCuratorVsCampaignPlaylist(
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
      <Form className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={_close} className='mb-1'>
          Verify Campaign Playlist
        </ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
          <Container>
            <Row>
              <Col xs={6}>
                <FormGroup>
                  <Label className='form-label' for='playlist_name'>
                    {props.data.campaign.campaign_type_id === 1 ? 'Playlist Name' : 'Influencer Name'}
                  </Label>
                  <Controller
                    as={Input}
                    control={control}
                    rules={{
                      required: trans('user.validation.required')
                    }}
                    type='text'
                    id='playlist_name'
                    name='playlist_name'
                    defaultValue={_.get(props, 'data.playlist_name')}
                    className={classnames({'is-invalid': errors['playlist_name'] || _.get(valErrors, 'playlist_name')})}
                    readOnly={props.data.campaign.campaign_type_id === 1 && props.data.campaign.is_released === 1}
                  />
                  <ErrorMessages valErrors={valErrors} errors={errors} name={'playlist_name'}/>
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <Label className='form-label' for='playlist_url'>
                    {props.data.campaign.campaign_type_id === 1 ? 'Playlist URL' : 'TikTok URL'}
                  </Label>
                  <Input
                    innerRef={register({
                      required: trans('user.validation.required')
                    })}
                    type='text'
                    id='playlist_url'
                    name='playlist_url'
                    value={playlistUrl}
                    onChange={e => {
                      setValue('playlist_url', e.target.value)
                      setPlaylistUrl(e.target.value)
                    }}
                    onFocus={() => {
                      if (props.data.campaign.campaign_type_id === 1 && props.data.campaign.is_released === 1) {
                        setValidTrackInPlaylist(false)
                      } else {
                        setValidTrackInPlaylist(true)
                      }
                    }}
                    onBlur={e => {
                      if (props.data.campaign.campaign_type_id === 1 && props.data.campaign.is_released === 1) {
                        _checkPlaylistIfTrackIsValid(
                          e.target.value,
                          (data) => {
                            if (data) {
                              if (_.find(data.tracks.items, x => x.track.external_urls.spotify.indexOf(props.data.campaign.link) > -1)) {
                                setValue('playlist_name', data.name)
                                setValidTrackInPlaylist(true)
                              }
                            }
                          }
                        )
                      }
                    }}
                    className={classnames({
                      'is-invalid': errors['playlist_url'] || _.get(valErrors, 'playlist_url') || !validTrackInPlaylist,
                      'is-valid': validTrackInPlaylist && playlistUrl && playlistUrl.length > 0
                    })}
                  />
                  <ErrorMessages valErrors={valErrors} errors={errors} name={'playlist_url'}/>
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <div className='form-label-group mb-0 mt-1'>
                    <Input
                      type='textarea'
                      name='review'
                      id='review'
                      innerRef={register({max: 30})}
                      rows='3'
                      value={curatorReview}
                      placeholder={'Write a brief description about your song here....'}
                      onChange={e => {
                        setValue('review', e.target.value)
                        setCuratorReview(e.target.value)
                      }}
                    />
                    <Label>Review</Label>
                  </div>
                  <span
                    className={classnames('textarea-counter-value float-right', {
                      'bg-danger': curatorReview?.length > 30
                    })}
                  >
                                  {`${curatorReview?.length ?? 0}/30`}
                                </span>
                  <ErrorMessages valErrors={valErrors} errors={errors} name={'review'}/>
                </FormGroup>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter className='justify-content-center'>
          <Button.Ripple type='submit' className='flex-grow-1' color='primary' disabled={loading || !validTrackInPlaylist || curatorReview?.length > 30}>
            {loading ? <ButtonSpinner/> : null}
            <span>Verify</span>
          </Button.Ripple>
          <Button.Ripple type='button' className='flex-grow-1' color='secondary' disabled={loading} onClick={_close}>
            <span>{trans('gen.actions.cancel')}</span>
          </Button.Ripple>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default PlaylistSubmissionModal

