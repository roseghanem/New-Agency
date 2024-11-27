import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'
import { HelpCircle } from 'react-feather'
import {Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Badge} from 'reactstrap'
import _ from "lodash"

import { ThemeColors } from '@src/utility/context/ThemeColors'
import {trans} from '@utils'

const ScrapingStatsOverview = ({remoteData}) => {
    const context = useContext(ThemeColors)

    const options = {
            chart: {
                sparkline: {
                    enabled: true
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    left: 1,
                    top: 1,
                    opacity: 0.1
                }
            },
            colors: ['#51e5a8'],
            plotOptions: {
                radialBar: {
                    offsetY: 10,
                    startAngle: -150,
                    endAngle: 150,
                    hollow: {
                        size: '77%'
                    },
                    track: {
                        background: '#ebe9f1',
                        strokeWidth: '50%'
                    },
                    dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            color: '#5e5873',
                            fontFamily: 'Montserrat',
                            fontSize: '2.86rem',
                            fontWeight: '600'
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: [context.colors.success.main],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100]
                }
            },
            stroke: {
                lineCap: 'round'
            },
            grid: {
                padding: {
                    bottom: 30
                }
            }
        },
        series = [Math.floor(_.size(remoteData.tracks) > 0 ? (_.size(_.filter(remoteData.tracks, x => x.email))) / _.size(remoteData.tracks) * 100 : 0)]

    return (
        <Card className={'mb-0'}>
            <CardHeader>
                <CardText className='card-text font-small-2 mr-25 mb-0 d-flex justify-content-between w-100'>
                    <Badge color={'light-primary'}>
                        {`${new Date(remoteData.created_at).toDateString()} - ${new Date(remoteData.created_at).toLocaleTimeString()}`}
                    </Badge>
                    <Badge color={'light-warning'}>
                        {remoteData.admin.name}
                    </Badge>
                </CardText>
            </CardHeader>
            <CardBody className='p-0'>
                <Chart options={options} series={series} type='radialBar' height={245} />
            </CardBody>
            <Row className='border-top text-center mx-0'>
                <Col xs='6' className='border-right py-1'>
                    <CardText className='text-muted mb-0'>Email Found</CardText>
                    <h3 className='font-weight-bolder mb-0'>{_.size(_.filter(remoteData.tracks, x => x.email))}</h3>
                </Col>
                <Col xs='6' className='py-1'>
                    <CardText className='text-muted mb-0'>Not found</CardText>
                    <h3 className='font-weight-bolder mb-0'>{_.size(_.filter(remoteData.tracks, x => !x.email))}</h3>
                </Col>
            </Row>
        </Card>
    )
}
export default ScrapingStatsOverview
