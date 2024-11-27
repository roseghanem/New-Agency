// ** React Imports
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import {Row, Col, Alert, Button, ButtonGroup} from 'reactstrap'
import {DownloadCloud, Plus} from "react-feather"


import {_confirm} from '@utils'
// ** Styles
import '@styles/react/apps/app-users.scss'

import {_getUserInfo, _inviteUser, _resetPassword} from "../../redux/actions"
import BasicInfoModal from "../users-list/BasicInfoModal"
// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'

import {CanCall} from '@authModule'

const UserProfile = (props) => {
  const loading = useSelector(store => store.app.loading)
  // ** Store Vars
    const [user, setUser] = useState({})
    const [usercampaigndone, setUsercampaigndone] = useState(0)
    const [budgetmake, setBudgetmake] = useState(0)

    //const [user, setUser] = useState({})
    const [editModal, setEditModal] = useState(false)

    // ** Hooks
  const { userId } = useParams()

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const getArtistData = (data = {}) => {
      _getUserInfo(props.userId ?? userId, (data) => {
          setUser(data.user)
          setUsercampaigndone(data.campaindonecount)
          setBudgetmake(data.budgetmake)
      })
  }
    // ({user}) => setUser(user),
    // setUsercampaigndone(data.campaindonecount)
    useEffect(() => {
        getArtistData()
    }, [])

  const resetPassword = () => {
    _confirm({
      callback: (c) => {
        _resetPassword(
          user.id,
          () => {
          },
          () => {}
        )
      }
    })
  }

  const inviteUser = () => {
    _confirm({
      callback: (c) => {
        _inviteUser(
          user.id,
          () => {
            getArtistData()
          },
          () => {}
        )
      }
    })
  }

  return !_.isEmpty(user) ? (
    <div className='app-user-view'>
        <Row>
            <Col>
                <ButtonGroup className='mb-1'>

                    {
                        (user.status === 'Not Registered' || user.status === 'Invited') && (
                          <CanCall action='INFLUENCER_INVITE_USER'>
                              <Button.Ripple color={'primary'} onClick={inviteUser} disabled={loading}>
                                  <span className='ml-25'>Invite</span>
                              </Button.Ripple>
                          </CanCall>
                        )
                    }

                    <CanCall action='INFLUENCER_RESET_USER_PASSWORD'>
                        <Button.Ripple color={'primary'} onClick={resetPassword} disabled={loading}>
                            <span className='ml-25'>Reset Password</span>
                        </Button.Ripple>
                    </CanCall>

                    <CanCall action='IMFLUENCER_EDIT_USER'>
                        <Button.Ripple color={'primary'} onClick={() => setEditModal(true)} disabled={loading}>
                            <span className='ml-25'>Edit</span>
                        </Button.Ripple>
                    </CanCall>

                </ButtonGroup>
            </Col>
        </Row>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard getArtistData={getArtistData} selectedUser={user} usercampaigndone={usercampaigndone} budgetmake={budgetmake} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs user={user} active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
        {editModal && <BasicInfoModal successCallback={getArtistData} data={user} onClose={() => setEditModal(false)}/>}
    </div>
  ) : (
    <Alert color='danger'>
      {/*<h4 className='alert-heading'>User not found</h4>*/}
      {/*<div className='alert-body'>*/}
      {/*  User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>*/}
      {/*</div>*/}
    </Alert>
  )
}
export default UserProfile
