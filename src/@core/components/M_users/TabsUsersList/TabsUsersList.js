// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Link, Bell } from "react-feather";
import { Fragment, useState } from "react";
import UserList from "../list/Table";
import UserTeacher from "../listTeacher/Table";
import UserAdministrator from "../listAdministrator/Table";
import UserStudent from "../listTeacher/Table";
import UserMentor from "../listTeacher/Table";
import UserRefree from "../listRefree/Table";



const TabsUsersList = ({ activeTab, toggleTab }) => {
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <Fragment>
      <Nav pills className='mb-2 text-nowrap  flex-xl-nowrap'>
      <NavItem>
        </NavItem>
        <NavItem>
          <NavLink   active={active === "1"}
          onClick={() => {
            toggle("1");
          }}>
            <User className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'> تمام  کاربران  </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink   active={active === "2"}
          onClick={() => {
            toggle("2");
          }}>
            <User className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'>اساتید</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink    active={active === "3"}
          onClick={() => {
            toggle("3");
          }}>
            <User className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'> داوران  </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink    active={active === "4"}
          onClick={() => {
            toggle("4");
          }}>
            <User className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'> منتورها </span>
          </NavLink>
        </NavItem> 
        <NavItem>
          <NavLink    active={active === "5"}
          onClick={() => {
            toggle("5");
          }}>
            <User className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'> ادمین ها  </span>
          </NavLink>
        </NavItem> 
        <NavItem>
          <NavLink   active={active === "6"}
          onClick={() => {
            toggle("6");
          }}>
            <User className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'>  دانشجویان  </span>
          </NavLink>
        </NavItem>

      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
           <UserList /> 
        </TabPane>
        <TabPane tabId='2'>
          <UserTeacher /> 
        </TabPane>
        <TabPane tabId='3'>
          <UserRefree/>
        </TabPane>
        <TabPane tabId='4'>
          <UserMentor />
        </TabPane>
        <TabPane tabId='5'>
          <UserAdministrator />
        </TabPane>
        <TabPane tabId='6'>
          <UserStudent />
        </TabPane>
      </TabContent>
    </Fragment>
  )
};

export default TabsUsersList;
