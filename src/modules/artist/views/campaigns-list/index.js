import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {CampaignsList} from '@modules/influencers'
import CuratorCampaignsList from "./CuratorCampaignsList"
import {getUserData} from '@authModule'
import {Link} from "react-router-dom"
import {Alert} from "reactstrap"

const ArtistCampaignsList = props => {
    const loggedUser = getUserData()
    const [selectedTier, setSelectedTier] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [selectedReleased, setSelectedReleased] = useState('all')
    const [selectedGenres, setSelectedGenres] = useState([])
    if (loggedUser.status !== 'Approved') {
     return <Alert color='danger'>
         <h4 className='alert-heading'>Your profile not approved yet</h4>
         <div className='alert-body'>
             Please wait until one of the admins approved your profile
         </div>
     </Alert>
    }
    return loggedUser.user_type_id > 1 ? (
        <CuratorCampaignsList states={{selectedTier, setSelectedTier, selectedStatus, setSelectedStatus, selectedGenres, setSelectedGenres, selectedReleased, setSelectedReleased}}/>
    ) : (
        <CampaignsList link={'artist/campaigns'} isArtist={true} />
    )
}

ArtistCampaignsList.propTypes = {
  
}

export default ArtistCampaignsList
