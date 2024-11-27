// ** Reactstrap Imports
import {Fragment} from "react"
import {Card, CardHeader, Col, Progress, Row} from 'reactstrap'
import ArtistLastFIveCampaignsList from "./ArtistLastFIveCampaignsList"
import ArtistLastFiveInvoicesList from "./ArtistLastFiveInvoicesList"
import CuratorLastFIveCampaignsList from "./CuratorLastFIveCampaignsList"
import CuratorLastFivePayoutsList from "./CuratorLastFivePayoutsList"

const DashboardTab = ({user}) => {
  return (
      user.user_type_id === 1 ? (
          <Fragment>
              <Row>
                  <Col>
                      <ArtistLastFIveCampaignsList artist={user} />
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <ArtistLastFiveInvoicesList artist={user} />
                  </Col>
              </Row>
          </Fragment>
      ) : (
          <Fragment>
              <Row>
                  <Col>
                      <CuratorLastFIveCampaignsList curator={user} />
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <CuratorLastFivePayoutsList curator={user} />
                  </Col>
              </Row>
          </Fragment>
      )
  )
}

export default DashboardTab
