// ** React Imports
import React, { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import {Check, Briefcase, X, Instagram, Facebook, Twitter, TrendingUp} from 'react-feather'
import _ from "lodash"

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import {_confirm, _toast, _url} from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import {FaTiktok} from "react-icons/all"
import {statusesColors} from "../../../../utility/Constants"
import CustomAvatar from "../../../../components/CustomAvatar"
import {_approveUser, _declineUser} from "../../redux/actions"

const UserInfoCard = (props) => {
  const { selectedUser, setEditModal, usercampaigndone, budgetmake, getArtistData } = props
  // ** State
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser?.image?.length) {
      return (
          <div className={'my-25'} style={{borderRadius:50, overflow:'hidden'}}>
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={_url(selectedUser?.image)}
          className='user-avatar rounded cursor-pointer'
        />
          </div>
      )
    } else {
      return (
          <div className={'my-25'} style={{borderRadius:50, overflow:'hidden'}}>
        <Avatar
          initials
          color={'light-primary'}
          className='user-avatar rounded cursor-pointer'
          content={selectedUser?.name ?? ''}
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
          </div>
      )
    }
  }

  const approve = () => {
    _confirm({
      callback: (c) => {
        _approveUser(
          selectedUser.id,
          () => {
            getArtistData()
          }
        )
      }
    })
  }

  const decline = () => {
    _confirm({
      callback: (c) => {
        _declineUser(
          selectedUser.id,
          () => {
            getArtistData()
          }
        )
      }
    })
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
                  <h4>{selectedUser !== null ? selectedUser?.name : ''}</h4>
                  {selectedUser !== null ? (
                    <Badge color={'info'} className='text-capitalize'>
                      {selectedUser?.user_type?.name}
                    </Badge>
                  ) : null}
                </div>
                {
                  (selectedUser.status === 'Pending For Approval') && (
                    <div className='d-flex flex-wrap align-items-center'>
                      <Button.Ripple color='primary' onClick={approve}>
                        Approve
                      </Button.Ripple>
                      <Button.Ripple className='ml-1' color='danger' outline onClick={decline}>
                        Decline
                      </Button.Ripple>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <TrendingUp className='font-medium-2' />
              </Badge>
              <div className='ms-75 pl-50'>
                <h4 className='mb-0'>{usercampaigndone}</h4>
                <small>Campaigns Done</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <TrendingUp className='font-medium-2' />
              </Badge>
              <div className='ms-75 pl-50'>
                <h4 className='mb-0'>${budgetmake}</h4>
                <small>Budget {selectedUser.user_type_id === 1 ? 'Spent' : 'Make'}</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedUser ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Name: </span>
                  <span>{selectedUser.name}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Primary Email: </span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>phone: </span>
                  <span>{selectedUser.phone_number}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Status: </span>
                  <Badge color={statusesColors[selectedUser.status].color}>{selectedUser.status}</Badge>
                </li>
                {selectedUser.user_type_id === 2 ?
                    <li className='mb-75'>
                      <span className='fw-bolder me-25' style={{fontWeight: 'bold'}}>Tier: </span>
                      <Badge color={'info'}>{selectedUser.tier?.name}</Badge>
                    </li>
                    : ''
                }
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Genre: </span>
                  {
                    _.map(selectedUser.genres, x => <Badge className={'mx-25'} pill color={'primary'}>{x.name}</Badge>)
                  }
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Interests: </span>
                  {
                    _.map(selectedUser.interests, x => <Badge className={'mx-25'} pill color={'primary'}>{x.name}</Badge>)
                  }
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Created At: </span>
                  <span className={'px-50 mb-0'}>{new Date(selectedUser.created_at).toDateString()}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Created By: </span>
                  <span className={'px-50 mb-0'}>
                    {selectedUser.admin ? (
                        <Badge color={'info'}>{selectedUser.admin.name}</Badge>
                    ) : (
                        'Registered User'
                    )}
                  </span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25' style={{fontWeight:'bold'}}>Member Since: </span>
                  <span className={'px-50 mb-0'}>{new Date(selectedUser.member_since).toDateString()}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            {selectedUser.spotify_link && <a className={'mx-1'} href={selectedUser.spotify_link} target={'_blank'}>
                <img style={{height: 25, width: 25}} src={require('@fwsrc/assets/images/spotify.png').default}  alt={'no'}/>
            </a>}
            {selectedUser.instagram_link && <a className={'mx-1'} href={selectedUser.instagram_link} target={'_blank'}>
                <Instagram size={22} />
            </a>}
            {selectedUser.facebook_link && <a className={'mx-1'} href={selectedUser.facebook_link} target={'_blank'}>
                <Facebook size={22} />
            </a>}
            {selectedUser.tiktok_link && <a className={'mx-1'} href={selectedUser.tiktok_link} target={'_blank'}>
                <FaTiktok size={22} />
            </a>}
            {selectedUser.twitter_link && <a className={'mx-1'} href={selectedUser.twitter_link} target={'_blank'}>
                <Twitter size={22} />
            </a>}
          </div>
        </CardBody>
      </Card>
      {/*{showModal && <InfoModal successCallback={props.getArtistData} data={selectedUser} onClose={() => setShowModal(false)}/>}*/}
    </Fragment>
  )
}

export default UserInfoCard
