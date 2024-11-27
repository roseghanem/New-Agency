// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'
import {_getArtistInfo} from "../../redux/actions"

const UserView = () => {
  // ** Store Vars
    const [user, setUser] = useState({})

    // ** Hooks
  const { artistId } = useParams()

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const getArtistData = () => {
      _getArtistInfo(
          artistId,
          ({artist}) => setUser(artist)
      )
  }

    useEffect(() => {
        getArtistData()
    }, [])


  return !_.isEmpty(user) ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard getArtistData={getArtistData} selectedUser={user} />
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
export default UserView
