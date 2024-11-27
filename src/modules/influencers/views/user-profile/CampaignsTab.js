// ** Reactstrap Imports
import {Fragment} from "react"
import {Card, CardHeader, Col, Progress, Row} from 'reactstrap'
import ArtistLastFIveCampaignsList from "./ArtistLastFIveCampaignsList"
import ArtistLastFiveInvoicesList from "./ArtistLastFiveInvoicesList"
import CuratorLastFIveCampaignsList from "./CuratorLastFIveCampaignsList"
import CuratorLastFivePayoutsList from "./CuratorLastFivePayoutsList"
import ArtistCampaignsList from "./ArtistCampaignsList"
import ArtistInvoicesList from "./ArtistInvoicesList"
import CuratorCampaignsList from "./CuratorCampaignsList"

const CampaignsTab = ({user}) => {
  return (
      user.user_type_id === 1 ? (
          <Fragment>
              <Row>
                  <Col>
                      <ArtistCampaignsList artist={user} />
                  </Col>
              </Row>
          </Fragment>
      ) : (
          <Fragment>
              <Row>
                  <Col>
                      <CuratorCampaignsList curator={user} />
                  </Col>
              </Row>
          </Fragment>
      )
  )
}

export default CampaignsTab
