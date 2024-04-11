// ** React Imports
import { useEffect, useState } from "react";
// import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
// import { getUser } from '../store'
// import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
import UserTabs from "./Tabs";
// import PlanCard from './PlanCard'
import UserInfoCard from "./UserInfoCard";
import { useParams } from "react-router-dom";
import http from "../../../interceptor";
import { useQuery } from "react-query";

// ** Styles
// import '@styles/react/apps/app-users.scss'

const DetailCourseCmp = () => {
  // ** Store Vars
  // const store = useSelector(state => state.users)
  // const dispatch = useDispatch()

  // ** Hooks
  // const { id } = useParams()

  // ** Get suer on mount
  // useEffect(() => {
  //   dispatch(getUser(parseInt(id)))
  // }, [dispatch])

  //MyCode
  const { id } = useParams();

  console.log(id);

  const getCourseInfo = async () => {
    const result = await http.get(`/Course/${id}`);
    console.log("result", result);
    return result;
  };

  const { data, status } = useQuery(["courseInfo", id], getCourseInfo);

  data && console.log(data);

//===================================

  //End My Code

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="app-user-view">
      {data && (
        <Row>
          <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <UserInfoCard detailCourse={data} />
            {/* <PlanCard /> */}
          </Col>
          <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs active={active} toggleTab={toggleTab} courseID={id} />
          </Col>
        </Row>
      )}
    </div>
  );

  // : (
  //   <Alert color='danger'>
  //     <h4 className='alert-heading'>User not found</h4>
  //     <div className='alert-body'>
  //       User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
  //     </div>
  //   </Alert>

  // )
};
export default DetailCourseCmp;
