// ** React Imports
import { Fragment, useState, useEffect, useRef } from "react";

// ** Invoice List Sidebar
// import Sidebar from "./Sidebar";

// ** Table Columns
import { columns } from "./columns";

// ** Store & Actions

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  Bookmark,
  Bell,
  Link,
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import http from "../../../interceptor";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

// ** Table Header
const CustomHeader = ({
  store,
  // toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    // const keys = Object.keys(store.data[0])

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }
  const navigate = useNavigate();
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row></Row>
    </div>
  );
};

const ProUserCourses = () => {
  // ** Store Vars

  // ** States
  const [dataAllCourse, setDataAllCourse] = useState();
  const [totalUserCoursesCount, setTotalUserCoursesCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [PageNumber, setPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Plan",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });

  //start my code*******************************
  // // //My Code For Search======

  const ref = useRef();
  const handleSearch = (e) => {
    clearTimeout(ref.current);

    const timeOut = setTimeout(() => {
      e.target.value && setSearchTerm(e.target.value);
    }, 800);

    !e.target.value && setSearchTerm("");
    ref.current = timeOut;
    console.log(searchTerm);
  };

  // //My Code For Search End=======

  const paramId = useParams();
  console.log("idddddddddddd", paramId);

  const getUserAllCourses = async () => {
    const result = await http.get(`/User/UserDetails/${paramId.id}`);
    setTotalUserCoursesCount(result.totalCount);
    console.log("ffffffffffffff", totalUserCoursesCount);
    return result;
  };
  const { data, status, refetch } = useQuery(
    ["getUserAllCourses", searchTerm, rowsPerPage, PageNumber],
    getUserAllCourses
  );

  data && console.log(data);

  useEffect(() => {
    if (status === "success") {
      setDataAllCourse(data.courses);
      refetch();
    }
  }, [status, data]);

  //=============================

  //End My code

  const handlePagination = (page) => {
    console.log("ppppppppppppppp", page.selected + 1);
    setCurrentPage(page.selected + 1);
    setPageNumber(page.selected + 1);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(totalUserCoursesCount / rowsPerPage));
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    console.log("cccccccccccccccc", e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handleFilter = (e) => {
    setSearchTerm(e);
  };

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store.data.length > 0) {
      return store.data;
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };
  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <CardHeader className="text-center d-flex justify-content-center fw-bolder text-primary">
          <CardTitle tag="h4"> تمام دوره های کاربر</CardTitle>
        </CardHeader>
        {dataAllCourse?.length == 0 || totalUserCoursesCount == 0 ? (
          <div
            style={{
              background: "#fff",
              color: "#219143",
              fontSize: "20px",
              padding: "5px",
            }}
            className="py-3 text-center"
          >
            لیست مد نظر شما خالی است!
          </div>
        ) : (
          <div className="react-dataTable">
            <DataTable
              // noHeader
              // subHeader
              sortServer
              pagination
              responsive
              paginationServer
              columns={columns}
              data={dataAllCourse}
              // onSort={handleSort}
              // sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
              subHeaderComponent={
                <CustomHeader
                  searchTerm={searchTerm}
                  rowsPerPage={rowsPerPage}
                  handleFilter={handleFilter}
                  handlePerPage={handlePerPage}
                  // toggleSidebar={toggleSidebar}
                />
              }
            />
          </div>
        )}
      </Card>
    </Fragment>
  );
};

export default ProUserCourses;
