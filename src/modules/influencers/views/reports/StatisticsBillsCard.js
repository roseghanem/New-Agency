import classnames from 'classnames'
import Avatar from '@components/avatar'
import {
    TrendingUp,
    Box,
    DollarSign,
    Hash,
    User,
    UserX,
    UserCheck,
    Briefcase,
    Volume,
    Volume1,
    VolumeX, Video
} from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap'
import React, {Fragment, useEffect, useState} from "react"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import {trans} from "../../../core/utility/Utils"
import {_getPublishedCampaigns} from "../../../artist/redux/actions"
import {VolumeUpTwoTone} from "@material-ui/icons"
import {_getDashboardSummary, _getPaymentSummary} from "../../redux/actions"

const StatisticsBillsCard = ({ cols }) => {

    const [values, setValues] = useState({
        totalpayedinvoices : 0,
        totalpayedpayout : 0,
        totalprofit : 0
    })

    const getPaymentSummary = (data = {}) => {
        _getPaymentSummary(
            data => {
                setValues(prevState => {
                    return {totalpayedinvoices: data.totalpayedinvoices,
                        totalpayedpayout : data.totalpayedpayout,
                        totalprofit : data.totalpayedinvoices - data.totalpayedpayout
                    }
                })
            }
        )
    }
    useEffect(() => {
        // code to run on component mount
        getPaymentSummary()
        //console.log(values.totalcampaign)
    }, [])

    return (
        <Fragment>
            <Row className={'match-height'}>

                <Col xs='6' sm='4' lg='4'>
                    <StatsHorizontal icon={<DollarSign size={21} />} color='success' stats={`${values.totalpayedinvoices}`} statTitle={trans('Total payed invoices')} />
                </Col>
                <Col xs='6' sm='4' lg='4'>
                    <StatsHorizontal icon={<DollarSign size={21} />} color='danger' stats={`${values.totalpayedpayout}`} statTitle={trans('Total payed payouts')} />
                </Col>
                <Col xs='6' sm='4' lg='4'>
                    <StatsHorizontal icon={<DollarSign size={21} />} color='' stats={`${values.totalprofit}`} statTitle={trans('Total profit')} />
                </Col>
            </Row>
        </Fragment>

    )
}

export default StatisticsBillsCard
