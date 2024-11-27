// ** React Imports
import React, {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {Controller, useForm} from "react-hook-form"
import _ from "lodash"
import classnames from "classnames"
import {Link, useHistory} from 'react-router-dom'
import {Facebook, Twitter, Mail, GitHub} from 'react-feather'
import {Card, CardBody, CardTitle, CardText, Form, Label, Input, Button, Col, Row, FormGroup} from 'reactstrap'

import {trans} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import '../../assets/scss/style.css'
import {_getAllInterestsWithQ, _register} from "../../redux/actions"

const RegisterBasic = () => {

    const loading = useSelector(state => state.app.loading)
    const {errors, handleSubmit, control, getValues, setValue, register} = useForm()
    const [userType, setUserType] = useState(1)
    const [valErrors, setValErrors] = useState({})
    const [interests, setInterests] = useState([])
    const [selectedInterests, setSelectedInterests] = useState([])
    const history = useHistory()

    const onSubmit = (data) => {
        if (!_.isEmpty(errors)) {
            return
        }
        setValErrors({})
        _register(
            data,
            () => {
                history.push('/login')
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

    useEffect(() => {
        register('user_type_id')
        register('interests')
        setValue('user_type_id', 1)
        setValue('interests', [])
    }, [])

    useEffect(() => {
        _getAllInterestsWithQ('', userType, ({interests}) => {
            setSelectedInterests([])
            setValue('interests', [])
            setInterests(interests)
        })
    }, [userType])


    return (
        <div className='auth-wrapper auth-basic px-2'>
            <div className='auth-inner my-2'>
                <Card className='mb-0'>
                    <CardBody>
                        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                            <img height={40} width={70} src={require('@fwsrc/assets/images/logo.png').default}/>
                        </Link>
                        <CardTitle tag='h4' className='mb-1'>
                            Sign up as
                        </CardTitle>
                        {/*<CardText className='mb-2'>Make your app management easy and fun!</CardText>*/}
                        <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col xs={4}>
                                    <Button block outline onClick={() => {
                                        setUserType(1)
                                        setValue('user_type_id', 1)
                                    }} style={{
                                        backgroundColor: userType === 1 ? 'rgba(29,8,215,0.12)' : 'transparent',
                                        height: 100
                                    }}>
                                        <img height={60} width={60}
                                             src={require('../../assets/images/artist_icon.svg').default}/>
                                        <Label className={'d-inline-bloc w-100'}>
                                            <span
                                                className={'w-100 d-flex justify-content-center text-center'}>Artist</span>
                                        </Label>
                                    </Button>
                                </Col>
                                <Col xs={4}>
                                    <Button block outline onClick={() => {
                                        setUserType(2)
                                        setValue('user_type_id', 2)
                                    }} style={{
                                        backgroundColor: userType === 2 ? 'rgba(29,8,215,0.12)' : 'transparent',
                                        height: 100
                                    }}>
                                        <img height={60} width={60}
                                             src={require('../../assets/images/curator_icon.svg').default}/>
                                        <Label className={'d-inline-bloc w-100'}>
                                            <span
                                                className={'w-100 d-flex justify-content-center text-center'}>Curator</span>
                                        </Label>
                                    </Button>
                                </Col>
                                <Col xs={4}>
                                    <Button block outline onClick={() => {
                                        setUserType(3)
                                        setValue('user_type_id', 3)
                                    }} style={{
                                        backgroundColor: userType === 3 ? 'rgba(29,8,215,0.12)' : 'transparent',
                                        height: 100
                                    }}>
                                        <img height={60} width={60}
                                             src={require('../../assets/images/curator_icon.svg').default}/>
                                        <Label className={'d-inline-bloc w-100'}>
                                            <span
                                                className={'w-100 d-flex justify-content-center text-center'}>Influencer</span>
                                        </Label>
                                    </Button>
                                </Col>
                            </Row>
                            <Row className={'mt-1'}>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className='form-label' for='name'>
                                            Full name
                                        </Label>
                                        <Controller
                                            as={Input}
                                            control={control}
                                            autoFocus
                                            type='text'
                                            id='name'
                                            name='name'
                                            rules={{
                                                required: trans('user.validation.required')
                                            }}
                                            defaultValue={''}
                                            className={classnames({'is-invalid': errors['name'] || _.get(valErrors, 'name')})}
                                        />
                                        <ErrorMessages valErrors={valErrors} errors={errors} name={'name'}/>
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
                                            rules={{
                                                required: trans('user.validation.required')
                                            }}
                                            defaultValue={''}
                                            className={classnames({'is-invalid': errors['email'] || _.get(valErrors, 'email')})}
                                        />
                                        <ErrorMessages valErrors={valErrors} errors={errors} name={'email'}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className='form-label' for='password'>
                                            Password
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
                                            defaultValue={''}
                                            className={classnames({'is-invalid': errors['password'] || _.get(valErrors, 'password')})}
                                        />
                                        <ErrorMessages valErrors={valErrors} errors={errors} name={'password'}/>
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
                                                validate: val => val === getValues('password') || 'Should be equals to Password'
                                            }}
                                            defaultValue={''}
                                            className={classnames({'is-invalid': errors['confirm_password'] || _.get(valErrors, 'confirm_password')})}
                                        />
                                        <ErrorMessages valErrors={valErrors} errors={errors} name={'confirm_password'}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <FormGroup>
                                        <Label className='form-label' for={`tier_id`}>
                                            Select your Interests <small className={'text-danger'}>*</small>
                                        </Label>
                                        <Row>
                                            {_.map(interests, (x, index) => {
                                                return (
                                                    <Col xs={4} key={index}>
                                                        <Button block outline onClick={() => {
                                                            setSelectedInterests(prevState => {
                                                              let selectedItems = [...prevState]
                                                                if (_.indexOf(prevState, x.id, 0) > -1) {
                                                                  selectedItems = _.filter(selectedItems, aa => aa !== x.id)
                                                                  setValue('interests', selectedItems)
                                                                } else {
                                                                  selectedItems = [...selectedItems, x.id]
                                                                  setValue('interests', selectedItems)
                                                                }
                                                                return selectedItems
                                                            })
                                                        }} style={{
                                                            backgroundColor: _.indexOf(selectedInterests, x.id, 0) > -1 ? 'rgba(29,8,215,0.12)' : 'transparent'
                                                        }}>
                                                            <Label className={'d-inline-bloc'}>
                                                              <span className={'w-100 d-flex justify-content-center text-center'}>
                                                                {x.name}
                                                              </span>
                                                            </Label>
                                                        </Button>
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                        <ErrorMessages errors={errors} name={'tier_id'}/>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Button.Ripple type='submit' block color='primary' disabled={loading}>
                                {loading ? <ButtonSpinner/> : null}
                                <span>Sign up</span>
                            </Button.Ripple>
                        </Form>
                        <p className='text-center mt-2'>
                            <span className='me-25'>Already have an account?</span>
                            <Link to='/login'>
                                <span> Sign in instead</span>
                            </Link>
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default RegisterBasic
