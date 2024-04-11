// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Link, Bell } from "react-feather";
import { Fragment, useState } from "react";
import CoursesList from "../list/Table";
import CoursesReserve from "../listReseve/Table";
import CoursesAcceptReserve from "../listAcceptReseve";

const TabsCourses = ({ activeTab, toggleTab }) => {
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
            <span className='fw-bold fs-4'> تمام دوره ها  </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink   active={active === "2"}
          onClick={() => {
            toggle("2");
          }}>
            <Bookmark className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'> دوره های رزرو شده  </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink    active={active === "3"}
          onClick={() => {
            toggle("3");
          }}>
            <Bookmark className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'>  رزروهای تایید شده</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink    active={active === "4"}
          onClick={() => {
            toggle("4");
          }}>
            <Lock className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'>رزروهای تایید نشده</span>
          </NavLink>
        </NavItem> 
        <NavItem>
          <NavLink    active={active === "5"}
          onClick={() => {
            toggle("5");
          }}>
            <Lock className='font-medium-3 me-40' />
            <span className='fw-bold fs-4'> اضافه کردن گروه</span>
          </NavLink>
        </NavItem> 

      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
           <CoursesList /> 
        </TabPane>
        <TabPane tabId='2'>
          <CoursesReserve /> 
        </TabPane>
        <TabPane tabId='3'>
          <CoursesAcceptReserve/>
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
};

export default TabsCourses;
