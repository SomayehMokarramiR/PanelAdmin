
import { Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Label, Row, Col, Input, Button } from "reactstrap";
import { handleStepTree } from "../../../../../redux/editCourse";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import http from "../../../../interceptor";

const Address = ({ stepper }) => {

  const [initialValues, setInitialValues] = useState();

  const dispatch = useDispatch();
  const step3 = (value) => {
    dispatch(
      handleStepTree({
        GoogleTitle: value.googleTitle,
        GoogleSchema: value.googleSchema,
        UniqeUrlString: value.UniqeUrlString,
        ShortLink: value.shortLink,
      })
    );
    stepper.next();
  };


  return (
    <Formik
      initialValues={{
        googleTitle:"www.google.com",
        googleSchema:"www.google.com",
        UniqeUrlString: "",
        shortLink:"www.google.com",
      }}
      enableReinitialize={true}
      onSubmit={(value) => step3(value)}
    >
      <Fragment>
        <div className="content-header">
          <h5 className="mb-0">لینکها</h5>
          <small>لطفا لینک ها را ویرایش نمایید .</small>
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

export default Address;
