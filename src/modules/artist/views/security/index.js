import React, {useState, useRef} from 'react'
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
    CardFooter, Button
} from "reactstrap"
import {Controller, useForm} from "react-hook-form"
import _ from "lodash"
import classnames from "classnames"
import {useSelector} from "react-redux"

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'

import {_resetPassword} from "../../redux/actions"
import ReCAPTCHA from "react-google-recaptcha"

const Security = props => {

    const loading = useSelector(state => state.app.loading)
    const { errors, handleSubmit, control, getValues, setValue, register } = useForm()
    const [valErrors, setValErrors] = useState({})

    const onSubmit =  (data) => {
        if (!_.isEmpty(errors)) {
            return
        }
        setValErrors({})
        _resetPassword(
            data,
            () => {},
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
        <Form action='/' className='flex-grow-1 d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>

            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardBody>
                    <Alert color='warning'>
                        <h4 className='alert-heading'>Ensure that these requirements are met</h4>
                        <div className='alert-body'>Minimum 8 characters long, uppercase & symbol</div>
                    </Alert>
                    <Row>
                        <Col xs={12} md={6}>
                            <FormGroup>
                                <Label className='form-label' for='password'>
                                    Old Password
                                </Label>
                                <Controller
                                    as={Input}
                                    control={control}
                                    type='password'
                                    id='password'
                                    name='password'
                                    rules={{
                                        required: trans('user.validation.required')
                                    }}
                                    defaultValue={_.get(props, 'data.password') ?? ''}
                                    className={classnames({ 'is-invalid': errors['password'] || _.get(valErrors, 'password')})}
                                />
                                <ErrorMessages valErrors={valErrors} errors={errors} name={'password'} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label className='form-label' for='new_password'>
                                    New Password
                                </Label>
                                <Controller
                                    as={Input}
                                    control={control}
                                    type='password'
                                    id='new_password'
                                    name='new_password'
                                    rules={{
                                        required: trans('user.validation.required')
                                    }}
                                    defaultValue={_.get(props, 'data.new_password') ?? ''}
                                    className={classnames({ 'is-invalid': errors['new_password'] || _.get(valErrors, 'new_password')})}
                                />
                                <ErrorMessages valErrors={valErrors} errors={errors} name={'new_password'} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label className='form-label' for='confirm_password'>
                                    Confirm Password
                                </Label>
                                <Controller
                                    as={Input}
                                    control={control}
                                    type='password'
                                    id='confirm_password'
                                    name='confirm_password'
                                    rules={{
                                        required: trans('user.validation.required'),
                                        validate: val => val === getValues('new_password') || 'Should be equals to new password'
                                    }}
                                    defaultValue={_.get(props, 'data.confirm_password') ?? ''}
                                    className={classnames({ 'is-invalid': errors['confirm_password'] || _.get(valErrors, 'confirm_password')})}
                                />
                                <ErrorMessages valErrors={valErrors} errors={errors} name={'confirm_password'} />
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
    )
}

Security.propTypes = {

}

export default Security
