// ** React Imports
import React, {Fragment, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import classnames from 'classnames'
import {Star, X, ShoppingCart, Info, DollarSign, Percent, Link as Link3, Eye} from 'react-feather'
import {
    Card,
    CardBody,
    CardText,
    Button,
    Alert,
    Col,
    Row,
    Badge,
    CardHeader,
    CardTitle,
    Label,
    Input,
    Container
} from 'reactstrap'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment"
import _ from "lodash"

import BreadCrumbs from '@components/breadcrumbs'
import {ButtonSpinner, ErrorMessages} from '@src/components'

import {_addCuratorVsCampaing, _getPublishedCampaigns, _payPayout} from "../../redux/actions"
import {getUserData} from "../../utility/Utils"

import '@styles/base/pages/app-ecommerce.scss'
import '../../assets/scss/style.css'
import Sidebar from "./Sidebar"
import CuratorCampaignListItem from "./CuratorCampaignListItem"
import CuratorCampaignsListHeader from "./CuratorCampaignsListHeader"

const CuratorCampaignsList = props => {
    // ** Store Vars
    const { selectedTier, setSelectedTier, selectedStatus, setSelectedStatus, selectedGenres, setSelectedGenres, selectedReleased, setSelectedReleased } = props.states

    const dispatch = useDispatch()

    const history = useHistory()

    const user = getUserData()


    const [valErrors, setValErrors] = useState({})
    const [values, setValues] = useState({
        campaigns: [],
        appliedCampaigns: [],
        declinedcampaigns: [],
        page: 1,
        total: 1,
        totalPages: 1
    })
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const getCampaigns = (data = {}) => {
        _getPublishedCampaigns(
            data,
            ({campaigns, appliedcampigns, declinedCampaigns}) => {
                setValues(prevState => {
                    return {
                        ...prevState,
                        campaigns: campaigns.data,
                        appliedCampaigns: appliedcampigns,
                        declinedcampaigns:declinedCampaigns,
                        page: campaigns.page,
                        total: campaigns.total,
                        totalPages: campaigns.last_page
                    }
                })
            }
        )
    }
    useEffect(() => {
        getCampaigns()
        console.log('ddd', values.declinedcampaigns)
    }, [])

    const applyOnCampaign = (data) => {
        _addCuratorVsCampaing(
            {curator_id: user.id, ...data},
            ({CuratorVsCampaign}) => {
                history.push(`/campaigns/${CuratorVsCampaign.id}`)
            },
            (err) => {

            }
        )
    }

    // ** Renders wishlist products
    const renderWishlist = () => {
        return values.campaigns.map(item => {
            const curatorVsCampaign = values.appliedCampaigns.find(x => x.campaign_id === item.id)
            const curatorVsCampaigndeclined = values.declinedcampaigns.find(x => x.campaign_id === item.id)

            const plyrProps = {
                source: `${process.env.REACT_APP_FILES_BASE_URL}/${item.media_link}`
            }

            return (
                <CuratorCampaignListItem applyOnCampaign={applyOnCampaign} curatorVsCampaign={curatorVsCampaign} curatorVsCampaigndeclined={curatorVsCampaigndeclined} plyrProps={plyrProps} item={item} />
            )
        })
    }

    return (
        <div className='list-view product-checkout d-flex'>
            {/*<div className={'d-none d-lg-block'} style={{width: 260}}>*/}
                <Sidebar sidebarOpen={sidebarOpen} states={{selectedTier, setSelectedTier, selectedStatus, setSelectedStatus, selectedGenres, setSelectedGenres, selectedReleased, setSelectedReleased}} refreshCampaigns={getCampaigns} />
            {/*</div>*/}
            <div className='checkout-items w-100'>
                <CuratorCampaignsListHeader setSidebarOpen={setSidebarOpen} />
                <div
                  className={classnames('body-content-overlay', {
                      show: sidebarOpen
                  })}
                  onClick={() => setSidebarOpen(false)}
                ></div>
                {renderWishlist()}
                <Container>
                    <Row>
                        <Col>
                            <ReactPaginate
                                previousLabel={''}
                                nextLabel={''}
                                breakLabel='...'
                                pageCount={values.totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                activeClassName='active'
                                // forcePage={values.page !== 0 ? values.page - 1 : 0}
                                onPageChange={page => getCampaigns({
                                    page: page.selected + 1,
                                    selectedTier,
                                    selectedStatus,
                                    selectedGenres
                                })}
                                pageClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                nextClassName={'page-item next'}
                                previousClassName={'page-item prev'}
                                previousLinkClassName={'page-link'}
                                pageLinkClassName={'page-link'}
                                breakClassName='page-item'
                                breakLinkClassName='page-link'
                                containerClassName={
                                    'pagination react-paginate pagination-sm justify-content-end pr-1 mt-1'
                                }
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default CuratorCampaignsList
