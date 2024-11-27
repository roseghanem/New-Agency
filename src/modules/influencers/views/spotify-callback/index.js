import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import _ from "lodash"
import axios from "axios"
import {useHistory, useParams} from "react-router-dom"

import {_historyPush, _toast} from '@utils'

const SpotifyCallback = props => {
    const {accessToken} = useParams()
    const history = useHistory()
    useEffect(() => {
        localStorage.setItem('spotify_token', accessToken)
        history.push('/dashboard')
        _toast('Spotify Token Has Been Refreshed For 1 Hour', 'success')
    }, [])
    return null
}

SpotifyCallback.propTypes = {

}

export default SpotifyCallback
