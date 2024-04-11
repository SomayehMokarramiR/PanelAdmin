// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Link, Bell } from "react-feather";

import { useState } from "react";
import ProUserCourses from "../../listUerCourses";
import ProReverseUserCourses from "../../listUerReverseCourses";

const TabsProfile = ({ activeTab, toggleTab }) => {
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <Nav pills className="mb-2">
      <NavItem>
        <NavLink
          active={active === "1"}
          onClick={() => {
            toggle("1");
          }}
        >
          <Bookmark size={18} className="me-50" />
          <span className="fw-bold">تمام دوره های کاربر</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          active={active === "2"}
          onClick={() => {
            toggle("2");
          }}
        >
          <Bell size={18} className="me-50" />
          <span className="fw-bold">دوره های رزرو شده کاربر</span>
        </NavLink>
      </NavItem>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <ProUserCourses />
        </TabPane>
        <TabPane tabId="2">
          <ProReverseUserCourses />
        </TabPane>
      </TabContent>
    </Nav>
  );
};

export default TabsProfile;
