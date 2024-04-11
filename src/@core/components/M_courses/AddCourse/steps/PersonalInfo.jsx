// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import Select from "react-select";
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useDispatch, useSelector } from "react-redux";
import { handleStepTwo } from "../../../../../redux/createCourse";
import { Formik, Form, Field } from "formik";

const PersonalInfo = ({ stepper }) => {
  const dispatch = useDispatch();
  const step2 = (value) => {
    dispatch(
      handleStepTwo({
        title: value.title,
        describe: value.describe,
        miniDescribe: value.miniDescribe,
        cost: value.cost,
        capacity: value.capacity,
        startTime: value.startTime,
        endTime: value.endTime,
        sessionNumber: value.sessionNumber,
      })
    );
    stepper.next()
  };

  // const {
  //   title,
  //   cost,
  //   describe,
  //   miniDescribe,
  //   capacity,
  //   startTime,
  //   endTime,
  //   sessionNumber,
  // } = useSelector((state) => state.creatCourseInfo);

  return (
    <Formik
      initialValues={{
        title: "",
        describe: "",
        miniDescribe: "",
        cost: "",
        capacity: "",
        startTime: "",
        endTime: "",
        sessionNumber: "",
      }}
      enableReinitialize={true}
      onSubmit={(value) => step2(value)}
    >
      <Fragment>
        <div className="content-header">
          <h5 className="mb-0">اطلاعات تکمیلی دوره</h5>
          <small>لطفا اطلاعات تکمیلی را وارد نمایید.</small>
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
              <Label className="form-label"> ظرفیت </Label>
              <Field
                type="text"
                name="capacity"
                id="capacity"
                placeholder="ظرفیت "
                className="form-control"
              />
            </Col>
          </Row>
          <Row>
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
            <Button
              color="primary"
              className="btn-next"
              type="submit"
              //onClick={(e) => {
               // stepper.next(), step2(e);
              //}}
            >
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
