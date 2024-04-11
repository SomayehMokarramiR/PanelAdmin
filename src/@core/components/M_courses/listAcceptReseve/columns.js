// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
// import { store } from '@store/store'
// import { getUser, deleteUser } from '../store'

// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import http from "../../../interceptor";
import { useQuery } from "react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

// ** Renders Role Columns
const renderRole = (row) => {
  console.log("row", row);

  const roleObj = {
    subscriber: {
      class: "text-primary",
      icon: User,
    },
    maintainer: {
      class: "text-success",
      icon: Database,
    },
    editor: {
      class: "text-info",
      icon: Edit2,
    },
    author: {
      class: "text-warning",
      icon: Settings,
    },
    admin: {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${roleObj[row.role] ? roleObj[row.role].class : ""} me-50`}
      />
      {row.role}
    </span>
  );
};
const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

//===========================================
const handleDelete = async (values) => {

  const result = await http.delete(`/CourseReserve/`,values.reserveId);
  console.log(values.reserveId)
  if (result.success === true ) {
    toast.success(result.message);
  }
  else {
    toast.error(result.errors);
  }
  return result;

};
//==========================================

export const columns = [
  {
    name: " نام درس",
    sortable: true,
    minWidth: "200px",
    sortField: "courseName",
    selector: (row) => row.courseName,
  },
  {
    name: "نام دانشجو",
    sortable: true,
    minWidth: "160px",
    sortField: "role",
    selector: (row) => row.studentName,
    cell: (row) => row.studentName,    
  },
  {
    name: " تاریخ رزرو دوره ",
    minWidth: "130px",
    sortable: true,
    sortField: "reserverDate",
    selector: (row) => row.reserverDate,
    // cell: (row) => row.lastUpdate.substr(0, 10),
    cell: (row) => (
      <Badge className="bg-white text-info">
        {row.reserverDate.substr(0, 10)}
      </Badge>
    ),
  },
  ,
  {
    name: " تاییدیه ",
    minWidth: "100px",
    sortable: true,
    sortField: "accept",
    selector: (row) => row.accept,
    cell: (row) => {
      return (
        <Badge
          className="text-capitalize cursor-pointer"
          color={row.accept === true ? "light-success" : "light-danger"}
          onClick={() => handleActive(row)}
        >
          {row.accept === true ? "تایید شده" : " در انتظار تایید"}
        </Badge>
      );
    },
  },
  {
    name: "عملیات",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/DetailCourse/${row.courseId}`}
              // onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">جزییات</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle"  onClick={() => handleDelete(row)} > حذف
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
