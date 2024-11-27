import React, { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button
} from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import {isEmpty} from 'lodash'
//************************************//
import {ButtonSpinner} from '@src/components'
import { AbilityContext } from '@src/utility/context/Can'
import themeConfig from '@configs/themeConfig'
import '@styles/base/pages/page-auth.scss'
import { _setAPIToken} from '../../utility/Utils'
import { trans} from '@utils'
import { useSkin } from '@hooks/useSkin'
//************************************//
import {_getMyProfile, _login} from '../../redux/actions'
import TwoFactorModal from '../../components/TwoFactorModal'
import {ArrowRight} from "react-feather"
//************************************//
const Login = props => {
  const [skin, setSkin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [twoFactorModal, setTwoFactorModal] = useState({twoFactorModalShow: false, twoFactorModalData: {}})
  const loading = useSelector(state => state.app.loading)

  const { register, errors, setValue, handleSubmit } = useForm()
  register('login-email', { required: true, validate: value => value !== '' })
  register('login-password', { required: true, validate: value => value !== '' })
  const source = skin === 'dark' ? themeConfig.app.images.loginDark : themeConfig.app.images.login

  const _loginSuccessCallback = (res) => {
    console.log(res)
    if (res?.data?.token) {
      const {data} = res
      dispatch({type:"USER_LOGIN", userData:data.user, token:data.token})
      _setAPIToken(data.token)
      sessionStorage.setItem("AUTH_TOKEN", JSON.stringify({email, token: data.token, user: data.user}))
      if (rememberMe) {
        localStorage.setItem("AUTH_TOKEN", JSON.stringify({email, token: data.token}))
      }
      if (data.user.abilities) {
        ability.update(data.user.abilities)
      }
      history.push('/')
    } else if (res.next_step_code === 'USR_CHANGE_PASSWORD') {
      history.push(`/reset-password/${email}`)
    } else if (res.next_step_code === 'USR_2FA') {
      setTwoFactorModal({twoFactorModalShow: true, twoFactorModalData: res.data})
    }
  }
  const onSubmit = data => {
    if (isEmpty(errors)) {
      _login(
          {email, password},
          (res) => {
            _loginSuccessCallback(res)
          },
          () => {
          }
      )
    }
  }
  const _closeTwoFactorModal = () => {
    setTwoFactorModal({twoFactorModalShow: false, twoFactorModalData: {}})
  }

  const {twoFactorModalShow, twoFactorModalData} = twoFactorModal

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        {/*<Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>*/}
        {/*  <span className='login-logo'>*/}
        {/*    <img src={themeConfig.app.appLogoImage} alt='logo' />*/}
        {/*  </span>*/}
        {/*  <h2 className='brand-text text-primary ml-1'>{themeConfig.app.appName}</h2>*/}
        {/*</Link>*/}
        <Col className='d-none d-lg-flex align-items-center h-100 p-0' lg='7' sm='12'>
          <div className='w-100 h-100 d-lg-flex align-items-center justify-content-center' style={{position:'relative'}}>
            <div style={{position: 'absolute', backgroundColor:'rgba(0,0,0,0.6)'}} className={'w-100 h-100 d-flex justify-content-center align-items-center'}>
              <div>
                <h2 style={{color:'white', fontSize: '4.5rem'}}>Welcome to</h2>
                <span style={{fontWeight: 900, color:'white', fontSize: '4.5rem'}}>Liberty</span>
                <br />
                <p style={{fontSize:'1.25rem', fontWeight: 300, color:'white'}}>Login to your account</p>
              </div>
            </div>
            <img className='img-fluid h-100 w-100' src={'https://cloudypro.online/libertypr/public/img/pic-1.jpg'} alt={trans('user.login')} />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='5' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h3' className='font-weight-bold mb-1'>
              {/*{trans('user.welcomeTo', {name:themeConfig.app.appName})}! 👋*/}
              <img src={require('@fwsrc/assets/images/logo.png').default} width={100} height={75} />
            </CardTitle>
            <CardText className='mb-2'>
              {/*{trans('user.loginHelpText')}*/}
              <div className={'my-5'}>
                <p style={{fontSize: 40, fontWeight:'bold', color:'#161c2d'}}>Login</p>
                <div className={'d-flex justify-content-start align-items-center'}>
                  <span className='mr-25'>Don't have an account yet? </span>
                  <Link to='/register'>
                    <span> {trans('user.createAccount')}</span>
                  </Link>
                </div>
              </div>
            </CardText>

            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='login-email' style={{fontWeight: 700,
                  color: '#2b354f',
                  fontSize: '0.925rem'}}>
                  {trans('user.email')}
                </Label>
                <Input
                  autoFocus
                  type='email'
                  value={email}
                  id='login-email'
                  name='login-email'
                  placeholder='john@example.com'
                  htmlFor={'login-password'}
                  // style={{borderRadius: 50}}
                  onChange={e => {
                    setEmail(e.target.value)
                    setValue('login-email', e.target.value)
                  }}
                  className={classnames({ 'is-invalid': errors['login-email'] })}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='login-password' style={{fontWeight: 700,
                  color: '#2b354f',
                  fontSize: '0.925rem'}}>
                  {trans('user.password')}
                </Label>
                <InputPasswordToggle
                  value={password}
                  id='login-password'
                  name='login-password'
                  // style={{borderRadius: 50}}
                  onChange={e => {
                    setPassword(e.target.value)
                    setValue('login-password', e.target.value)
                  }}
                  className={classnames('input-group-merge', { 'is-invalid': errors['login-password'] })}
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label={trans('user.rememberMe')} onChange={e => setRememberMe(e.target.checked)}/>
                  <Link to='/forgot-password'>
                    <small>{trans('user.forgotPassword')}</small>
                  </Link>
                </div>
              </FormGroup>
              <div className={'d-flex justify-content-end align-items-center'}>
                <Button.Ripple type='submit' color='login' disabled={loading}>
                  { loading ? <ButtonSpinner/> : null}
                  <span className={'mr-50'}>{trans('user.login')}</span>
                  <ArrowRight color={'white'} />
                </Button.Ripple>
              </div>
            </Form>
            {/*<p className='text-center mt-2'>*/}
            {/*  <span className='mr-25'>{trans('user.newOnPlatform')}</span>*/}
            {/*  <Link to='/register'>*/}
            {/*    <span>{trans('user.createAccount')}</span>*/}
            {/*  </Link>*/}
            {/*</p>*/}
          </Col>
        </Col>
      </Row>
      {twoFactorModalShow && <TwoFactorModal email={email} successCallback={_loginSuccessCallback} data={twoFactorModalData} onClose={_closeTwoFactorModal}/>}
    </div>
  )
}

export default Login
