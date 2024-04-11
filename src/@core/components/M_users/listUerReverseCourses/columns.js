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
    name: "  نام دوره ",
    sortable: true,
    minWidth: "200px",
    sortField: "fname",
    selector: (row) => row.courseName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column ">
          <Link
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{row.courseName}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: "  نام کاربر رزوکننده",
    sortable: true,
    minWidth: "180px",
    sortField: "fname",
    selector: (row) => row.studentName,
    cell: (row) => row.studentName
  },
  {
    name: " تاریخ  رزرو دوره ",
    minWidth: "150px",
    sortable: true,
    sortField: "lastUpdate",
    selector: (row) => row.reserverDate,
    cell: (row) => (
      <Badge className="bg-white text-info">
        {row.reserverDate.substr(0, 10)}
      </Badge>
    ),
  },
  {
    name: "  تاییدیه دوره ",
    minWidth: "130px",
    sortable: true,
    sortField: "lastUpdate",
    selector: (row) => row.accept,
    cell: (row) => (
      <Badge className="bg-white text-info cursor-pointer"  color={row.accept === true ? "light-success" : "light-danger"}>
        {row.accept?"تایید شده" :"در انتظار تایید"}
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
            to={`/DetailCourse/${row.courseId}`}
          >
            <Eye size={14} className="me-50" />
          </DropdownItem>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
