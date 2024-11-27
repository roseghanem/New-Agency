import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Third Party Components
import axios from 'axios'
import { Row, Col, Alert } from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'

// ** Styles
import '@styles/base/pages/app-invoice.scss'
import {_getCampaignInfo, _getInvoiceInfo} from "../../redux/actions"
import BasicInfoModal from "../invoices-list/BasicInfoModal"
import PaypalButtons from "./PaypalButtons"

const InvoicePreview = () => {
  // ** Vars
  const { id } = useParams()

  // ** States
  const [data, setData] = useState(null)
    const [budgetModalShow, setBudgetModalShow] = useState(false)
    // const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  // const [addPaymentOpen, setAddPaymentOpen] = useState(false)


    const getInvoiceInfo = () => {
        _getInvoiceInfo(
            id,
            ({invoice}) => setData(invoice)
        )
    }

  // ** Get invoice on mount based on id
  useEffect(() => {
      getInvoiceInfo()
  }, [])

  return data !== null && data !== undefined ? (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xl={9} md={8} sm={12}>
          <PreviewCard setBudgetModalShow={setBudgetModalShow} data={data} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          {
            !data.is_paid && (
              <PaypalButtons invoice={data} refreshInvoiceData={getInvoiceInfo} />
            )
          }
          {/*<PreviewActions id={id} setSendSidebarOpen={setSendSidebarOpen} setAddPaymentOpen={setAddPaymentOpen} />*/}
        </Col>
      </Row>
    </div>
  ) : ''
  //     (
  //   <Alert color='danger'>
  //     <h4 className='alert-heading'>Invoice not found</h4>
  //     <div className='alert-body'>
  //       Invoice with id: {id} doesn't exist. Check list of all invoices: <Link to='/invoices/list'>Invoice List</Link>
  //     </div>
  //   </Alert>
  // )
}

export default InvoicePreview
