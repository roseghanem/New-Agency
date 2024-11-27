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
import moment from "moment/moment"
import {X} from "react-feather"

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import {useTrans} from '@hooks/useTrans'
import {_getAllRolesWithQ} from '@modules/rolespermissions'

import {
  _checkPlaylistIfTrackIsValid, _deleteCuratorVsCampaignPlaylistPositioning,
  _storeCuratorVsCampaignPlaylistPositioning
} from "../../../redux/actions"

const PlaylistSubmissionModal = (props) => {

  const loading = useSelector(state => state.app.loading)
  const { errors, handleSubmit, control, getValues, setValue, register } = useForm()
  const [isEditAction, setIsEditAction] = useState(props.data.id)
  const campaign = props.data.campaign
  const [open, setOpen] = useState(true)
  const [valErrors, setValErrors] = useState({})
  const [positions, setPositions] = useState(props.data.positions)

  const _close = () => {
    setOpen(false)
    props.onClose()
  }

  const onSubmit = (data) => {
    if (!_.isEmpty(errors)) {
      return
    }
    setValErrors({})
    data.created_by_type = 1
    _storeCuratorVsCampaignPlaylistPositioning(
      {id:props.data.id, ...data},
      ({CuratorVsCampaign}) => {
        props.successCallback()
        setPositions(CuratorVsCampaign.positions)
        setValue('current_position', '')
        setValue('number_of_views', '')
        setValue('followers', '')
        // _close()
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

  const _delete = (id) => {
    _deleteCuratorVsCampaignPlaylistPositioning(
        id,
        ({CuratorVsCampaign}) => {
          props.successCallback()
          setPositions(CuratorVsCampaign.positions)
        }
    )
  }

  return (
    <Modal
      isOpen={open}
      toggle={_close}
      unmountOnClose={true}
      backdrop={true}
      className='modal-lg modal-dialog-centered positioning-modal'
      contentClassName='p-0'
      modalClassName=''
    >
      <Form action='/src/modules/influencers/routes' className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={_close} className='mb-1'>
          Position History
        </ModalHeader>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
          <Container>
            {
              (campaign.is_released > 0 && campaign.campaign_type_id === 1) ? (
                <Row>
                  <Col>
                        <iframe style={{borderRadius:12}}
                                src={`${props.data.playlist_url.replace('/open.spotify.com/playlist/', '/open.spotify.com/embed/playlist/')}?utm_source=generator`}
                                width="100%" height="80" frameBorder="0" allowFullScreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"></iframe>
                  </Col>
                </Row>
              ) : (
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
                        {props.data.campaign.campaign_type_id === 1 ? <span className={'font-weight-bolder'}>Playlist URL</span> : <span className={'font-weight-bolder'}>TikTok URL</span>} : <a target={'_blank'} href={_.get(props, 'data.playlist_url')}>URL</a>
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              )
            }
            {props.data.campaign.is_released > 0 && props.data.campaign.campaign_type_id === 1 && (
                <Row>
                  <Col className={'d-flex justify-content-end'}>
                    <Button.Ripple type='button' color='primary' disabled={loading} className={'m-25'} onClick={() => {
                      _checkPlaylistIfTrackIsValid(
                          props.data.playlist_url,
                          (data) => {
                            if (!_.isEmpty(data)) {
                              const position = _.indexOf(data.tracks.items, _.find(data.tracks.items, x => x.track.external_urls.spotify.indexOf(props.data.campaign.link) > -1))
                              setValue('current_position', position + 1)
                              setValue('followers', data.followers.total)
                              setValue('number_of_views', 0)
                            }
                          }
                      )
                    }}>
                      <span>Manual Scrape</span>
                    </Button.Ripple>
                  </Col>
                </Row>
            )}
            <Table responsive>
              <thead>
              <tr>
                <th>#</th>
                <th>{props.data.campaign.campaign_type_id === 1 ? 'Current Position' : 'Currently Placed'}</th>
                <th>{props.data.campaign.campaign_type_id === 1 ? 'Streams' : 'Views '}</th>
                <th>Followers</th>
                <th className={'text-nowrap'}>created by</th>
                <th className={'text-nowrap'}>At</th>
                <th className={'text-nowrap'}></th>
              </tr>
              </thead>
              <tbody>
              {
                _.map(positions, (x, i) => {
                  return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{props.data.campaign.campaign_type_id === 1 ? x.current_position : (x.current_position > 0 ? 'Yes' : 'No')}</td>
                        <td>{x.number_of_views}</td>
                        <td>{x.followers}</td>
                        <td>{x.created_by_type === 1 ? x.admin?.name : 'Cron Job'}</td>
                        <td className={'text-nowrap'}>{moment(x.created_at).format('DD-MM-Y')}</td>
                        <td className={'py-25'}>
                          <Button.Ripple size={'sm'} type='button' className='rounded-circle btn-icon' outline color='flat-danger' disabled={loading} onClick={() => _delete(x.id)}>
                            <X size={16}/>
                          </Button.Ripple>
                        </td>
                      </tr>
                  )
                })
              }
              {props.data.status.id === 6 ?
                  ''
                  :
                  <tr>
                    <td></td>
                    <td>
                      <Controller
                          as={Input}
                          control={control}
                          rules={{
                            required: trans('user.validation.required')
                          }}
                          type='number'
                          id='current_position'
                          name='current_position'
                          defaultValue={_.get(props, 'data.current_position')}
                          className={classnames({'is-invalid': errors['current_position'] || _.get(valErrors, 'current_position')})}
                      />
                    </td>
                    <td>
                      <Controller
                          as={Input}
                          control={control}
                          rules={{
                            required: trans('user.validation.required')
                          }}
                          type='number'
                          id='number_of_views'
                          name='number_of_views'
                          defaultValue={_.get(props, 'data.number_of_views')}
                          className={classnames({'is-invalid': errors['number_of_views'] || _.get(valErrors, 'number_of_views')})}
                      />
                    </td>
                    <td>
                      <Controller
                          as={Input}
                          control={control}
                          rules={{
                            required: trans('user.validation.required')
                          }}
                          type='number'
                          id='followers'
                          name='followers'
                          defaultValue={_.get(props, 'data.followers')}
                          className={classnames({'is-invalid': errors['followers'] || _.get(valErrors, 'followers')})}
                      />
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
              }
              </tbody>
              <tfoot>
              {positions.length > 0 && (
                  <tr>
                    <th>Average: </th>
                    <th>{props.data.campaign.campaign_type_id === 1 ? Math.round(_.mean(_.map(positions, x => x.current_position))) : (positions[positions.length - 1].current_position > 0 ? 'Yes' : 'No')}</th>
                    <th>{positions[positions.length - 1].number_of_views}</th>
                    <th>{positions[positions.length - 1].followers}</th>
                    <th></th>
                    <th></th>
                  </tr>
              )}
              </tfoot>
            </Table>
          </Container>
        </ModalBody>

        <ModalFooter className='justify-content-center'>
          {props.data.status.id !== 6 ?
              <Button.Ripple type='submit' block className='flex-grow-1' color='primary' disabled={loading}>
                {loading ? <ButtonSpinner/> : null}
                <span>Submit</span>
              </Button.Ripple>
              : ''
          }
          {/*<Button.Ripple type='button' className='flex-grow-1' color='secondary' disabled={loading} onClick={_close}>*/}
          {/*  <span>{trans('gen.actions.cancel')}</span>*/}
          {/*</Button.Ripple>*/}
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default PlaylistSubmissionModal

