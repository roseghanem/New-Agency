import classnames from 'classnames'
import Avatar from '@components/avatar'
import {TrendingUp, User, Box, DollarSign, Users} from 'react-feather'
import {Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media, Badge} from 'reactstrap'

const StatsCard = ({ cols = {sm : 6, md: 4}, remoteData }) => {
    const data = [
        {
            title: _.size(remoteData.tracks),
            subtitle: 'Artists',
            color: 'light-primary',
            icon: <Users size={24} />
        },
        {
            title: _.size(_.filter(remoteData.tracks, x => x.email)),
            subtitle: 'Emails found',
            color: 'light-success',
            icon: <Users size={24} />
        },
        {
            title: _.size(_.filter(remoteData.tracks, x => !x.email)),
            subtitle: 'Not found',
            color: 'light-danger',
            icon: <Users size={24} />
        }
    ]

    const renderData = () => {
        return data.map((item, index) => {
            const margin = Object.keys(cols)
            return (
                <Col
                    key={index}
                    {...cols}
                    className={classnames({
                        [`mb-2 mb-${margin[0]}-0`]: index !== data.length - 1
                    })}
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
        <Card className='card-statistics mb-0'>
            <CardHeader>
                <CardTitle tag='h4'>Statistics</CardTitle>
                <CardText className='card-text font-small-2 mr-25 mb-0'>
                    <Badge color={'light-primary'}>
                        {`${new Date(remoteData.created_at).toDateString()} - ${new Date(remoteData.created_at).toLocaleTimeString()}`}
                    </Badge>
                </CardText>
            </CardHeader>
            <CardBody className='statistics-body'>
                <Row>{renderData()}</Row>
            </CardBody>
        </Card>
    )
}

export default StatsCard