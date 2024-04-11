// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import Select from "react-select";
import { ArrowLeft, ArrowRight } from "react-feather";
import { selectThemeColors } from "@utils";
import { Label, Row, Col, Input, Button } from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import { useDispatch, useSelector } from "react-redux";
import { handleStepTwo } from "../../../../../redux/editCourse";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import http from "../../../../interceptor";

const PersonalInfo = ({ stepper }) => {
  const [initialValues, setInitialValues] = useState();

  const dispatch = useDispatch();
  const step2 = (value) => {
    dispatch(
      handleStepTwo({
        Title: value.title,
        Describe: value.describe,
        MiniDescribe: value.miniDescribe,
        Cost: value.cost,
        Capacity: value.capacity,
        StartTime: value.startTime,
        EndTime: value.endTime,
        SessionNumber: value.sessionNumber,
      })
    );
    stepper.next();
  };

  const paramId = useParams();
  console.log("paramId", paramId);

  const getCourseInfo = async () => {
    const result = await http.get(`/Course/${paramId.id}`);
    return result;
  };
  const { data, status } = useQuery(["courseInfo", paramId.id], getCourseInfo);

  data && console.log("dataByid", data);

  useEffect(() => {
    if (status === "success") {
      getCourseInfo();
      // setDataEdit({ ...data });
      setInitialValues({
        title: data.title,
        describe: data.describe,
        miniDescribe: data.describe,
        cost: data.cost,
        capacity: 130,
        startTime: data.startTime,
        endTime: data.endTime,
        sessionNumber: 25,
      });
    }
  }, [status, data]);

  initialValues && console.log(initialValues);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(value) => step2(value)}
    >
      <Fragment>
        <div className="content-header">
          <h5 className="mb-0">اطلاعات تکمیلی دوره</h5>
          <small>لطفا اطلاعات تکمیلی را ویرایش نمایید.</small>
        </div>
        <Form>
          <Row>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> عنوان دوره </Label>
              <Field
                type="text"
                name="title"
                id="title"
                placeholder="عنوان دوره"
                className="form-control"
              />
            </Col>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> قیمت </Label>
              <Field
                type="text"
                name="cost"
                id="cost"
                placeholder="قیمت "
                className="form-control"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> ظرفیت </Label>
              <Field
                type="text"
                name="capacity"
                id="capacity"
                placeholder="ظرفیت "
                className="form-control"
              />
            </Col>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> تعداد جلسات </Label>
              <Field
                type="text"
                name="sessionNumber"
                id="sessionNumber"
                placeholder="تعداد جلسات "
                className="form-control"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> تاریخ شروع دوره </Label>
              <Field
                type="date"
                name="startTime"
                id="startTime"
                placeholder="تاریخ شروع دوره"
                className="form-control"
              />
            </Col>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> تاریخ پایان دوره </Label>
              <Field
                type="date"
                name="endTime"
                id="endTime"
                placeholder="تاریخ پایان دوره "
                className="form-control"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> توضیحات کوتاه </Label>
              <Field
                type="textarea"
                as="textarea"
                name="miniDescribe"
                id="miniDescribe"
                placeholder="توضیح مختصر"
                className="form-control"
              />
            </Col>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> توضیحات </Label>
              <Field
                type="textarea"
                as="textarea"
                name="describe"
                id="describe"
                placeholder="توضیح"
                className="form-control"
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-between">
            <Button color="primary" className="btn-next" type="submit">
              <span className="align-middle d-sm-inline-block d-none">
                مرحله ی بعد
              </span>
              <ArrowRight
                size={14}
                className="align-middle ms-sm-25 ms-0"
              ></ArrowRight>
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
