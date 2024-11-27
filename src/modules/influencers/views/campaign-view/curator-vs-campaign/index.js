import React from 'react'
import {Row} from 'reactstrap'
import {Tab} from 'react-bootstrap'
import {useHistory, useParams} from "react-router-dom"

import '@styles/react/pages/page-profile.scss'
import {_getActiveTab} from '@utils'

// import '../../../assets/scss/style.scss'
import CuratorsVsCampaignsHeader from './CuratorsVsCampaignsHeader'
import CuratorsVsCampaignList from "./CuratorsVsCampaignList"

const CuratorsVsCampaignView = ({campaign}) => {
	const history = useHistory()
	const {id} = useParams()

	return (
		<Tab.Container unmountOnExit={true} mountOnEnter={true} defaultActiveKey={_getActiveTab("approved", ['approved', 'applied'])} onSelect={(tabKey) => { history.push(`#${tabKey}`) }}>
			<Row>
				<CuratorsVsCampaignsHeader />
			</Row>
			<Tab.Content>
				<Tab.Pane eventKey="approved">
					<CuratorsVsCampaignList campaign={campaign} approved={1} />
				</Tab.Pane>
				<Tab.Pane eventKey="applied">
					<CuratorsVsCampaignList campaign={campaign} approved={0} />
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	)
}

export default CuratorsVsCampaignView
