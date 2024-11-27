// ** Dropdowns Imports
import React, {Fragment, useContext, useEffect, useState} from 'react'

import UserDropdown from './UserDropdown'

// ** Third Party Components
import {Sun, Moon, Menu, StopCircle} from 'react-feather'
import {NavItem, NavLink} from 'reactstrap'

import IntlDropdown from "./IntlDropdown"
import themeConfig from "@src/configs/themeConfig"
import {Link} from "react-router-dom"
import NotificationDropdown from "./NotificationDropdown"

import {getUserData} from '@authModule'

const NavbarUser = props => {
  const loggedUser = getUserData()
  // ** Props
  const {skin, setSkin, setMenuVisibility, setIsRtl, isRtl, windowWidth, setMenuCollapsed, menuCollapsed} = props

  return (
    <Fragment>
      <ul className='navbar-nav  d-flex align-items-center'>
        {windowWidth < 1200 ? <NavItem className='mobile-menu mr-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Menu className='ficon'/>
          </NavLink>
        </NavItem> : <NavItem className='mobile-menu mr-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active'
                   onClick={() => setMenuCollapsed(!menuCollapsed)}>
            <Menu className='ficon'/>
          </NavLink>
        </NavItem>}
      </ul>
      <ul className='nav navbar-nav align-items-center ml-auto'>
        <IntlDropdown />
        {
          loggedUser.id > 0 && (
            <NotificationDropdown/>
          )
        }
        <UserDropdown/>
      </ul>
    </Fragment>
  )
}
export default NavbarUser
