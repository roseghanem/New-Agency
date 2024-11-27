import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
    Alert,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Form,
    CardFooter, Button, CustomInput
} from "reactstrap"
import {Controller, useForm} from "react-hook-form"
import _ from "lodash"
import classnames from "classnames"
import {useDispatch, useSelector} from "react-redux"

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'
import UploadProfileImage from "@fwsrc/components/UploadProfileImage"

import {_resetPassword, _getAllGenresWithQ, _updateUser} from "../../redux/actions"
import {getUserData} from "../../utility/Utils"
import AsyncSelect from "react-select/async"

const Security = props => {

    const loading = useSelector(state => state.app.loading)
    const user = getUserData()
    const { errors, handleSubmit, control, getValues, setValue, register } = useForm()
    const [valErrors, setValErrors] = useState({})
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const dispatch = useDispatch()
    const onSubmit = (data) => {
        if (!_.isEmpty(errors)) {
            return
        }
        setValErrors({})
        data.genre_ids = _.map(data.genre_ids, x => x.value)
        _updateUser(
            user.id,
            data,
            (data) => {
                dispatch({type:'USER_MY_PROFILE', payload: data})
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
        <>
            <Form action='/' className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs={12}>
                                <FormGroup>
                                    <UploadProfileImage name={'image'} defaultValue={_.get(user, 'image')} register={register} setValue={setValue} rules={{type:['jpg', 'jpeg', 'png']}}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label className='form-label' for='name'>
                                        First Name
                                    </Label>
                                    <Controller
                                        as={Input}
                                        control={control}
                                        type='text'
                                        id='name'
                                        name='name'
                                        rules={{
                                            required: trans('user.validation.required')
                                        }}
                                        defaultValue={_.get(user, 'name') ?? ''}
                                        className={classnames({ 'is-invalid': errors['name'] || _.get(valErrors, 'name')})}
                                    />
                                    <ErrorMessages valErrors={valErrors} errors={errors} name={'name'} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label className='form-label' for='email'>
                                        Email
                                    </Label>
                                    <Controller
                                        as={Input}
                                        control={control}
                                        type='email'
                                        id='email'
                                        name='email'
                                        disabled={true}
                                        rules={{
                                            required: trans('user.validation.required')
                                        }}
                                        defaultValue={_.get(user, 'email') ?? ''}
                                        className={classnames({ 'is-invalid': errors['email'] || _.get(valErrors, 'email')})}
                                    />
                                    <ErrorMessages valErrors={valErrors} errors={errors} name={'email'} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label className='form-label' for='phone_number'>
                                        Phone Number
                                    </Label>
                                    <Controller
                                        as={Input}
                                        control={control}
                                        type='text'
                                        id='phone_number'
                                        name='phone_number'
                                        defaultValue={_.get(user, 'phone_number') ?? ''}
                                        className={classnames({ 'is-invalid': errors['phone_number'] || _.get(valErrors, 'phone_number')})}
                                    />
                                    <ErrorMessages valErrors={valErrors} errors={errors} name={'phone_number'} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label className='form-label' for='address'>
                                        Address
                                    </Label>
                                    <Controller
                                        as={Input}
                                        control={control}
                                        type='text'
                                        id='address'
                                        name='address'
                                        defaultValue={_.get(user, 'address') ?? ''}
                                        className={classnames({ 'is-invalid': errors['address'] || _.get(valErrors, 'address')})}
                                    />
                                    <ErrorMessages valErrors={valErrors} errors={errors} name={'address'} />
                                </FormGroup>
                            </Col>
                            <Col xs={12}>
                                <FormGroup>
                                    <Label className='form-label' for='genre_id'>
                                        Preferred Genre
                                    </Label>
                                    <Controller
                                        as={AsyncSelect}
                                        control={control}
                                        name={'genre_ids'}
                                        isClearable={false}
                                        isMulti={true}
                                        classNamePrefix='select'
                                        defaultOptions
                                        cacheOptions
                                        loadOptions={_getAllGenresWithQ}
                                        className={classnames('react-select', { 'is-invalid': errors['genre_id'] || _.get(valErrors, 'genre_id') })}
                                        defaultValue={_.size(user, 'genres') ? _.map(user.genres, x => ({label: _.get(x, 'name'), value: _.get(x, 'id')})) : ''}
                                        rules={{
                                            required: trans('user.validation.required')
                                        }}
                                    />
                                    <ErrorMessages valErrors={valErrors} errors={errors} name={'genre_id'} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Button.Ripple type='submit' className='flex-grow-1' color='primary' disabled={loading}>
                            { loading ? <ButtonSpinner/> : null}
                            <span>{trans('gen.actions.save')}</span>
                        </Button.Ripple>
                    </CardFooter>
                </Card>
            </Form>
            <Card>
                <CardHeader>
                    <CardTitle>Delete Account</CardTitle>
                </CardHeader>
                <CardBody>
                    <Alert color='warning'>
                        <h4 className='alert-heading'>Are you sure you want to delete your account?</h4>
                        <div className='alert-body'>Once you delete your account, there is no going back. Please be certain.</div>
                    </Alert>
                    <Row>
                        <Col xs={12}>
                            <CustomInput id={'confirmation'} type={'checkbox'} checked={deleteConfirmation} onChange={e => setDeleteConfirmation(e.target.checked)} label={'I confirm my account deactivation'} />
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Button.Ripple type='button' className='flex-grow-1' color='danger' disabled={loading || !deleteConfirmation}>
                        { loading ? <ButtonSpinner/> : null}
                        <span>Deactivate Account</span>
                    </Button.Ripple>
                </CardFooter>
            </Card>
        </>
    )
}

Security.propTypes = {

}

export default Security
