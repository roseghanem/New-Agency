// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import {Check, Briefcase, X, Instagram, Facebook, Twitter, TrendingUp} from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import InfoModal from "../crm-list/InfoModal"

const UserInfoCard = (props) => {
  const { selectedUser } = props
  // ** State
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser?.artist_image?.length) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser?.artist_image}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={'light-primary'}
          className='rounded mt-3 mb-2'
          content={`${selectedUser?.first_name} ${selectedUser?.last_name}` ?? ''}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser !== null ? selectedUser?.artist_name : ''}</h4>
                  {selectedUser !== null ? (
                    <Badge color={'info'} className='text-capitalize'>
                      Artist
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color={'primary'} onClick={() => setShowModal(true)}>
              Edit
            </Button>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <TrendingUp className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{selectedUser.artist_number_of_followers}</h4>
                <small># of followers</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <TrendingUp className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{selectedUser.artist_monthly_listeners && selectedUser.artist_monthly_listeners.replace('monthly listeners', '')}</h4>
                <small>Monthly listeners</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedUser ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Artist name: </span>
                  <span>{selectedUser.artist_name}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Primary Email: </span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Secondary emails: </span>
                  {selectedUser.emails.map(email => {
                    return (
                        <p className={'px-50 mb-0'}>{email.email}</p>
                    )
                  })}
                  {/*<Badge className='text-capitalize' color={statusColors[selectedUser.status]}>*/}
                  {/*  {selectedUser.status}*/}
                  {/*</Badge>*/}
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>URL founds: </span>
                  {selectedUser.websites.map(website => {
                    return (
                        <p className={'px-50 mb-0'}>{website.website}</p>
                    )
                  })}
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Source Track: </span>
                  <a target={'_blank'} href={selectedUser.track_url}>{selectedUser.track_name}</a>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Created At: </span>
                  <span className={'px-50 mb-0'}>{new Date(selectedUser.created_at).toDateString()}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Created By: </span>
                  <span className={'px-50 mb-0'}>{selectedUser.created_by ? selectedUser.admin.name : 'Scraped Artist'}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
              {selectedUser.artist_url && <a className={'mx-1'} href={selectedUser.artist_url} target={'_blank'}>
                  <img style={{height: 25, width: 25}} src={require('../../assets/images/spotify.png').default}  alt={'no'}/>
              </a>}
              {selectedUser.artist_instagram && <a className={'mx-1'} href={selectedUser.artist_instagram} target={'_blank'}>
                  <Instagram size={22} />
              </a>}
              {selectedUser.artist_facebook && <a className={'mx-1'} href={selectedUser.artist_facebook} target={'_blank'}>
                  <Facebook size={22} />
              </a>}
              {selectedUser.artist_twitter && <a className={'mx-1'} href={selectedUser.artist_twitter} target={'_blank'}>
                  <Twitter size={22} />
              </a>}
          </div>
        </CardBody>
      </Card>
      {showModal && <InfoModal successCallback={props.getArtistData} data={selectedUser} onClose={() => setShowModal(false)}/>}
    </Fragment>
  )
}

export default UserInfoCard
