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

// const userReserve = [
//   {
//     progress: 60,
//     hours: "210:30h",
//     progressColor: "info",
//     totalTasks: "233/240",
//     subtitle: "React Project",
//     title: "BGC eCommerce App",
//     img: reactLabel,
//   },
//   {
//     hours: "89h",
//     progress: 15,
//     totalTasks: "9/50",
//     progressColor: "danger",
//     subtitle: "UI/UX Project",
//     title: "Falcon Logo Design",
//     img: xdLabel,
//   },
//   {
//     progress: 90,
//     hours: "129:45h",
//     totalTasks: "100/190",
//     progressColor: "success",
//     subtitle: "Vuejs Project",
//     title: "Dashboard Design",
//     img: vueLabel,
//   },
//   {
//     hours: "45h",
//     progress: 49,
//     totalTasks: "12/86",
//     progressColor: "warning",
//     subtitle: "iPhone Project",
//     title: "Foodista mobile app",
//     img: sketchLabel,
//   },

//   {
//     progress: 73,
//     hours: "67:10h",
//     totalTasks: "234/378",
//     progressColor: "info",
//     subtitle: "React Project",
//     title: "Dojo React Project",
//     img: reactLabel,
//   },
//   {
//     progress: 81,
//     hours: "108:39h",
//     totalTasks: "264/537",
//     title: "HTML Project",
//     progressColor: "success",
//     subtitle: "Crypto Website",
//     img: htmlLabel,
//   },
//   {
//     progress: 78,
//     hours: "88:19h",
//     totalTasks: "214/627",
//     progressColor: "success",
//     subtitle: "Vuejs Project",
//     title: "Vue Admin template",
//     img: vueLabel,
//   },
// ];

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
            {/* <small className="text-muted">{row.subtitle}</small> */}
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
    selector: (row) => row.accept,
    cell: (row) => (
      <Badge  className="bg-white text-primary">     
        {row.accept?"تایید شده":"تایید نشد"}
      </Badge>
    ),
  },
  // {
  //   name: "Progress",
  //   selector: (row) => row.progress,
  //   sortable: true,
  //   cell: (row) => {
  //     return (
  //       <div className="d-flex flex-column w-100">
  //         <small className="mb-1">{`${row.progress}%`}</small>
  //         <Progress
  //           value={row.progress}
  //           style={{ height: "6px" }}
  //           className={`w-100 progress-bar-${row.progressColor}`}
  //         />
  //       </div>
  //     );
  //   },
  // },
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
