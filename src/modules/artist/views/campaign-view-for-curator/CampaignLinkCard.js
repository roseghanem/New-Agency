// ** Reactstrap
import { Card, CardHeader, CardBody, Badge, UncontrolledTooltip, Button } from 'reactstrap'

import {statusesColors} from "../../utility/Constants"
import {Link} from "react-router-dom"
import {Link as Link3} from "react-feather"
import Plyr, {usePlyr} from "plyr-react"
import "plyr-react/plyr.css"
import React, {useRef} from "react"
import ReactPlayer from "react-player"

const CampaignLinkCard = (props) => {
    const ref = useRef()
    const { source, options = null, campaign, ...rest } = props
    const raptorRef = usePlyr(ref, {
        source: `${process.env.REACT_APP_FILES_BASE_URL}/${campaign.media_link}`,
        options
    })
    const plyrProps = {
        source: `${process.env.REACT_APP_FILES_BASE_URL}/${campaign.media_link}` // https://github.com/sampotts/plyr#the-source-setter
        // options: undefined, // https://github.com/sampotts/plyr#options
        // Direct props for inner video tag (mdn.io/video)
    }
    return (
        campaign.media_link ? (
            <ReactPlayer url={plyrProps.source} width="100%" height="50%" controls={true} />
        ) :
            (campaign.campaign_type_id === 1 && campaign.is_released === 1 ? (
                <iframe style={{borderRadius: 12}}
                        src={`${campaign.link.replace('/open.spotify.com/track/', '/open.spotify.com/embed/track/')}?utm_source=generator`}
                        width="100%" height={380}
                        frameBorder="0" allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
            )
                : (
                    <a href={`${item.link}`} target={'_blank'}>
                        <Link3 size={12} />
                    </a>
                ))

    )
}

export default CampaignLinkCard
