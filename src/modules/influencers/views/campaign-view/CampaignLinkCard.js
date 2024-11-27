// ** Reactstrap
import { Card, CardHeader, CardBody, Badge, UncontrolledTooltip, Button } from 'reactstrap'

import {statusesColors} from "../../../../utility/Constants"
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
    console.log(`${process.env.REACT_APP_FILES_BASE_URL}/${campaign.media_link}`)
    const plyrProps = {
         source: `${process.env.REACT_APP_FILES_BASE_URL}/${campaign.media_link}` // https://github.com/sampotts/plyr#the-source-setter
        // options: undefined, // https://github.com/sampotts/plyr#options
        // Direct props for inner video tag (mdn.io/video)
        //source: 'https://api-all-in-one.libertyinfluencers.com/storage/1662575701.mp4'
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
                <Card className='plan-card border-primary'>
                    <CardHeader className='pt-75 pb-1'>
                        <div className={'w-100 d-flex justify-content-between align-items-center mb-1'}>
                            <h4 className='mb-0'>Uploaded Campaign</h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className={'w-100 d-flex justify-content-center align-items-center'}>
                            <a href={`${campaign.link}`} target={'_blank'}>
                                <Link3 size={12} />
                                <span className={'ml-50'}>Campaign Link</span>
                            </a>
                        </div>
                    </CardBody>
                </Card>
                ))
    )


}

export default CampaignLinkCard
