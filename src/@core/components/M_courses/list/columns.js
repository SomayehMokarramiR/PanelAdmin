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

// ** Renders Client Columns
// const renderClient = (row) => {
//   console.log("row", row);

  // if (row.avatar.length) {
  //   return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  // } else {
  //   return (
  //     <Avatar
  //       initials
  //       className='me-1'
  //       color={row.avatarColor || 'light-primary'}
  //       content={row.fullName || 'John Doe'}
  //     />
  //   )
  // }
// };

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
//===================================

// //===================================

export const columns = [
  {
    name: "عنوان دوره",
    sortable: true,
    minWidth: "200px",
    sortField: "title",
    selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {/* {renderClient(row)} */}

        <div className="d-flex flex-column ">
          <Link
            to={`/DetailCourse/${row.courseId}`}
            className="user_name text-truncate text-body"
            // onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className="fw-bolder">{row.title}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: "استاد",
    sortable: true,
    minWidth: "160px",
    sortField: "role",
    selector: (row) => row.fullName,
    cell: (row) => row.fullName,
  },
  {
    name: "قیمت دوره",
    minWidth: "100px",
    sortable: true,
    sortField: "cost",
    selector: (row) => row.cost,
    cell: (row) => (
      <Badge className="bg-white text-primary">{row.cost.substr(0, 6)}</Badge>
    ),
  },
  {
    name: "آخرین به روز رسانی",
    minWidth: "130px",
    sortable: true,
    sortField: "lastUpdate",
    selector: (row) => row.lastUpdate,
    // cell: (row) => row.lastUpdate.substr(0, 10),
    cell: (row) => (
      <Badge className="bg-white text-info">
        {row.lastUpdate.substr(0, 10)}
      </Badge>
    ),
  },
  ,
  {
    name: "وضعیت دوره",
    minWidth: "120px",
    sortable: true,
    sortField: "statusName",
    selector: (row) => row.statusName,
    cell: (row) => (
      <Badge className=" bg-success " color={statusObj[row.statusName]} pill>
        {row.statusName}
      </Badge>
    ),
  },
  {
    name: " فعال / غیر فعال ",
    minWidth: "100px",
    sortable: true,
    sortField: "isActive",
    selector: (row) => row.isActive,
    cell: (row) => {
      const handleActive = async (values) => {
        const courseobjAct = {
          active: values.isActive === true ? false : true,
          id: values.courseId,
        };
        const result = await http.put(
          `/Course/ActiveAndDeactiveCourse`,
          courseobjAct
        );
        refetch()
        return result;
      };

      return (
        <Badge
          className="text-capitalize cursor-pointer"
          color={row.isActive === true ? "light-success" : "light-danger"}
          onClick={() => handleActive(row)}
        >
          {row.isActive === true ? "فعال" : "غیرفعال"}
        </Badge>
      );
    },
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
  // {
  //   name: "عملیات",
  //   minWidth: "100px",
  //   cell: (row) => (
  //     <div className="column-action">
  //       <UncontrolledDropdown>
  //         <DropdownToggle tag="div" className="btn btn-sm">
  //           <MoreVertical size={14} className="cursor-pointer" />
  //         </DropdownToggle>
  //         <DropdownMenu>
  //           <DropdownItem
  //             tag={Link}
  //             className="w-100"
  //             to={`/DetailCourse/${row.courseId}`}
  //             // onClick={() => store.dispatch(getUser(row.id))}
  //           >
  //             <FileText size={14} className="me-50" />
  //             <span className="align-middle">جزییات</span>
  //           </DropdownItem>
  //           <DropdownItem
  //             tag="a"
  //             href="/"
  //             className="w-100"
  //             onClick={(e) => e.preventDefault()}
  //           >
  //             <Archive size={14} className="me-50" />
  //             <span className="align-middle">ویرایش</span>
  //           </DropdownItem>
  //           <DropdownItem
  //             tag="a"
  //             href="/"
  //             className="w-100"
  //             // onClick={e => {
  //             //   e.preventDefault()
  //             //   store.dispatch(deleteUser(row.id))
  //             // }}
  //           >
  //             <Trash2 size={14} className="me-50" />
  //             <span className="align-middle">حذف</span>
  //           </DropdownItem>
  //         </DropdownMenu>
  //       </UncontrolledDropdown>
  //     </div>
  //   ),
  // },
];
