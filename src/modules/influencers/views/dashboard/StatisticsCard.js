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
import {_getDashboardSummary} from "../../redux/actions"

const StatisticsCard = ({ cols }) => {

    const [values, setValues] = useState({
        totalcampaign : 0,
    approvedcampaign : 0,
    pendingcampaign : 0,
    declinedcampaign : 0,

    totaladmins: 0,
    approvedadmins : 0,
    inactiveadmins : 0,

    totalartist : 0,
    approvedartist : 0,
    pendingartist : 0,
    declinedartist : 0,

    totalcurators : 0,
    approvedcurators: 0,
    pendingcurators : 0,
    declinedcurators : 0
    })

    const getDashboardSummary = (data = {}) => {
        _getDashboardSummary(
            data => {
                setValues(prevState => {
                    return {totalcampaign: data.totalcampaign,
                        approvedcampaign : data.approvedcampaign,
                        pendingcampaign : data.pendingcampaign,
                        declinedcampaign : data.declinedcampaign,

                        totaladmins: data.totaladmins,
                        approvedadmins : data.approvedadmins,
                        inactiveadmins : data.inactiveadmins,

                        totalartist : data.totalartist,
                        approvedartist : data.approvedartist,
                        pendingartist : data.pendingartist,
                        declinedartist : data.declinedartist,

                        totalcurators : data.totalcurators,
                        approvedcurators: data.approvedcurators,
                        pendingcurators : data.pendingcurators,
                        declinedcurators : data.declinedcurators
                    }
                })
            }
        )
    }
    useEffect(() => {
        // code to run on component mount
        getDashboardSummary()
        //console.log(values.totalcampaign)
    }, [])

    const data = [
        {
            title: `${values.totaladmins}`,
            subtitle: 'Admins',
            color: 'light-primary',
            icon: <User size={24} />
        },
        {
            title: `${values.totalartist}`,
            subtitle: 'Artists',
            color: 'light-info',
            icon: <Video size={24} />
        },
        {
            title: `${values.totalcurators}`,
            subtitle: 'Curators',
            color: 'light-danger',
            icon: <VolumeUpTwoTone size={24} />
        },
        {
            title: `${values.totalcampaign}`,
            subtitle: 'Campaigns',
            color: 'light-success',
            icon: <Briefcase size={24} />
        }
]
    const renderData = () => {
        return data.map((item, index) => {
            return (
                <Col
                    key={index}
                    {...cols}
                >
                    <Media>
                        <Avatar color={item.color} icon={item.icon} className='mr-2' />
                        <Media className='my-auto' body>
                            <h4 className='font-weight-bolder mb-0'>{item.title}</h4>
                            <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
                        </Media>
                    </Media>
                </Col>
            )
        })
    }
    return (
        <Fragment>
            <Row className={'match-height'}>
                <Col xs='12' sm='12' lg='12'>
                    <Card className='card-statistics'>
                        <CardHeader>
                            <CardTitle tag='h4'>Statistics</CardTitle>
                            {/*<CardText className='card-text font-small-2 mr-25 mb-0'>Updated 1 month ago</CardText>*/}
                        </CardHeader>
                        <CardBody className='statistics-body'>
                            <Row>{renderData()}</Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs='6' sm='4' lg='4'>
                    <StatsHorizontal icon={<User size={21} />} color='' stats={`${values.totaladmins}`} statTitle={trans('Total Admins')} />
                </Col>
                <Col xs='6' sm='4' lg='4'>
                    <StatsHorizontal icon={<UserCheck size={21} />} color='success' stats={`${values.approvedadmins}`} statTitle={trans('Approved Admins')} />
                </Col>
                <Col xs='6' sm='4' lg='4'>
                    <StatsHorizontal icon={<UserCheck size={21} />} color='warning' stats={`${values.inactiveadmins}`} statTitle={trans('Inactive Admins')} />
                </Col>
                <Col xs='6' sm='3' lg='3'>
                    <StatsHorizontal icon={<Video size={21} />} color='' stats={`${values.totalartist}`} statTitle={trans('Total Artists')} />
                </Col>
                <Col xs='6' sm='3' lg='3'>
                    <StatsHorizontal icon={<Video size={21} />} color='success' stats={`${values.approvedartist}`} statTitle={trans('Approved Artists')} />
                </Col>
                <Col xs='6' sm='3' lg='3'>
                    <StatsHorizontal icon={<Video size={21} />} color='warning' stats={`${values.pendingartist}`} statTitle={trans('Pending Artists')} />
                </Col>
                <Col xs='6' sm='3' lg='3'>
                    <StatsHorizontal icon={<Video size={21} />} color='danger' stats={`${values.declinedartist}`} statTitle={trans('Disabled Artists')} />
                </Col>
                <Col xs='6' sm='3' lg='3'>
                    <StatsHorizontal icon={<VolumeUpTwoTone size={21} />} color='' stats={`${values.totalcurators}`} statTitle={trans('Total Curators')} />
                </Col>
                <Col xs='6' sm='3' lg='3'>
                    <StatsHorizontal icon={<VolumeUpTwoTone size={21} />} color='success' stats={`${values.approvedcurators}`} statTitle={trans('Approved Curators')} />
                </Col>
                <Col xs='6' sm='3' lg='3'>
                    <StatsHorizontal icon={<VolumeUpTwoTone size={21} />} color='warning' stats={`${values.pendingcurators}`} statTitle={trans('Pending Curators')} />
                </Col>
                <Col xs='6' sm='3' lg='3'>
                    <StatsHorizontal icon={<VolumeUpTwoTone size={21} />} color='danger' stats={`${values.declinedcurators}`} statTitle={trans('Disabled Curators')} />
                </Col>
                <Col xs='6' sm='3' lg='3'>
                    <StatsHorizontal icon={<Briefcase size={21} />} color='' stats={`${values.totalcampaign}`} statTitle={trans('Total Campaigns')} />
                </Col>
                <Col xs='6' sm='3' lg='3'>
                    <StatsHorizontal icon={<Briefcase size={21} />} color='success' stats={`${values.approvedcampaign}`} statTitle={trans('Approved Campaigns')} />
                </Col>
                <Col xs='6' sm='3' lg='3'>
                    <StatsHorizontal icon={<Briefcase size={21} />} color='warning' stats={`${values.pendingcampaign}`} statTitle={trans('Pending Campaigns')} />
                </Col>
                <Col xs='6' sm='3' lg='3'>
                    <StatsHorizontal icon={<Briefcase size={21} />} color='danger' stats={`${values.declinedcampaign}`} statTitle={trans('Declined Campaigns')} />
                </Col>
            </Row>
        </Fragment>

    )
}

export default StatisticsCard
