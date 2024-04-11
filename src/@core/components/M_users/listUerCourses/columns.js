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

import IconCourse from "../../../assets/images/Icon_Course.jpg";

// ** Renders Role Columns

export const columns = [
  {
    name: " تصویر دوره",
    sortable: true,
    minWidth: "150px",
    sortField: "fname",
    selector: (row) => row.tumbImageAddress,
    cell: (row) => (
      <img
        className="me-75 rounded-circle"
        src={row.tumbImageAddress ? row.tumbImageAddress : IconCourse}
        // alt={}
        height="50"
        width="50"
      />
    ),
  },
  {
    name: " عنوان دوره ",
    sortable: true,
    minWidth: "300px",
    sortField: "fname",
    selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column ">
          <Link
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{row.title}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: " تاریخ آخرین آپدیت ",
    minWidth: "170px",
    sortable: true,
    sortField: "lastUpdate",
    selector: (row) => row.lastUpdate,
    cell: (row) => (
      <Badge className="bg-white text-info">
        {row.lastUpdate.substr(0, 10)}
      </Badge>
    ),
  },
  // {
  //   name: "  توضیحات ",
  //   minWidth: "130px",
  //   sortable: true,
  //   sortField: "describe",
  //   selector: (row) => row.describe,
  //   cell: (row) => {row.describe}
  // },
  {
    name: "مشاهده جزئیات",
    minWidth: "80px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownItem
            tag={Link}
            className="w-100"
            to={`/DetailCourse/${row.courseId}`}
          >
            <Eye size={14} className="me-50" />
          </DropdownItem>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
