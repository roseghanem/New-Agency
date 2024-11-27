// ** Third Party Components
import {Card, CardBody, CardText, Row, Col, Table, Badge, Button} from 'reactstrap'
import moment from "moment/moment"
import React from "react"

const PreviewCard = ({ data, setBudgetModalShow }) => {
  return data !== null ? (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        {/* Header */}
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper'>
              <img src={require('@fwsrc/assets/images/logo.png').default} width={104} height={104}/>
            </div>
            {/*<CardText className='mb-25'>San Diego County, CA 91905, USA</CardText>*/}
            {/*<CardText className='mb-0'>+1 (123) 456 7891, +44 (876) 543 2198</CardText>*/}
          </div>
          <div className='mt-md-0 mt-2'>
            <h4 className='invoice-title'>
              Invoice <span className='invoice-number text-primary'>#{data.num}</span>
            </h4>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Date Issued:</p>
              <p className='invoice-date'>{moment(data.created_at).format('MMMM, DD-Y')}</p>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      <hr className='invoice-spacing' />

      {/* Address and Contact */}
      <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <Col className='p-0' lg='8'>
            <h6 className='mb-2'>Invoice To:</h6>
            <h6 className='mb-25'>{data.campaign?.artist?.name}</h6>
            <CardText className='mb-25'>{data.campaign?.artist?.phone}</CardText>
            <CardText className='mb-25'>{data.campaign?.artist?.email}</CardText>
            {/*<CardText className='mb-25'>{data.client.contact}</CardText>*/}
            {/*<CardText className='mb-0'>{data.client.companyEmail}</CardText>*/}
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' lg='4'>
            <h6 className='mb-2'>Payment Details:</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pr-1'>Total Due:</td>
                  <td>
                    <span className='font-weight-bolder'>${data.amount}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pr-1'>Status:</td>
                  <td>
                    <Badge color={data.is_paid ? 'success' : 'warning'}>{data.is_paid ? 'Paid' : 'Pending'}</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* Artist */}
      <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <Col className='p-0 mt-xl-0 mt-2' lg='12'>
            <h6 className='mb-2'>DESCRIPTION:</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pr-1'>Campaign Name:</td>
                  <td>
                    <span className='font-weight-bolder'>{data.campaign.name}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pr-1'>Language:</td>
                  <td>
                    {data.campaign.language.name}
                  </td>
                </tr>
                <tr>
                  <td className='pr-1'>Publish Date:</td>
                  <td>
                    {moment(data.campaign.start_date).format('MMMM, DD-Y')}
                  </td>
                </tr>
                <tr>
                  <td className='pr-1'>Genres:</td>
                  <td>
                    {_.map(data.campaign.genres, (x, i) => {
                      return (
                          <Badge className={'mx-50'} key={i} pill color={'info'}>
                            {x.name}
                          </Badge>
                      )
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      {/* /Artist */}

      {/* Transaction */}
      {(data.transaction_id && !data.payed_by) && (
        <CardBody className='invoice-padding pt-0'>
          <Row className='invoice-spacing'>
            <Col className='p-0 mt-xl-0 mt-2' lg='12'>
              <h6 className='mb-2'>Transaction:</h6>
              <table>
                <tbody>
                <tr>
                  <td className='pr-1'>Transaction ID:</td>
                  <td>
                    <span className='font-weight-bolder'>{data.transaction_id}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pr-1'>Payer First Name:</td>
                  <td>
                    <span className='font-weight-bolder'>{data.payer_firstname}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pr-1'>Payer Sur Name:</td>
                  <td>
                    <span className='font-weight-bolder'>{data.payer_surname}</span>
                  </td>
                </tr>
                {
                  data.payed_by && (
                    <tr>
                      <td className='pr-1'>Payed By:</td>
                      <td>
                        <Badge color={'warning'}><span className='font-weight-bolder'>{data.payed_by?.name}</span></Badge>
                      </td>
                    </tr>
                  )
                }
                <tr>
                  <td className='pr-1'>Payed At:</td>
                  <td>
                    <Badge color={'primary'}><span className='font-weight-bolder'>{moment(data.created_at).format('Y-MM-DD')}</span></Badge>
                  </td>
                </tr>
                <tr>
                  <td className='pr-1'>Payer Email:</td>
                  <td>
                    <span className='font-weight-bolder'>{data.payer_email}</span>
                  </td>
                </tr>
                {
                  data.attachment_link && (
                    <tr>
                      <td className='pr-1'>Attachment:</td>
                      <td>
                        <a target={'_blank'} href={FileUrl(data.attachment_link)} className='font-weight-bolder'>Link</a>
                      </td>
                    </tr>
                  )
                }
                </tbody>
              </table>
            </Col>
          </Row>
        </CardBody>
      )}
      {/*/!* Invoice Description *!/*/}
      {/*<Table responsive>*/}
      {/*  <thead>*/}
      {/*    <tr>*/}
      {/*      <th className='py-1'>Task description</th>*/}
      {/*      <th className='py-1'>Rate</th>*/}
      {/*      <th className='py-1'>Hours</th>*/}
      {/*      <th className='py-1'>Total</th>*/}
      {/*    </tr>*/}
      {/*  </thead>*/}
      {/*  <tbody>*/}
      {/*    <tr>*/}
      {/*      <td className='py-1'>*/}
      {/*        <p className='card-text font-weight-bold mb-25'>Native App Development</p>*/}
      {/*        <p className='card-text text-nowrap'>*/}
      {/*          Developed a full stack native app using React Native, Bootstrap & Python*/}
      {/*        </p>*/}
      {/*      </td>*/}
      {/*      <td className='py-1'>*/}
      {/*        <span className='font-weight-bold'>$60.00</span>*/}
      {/*      </td>*/}
      {/*      <td className='py-1'>*/}
      {/*        <span className='font-weight-bold'>30</span>*/}
      {/*      </td>*/}
      {/*      <td className='py-1'>*/}
      {/*        <span className='font-weight-bold'>$1,800.00</span>*/}
      {/*      </td>*/}
      {/*    </tr>*/}
      {/*    <tr className='border-bottom'>*/}
      {/*      <td className='py-1'>*/}
      {/*        <p className='card-text font-weight-bold mb-25'>Ui Kit Design</p>*/}
      {/*        <p className='card-text text-nowrap'>Designed a UI kit for native app using Sketch, Figma & Adobe XD</p>*/}
      {/*      </td>*/}
      {/*      <td className='py-1'>*/}
      {/*        <span className='font-weight-bold'>$60.00</span>*/}
      {/*      </td>*/}
      {/*      <td className='py-1'>*/}
      {/*        <span className='font-weight-bold'>20</span>*/}
      {/*      </td>*/}
      {/*      <td className='py-1'>*/}
      {/*        <span className='font-weight-bold'>$1200.00</span>*/}
      {/*      </td>*/}
      {/*    </tr>*/}
      {/*  </tbody>*/}
      {/*</Table>*/}
      {/*/!* /Invoice Description *!/*/}

      {/*/!* Total & Sales Person *!/*/}
      {/*<CardBody className='invoice-padding pb-0'>*/}
      {/*  <Row className='invoice-sales-total-wrapper'>*/}
      {/*    <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>*/}
      {/*      <CardText className='mb-0'>*/}
      {/*        <span className='font-weight-bold'>Salesperson:</span> <span className='ml-75'>Alfie Solomons</span>*/}
      {/*      </CardText>*/}
      {/*    </Col>*/}
      {/*    <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>*/}
      {/*      <div className='invoice-total-wrapper'>*/}
      {/*        <div className='invoice-total-item'>*/}
      {/*          <p className='invoice-total-title'>Subtotal:</p>*/}
      {/*          <p className='invoice-total-amount'>$1800</p>*/}
      {/*        </div>*/}
      {/*        <div className='invoice-total-item'>*/}
      {/*          <p className='invoice-total-title'>Discount:</p>*/}
      {/*          <p className='invoice-total-amount'>$28</p>*/}
      {/*        </div>*/}
      {/*        <div className='invoice-total-item'>*/}
      {/*          <p className='invoice-total-title'>Tax:</p>*/}
      {/*          <p className='invoice-total-amount'>21%</p>*/}
      {/*        </div>*/}
      {/*        <hr className='my-50' />*/}
      {/*        <div className='invoice-total-item'>*/}
      {/*          <p className='invoice-total-title'>Total:</p>*/}
      {/*          <p className='invoice-total-amount'>$1690</p>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </Col>*/}
      {/*  </Row>*/}
      {/*</CardBody>*/}
      {/*/!* /Total & Sales Person *!/*/}

      <hr className='invoice-spacing' />

      {/* Invoice Note */}
      <CardBody className='invoice-padding pt-0'>
        <Row>
          <Col sm='12'>
            <span className='font-weight-bold'>Note: </span>
            <span>
              It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
              projects. Thank You!
            </span>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
    </Card>
  ) : null
}

export default PreviewCard
