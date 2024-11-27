import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '@components/avatar'
import {trans, _confirm, _url} from '@utils'
import _ from "lodash"

const CustomAvatar = props => {
    const {img, content} = props
    return img ? <Avatar img={img} /> : <Avatar content={content} initials />
}

CustomAvatar.propTypes = {

}

export default CustomAvatar
