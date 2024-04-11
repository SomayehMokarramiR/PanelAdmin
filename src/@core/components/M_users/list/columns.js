// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

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
  Eye,
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

export const columns = [
  {
    name: " نام و نام خانوادگی",
    sortable: true,
    minWidth: "230px",
    sortField: "fname",
    selector: (row) => row.fname +"  "+ row.lname,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column ">
          <Link
            // to={`/DetailCourse/${row.id}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{row.fname+" "+row.lname}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: " ایمیل",
    minWidth: "200px",
    sortable: true,
    sortField: "gmail",
    selector: (row) => row.gmail,
    cell: (row) => row.gmail,
  },
  {
    name: " شماره تماس ",
    minWidth: "130px",
    sortable: true,
    sortField: "phoneNumber",
    selector: (row) => row.phoneNumber,
    cell: (row) => row.phoneNumber,
  },
  {
    name: " تاریخ درج ",
    minWidth: "130px",
    sortable: true,
    sortField: "insertDate",
    selector: (row) => row.insertDate,
    cell: (row) => (
      <Badge className="bg-white text-info">
        {row.insertDate.substr(0, 10)}
      </Badge>
    ),
  },
  {
    name: " فعال / غیر فعال ",
    minWidth: "100px",
    sortable: true,
    sortField: "active",
    selector: (row) => row.active,
    cell: (row) => (
      <Badge
        className="text-capitalize cursor-pointer"
        color={row.active === "True" ? "light-success" : "light-danger"}
      >
        {row.active === "True" ? "فعال" : "غیرفعال"}
      </Badge>
    ),
  },
  {
    name: "مشاهده جزئیات",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownItem
            tag={Link}
            className="w-100"
            to={`/DetailUser/${row.id}`}
          >
            <Eye size={14} className="me-50" />
          </DropdownItem>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
