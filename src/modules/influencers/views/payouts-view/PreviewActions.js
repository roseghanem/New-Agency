// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import { Card, CardBody, Button } from 'reactstrap'

import {_confirm} from '@utils'
import {_payPayoutWithWise} from "../../redux/actions"
import {useSelector} from "react-redux"
import React from "react"

import {CanCall} from '@authModule'

const PreviewActions = ({ data, setBudgetModalShow }) => {
  const loading = useSelector(store => store.app.loading)

  const payWithWise = () => {
    _confirm({
      callback: (c) => {
        _payPayoutWithWise(
          data.id,
          () => {},
          () => {}
        )
      }
    })
  }

  return (
    <Card className='invoice-action-wrapper'>
      <CardBody>
        {/*<Button.Ripple color='primary' block className='mb-75' onClick={() => setSendSidebarOpen(true)}>*/}
        {/*  Send Invoice*/}
        {/*</Button.Ripple>*/}
        {/*<Button.Ripple color='secondary' block outline className='mb-75'>*/}
        {/*  Download*/}
        {/*</Button.Ripple>*/}
        {/*<Button.Ripple*/}
        {/*  color='secondary'*/}
        {/*  tag={Link}*/}
        {/*  to='/apps/invoice/print'*/}
        {/*  target='_blank'*/}
        {/*  block*/}
        {/*  outline*/}
        {/*  className='mb-75'*/}
        {/*>*/}
        {/*  Print*/}
        {/*</Button.Ripple>*/}
        {/*<Button.Ripple tag={Link} to={`/apps/invoice/edit/${id}`} color='secondary' block outline className='mb-75'>*/}
        {/*  Edit*/}
        {/*</Button.Ripple>*/}
        <CanCall action='INFLUENCER_PAY_PAYOUT'>
          <>
            <Button.Ripple color='success' block onClick={payWithWise} disabled={loading}>
              Pay via wise
            </Button.Ripple>
            <Button.Ripple color='primary' block onClick={() => setBudgetModalShow(true)}>
              Pay Manually
            </Button.Ripple>
          </>
        </CanCall>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
