// ** React Imports
import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

// ** Store & Actions
import {useSelector, useDispatch} from 'react-redux'

// ** Reactstrap
import {Row, Col, Alert, Button, ButtonGroup, Card, CardBody, Container} from 'reactstrap'

// ** User View Components
import PlanCard from './PlanCard'
import CampaignInfoCard from './CampaignInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'
import '../../assets/scss/style.scss'
import {_approveCampaign, _declineCampaign, _getCampaignInfo, _publishCampaign} from "../../redux/actions"

import {_confirm, _toast} from '@utils'
import CuratorsVsCampaignList from "./curator-vs-campaign/CuratorsVsCampaignList"
import CampaignLinkCard from "./CampaignLinkCard"
import BudgetModal from "./BudgetModal"
import {
    Award,
    DollarSign,
    DownloadCloud,
    Eye,
    Hash,
    Heart,
    MessageSquare,
    Percent,
    Plus,
    ShoppingBag, Truck
} from "react-feather"
import {statusesColors} from "../../../../utility/Constants"
import CuratorsVsCampaignView from "./curator-vs-campaign"
import StatsVertical from '@components/widgets/stats/StatsVertical'
import AdminVsCampaignModal from "./AdminVsCampaignModal"
import StartDateModal from "./StartDateModal"
import BasicInfoWizardModal from "../campaigns-list/BasicInfoWizardModal"
import StatusStepper from "../../../../components/StatusStepper"
import moment from "moment"

