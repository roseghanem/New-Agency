// ** Reactstrap Imports
import {Fragment} from "react"
import {Card, CardHeader, Col, Progress, Row} from 'reactstrap'
import ArtistInvoicesList from "./ArtistInvoicesList"
import CuratorPayoutsList from "./CuratorPayoutsList"

const CampaignsTab = ({user}) => {
  return (
      user.user_type_id === 1 ? (
          <Fragment>
              <Row>
                  <Col>
                      <ArtistInvoicesList artist={user} />
                  </Col>
              </Row>
          </Fragment>
      ) : (
          <Fragment>
              <Row>
                  <Col>
                      <CuratorPayoutsList curator={user} />
                  </Col>
              </Row>
          </Fragment>
      )
  )
}

export default CampaignsTab
