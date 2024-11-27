import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import {_payInvoice} from "../../redux/actions"

export default function PaypalButtons(props) {
  const {invoice, refreshInvoiceData} = props
  return (
    <PayPalScriptProvider options={{ "client-id": "AQen7F03sy4wQo44DccUFk6nxKhcoZa7d0zqkbDs2_DoS1mPqK-k3giC--1xC1C_yGfUUEsL1W_cH__B" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: `${invoice.amount}`
                }
              }
            ]
          })
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            const finalData = {
              id: invoice.id,
              transaction_id: data.orderID,
              pay_time: details.create_time,
              payer_email: details.payer.email_address,
              payer_firstname: details.payer.name.given_name,
              payer_surname: details.payer.name.surname
            }
            _payInvoice(
              finalData,
              () => {
                refreshInvoiceData()
              },
              () => {}
            )
          })
        }}
      />
    </PayPalScriptProvider>
  )
}