const CampaignView = props => {
    // ** Vars
    const {campaignId} = useParams()
    const [data, setData] = useState(null)
    const [budgetModalShow, setBudgetModalShow] = useState(false)
    const [adminVsCampaignModalShow, setAdminVsCampaignModalShow] = useState(false)
    const [startDateModalShow, setStartDateModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [steps, setSteps] = useState([])

    const getCampaignInfo = () => {
        _getCampaignInfo(
            campaignId,
            ({campaign}) => {
                setData(campaign)
                setSteps(prevState => {
                    if (statusesColors[campaign.status].id === 5) {
                        return [
                            {
                                label: "Created",
                                subtitle: moment(campaign.created_at).format('D-M-Y')
                            },
                            {
                                label: "Declined"
                            }
                        ]
                    } else {
                        return [
                            {
                                label: "Created",
                                subtitle: moment(campaign.created_at).format('D-M-Y')
                            },
                            {
                                label: statusesColors[campaign.status].id > 1 ? "Approved" : "Pending for Approval",
                                subtitle: campaign.approved_at ? moment(campaign.approved_at).format('D-M-Y') : null
                            },
                            {
                                label: statusesColors[campaign.status].id > 5 && campaign.invoice?.is_paid > 0 ? "Invoice Paid" : "Pending Invoice",
                                subtitle: campaign.invoice?.is_paid ? moment(campaign.pay_time).format('D-M-Y') : null
                            },
                            {
                                label: "Published",
                                subtitle: campaign.publish_date ? moment(campaign.publish_date).format('D-M-Y') : null
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
        getCampaignInfo()
    }, [])

    const publishCampaign = () => {
        _confirm({
            callback: (c) => {
                _publishCampaign(
                    campaignId,
                    () => {
                        getCampaignInfo()
                    }
                )
            }
        })
    }

    const approveCampaign = () => {
        if (data.base_fees) {
            _confirm({
                callback: (c) => {
                    _approveCampaign(
                        campaignId,
                        () => {
                            getCampaignInfo()
                        }
                    )
                }
            })
        } else {
            _toast('Please enter the Budget', 'error')
        }
    }

    const declineCampaign = () => {
        _confirm({
            callback: (c) => {
                _declineCampaign(
                    campaignId,
                    () => {
                        getCampaignInfo()
                    }
                )
            }
        })
    }

    return data ? (
        <div className='app-user-view'>
            <Container className={'my-2'}>
                <Row>
                    <Col>
                        <StatusStepper currentStep={statusesColors[data.status].id > 5 && statusesColors[data.status].id < 7 && data.invoice?.is_paid > 0 ? 3 : statusesColors[data.status].step} steps={steps}/>
                    </Col>
                </Row>
            </Container>
            <Row>
                <Col xs={12} className={'d-flex justify-content-end'}>
                    <ButtonGroup className='mb-1'>
                        <Button className='text-center mt-0' color='primary' block onClick={() => setEditModalShow(true)}>
                            <span className='ml-25 text-small text-nowrap'>Edit</span>
                        </Button>
                        {
                            (data !== null ?
                                statusesColors[data.status]?.id === 3 ?
                                     data.invoice.is_paid === 0 ?
                                         <Button className='text-center mt-0' color='primary' block onClick={() => setBudgetModalShow(true)}>
                                             <span className='ml-25 text-small text-nowrap'>Add Budget</span>
                                         </Button>
                                         :
                                         ''
                                :
                                    statusesColors[data.status]?.id < 3
                                        ?
                                        <Button className='text-center mt-0' color='primary' block onClick={() => setBudgetModalShow(true)}>
                                            <span className='ml-25 text-small text-nowrap'>Add Budget</span>
                                        </Button>

                                        :
                                        ''
                            :
                            '')
                        }

                        {
                            data && statusesColors[data.status]?.id === 6 &&
                            (
                                <>
                                    <Button className='text-center mt-0' color='primary' block onClick={publishCampaign}>
                                        <span className='ml-25 text-small text-nowrap'>Publish</span>
                                    </Button>
                                </>
                            )
                        }

                        <>
                            <Button className='text-center mt-0' color='primary' block onClick={() => setStartDateModalShow(true)}>
                                <span className='ml-25 text-small text-nowrap'>Start Date</span>
                            </Button>
                        </>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col xl='9' lg='8' md='7'>
                    <CampaignInfoCard campaign={data} approve={approveCampaign} decline={declineCampaign}/>
                    <Row>
                        {/* Stats With Icons */}
                        <Col xl='2' md='4' sm='6'>
                            <StatsVertical containerClassName={'campaign-stats'} icon={<DollarSign size={21} />} color='info' stats={`$${data.invoice_budget ?? '-'}`} statTitle='Invoice Amount' />
                        </Col>
                        <Col xl='2' md='4' sm='6'>
                            <StatsVertical containerClassName={'campaign-stats'} icon={<Percent size={21} />} color='warning' stats={`%${data.commission_fees ?? '-'}`} statTitle='Commission' />
                        </Col>
                        <Col xl='2' md='4' sm='6'>
                            <StatsVertical containerClassName={'campaign-stats'} icon={<DollarSign size={21} />} color='danger' stats={`$${data.budget ?? '-'}`} statTitle='Budget' />
                        </Col>
                        <Col xl='2' md='4' sm='6'>
                            <StatsVertical containerClassName={'campaign-stats'} icon={<Hash size={21} />} color='primary' stats={`${data.number_of_influencers ?? '-'}`} statTitle='Influencers' />
                        </Col>
                        <Col xl='2' md='4' sm='6'>
                            <StatsVertical containerClassName={'campaign-stats'} icon={<DollarSign size={21} />} color='success' stats={`$${data.base_fees ?? '-'}`} statTitle='Base fees' />
                        </Col>
                        <Col xl='2' md='4' sm='6'>
                            <StatsVertical containerClassName={'campaign-stats'} icon={<DollarSign size={21} />} color='danger' stats={`$${data.performance_fees ?? '-'}`} statTitle='Performance Fees' />
                        </Col>
                        {/* Stats With Icons */}
                    </Row>
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
                  <CuratorsVsCampaignView campaign={data} />
              </Col>
            </Row>
            {/*<Row>*/}
            {/*  <Col md='6'>*/}
            {/*    <UserTimeline />*/}
            {/*  </Col>*/}
            {/*  <Col md='6'>*/}
            {/*    <PermissionsTable />*/}
            {/*  </Col>*/}
            {/*</Row>*/}
            {/*<Row>*/}
            {/*  <Col md='6'>*/}
            {/*    <UserTimeline />*/}
            {/*  </Col>*/}
            {/*  <Col md='6'>*/}
            {/*    <PermissionsTable />*/}
            {/*  </Col>*/}
            {/*</Row>*/}
            {/*<Row>*/}
            {/*  <Col sm='12'>*/}
            {/*    <InvoiceList />*/}
            {/*  </Col>*/}
            {/*</Row>*/}
            {budgetModalShow && <BudgetModal successCallback={getCampaignInfo} data={data} onClose={() => setBudgetModalShow(false)}/>}
            {adminVsCampaignModalShow && <AdminVsCampaignModal successCallback={getCampaignInfo} data={data} onClose={() => setAdminVsCampaignModalShow(false)}/>}
            {startDateModalShow && <StartDateModal successCallback={getCampaignInfo} data={data} onClose={() => setStartDateModalShow(false)}/>}
            {editModalShow && <BasicInfoWizardModal successCallback={getCampaignInfo} data={data} onClose={() => setEditModalShow(false)}/>}
        </div>
    ) : (
        <Alert color='danger'>
            {/*<h4 className='alert-heading'>Campaign not found</h4>*/}
            {/*<div className='alert-body'>*/}
            {/*    Campaign with id: {campaignId} doesn't exist. Check list of all Campaigns: <Link to='/campaigns/list'>Campaigns*/}
            {/*    List</Link>*/}
            {/*</div>*/}
        </Alert>
    )
}
export default CampaignView
