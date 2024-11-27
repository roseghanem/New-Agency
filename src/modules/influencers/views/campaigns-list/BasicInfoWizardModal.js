import React, { useRef, useState } from 'react'
import {ArrowRight, FileText} from 'react-feather'
import {useSelector} from "react-redux"
import {Controller, useForm} from "react-hook-form"
import _ from "lodash"
import {Button, Form, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
import moment from "moment/moment"

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import Wizard from '@components/wizard'
import {getUserData} from '@authModule'

import {_addGenre, _editGenre} from "../../redux/actions"
import CampaignDetails from './steps-with-validation/CampaignDetails'
import ArtistDetails from './steps-with-validation/ArtistDetails'
import SongDetails from './steps-with-validation/SongDetails'
import CampaignType from "./steps-with-validation/CampaignType"

import '../../assets/scss/style.scss'
import CampaignEditInfo from "./steps-with-validation/CampaignEditInfo"

const BasicInfoWizardModal = (props) => {
  const loggedUser = getUserData()
  const [stepper, setStepper] = useState(null)
  const loading = useSelector(state => state.app.loading)
  const [isEditAction, setIsEditAction] = useState(props.data.id)
  const [open, setOpen] = useState(true)
  const [valErrors, setValErrors] = useState({})
  const [campaignType, setCampaignType] = useState(process.env.REACT_APP_AUTH_MODULE === 'artist' ? loggedUser.user_type_id : _.get(props, 'data.campaign_type_id', ''))
  const [formData, setFormData] = useState({
    id:_.get(props, 'data.id', null),
    campaign_type_id: _.get(props, 'data.campaign_type_id', ''),
    name: _.get(props, 'data.name', ''),
    language_id: _.get(props, 'data.language_id') ? {label: _.get(props, 'data.language.name'), value: _.get(props, 'data.language.id')} : '',
    link: _.get(props, 'data.link', ''),
    is_released: _.get(props, 'data.is_released', true),
    media_link: _.get(props, 'data.media_link', ''),
    released_date: moment(_.get(props, 'data.released_date', '')).isValid() ? moment(_.get(props, 'data.released_date', '')).format('Y-MM-DD') : '',
    genre_ids: _.size(props?.data?.genres) > 0 ? _.map(props.data.genres, x => ({label: x.name, value: x.id})) : '',
    start_date: moment(_.get(props, 'data.start_date', '')).isValid() ? moment(_.get(props, 'data.start_date', '')).format('Y-MM-DD') : '',
    tier_id: _.get(props, 'data.tier_id', ''),
    pitch: _.get(props, 'data.pitch', ''),
    user_id: _.get(props, 'data.user_id', '') ? {label: _.get(props, 'data.artist.name', ''), value: _.get(props, 'data.artist.id', '')} : '',
    publish_date: moment(_.get(props, 'data.publish_date', '')).isValid() ? moment(_.get(props, 'data.publish_date', '')).format('Y-MM-DD') : '',
    status: _.get(props, 'data.status') ? {label: _.get(props, 'data.status'), value: _.get(props, 'data.status')} : '',
    playlist_submission_days:  _.get(props, 'data.playlist_submission_days', '3'),
    on_going_days:  _.get(props, 'data.on_going_days', '28'),
    auditing_days:  _.get(props, 'data.auditing_days', '3'),
    admin_ids: _.size(props?.data?.admins) > 0 ? _.map(props.data.admins, x => ({label: x.name, value: x.id})) : ''

  })
  const ref = useRef(null)

  const _close = () => {
    setOpen(false)
    props.onClose()
  }

  let steps = []

  if (process.env.REACT_APP_AUTH_MODULE !== 'artist') {
      steps = [
        {
          id: 'campaign-type',
          title: 'Campaign Type',
          subtitle: 'Choose Campaign Type',
          // icon: <FileText size={18} />,
          content: <CampaignType formState={{campaignType, setCampaignType}} stepper={stepper}
                                 type='wizard-horizontal'/>
        },
        {
          id: 'account-details',
          title: 'Song Details',
          subtitle: 'Setup song details',
          // icon: <FileText size={18} />,
          content: <SongDetails formState={{campaignType, formData, setFormData}} stepper={stepper}
                                type='wizard-horizontal'/>
        },
        {
          id: 'personal-info',
          title: 'Artist Details',
          subtitle: 'Add artist details',
          // icon: <FileText size={18} />,
          content: <ArtistDetails formState={{formData, setFormData}} stepper={stepper} type='wizard-horizontal'/>
        },
        {
          id: 'campaign-info',
          title: 'Campaign Setting',
          subtitle: 'Add campaign setting',
          // icon: <FileText size={18} />,
          content: <CampaignEditInfo formState={{formData, setFormData}} stepper={stepper} type='wizard-horizontal'/>
        },
        {
          id: 'step-address',
          title: 'Campaign Details',
          subtitle: 'Add campaign details',
          // icon: <FileText size={18} />,
          content: <CampaignDetails formState={{campaignType, formData, setFormData}} _close={_close}
                                    successCallback={props.successCallback} stepper={stepper} type='wizard-horizontal'/>
        }
      ]
  } else {
    steps = [
      {
        id: 'account-details',
        title: 'Song Details',
        subtitle: 'Setup song details',
        // icon: <FileText size={18} />,
        content: <SongDetails formState={{campaignType, formData, setFormData}} stepper={stepper} type='wizard-horizontal' />
      },
      {
        id: 'step-address',
        title: 'Campaign Details',
        subtitle: 'Add campaign details',
        // icon: <FileText size={18} />,
        content: <CampaignDetails formState={{campaignType, formData, setFormData}} _close={_close} successCallback={props.successCallback} stepper={stepper} type='wizard-horizontal' />
      }
    ]
  }

  return (
      <Modal
          isOpen={open}
          // toggle={_close}
          unmountOnClose={true}
          backdrop={true}
          className='modal-xl campaign-wizard'
          contentClassName='p-0'
          modalClassName=''
      >
          <ModalHeader toggle={_close} className='mb-1'>
            Add New Campaign
          </ModalHeader>
          <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
            <div className='horizontal-wizard'>
              <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
            </div>
          </ModalBody>
          {/*<ModalFooter className='justify-content-center'>*/}
          {/*  <Button.Ripple type='submit' className='flex-grow-1' color='primary' disabled={loading}>*/}
          {/*    { loading ? <ButtonSpinner/> : null}*/}
          {/*    <span>{trans('gen.actions.save')}</span>*/}
          {/*  </Button.Ripple>*/}
          {/*  <Button.Ripple type='button' className='flex-grow-1' color='secondary' disabled={loading} onClick={_close}>*/}
          {/*    <span>{trans('gen.actions.cancel')}</span>*/}
          {/*  </Button.Ripple>*/}
          {/*</ModalFooter>*/}
      </Modal>
  )
}

export default BasicInfoWizardModal
