// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
// import Select from "react-select";
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useDispatch, useSelector } from "react-redux";
// import { handleStepTwo } from "../../../../../redux/editUser";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import http from "../../../../interceptor";

const PersonalInfo = ({ stepper }) => {


  const [initialValues, setInitialValues] = useState();

  const {
    id,
    fName,
    lName,
    userName,
    gmail,
    phoneNumber,
    userAbout,
    linkdinProfile,
    telegramLink,
    homeAdderess,
    nationalCode,
    birthDay,
  } = useSelector((state) => state.editUserfo);

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const formdata = new FormData();
    console.log(values);
    const setUsers = {
      id: id,
      fName: fName,
      lName: lName,
      userName: userName,
      nationalCode: nationalCode,
      birthDay: birthDay,
      gmail: values.gmail,
      phoneNumber: values.phoneNumber,
      userAbout: values.userAbout,
      linkdinProfile: values.linkdinProfile,
      telegramLink: values.telegramLink,
      homeAdderess: values.homeAdderess,
 
    };
    const keys = Object.keys(setUsers);
    keys.forEach((key) => {
      const item = setUsers[key];
      formdata.append(key, item);
      console.log(formdata);
    });
    const res = await http.put(`/User/UpdateUser`, formdata);

    console.log(res);

    if (res?.success == true) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    return res;
  };

  const paramId = useParams();
  console.log("paramId", paramId);

  const getUserInfo = async () => {
    const result = await http.get(`/User/UserDetails/${paramId.id}`);
    return result;
  };
  const { data, status } = useQuery(["userInfo", paramId.id], getUserInfo);

  data && console.log("dataByid", data);

  useEffect(() => {
    if (status === "success") {
      getUserInfo();
      setInitialValues({
        gmail: data.gmail,
        phoneNumber: data.phoneNumber,
        userAbout: data.userAbout,
        linkdinProfile: data.linkdinProfile,
        telegramLink: data.telegramLink,
        homeAdderess: data.homeAdderess,
      });
    }
  }, [status, data]);

  initialValues && console.log(initialValues);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(value) => {
        onSubmit(value);
      }}
    >
      <Fragment>
        <div className="content-header">
          <h5 className="mb-0">اطلاعات تکمیلی کاربر</h5>
          <small>لطفا اطلاعات تکمیلی را ویرایش نمایید.</small>
        </div>
          <Form>
            <Row>
              <Col className="mb-1" md="6" sm="12">
                <Label className="form-label"> شماره تماس </Label>
                <Field
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder=" شماره تماس"
                  className="form-control"
                />
              </Col>
              <Col className="mb-1" md="6" sm="12">
                <Label className="form-label"> ایمیل </Label>
                <Field
                  type="text"
                  name="gmail"
                  id="gmail"
                  placeholder=" ایمیل "
                  className="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col className="mb-1" md="6" sm="12">
                <Label className="form-label"> لینکدین کاربر </Label>
                <Field
                  type="text"
                  name="linkdinProfile"
                  id="linkdinProfile"
                  placeholder=" لینکدین "
                  className="form-control"
                />
              </Col>

              <Col className="mb-1" md="6" sm="12">
                <Label className="form-label"> تلگرام </Label>
                <Field
                  type="text"
                  name="telegramLink"
                  id="telegramLink"
                  placeholder="آی دی تلگرام"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col className="mb-1" md="6" sm="12">
                <Label className="form-label"> آدرس منزل </Label>
                <Field
                  type="text"
                  as="textarea"
                  name="homeAdderess"
                  id="homeAdderess"
                  placeholder="  آدرس کاربر"
                  className="form-control"
                />
              </Col>
              <Col className="mb-1" md="6" sm="12">
                <Label className="form-label">درباره کاربر </Label>
                <Field
                  type="text"
                  as="textarea"
                  name="userAbout"
                  id="userAbout"
                  placeholder="درباره کاربر"
                  className="form-control"
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-between">
              <Button type="submit" color="success" className="btn-submit">
                ویرایش
              </Button>
              <Button
                color="primary"
                className="btn-prev"
                onClick={() => stepper.previous()}
              >
                <ArrowLeft
                  size={14}
                  className="align-middle me-sm-25 me-0"
                ></ArrowLeft>
                <span className="align-middle d-sm-inline-block d-none">
                  مرحله ی قبل
                </span>
              </Button>
            </div>
          </Form>
      </Fragment>
    </Formik>
  );
};

export default PersonalInfo;
