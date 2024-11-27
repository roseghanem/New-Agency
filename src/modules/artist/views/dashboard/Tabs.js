// ** React Imports
import {Fragment, useState} from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'

// ** User Components
import UserProjectsList from './UserProjectsList'
import DashboardTab from "./DashboardTab"
import CampaignsTab from "./CampaignsTab"
import InvoicesPayoutsTab from "./InvoicesPayoutsTab"

const UserTabs = ({ user }) => {
  const [active, setActive] = useState('1')
  return (
    <Fragment>
      {/*<Nav pills className='mb-2'>*/}
      {/*  <NavItem>*/}
      {/*    <NavLink active={active === '1'} onClick={() => setActive('1')}>*/}
      {/*      /!*<User className='font-medium-3 me-50' />*!/*/}
      {/*      <span className='fw-bold'>Dashboard</span>*/}
      {/*    </NavLink>*/}
      {/*  </NavItem>*/}

      {/*  <NavItem>*/}
      {/*    <NavLink active={active === '2'} onClick={() => setActive('2')}>*/}
      {/*      /!*<User className='font-medium-3 me-50' />*!/*/}
      {/*      <span className='fw-bold'>Campaigns</span>*/}
      {/*    </NavLink>*/}
      {/*  </NavItem>*/}

      {/*  <NavItem>*/}
      {/*    <NavLink active={active === '3'} onClick={() => setActive('3')}>*/}
      {/*      /!*<User className='font-medium-3 me-50' />*!/*/}
      {/*      <span className='fw-bold'>{user.user_type_id === 1 ? 'Invoices' : 'Payouts'}</span>*/}
      {/*    </NavLink>*/}
      {/*  </NavItem>*/}
      {/*</Nav>*/}
      {/*<TabContent activeTab={active}>*/}
      {/*  <TabPane tabId='1'>*/}
          <DashboardTab user={user} />
      {/*  </TabPane>*/}
      {/*  <TabPane tabId='2'>*/}
      {/*    <CampaignsTab user={user} />*/}
      {/*  </TabPane>*/}
      {/*  <TabPane tabId='3'>*/}
      {/*    <InvoicesPayoutsTab user={user} />*/}
      {/*  </TabPane>*/}
      {/*</TabContent>*/}
    </Fragment>
  )
}
export default UserTabs
