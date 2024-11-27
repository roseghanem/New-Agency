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

import {
    _addCuratorVsCampaing,
    _editCuratorVsCampaign,
    _getAllCuratorsWithQ,
    _getAllCuratorVsCampaignStatusWithQ
} from "../../../redux/actions"
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
        data.curator_id = data.curator_id.value
        if (data.curators_vs_campaigns_status_id) {
            data.curators_vs_campaigns_status_id = data.curators_vs_campaigns_status_id.value
        }

        if (isEditAction) {
            _editCuratorVsCampaign(
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
            _addCuratorVsCampaing(
                {...data, campaign_id : props.campaign.id},
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
            <Form action='/src/modules/influencers/routes' className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={_close} className='mb-1'>
                    Add curator to campaign
                </ModalHeader>
                <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
                    <FormGroup>
                        <Label className='form-label' for={`curator_id`}>
                            Select your Curator <small className={'text-danger'}>*</small>
                        </Label>
                        <Controller
                            as={AsyncSelect}
                            control={control}
                            name={'curator_id'}
                            isClearable={false}
                            isMulti={false}
                            defaultOptions
                            cacheOptions
                            loadOptions={_getAllCuratorsWithQ}
                            classNamePrefix='select'
                            className={classnames('react-select', { 'is-invalid': errors['curator_id']})}
                            defaultValue={_.get(props, 'data.curator_id') ? {label: _.get(props, 'data.curator.name'), value: _.get(props, 'data.curator.id')} : ''}
                            rules={{
                                required: true
                            }}
                        />
                    </FormGroup>
                    {isEditAction && !props.data.applied && (
                        <FormGroup>
                            <Label className='form-label' for={`curators_vs_campaigns_status_id`}>
                                Status
                            </Label>
                            <Controller
                                as={AsyncSelect}
                                control={control}
                                name={'curators_vs_campaigns_status_id'}
                                isClearable={false}
                                isMulti={false}
                                defaultOptions
                                cacheOptions
                                loadOptions={_getAllCuratorVsCampaignStatusWithQ}
                                classNamePrefix='select'
                                className={classnames('react-select', { 'is-invalid': errors['curators_vs_campaigns_status_id']})}
                                defaultValue={_.get(props, 'data.curators_vs_campaigns_status_id') ? {label: _.get(props, 'data.status.name'), value: _.get(props, 'data.status.id')} : ''}
                                rules={{
                                    required: true
                                }}
                            />
                        </FormGroup>
                    )}
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

