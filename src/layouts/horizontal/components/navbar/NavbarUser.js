// ** Dropdowns Imports
import React, {Fragment, useContext, useEffect, useState} from 'react'

import UserDropdown from './UserDropdown'

// ** Third Party Components
import {Sun, Moon, Menu, StopCircle} from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

import IntlDropdown from "./IntlDropdown"
import themeConfig from "@src/configs/themeConfig"
import {Link} from "react-router-dom"
import NotificationDropdown from "../../../horizontal/components/navbar/NotificationDropdown"

import {getUserData} from '@authModule'

const NavbarUser = props => {
  const loggedUser = getUserData()
    // ** Props
    const { skin, setSkin, setMenuVisibility, setIsRtl, isRtl, windowWidth, setMenuCollapsed, menuCollapsed } = props

    return (
        <Fragment>
            <div className='navbar-header d-xl-block d-none'>
                <ul className='nav navbar-nav'>
                    <NavItem>
                        <Link to='/' className='navbar-brand'>
                          <span className='brand-logo'>
                            <img src={themeConfig.app.appLogoImage} alt='logo' />
                          </span>
                            <h2 className='brand-text mb-0'>{themeConfig.app.appName}</h2>
                        </Link>
                    </NavItem>
                </ul>
            </div>
            <ul className='navbar-nav  d-flex align-items-center'>
                {windowWidth < 1200 ? <NavItem className='mobile-menu mr-auto'>
                    <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
                        <Menu className='ficon' />
                    </NavLink>
                </NavItem> : null}
            </ul>
            <ul className='nav navbar-nav align-items-center ml-auto'>
                {/*<IntlDropdown />*/}

              {
                loggedUser.id > 0 && (
                  <NotificationDropdown/>
                )
              }
                <UserDropdown />
            </ul>
        </Fragment>
    )
}
export default NavbarUser
