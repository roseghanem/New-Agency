// ** React Imports
import React, { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import {NavItem} from "reactstrap"
import {Link} from "react-router-dom"

const ThemeNavbar = props => {
    return (
        <Fragment>
            <NavbarUser {...props} />
        </Fragment>
    )
}

export default ThemeNavbar
