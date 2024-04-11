// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";


const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";

const EditUser = lazy(() => import("../../pages/EditUser"));
const AddUser = lazy(() => import("../../pages/AddUser"));
const UserListByTab = lazy(() => import("../../@core/components/M_users/list"));
// const UserList = lazy(() => import("../../@core/components/M_users/list"));
const Profile = lazy(() => import("../../@core/components/M_users/Profile"));

const EditNews = lazy(() => import("../../@core/components/M-news/EditNews/EditNews"));
const Addnews = lazy(() => import("../../@core/components/M-news/AddNews/Addnews"));
const BlogDetails = lazy(() => import("../../@core/components/M-news/blog/details"));

const EditCourse = lazy(() => import("../../pages/EditCourse"));
const AccordionCmp = lazy(() => import("../../@core/components/M_courses/ManageComments/accordion"));
const CoursesReserve = lazy(() => import("../../@core/components/M_courses/listReseve/Table"));
const AddCourse = lazy(() => import("../../pages/AddCourse"));
const DetailCourseCmp = lazy(() =>
  import("../../@core/components/M_courses/FormDetailCourse")
);

const CoursesListByTab = lazy(() => import("../../@core/components/M_courses/list"));
// const CoursesList = lazy(() => import("../../@core/components/M_courses/list"));
const NewsList = lazy(() => import("../../@core/components/M-news/list/Table"));
const Home = lazy(() => import("../../pages/Home"));
const SecondPage = lazy(() => import("../../pages/SecondPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/sample",
    element: <Sample />,
  },
  {
    path: "/second-page",
    element: <SecondPage />,
  },
  {
    path: "/DetailUser/:id",
    element: <Profile />,
  }, 
  {
    path: "/M_users/list",
    // element: <UserList />,
      element: <UserListByTab />,
  },
  {
    path: "/AddUsers",
    element: <AddUser />,
  }, 
  {
    path: "/EditUsers/:id",
    element: <EditUser />,
  },
  {
    path: "/M_courses",
    // element: <CoursesList />,
    element: <CoursesListByTab />,
  },
  {
    path: "/AddCourse",
    element: <AddCourse />,
  },
  {
    path: "/EditCourse/:id",
    element: <EditCourse />,
  },
  {
    path: "/DetailCourse/:id",
    element: <DetailCourseCmp />,
  },
  {
    path: "/ReserveCourse",
    element: <CoursesReserve />,
  },
  {
    path: "/ManageComments",
    element: <AccordionCmp />,
  },
  {
    path: "/M_News",
    element: <NewsList />,
  },
  ,
  {
    path: "/EditNews/:id",
    element: <EditNews />,
  },
  {
    path: "/AddNews",
    element: <Addnews />,
  },
  {
    path: "/DetailNews/:id",
    element: <BlogDetails />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
