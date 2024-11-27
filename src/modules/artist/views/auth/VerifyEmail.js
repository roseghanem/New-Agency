// ** React Imports
import {Link, useHistory} from 'react-router-dom'
import { useSkin } from '@hooks/useSkin'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Button } from 'reactstrap'

// ** Styles
import '@styles/base/pages/authentication.scss'

import {getUserData} from '@authModule'
import {useEffect} from "react"
import {_resendVerificationCode} from "../../redux/actions"
import {useSelector} from "react-redux"

const VerifyEmailCover = () => {
  // ** Hooks
  const { skin } = useSkin()
  const user = getUserData()
  const history = useHistory()

  const loading = useSelector(store => store.app.loading)

  const illustration = skin === 'dark' ? 'verify-email-illustration-dark.svg' : 'verify-email-illustration.svg',
    source = require(`@fwsrc/assets/images/${illustration}`).default

  useEffect(() => {
    if (user.verified) {
      history.replace('/')
    }
  }, [])

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bolder mb-1'>
              Verify your email ✉️
            </CardTitle>
            <CardText className='mb-2'>
              We've sent a link to your email address: <span className='fw-bolder'>{user.email}</span> Please
              follow the link inside to continue.
            </CardText>
            <p className='text-center mt-2'>
              <span>Didn't receive an email? </span>
              <a href={'#'} onClick={() => {
                if (!loading) {
                  _resendVerificationCode()
                }
              }}>
                <span>Resend</span>
              </a>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default VerifyEmailCover
