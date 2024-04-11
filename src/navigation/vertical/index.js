
import { Mail, Home, Airplay, Circle, List, FileText, User, FileMinus } from "react-feather";

export default [

  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "ManageUsers",
    title: "مدیریت کاربرها",
    icon: <User size={20} />,
    children: [
      {
        id: "usersList",
        title: "لیست  همه کاربرها",
        icon: <List  size={12} />,
        navLink: "/M_users/list",
      },
    ],
  },
  {
    id: "ManageCourses",
    title: "مدیریت دوره ها",
    icon: <FileMinus size={20} />,
    children: [
      {
        id: "courdseList",
        title: "لیست دوره ها",
        icon: <List  size={12} />,
        navLink: "/M_courses",
      },
      {
        id: "courdseReseve",
        title: "دوره های رزرو شده",
        icon: <List  size={12} />,
        navLink: "/ReserveCourse",
      },
      {
        id: "manageComment",
        title: "  مدیریت کامنت ها",
        icon: <List  size={12} />,
        navLink: "/ManageComments",
      },
    ],
  },
  {
    id: "ManageNews",
    title: "مدیریت  اخبار",
    icon: <FileText size={20} />,
    children: [
      {
        id: "newsList",
        title: "لیست  خبرها",
        icon: <List  size={12} />,
        navLink: "/M_News",
      },
    ],
  },
  ,
];
