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
  ThumbsUp,
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
import toast from "react-hot-toast";

// ** Renders Client Columns
// const renderClient = row => {
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
// }

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
const handleActive = async (values) => {
  const newsobjAct = {
    active: values.isActive === true ? false : true,
    id: values.id,
  };
  const result = await http.put(`/News/ActiveDeactiveNews`, newsobjAct);
  // refetch()
  return result;
};

//======================

////===================================

export const columns = [
  {
    name: "عنوان خبر",
    sortable: true,
    minWidth: "250px",
    sortField: "title",
    selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column ">
          <Link
            to={`/DetailNews/${row.id}`}
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
    name: "دسته بندی خبر",
    sortable: true,
    minWidth: "130px",
    sortField: "role",
    selector: (row) => row.newsCatregoryName,
    cell: (row) => row.newsCatregoryName,
  },
  {
    name: " نویسنده خبر",
    sortable: true,
    minWidth: "130px",
    sortField: "role",
    selector: (row) => row.addUserFullName,
    cell: (row) => row.addUserFullName,
  },
  {
    name: "تاریخ  درج خبر",
    minWidth: "90px",
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
    name: " تعداد بازدید ",
    minWidth: "90px",
    sortable: true,
    sortField: "currentView",
    selector: (row) => row.currentView,
    cell: (row) => (
      <Badge className="text-white bg-warning">
        <span> {row.currentView}</span>
        {/* <Eye size={15} /> */}
      </Badge>
    ),
  },
  {
    name: " تعداد لایک",
    minWidth: "120px",
    sortable: true,
    sortField: "currentLikeCount",
    selector: (row) => row.currentLikeCount,
    cell: (row) => (
      <Badge className="text-white bg-success">
        <span> {row.currentLikeCount}</span>
        {/* <ThumbsUp size={15} /> */}
      </Badge>
    ),
  },
  {
    name: "عملیات",
    minWidth: "30px",
    cell: (row) => {
      const deleteNews = async (id) => {
        const result = await http.delete(`/News/DeleteNewsFile?fileId=${id}`);
        console.log(id);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
        if (toast.success);
        console.log("resultttt", result);
        return result;
      };

      return (
        <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/DetailNews/${row.id}`}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">جزییات</span>
            </DropdownItem>
            <DropdownItem className="w-100">
              <Trash2 size={14} className="me-50" />
              <span
                className="align-middle"
                onClick={() => {
                  deleteNews(row.id), console.log("iddddd", row.id);
                }}
              >
                حذف
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      );
    },
  },
];
