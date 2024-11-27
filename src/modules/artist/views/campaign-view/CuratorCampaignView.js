import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "reactstrap"
import CampaignInfoCard from "./CampaignInfoCard"
import CampaignLinkCard from "./CampaignLinkCard"
import CuratorsVsCampaignList from "./CuratorsVsCampaignList"

const CuratorCampaignView = props => {
    const {data} = props
    return (
        <div className='app-user-view'>
            <Row>
                <Col xl='9' lg='8' md='7'>
                    {/*<CampaignInfoCard campaign={data}/>*/}
                </Col>
                <Col xl='3' lg='4' md='5'>
                    {/*<CampaignLinkCard campaign={data}/>*/}
                    {/*<PlanCard publishCampaign={publishCampaign} openBudgetModal={() => setBudgetModalShow(true)} campaign={data}/>*/}
                </Col>
            </Row>
            <Row>
                {/*<Col md='3'>*/}
                {/*    <CampaignLinkCard campaign={data}/>*/}
                {/*</Col>*/}
                <Col md='12'>
                    
                </Col>
            </Row>
        </div>
    )
}

CuratorCampaignView.propTypes = {

}

export default CuratorCampaignView
