import React from "react"
import {Nav} from 'react-bootstrap'
import {User, Briefcase, Users} from 'react-feather'
import {trans} from '@utils'
import {CanCall} from "@authModule"

const CuratorsVsCampaignsTabs = () => {
	return (
		<div className='d-flex justify-content-between flex-wrap mt-1 mt-md-0'>
			<Nav variant="pills" className="mb-0">

				{/*<CanCall action='ELECTIONS_VIEW_CITIZENS'>*/}
					<Nav.Item>
						<Nav.Link eventKey="approved">
            {/*<span>*/}
            {/*  <User size={18} className='mr-25'/>*/}
            {/*</span>*/}
							<span className='font-weight-bold'>Approved</span>
						</Nav.Link>
					</Nav.Item>
				{/*</CanCall>*/}

				{/*<CanCall action='ELECTIONS_VIEW_CITIZENS'>*/}
					<Nav.Item>
						<Nav.Link eventKey="applied">
            {/*<span>*/}
            {/*  <User size={18} className='mr-25'/>*/}
            {/*</span>*/}
							<span className='font-weight-bold'>Applied</span>
						</Nav.Link>
					</Nav.Item>
				{/*</CanCall>*/}

			</Nav>
		</div>
	)
}

export default CuratorsVsCampaignsTabs
