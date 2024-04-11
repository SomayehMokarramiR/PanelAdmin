// ** Reactstrap Imports
import { Badge, Card, CardHeader, Progress } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Images
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";
import http from "../../../interceptor";
import { useQuery } from "react-query";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useState } from "react";
import { useEffect } from "react";



export const columns = [
  {
    sortable: true,
    minWidth: "300px",
    name: "نام دانشجو",
    selector: (row) => row.studentName,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={row.imageAddres}
              alt={row.studentName}
              imgWidth="32"
            />
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.studentName}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "تاریخ رزرو دوره",
    selector: (row) => row.reserverDate,
  },
  {
    name: "تاییدیه دوره",
    selector: (row) => {
    return (
      <Badge
        className="text-capitalize cursor-pointer"
        color={row.accept === true ? "light-success" : "light-danger"}
        onClick={() => handleActive(row)}
      >
        {row.accept === true ? "تایید شده" : "دزانتظار تایید"}
      </Badge>
    );
    }
  },
  
];

const UserProjectsList = ({courseID}) => {
  //My code

  const [dataCourseReserve, setDataCourseReserve] = useState();
  const CourseReserve = async () => {
    const result = await http.get(`/CourseReserve/${courseID}`);
    console.log("result", result);
    return result;
  };
  const { data, status } = useQuery("CourseReserve", CourseReserve);
  data && console.log(data);

  useEffect(() => {
    if (status === "success") {
      setDataCourseReserve(data);
      // refetch();
    }
  }, [status, data]);

  console.log("userReservvvvvv", dataCourseReserve);
  //End My code

  return (
    <Card>
      <CardHeader tag="h4" className="text-success fw-bolder fs-3">
        لیست کاربرانی که دوره را رزو کردند
      </CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={dataCourseReserve}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default UserProjectsList;
