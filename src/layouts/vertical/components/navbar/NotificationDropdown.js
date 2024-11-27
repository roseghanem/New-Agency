// ** React Imports
import {Fragment, useEffect, useState} from 'react'

// ** Custom Components
import Avatar from '@components/avatar'
import fireBaseApp, {_getToken, onMessageListener} from '@modules/user/fireBase-init'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'
import {
  Button,
  Badge,
  Media,
  CustomInput,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import { NotificationsAPI} from "@modules/influencers/utility/API"
import {Link} from "react-router-dom"
import moment from "moment"

const NotificationDropdown = () => {
  const [isTokenFound, setTokenFound] = useState(false)
  const [notificationsArray, setNotificationsArray] = useState([])

  const getNotifications = () => {
    NotificationsAPI.get('notifications').then(({data}) => {
      setNotificationsArray(_.map(data.notifications, x => ({
        ...x,
        img: require('@fwsrc/assets/images/avatar.png').default,
        title: (
          <Media tag='p' heading>
            <span className='font-weight-bolder'>{x.title}</span>
          </Media>
        )
      })))
    })
  }

  onMessageListener().then(payload => {
    getNotifications()
  }).catch(err => console.log('failed: ', err))

  useEffect(() => {
    getNotifications()
  }, [])

  // const initNotifications = [
  //   {
  //     img: require('@fwsrc/assets/images/avatar.png').default,
  //     subtitle: 'You have 10 unread messages.',
  //     title: (
  //       <Media tag='p' heading>
  //         <span className='font-weight-bolder'>New message</span>&nbsp;received
  //       </Media>
  //     )
  //   }
  // ]

  useEffect(() => {
    _getToken(setTokenFound)
  }, [])


  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {_.size(notificationsArray) === 0 && (
          <div className={'w-100 d-flex justify-content-center align-items-center'} style={{height:50}}>
            <span>No Notifications Yet</span>
          </div>
        )}
        {notificationsArray.map((item, index) => {
          return (
            <Link style={{backgroundColor: !item.is_read ? 'rgba(255,255,255,0.53)' : 'transparent'}} key={index} className='d-flex' to={item.link}>
              <Media
                className={classnames('d-flex', {
                  'align-items-start': !item.switch,
                  'align-items-center': item.switch
                })}
              >
                {!item.switch ? (
                  <Fragment>
                    <Media left>
                      <Avatar
                        {...(item.img
                          ? { img: item.img, imgHeight: 32, imgWidth: 32 }
                          : item.avatarContent
                          ? {
                              content: item.avatarContent,
                              color: item.color
                            }
                          : item.avatarIcon
                          ? {
                              icon: item.avatarIcon,
                              color: item.color
                            }
                          : null)}
                      />
                    </Media>
                    <Media body>
                      <div className={'d-flex justify-content-between align-items-center'}><span>{item.title}</span> <span>{moment(item.created_at).format('D-M-Y')}</span></div>
                      <small className='notification-text'>{item.body}</small>
                    </Media>
                  </Fragment>
                ) : (
                  <Fragment>
                    {item.title}
                    {item.body}
                  </Fragment>
                )}
              </Media>
            </Link>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  const readAllNotifications = () => {
    NotificationsAPI.get('notification/read-all').then(() => getNotifications())
  }

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link' onClick={readAllNotifications}>
        <Bell size={21} />
        <Badge pill color='danger' className='badge-up'>
          {_.size(_.filter(notificationsArray, x => !x.is_read))}
        </Badge>
      </DropdownToggle>
      <DropdownMenu tag='ul' right className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 mr-auto'>Notifications</h4>
            <Badge tag='div' color='light-primary' pill>
              {_.size(_.filter(notificationsArray, x => !x.is_read))} New {_.size(_.filter(notificationsArray, x => !x.is_read)) > 1 ? 'Messages' : 'Message'}
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        {/*<li className='dropdown-menu-footer'>*/}
        {/*  <Button.Ripple color='primary' block>*/}
        {/*    Read all notifications*/}
        {/*  </Button.Ripple>*/}
        {/*</li>*/}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
