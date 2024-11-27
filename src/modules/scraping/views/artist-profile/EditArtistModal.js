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
    InputGroupAddon, InputGroup, InputGroupText, Col, Container, Row
} from 'reactstrap'
import _ from "lodash"

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import {_addScrapingJob, _editScrapingJob, _updateArtist} from "../../redux/actions"

const EditArtistModal = (props) => {

    const loading = useSelector(state => state.app.loading)
    const {errors, handleSubmit, control} = useForm()
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
        _updateArtist(
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
                    Edit Artist
                </ModalHeader>
                <ModalBody className='flex-grow-1 pb-sm-0 pb-3 modal-body'>
                    <Container>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label className='form-label' for={`artist_name`}>
                                        Name
                                    </Label>
                                    <Controller
                                        as={Input}
                                        control={control}
                                        type='text'
                                        id={`artist_name`}
                                        name={`artist_name`}
                                        rules={{
                                            required: trans('user.validation.required')
                                        }}
                                        defaultValue={_.get(props.data, 'artist_name')}
                                        className={classnames({'is-invalid': errors['artist_name'] || _.get(valErrors, 'artist_name')})}
                                    />
                                    <ErrorMessages valErrors={valErrors} errors={errors} name={'artist_name'}/>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label className='form-label' for={`email`}>
                                        Email
                                    </Label>
                                    <Controller
                                        as={Input}
                                        control={control}
                                        type='email'
                                        id={`email`}
                                        name={`email`}
                                        rules={{
                                            required: trans('user.validation.required')
                                        }}
                                        defaultValue={_.get(props.data, 'email')}
                                        className={classnames({'is-invalid': errors['email'] || _.get(valErrors, 'email')})}
                                    />
                                    <ErrorMessages valErrors={valErrors} errors={errors} name={'email'}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>
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

export default EditArtistModal

