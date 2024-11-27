// ** React Imports
import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

// ** Store & Actions
import {useSelector, useDispatch} from 'react-redux'

// ** Reactstrap
import {Row, Col, Alert, Button, ButtonGroup, Container} from 'reactstrap'
import {DollarSign, DownloadCloud, Hash, Percent, Plus} from "react-feather"

import '@styles/react/apps/app-users.scss'
import StatsVertical from '@components/widgets/stats/StatsVertical'
import {_confirm, _toast} from '@utils'

import CampaignLinkCard from "./CampaignLinkCard"
import {getUserData} from "../../utility/Utils"
import CuratorsVsCampaignList from "./CuratorsVsCampaignList"
import {_getCampaignInfo, _getCampaignInfoforView} from "../../redux/actions"
import CampaignInfoCard from './CampaignInfoCard'
import CampaignViewForCurator from "../campaign-view-for-curator"
import StatusStepper from "../../../../components/StatusStepper"
import {statusesColors} from "../../../../utility/Constants"

const CampaignView = props => {

    const loggedUser = getUserData()
    // ** Vars
    const {campaignId} = useParams()
    const [data, setData] = useState(null)
    const [budgetModalShow, setBudgetModalShow] = useState(false)
    const [steps, setSteps] = useState([])
    const [currentStep, setCurrentStep] = useState(1)

    const getCampaignInfo = () => {
        _getCampaignInfo(
            campaignId,
            ({campaign}) => {
                setData(campaign)
                console.log(statusesColors[campaign.status].id)
                setSteps(prevState => {
                    if (statusesColors[campaign.status].id === 5) {
                        setCurrentStep(2)
                        return [
                            {
                                label: "Created"
                            },
                            {
                                label: "Declined"
                            }
                        ]
                    } else {
                        if (statusesColors[campaign.status].id === 6) {
                            if (campaign.invoice?.is_paid > 0) {
                                setCurrentStep(3)
                            } else {
                                setCurrentStep(2)
                            }
                        } else {
                            setCurrentStep(statusesColors[campaign.status].step)
                        }
                        return [
                            {
                                label: "Created"
                            },
                            {
                                label: statusesColors[campaign.status].id > 1 ? "Approved" : "Pending for Approval"
                            },
                            {
                                label: campaign.invoice?.is_paid > 0 ? "Invoice Paid" : "Pending Invoice"
                            },
                            {
                                label: statusesColors[campaign.status].id > 6 ? "Published & Running" : "Pending for publishing"
                            },
                            {
                                label: "Completed"
                            }
                        ]
                    }
                })
            }
        )

    }

    useEffect(() => {
        if (loggedUser.user_type_id === 1) {
            getCampaignInfo()
        }
    }, [])

    const publishCampaign = () => {
        // _confirm({
        //     callback: (c) => {
        //         _publishCampaign(
        //             campaignId,
        //             () => {
        //                 getCampaignInfo()
        //             }
        //         )
        //     }
        // })
    }

    const approveCampaign = () => {
        // if (data.base_fees) {
        //     _confirm({
        //         callback: (c) => {
        //             _approveCampaign(
        //                 campaignId,
        //                 () => {
        //                     getCampaignInfo()
        //                 }
        //             )
        //         }
        //     })
        // } else {
        //     _toast('Please enter the Budget', 'error')
        // }
    }

    const declineCampaign = () => {
        // _confirm({
        //     callback: (c) => {
        //         _declineCampaign(
        //             campaignId,
        //             () => {
        //                 getCampaignInfo()
        //             }
        //         )
        //     }
        // })
    }

    const warningDiv = () => (
        <Alert color='danger'>
            <h4 className='alert-heading'>User not found</h4>
            <div className='alert-body'>
                User with id: {campaignId} doesn't exist. Check list of all Users: <Link to='/campaigns/list'>Campaigns
                List</Link>
            </div>
        </Alert>
    )

    return (
        <>
            {
                loggedUser.user_type_id === 1 ? (
                    data?.user_id === loggedUser.id ? (
                        <div className='app-user-view'>
                            <Container className={'my-2'}>
                                <Row>
                                    <Col>
                                        <StatusStepper steps={steps} currentStep={currentStep} />
                                    </Col>
                                </Row>
                            </Container>
                            <Row>
                                <Col xl='9' lg='8' md='7'>
                                    <CampaignInfoCard campaign={data} approve={approveCampaign} decline={declineCampaign}/>
                                    {/*<Row>*/}
                                    {/*    /!* Stats With Icons *!/*/}
                                    {/*    <Col xl='2' md='4' sm='6'>*/}
                                    {/*        <StatsVertical containerClassName={'campaign-stats'} icon={<DollarSign size={21} />} color='info' stats={`$${data.invoice_budget ?? '-'}`} statTitle='Invoice Amount' />*/}
                                    {/*    </Col>*/}
                                    {/*    <Col xl='2' md='4' sm='6'>*/}
                                    {/*        <StatsVertical containerClassName={'campaign-stats'} icon={<Percent size={21} />} color='warning' stats={`%${data.commission_fees ?? '-'}`} statTitle='Commission' />*/}
                                    {/*    </Col>*/}
                                    {/*    <Col xl='2' md='4' sm='6'>*/}
                                    {/*        <StatsVertical containerClassName={'campaign-stats'} icon={<DollarSign size={21} />} color='danger' stats={`$${data.budget ?? '-'}`} statTitle='Budget' />*/}
                                    {/*    </Col>*/}
                                    {/*    <Col xl='2' md='4' sm='6'>*/}
                                    {/*        <StatsVertical containerClassName={'campaign-stats'} icon={<Hash size={21} />} color='primary' stats={`${data.number_of_influencers ?? '-'}`} statTitle='Influencers' />*/}
                                    {/*    </Col>*/}
                                    {/*    <Col xl='2' md='4' sm='6'>*/}
                                    {/*        <StatsVertical containerClassName={'campaign-stats'} icon={<DollarSign size={21} />} color='success' stats={`$${data.base_fees ?? '-'}`} statTitle='Base fees' />*/}
                                    {/*    </Col>*/}
                                    {/*    <Col xl='2' md='4' sm='6'>*/}
                                    {/*        <StatsVertical containerClassName={'campaign-stats'} icon={<DollarSign size={21} />} color='danger' stats={`$${data.performance_fees ?? '-'}`} statTitle='Performance Fees' />*/}
                                    {/*    </Col>*/}
                                    {/*    /!* Stats With Icons *!/*/}
                                    {/*</Row>*/}
                                </Col>
                                <Col xl='3' lg='4' md='5'>
                                    <CampaignLinkCard campaign={data}/>
                                    {/*<PlanCard publishCampaign={publishCampaign} openBudgetModal={() => setBudgetModalShow(true)} campaign={data}/>*/}
                                </Col>
                            </Row>
                            <Row>
                                {/*<Col md='3'>*/}
                                {/*    <CampaignLinkCard campaign={data}/>*/}
                                {/*</Col>*/}
                                <Col md='12'>
                                    <CuratorsVsCampaignList campaign={data} approved={1} />
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        warningDiv
                    )
                ) : (
                    <CampaignViewForCurator campaign={data} />
                )
            }
        </>
    )
}
export default CampaignView
