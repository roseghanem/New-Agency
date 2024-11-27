import React, {useEffect, useState} from 'react'
import classnames from 'classnames'
import {Controller, useForm, useFieldArray} from 'react-hook-form'
import {useSelector} from 'react-redux'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
// import {FaTrash} from 'react-icons/fa'
import {Trash} from 'react-feather'
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
    InputGroupAddon, InputGroup, InputGroupText, Col
} from 'reactstrap'
import _ from "lodash"

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import {useTrans} from '@hooks/useTrans'
import {_addScrapingJob, _editScrapingJob} from "../../redux/actions"

const EditInfoModal = (props) => {

    const loading = useSelector(state => state.app.loading)
    const {errors, handleSubmit, control} = useForm()
    const [isEditAction, setIsEditAction] = useState(props.data.id)
    const [open, setOpen] = useState(true)
    const [valErrors, setValErrors] = useState({})
    const res = props.data.url.substring(34)
    console.log(res, 'data')
    const _close = () => {
        setOpen(false)
        props.onClose()
    }
    const onSubmit = (data) => {
        if (!_.isEmpty(errors)) {
            return
        }
        setValErrors({})
        if (isEditAction) {
            _editScrapingJob(
                {id: props.data.id, ...data, url: `https://open.spotify.com/playlist/${data.url}`},
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
            _addScrapingJob(
                {
                    ...data
                },
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
            contentClassName='p-0'
            className='mb-lg-0'
            size="lg" style={{maxWidth: '600px', width: '100%'}}
        >
            <Form action='/' className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={_close} className='mb-1'>
                    {trans(isEditAction ? 'Edit Scraping' : 'Create New Scraping')}
                </ModalHeader>
                <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
                    <FormGroup>
                        <Label className='form-label' for={`url`}>
                            URL
                        </Label>
                        <InputGroup className='justify-content-center'>
                            <InputGroupText>https://open.spotify.com/playlist/</InputGroupText>
                            <Controller
                                as={Input}
                                control={control}
                                type='text'
                                id={`url`}
                                name={`url`}
                                rules={{
                                    required: trans('user.validation.required')
                                }}
                                defaultValue={res}
                                className={classnames({'is-invalid': errors['url'] || _.get(valErrors, 'url')})}
                            />
                            <ErrorMessages valErrors={valErrors} errors={errors} name={'url'}/>
                        </InputGroup>
                    </FormGroup>
                </ModalBody>
                <ModalFooter className='justify-content-center'>
                    <Button.Ripple type='submit' className='flex-grow-1' color='primary' disabled={loading}>
                        {loading ? <ButtonSpinner/> : null}
                        <span>{trans('gen.actions.save')}</span>
                    </Button.Ripple>
                    <Button.Ripple type='button' className='flex-grow-1' color='secondary' disabled={loading}
                                   onClick={_close}>
                        <span>{trans('gen.actions.cancel')}</span>
                    </Button.Ripple>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default EditInfoModal

