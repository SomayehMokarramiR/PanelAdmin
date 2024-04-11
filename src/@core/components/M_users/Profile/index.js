// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";

// ** Custom Components
import UILoader from "@components/ui-loader";
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import { Row, Col, Button } from "reactstrap";

// ** Demo Components
import ProfilePoll from "./ProfilePolls";
import ProfileAbout from "./ProfileAbout";
import ProfilePosts from "./ProfilePosts";
import ProfileHeader from "./ProfileHeader";
import ProfileTwitterFeeds from "./ProfileTwitterFeeds";
import ProfileLatestPhotos from "./ProfileLatestPhotos";
import ProfileSuggestedPages from "./ProfileSuggestedPages";
import ProfileFriendsSuggestions from "./ProfileFriendsSuggestions";
import http from "../../../interceptor";
import { useQuery } from "react-query";

// ** Styles
import "@styles/react/pages/page-profile.scss";
import { useParams } from "react-router-dom";
import TabsProfile from "./Tabs/TabsProfile";



const Profile = () => {
  // ** States
  const [data, setData] = useState(null);
  const [block, setBlock] = useState(false);

  const handleBlock = () => {
    setBlock(true);
    setTimeout(() => {
      setBlock(false);
    }, 2000);
  };
  //====================================================
  const { id } = useParams();
  console.log("iiiiiiiiiiiiii", id);

  const getDetailUser = async () => {
    const result = await http.get(`/User/UserDetails/${id}`);
    return result;
  };
  const {
    data: dataUserById,
    status,
    refetch,
  } = useQuery(["getDetailUser", id], getDetailUser);

  useEffect(() => {
    if (status === "success") {
      setData(dataUserById);
      refetch();
    }
  }, [data, status]);
  //========================================================
  return (
    <Fragment>
      <Breadcrumbs
        title="پروفایل"
        data={[{ title: "لیست کاربران" }, { title: "پروفایل" }]}
      />
      {data !== null ? (
        <div id="user-profile">
          <Row>
            <Col sm="12">
              <ProfileHeader data={data} />
            </Col>
          </Row>
          <section id="profile-info">
            <Row>
              <Col
                lg={{ size: 3, order: 1 }}
                sm={{ size: 12 }}
                xs={{ order: 2 }}
              >
                <ProfileAbout data={data} />
              </Col>
              <Col
                lg={{ size: 9, order: 2 }}
                sm={{ size: 12 }}
                xs={{ order: 1 }}
              >
                <TabsProfile data={data} />
              </Col>
              <Col
                lg={{ size: 9, order: 3 }}
                sm={{ size: 12 }}
                xs={{ order: 3 }}
              ></Col>
            </Row>
            <Row></Row>
          </section>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Profile;
