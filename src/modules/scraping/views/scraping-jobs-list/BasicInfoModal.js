import React, {useEffect, useState} from 'react'
import classnames from 'classnames'
import {Controller, useForm, useFieldArray} from 'react-hook-form'
import {useSelector} from 'react-redux'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import {Plus, Trash} from 'react-feather'
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
    InputGroupAddon, InputGroup, InputGroupText, Col, Row
} from 'reactstrap'
import _ from "lodash"
import Select from 'react-select'

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import {useTrans} from '@hooks/useTrans'

import {_addScrapingJob, _editScrapingJob} from "../../redux/actions"

const BasicInfoModal = (props) => {

    const loading = useSelector(state => state.app.loading)
    const {errors, handleSubmit, control} = useForm()
    const [isEditAction, setIsEditAction] = useState(props.data.id)
    const [open, setOpen] = useState(true)
    const [valErrors, setValErrors] = useState({})
    const {fields, append, remove} = useFieldArray({
        control,
        name: "urls"
    })
    const _close = () => {
        setOpen(false)
        props.onClose()
    }
    // useEffect(() => {
    //     if (props.data.url) {
    //         props.data.urls.map((url) => append(url))
    //     }
    // }, [])
    useEffect(() => {
        append({})
    }, [append])
    const onSubmit = (data) => {
        if (!_.isEmpty(errors)) {
            return
        }
        setValErrors({})
        if (isEditAction) {
            _editScrapingJob(
                {id: props.data.id, ...data},
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
                    ...data,
                    urls: data.urls.map((url) => {
                        return `https://open.spotify.com/playlist/${url.url}`
                    })
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
            size="lg"
        >
            <Form action='/' className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={_close} className='mb-1'>
                    Create New Scraping Job
                </ModalHeader>
                <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
                    <FormGroup>
                        {fields.map((item, index) => (
                            <Row key={item.id}>
                                <Col md={3}>
                                    <Label className='form-label'>
                                        Type
                                    </Label>
                                    <Select options={[{label:'Spotify', value: 1}]} defaultValue={{label:'Spotify', value: 1}}  />
                                </Col>
                                <Col md={6} lg={8}>
                                    <Label className='form-label' for={`urls.${index}.url`}>
                                        URL
                                    </Label>
                                    <InputGroup className='mb-2'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>https://open.spotify.com/playlist/</InputGroupText>
                                        </InputGroupAddon>
                                        <Controller
                                            as={Input}
                                            control={control}
                                            type='text'
                                            id={`urls.${index}.url`}
                                            name={`urls.${index}.url`}
                                            rules={{
                                                required: trans('user.validation.required')
                                            }}
                                            defaultValue={_.get(props, 'data.url') ?? ''}
                                            className={classnames({'is-invalid': errors['url'] || _.get(valErrors, 'url')})}
                                        />
                                        <ErrorMessages valErrors={valErrors} errors={errors} name={'url'}/>
                                    </InputGroup>
                                </Col>
                                <Col md={3} lg={1}>
                                    <Label className='form-label'>
                                        &nbsp;
                                    </Label>
                                    <Button.Ripple outline className='btn-icon'
                                                   onClick={() => remove(index)}
                                                   color='danger' disabled={loading}>
                                        <Trash size={16}/>
                                    </Button.Ripple>
                                </Col>
                            </Row>
                        ))}
                        <Row>
                            <Col md={3} lg={2}>
                                <Button.Ripple type='button' className='flex-grow-1' color='primary' disabled={loading} onClick={() => append({urls: ""})}>
                                    {loading ? <ButtonSpinner/> : null}
                                    <Plus size={12} />
                                    Add
                                </Button.Ripple>
                            </Col>
                        </Row>
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

export default BasicInfoModal

