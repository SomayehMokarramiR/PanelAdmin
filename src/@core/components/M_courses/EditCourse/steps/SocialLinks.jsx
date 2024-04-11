import { Fragment, useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Label, Row, Col, Input, Button } from "reactstrap";
import http from "../../../../interceptor";
import toast from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const SocialLinks = ({ stepper }) => {
  const [initialValues, setInitialValues] = useState();

  const {
    Id,
    Title,
    Describe,
    MiniDescribe,
    Capacity,
    CourseTypeId,
    SessionNumber,
    CurrentCoursePaymentNumber,
    TremId,
    ClassId,
    CourseLvlId,
    TeacherId,
    Cost,
    GoogleTitle,
    GoogleSchema,
    UniqeUrlString,
    ShortLink,
    Image,
    TumbImageAddress,
    ImageAddress,
    StartTime,
    EndTime,
    CoursePrerequisiteId,
  } = useSelector((state) => state.editCourseInfo);

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const formdata = new FormData();
    console.log(values);
    const setCourses = {
      Id: Id,
      Title: Title,
      Describe: Describe,
      MiniDescribe: MiniDescribe,
      Capacity: Capacity,
      GoogleTitle: GoogleTitle,
      GoogleSchema: GoogleSchema,
      CourseTypeId: CourseTypeId,
      SessionNumber: SessionNumber,
      CurrentCoursePaymentNumber: 0,
      CoursePrerequisiteId: "7b41aed7-2576-ee11-b6c7-ca6d3e095898",
      TremId: TremId,
      ClassId: ClassId,
      CourseLvlId: CourseLvlId,
      TeacherId: TeacherId,
      Cost: Cost,
      UniqeUrlString: UniqeUrlString,
      ShortLink: ShortLink,
      StartTime: StartTime,
      EndTime: EndTime,
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
    const res = await http.put(`/Course`, formdata);

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
      initialValues={{ image: "" }}
      onSubmit={(value) => {
        onSubmit(value);
      }}
    >
      <Fragment>
        <div className="content-header">
          <h5 className="mb-0"> تصویر</h5>
          <small>تصویر مورد نظر دوره ویرایش شود.</small>
        </div>
        <Form>
          <Row>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label mx-2"> آپلود عکس </Label>
              <Field type="file" name="image" />

              {/* <Label className="form-label mx-2"> آپلود عکس </Label>
                <div className="col-md-8">
                  <img
                    // src={person.pic ? person.pic : IconCourse}
                    src={ PreviewIcon}
                    alt={"image"}
                    className="imgUpload"
                  />
                  <Field
                    type="file"
                    name="image"
                    className="inputUpload"
                  />
              
                </div> */}
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

export default SocialLinks;
