// ** React Imports
import { Fragment } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Button } from "reactstrap";
import { handleStepTree } from "../../../../../redux/createCourse";
import { Formik, Form, Field } from "formik";

const Address = ({ stepper }) => {
  const dispatch = useDispatch();
  const step3 = (value) => {
    dispatch(
      handleStepTree({
        googleTitle: value.googleTitle,
        googleSchema: value.googleSchema,
        UniqeUrlString: value.UniqeUrlString,
        shortLink: value.shortLink,
      })
    );
    stepper.next()
  };

  // const { googleTitle, googleSchema, UniqeUrlString, shortLink } = useSelector(
  //   (state) => state.creatCourseInfo
  // );

  return (
    <Formik
      initialValues={{
        googleTitle: "",
        googleSchema: "",
        UniqeUrlString: "",
        shortLink: "",
      }}
      enableReinitialize={true}
      onSubmit={(value) => step3(value)}
    >
      <Fragment>
        <div className="content-header">
          <h5 className="mb-0">لینکها</h5>
          <small>لطفا لینک ها را وارد نمایید .</small>
        </div>
        <Form>
          <Row>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> عنوان گوگل </Label>
              <Field
                type="text"
                name="googleTitle"
                id="googleTitle"
                placeholder="عنوان گوگل"
                className="form-control"
              />
            </Col>

            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> شمای گوگل </Label>
              <Field
                type="text"
                name="googleSchema"
                id="googleSchema"
                placeholder="شمای گوگل "
                className="form-control"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> لینک کوتاه </Label>
              <Field
                type="text"
                name="shortLink"
                id="shortLink"
                placeholder="لینک کوتاه "
                className="form-control"
              />
            </Col>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> رشته ی یکتا </Label>
              <Field
                type="text"
                name="UniqeUrlString"
                id="UniqeUrlString"
                placeholder="رشته ی یکتا"
                className="form-control"
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-between">
            <Button
              color="primary"
              className="btn-next"
              type="submit"
             // onClick={(e) => {
               // stepper.next(), step3(e);
             // }}
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

export default Address;
