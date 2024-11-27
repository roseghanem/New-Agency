// ** React Imports
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import {Row, Col, Alert, Button, ButtonGroup} from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'
import {_getUserInfo} from "../../redux/actions"
// import BasicInfoModal from "./BasicInfoModal"
import {DownloadCloud, Plus} from "react-feather"
import {getUserData} from "../../utility/Utils"

const UserProfile = (props) => {
  // ** Store Vars
    const [user, setUser] = useState({})
    const [usercampaigndone, setUsercampaigndone] = useState(0)
    const [budgetmake, setBudgetmake] = useState(0)
    const [editModal, setEditModal] = useState(false)

    // ** Hooks
  const userId = getUserData().id

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const getArtistData = () => {
      // _getUserInfo(
      //     userId,
      //     ({user}) => setUser(user)
      // )
      _getUserInfo(userId, (data) => {
          setUser(data.user)
          setUsercampaigndone(data.campaindonecount)
          setBudgetmake(data.budgetmake)
      })
  }

    useEffect(() => {
        getArtistData()
    }, [])


  return !_.isEmpty(user) ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard getArtistData={getArtistData} selectedUser={user} usercampaigndone={usercampaigndone} budgetmake={budgetmake}/>
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs user={user} active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
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
