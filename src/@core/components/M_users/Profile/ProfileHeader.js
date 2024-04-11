// ** React Imports
import { useState } from "react";

// ** Icons Imports
import { AlignJustify, Rss, Info, Image, Users, Edit } from "react-feather";
import { Link } from "react-router-dom";
import http from "../../../interceptor";
import { useQuery } from "react-query";

// ** Reactstrap Imports
import {
  Card,
  CardImg,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import profileBg from "../../../assets/images/timeline.jpg";
import avatarUser from "../../../assets/images/avatarUser.png";
import toast from "react-hot-toast";

const ProfileHeader = ({ data }) => {
  // ** States
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  //===========================================
  const handleDelete = async (id) => {
    const obj = {
      userId: id,
    };
    console.log("vvvvvv",obj)
    const result = await http.delete(`/User/DeleteUser`,{ data: obj });
    if (result.success === true) {
      toast.success(result.message);
    } else {
      toast.error(result.errors);
    }
    console.log("rrrrrrrrrrr",result)
    return result;
  };

  //==========================================

  return (
    <Card className="profile-header mb-2">
      <CardImg src={profileBg} alt="User Profile Image" top />
      <div className="position-relative">
        <div className="profile-img-container d-flex align-items-center">
          <div className="profile-img">
            <img
              className="rounded img-fluid"
              src={
                data.currentPictureAddress === "Not-set"
                  ? avatarUser
                  : data.currentPictureAddress
              }
              alt="Card image"
            />
          </div>
          <div className="profile-title ms-3">
            <h2 className="text-white">{data.fName + " " + data.lName}</h2>
            {data.roles.map((item, index) => {
              <p className="text-white">{item.roleName}</p>;
            })}
          </div>
        </div>
      </div>
      <div className="profile-header-nav">
        <Navbar
          container={false}
          className="justify-content-end justify-content-md-between w-100"
          expand="md"
          light
        >
          <Button color="" className="btn-icon navbar-toggler" onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className="profile-tabs d-flex justify-content-end flex-wrap mt-1 mt-md-0">
              <Link to={"/EditUsers/" + data.id}>
                <Button color="primary" className="cursor-pointer">
                  <span className="fw-bold d-none d-md-block">
                    ویرایش اطلاعات
                  </span>
                </Button>
              </Link>
              <Button
                color="danger"
                className="mx-2"
                onClick={() => handleDelete(data.id)}
              >
                <span className="fw-bold d-none d-md-block cursor-pointer">
                  حذف کردن کاربر
                </span>
              </Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  );
};

export default ProfileHeader;
