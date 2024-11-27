// ** React Imports
import React, {useEffect, useState} from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'

// ** Store & Actions
import {useSelector, useDispatch} from 'react-redux'

// ** Reactstrap
import {
  Row,
  Col,
  Alert,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Table,
  Badge, Container
} from 'reactstrap'
import {DollarSign, DownloadCloud, Hash, Percent, Plus} from "react-feather"

import '@styles/react/apps/app-users.scss'
import StatsVertical from '@components/widgets/stats/StatsVertical'
import {_confirm, _toast} from '@utils'
import {ButtonSpinner, ErrorMessages} from '@src/components'

import CampaignLinkCard from "./CampaignLinkCard"
import {getUserData} from "../../utility/Utils"
import {
  _addCuratorVsCampaing,
  _getCampaignByCuratorVsCampaignId,
  _getCampaignInfoforView,
  _submitCuratorVsCampaignPlaylist
} from "../../redux/actions"
import CampaignInfoCard from './CampaignInfoCard'
import PlaylistSubmissionModal from "./PlaylistSubmissionModal"
import PlaylistPositioningModal from "./PlaylistPositioningModal"
import StatusStepper from "../../../../components/StatusStepper"
import {statusesColors} from "../../../../utility/Constants"

const CampaignViewForCurator = props => {
  // ** Vars
  const {campaignId} = useParams()
  const loading = useSelector(store => store.app.loading)
  const [data, setData] = useState({})
  const [curatorVsCampaign, setCuratorVsCampaign] = useState({})
  const [Payout, setPayout] = useState({})
  const [verifySubmissionModalShow, setVerifySubmissionModalShow] = useState(false)
  const [submitPositioningModalShow, setSubmitPositioningModalShow] = useState(false)
  const loggedUser = getUserData()
  const history = useHistory()
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(1)

  const getCampaignInfo = () => {
    if (window.location.href.indexOf("pending") > -1) {
      //alert('dsds')
      _getCampaignInfoforView(
        campaignId,
        ({campaign, curator_vs_campaign, payout}) => {
          setData(curator_vs_campaign.campaign)
          setCuratorVsCampaign(curator_vs_campaign)
          setPayout(payout)
        }
      )
    } else {
      _getCampaignByCuratorVsCampaignId(
        campaignId,
        ({campaign, curator_vs_campaign, payout}) => {
          setData(campaign)
          setCuratorVsCampaign(curator_vs_campaign)
          setPayout(payout)
          setSteps(prevState => {
            if (curator_vs_campaign.curators_vs_campaigns_status_id !== 7) {
              switch (curator_vs_campaign.curators_vs_campaigns_status_id) {
                case 1:
                  setCurrentStep(1)
                  break
                case 2:
                  setCurrentStep(2)
                  break
                case 3:
                  setCurrentStep(2)
                  break
                case 4:
                  setCurrentStep(3)
                  break
                case 5:
                  setCurrentStep(4)
                  break
                case 6:
                  console.log(payout.is_paid)
                  setCurrentStep(payout.is_paid > 0 ? 7 : 6)
                  break
              }
              return [
                {
                  label: "Applied"
                },
                {
                  label: curator_vs_campaign.curators_vs_campaigns_status_id < 2  ? "Pending for admin approval" : "Approved"
                },
                {
                  label: curator_vs_campaign.campaign.campaign_type_id === 1 ? (
                    curator_vs_campaign.curators_vs_campaigns_status_id === 2 ? (
                      "Pending for Playlist Submission"
                    ) : (
                      curator_vs_campaign.campaign.is_released > 0 ? (
                        "Playlist Approved"
                      ) : (
                        "Verifying Submission"
                      )
                    )
                  ) : (
                    curator_vs_campaign.curators_vs_campaigns_status_id === 2 ? (
                      "Pending for Video Submission"
                    ) : (
                      curator_vs_campaign.curators_vs_campaigns_status_id > 3 ? (
                        "Video Approved"
                      ) : (
                        "Verifying Video Submission"
                      )
                    )
                  )
                },
                {
                  label: "On Going"
                },
                {
                  label: "Auditing"
                },
                {
                  label: "Completed"
                },
                {
                  label: "Payout Released"
                }
              ]
            } else {
              setCurrentStep(2)
            }
          })
        }
      )
    }
  }

  const submitPlaylist = () => {
    const status = data.campaign_type_id === 1 && data.is_released === 1 ? 4 : 3
    _submitCuratorVsCampaignPlaylist(
      campaignId,
      status,
      () => {
        getCampaignInfo()
      }
    )
  }
  const applyOnCampaign = (data) => {
    _addCuratorVsCampaing(
      {curator_id: loggedUser.id, ...data},
      ({CuratorVsCampaign}) => {
        history.replace(`/campaigns/${CuratorVsCampaign.id}`)
      },
      (err) => {

      }
    )
  }
  useEffect(() => {
    getCampaignInfo()
  }, [])

  return !_.isEmpty(data) ? (
    <div className='app-user-view'>
      {
        window.location.href.indexOf("pending") < 0 && (
          <Container className={'my-2'}>
            <Row>
              <Col>
                <StatusStepper steps={steps} currentStep={currentStep}/>
              </Col>
            </Row>
          </Container>
        )
      }
      {window.location.href.indexOf("pending") > -1 && (
        <Row>
          <Col xs='12'>
            <Button className='mt-1 remove-wishlist' color='success'
                    onClick={() => applyOnCampaign({campaign_id: curatorVsCampaign.campaign.id})} disabled={loading}>
              {loading ? <ButtonSpinner/> : null}
              <span>Apply</span>
            </Button>
          </Col>
        </Row>
      )
      }
      <Row>
        <Col xl='9' lg='8' md='7'>
          <CampaignInfoCard campaign={data}/>
          <Row>
            <Col xl='2' md='4' sm='6'>
              <StatsVertical containerClassName={'campaign-stats'} icon={<DollarSign size={21}/>} color='success'
                             stats={`$${data.base_fees ?? '-'}`}
                             statTitle='Base fees'/>
            </Col>
            <Col xl='2' md='4' sm='6'>
              <StatsVertical containerClassName={'campaign-stats'} icon={<DollarSign size={21}/>} color='danger'
                             stats={`$${data.performance_fees ?? '-'}`}
                             statTitle='Performance Fees'/>
            </Col>
            {/* Stats With Icons */}
          </Row>
        </Col>
        <Col xl='3' lg='4' md='5'>
          <CampaignLinkCard campaign={data}/>
        </Col>
      </Row>
      {
        curatorVsCampaign.curators_vs_campaigns_status_id > 1 && (
          <Row>
            <Col md='12'>
              <Card>
                <CardHeader>
                  <CardTitle>Playlist Submissions</CardTitle>
                  {
                    curatorVsCampaign.curators_vs_campaigns_status_id === 2 && (
                      <CardText>
                        <Button className={'mx-1'} color={'primary'} onClick={() => setVerifySubmissionModalShow(true)}>
                          Add Link
                        </Button>
                        <Button.Ripple type='button' className='flex-grow-1' color='success' disabled={loading}
                                       onClick={submitPlaylist}>
                          {loading ? <ButtonSpinner/> : null}
                          <span>Submit</span>
                        </Button.Ripple>
                      </CardText>
                    )
                  }
                </CardHeader>
                <CardBody>
                  <Table>
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>Link</th>
                      <th>My Review</th>
                      <th>Payout Amount</th>
                      <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      curatorVsCampaign.playlist_name ? (
                        <tr>
                          <td>{curatorVsCampaign.playlist_name}</td>
                          <td><a href={curatorVsCampaign.playlist_url} target={'_blank'}>Playlist URL</a></td>
                          <td>{curatorVsCampaign.review}</td>
                          <td>{(curatorVsCampaign.curators_vs_campaigns_status_id === 1 || curatorVsCampaign.curators_vs_campaigns_status_id === 2 || curatorVsCampaign.curators_vs_campaigns_status_id === 7 || curatorVsCampaign.curators_vs_campaigns_status_id === 8) ?
                            <Badge color={'warning'}>Pending</Badge> :
                            Payout ?
                              Payout.is_paid ?
                                <Badge color={'success'}>{Payout.amount} (Paid)</Badge> :
                                <Badge color={'danger'}>{Payout.amount} (Not Paid)</Badge> :
                              <Badge color={'warning'}>Pending</Badge>}
                          </td>
                          <td><Badge color={curatorVsCampaign.status?.color}>{curatorVsCampaign.status?.name}</Badge></td>
                        </tr>
                      ) : (
                        <tr>
                          <td className={'text-center'} colSpan={3}>No Link Yet</td>
                        </tr>
                      )
                    }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )
      }
      {verifySubmissionModalShow && <PlaylistSubmissionModal successCallback={getCampaignInfo} data={curatorVsCampaign}
                                                             onClose={() => setVerifySubmissionModalShow(false)}/>}
      {submitPositioningModalShow &&
        <PlaylistPositioningModal successCallback={getCampaignInfo} data={curatorVsCampaign}
                                  onClose={() => setSubmitPositioningModalShow(false)}/>}
    </div>
  ) : (
    <></>
  )
}
export default CampaignViewForCurator
