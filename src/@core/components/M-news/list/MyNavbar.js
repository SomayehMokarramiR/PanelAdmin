

// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'
import CoursesList from './Table'
import UserInfoCard from '../FormDetailNews/UserInfoCard'



const MyNavbar = ({ active, toggleTab}) => {
  return (
    <Fragment>
      <Nav pills className='mb-2 text-nowrap  flex-xl-nowrap'>
      <NavItem>
        </NavItem>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'> تمام خبر ها  </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Bookmark className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'> دوره های رزرو شده  </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Bookmark className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'>  رزروهای تایید شده</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
            <Lock className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'>رزروهای تایید نشده</span>
          </NavLink>
        </NavItem> 
        <NavItem>
          <NavLink active={active === '6'} onClick={() => toggleTab('6')}>
            <Lock className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'> اضافه کردن گروه</span>
          </NavLink>
        </NavItem> 
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
           {/* <CoursesList />  */}
        </TabPane>
        <TabPane tabId='2'>
          {/* <SecurityTab /> */}
        </TabPane>
        <TabPane tabId='3'>
          {/* <BillingPlanTab /> */}
        </TabPane>
        <TabPane tabId='4'>
          {/* <Notifications /> */}
        </TabPane>
        <TabPane tabId='5'>
          {/* <Connections /> */}
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default MyNavbar
