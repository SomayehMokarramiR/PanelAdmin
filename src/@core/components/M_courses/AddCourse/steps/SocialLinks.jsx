// ** React Imports
import { Fragment, useState } from "react";

// ** Icons Imports
import { ArrowLeft } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Button } from "reactstrap";
import http from "../../../../interceptor";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { Formik, Form, Field } from "formik";
// import IconCourse from "@src/assets/images/Icon_Course"

const SocialLinks = ({ stepper }) => {
  const {
    title,
    describe,
    miniDescribe,
    cost,
    startTime,
    endTime,
    googleTitle,
    googleSchema,
    UniqeUrlString,
    shortLink,
    capacity,
    courseTypeId,
    termId,
    classId,
    CourseLvlId,
    TeacherId,
    sessionNumber,
    techId,
    courseId,
  } = useSelector((state) => state.creatCourseInfo);

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const formdata = new FormData();
    console.log(values);
    const setCourses = {
      Title: title,
      Describe: describe,
      MiniDescribe: miniDescribe,
      Capacity: capacity,
      GoogleTitle: googleTitle,
      GoogleSchema: googleSchema,
      // techId
      CourseTypeId: courseTypeId,
      SessionNumber: sessionNumber,
      CurrentCoursePaymentNumber: 0,
      CoursePrerequisiteId: "7b41aed7-2576-ee11-b6c7-ca6d3e095898",
      TremId: termId,
      ClassId: classId,
      CourseLvlId: CourseLvlId,
      TeacherId: TeacherId,
      Cost: cost,
      UniqeUrlString: UniqeUrlString,
      ShortLink: shortLink,
      StartTime: startTime,
      EndTime: endTime,
      Image: values.image,
      TumbImageAddress: "www.yahoo.com",
      ImageAddress: "www.yahoo.com",
    };
    const keys = Object.keys(setCourses);
    keys.forEach((key) => {
      const item = setCourses[key];
      formdata.append(key, item);
      console.log(formdata);
    });
    const res = await http.post(`/Course`, formdata);
    console.log(res);

    if (res?.success == true) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    return res;
  };

  return (
    <Formik
      initialValues={{
        image: "",
      }}
      onSubmit={(value) => {
        onSubmit(value);
      }}
    >
      <Fragment>
        <div className="content-header">
          <h5 className="mb-0"> تصویر</h5>
          <small>تصویر مورد نظر دوره وارد شود.</small>
        </div>
        {/* {({ setFieldValue }) => { */}
        <Form>
          <Row>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label mx-2"> آپلود عکس </Label>
              <Field
                // value={values.Image}
                type="file"
                name="image"
                className="w-300 h-250 rounded-10 mb-40"
                // alt={image}
                // className="form-control"
                // classNamePrefix="select"
                // onChange={(e) => {
                //   setFieldValue("Image", e.target.files[0]);
                // }}
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-between">
            <Button
              type="submit"
              color="success"
              className="btn-submit"
              // onClick={() => alert("submitted")}
            >
              ثبت
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
        {/* }} */}
      </Fragment>
    </Formik>
  );
};

export default SocialLinks;
