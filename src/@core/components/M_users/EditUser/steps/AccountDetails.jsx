import { Fragment, useEffect, useState } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";
import { useQuery } from "react-query";

// ** Reactstrap Imports
import { Label, Row, Col, Button } from "reactstrap";
import http from "../../../../interceptor";
import { useDispatch } from "react-redux";
// import Select from "react-select";
import { handleId, handleStepOne } from "../../../../../redux/editUser";
import { Field, Formik, useFormikContext, Form } from "formik";
import { useParams } from "react-router-dom";

const AccountDetails = ({ stepper }) => {
  const [initialValues, setInitialValues] = useState();

  const dispatch = useDispatch();
  const Step1 = (value) => {
    dispatch(
    handleStepOne({
      fName: value.fName,
      lName: value.lName,
      userName: value.userName,
      gmail: value.gmail,
      phoneNumber: value.phoneNumber,
      nationalCode: value.nationalCode,
      birthDay: value.birthDay,
      fName: value.fName,
      insertDate: value.insertDate,
    })
    );
    stepper.next();
    dispatch(
      handleId({
        id:paramId.id
      })
    );
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
        fName: data.fName,
        lName: data.lName,
        userName: data.userName,
        nationalCode: data.nationalCode,
        birthDay: data.birthDay,
        insertDate: data.insertDate,
      });
    }
  }, [status, data]);

  initialValues && console.log(initialValues);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(value) => Step1(value)}
    >
      <Fragment>
        <div className="content-header">
          <h5 className="mb-0">اطلاعات اولیه کاربر</h5>
          <small className="text-muted">
            لطفا اطلاعات اولیه را ویرایش نمایید.
          </small>
        </div>
        <Form>
          <Row>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> نام کاربر </Label>
              <Field
                type="text"
                name="fName"
                id="fName"
                placeholder=" نام کاربر"
                className="form-control"
              />
            </Col>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> نام خانوادگی </Label>
              <Field
                type="text"
                name="lName"
                id="lName"
                placeholder="نام خانوادگی"
                className="form-control"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> نام کاربری </Label>
              <Field
                type="text"
                name="userName"
                id="userName"
                placeholder=" نام کاربری "
                className="form-control"
              />
            </Col>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> کد ملی </Label>
              <Field
                type="text"
                name="nationalCode"
                id="nationalCode"
                placeholder="کد ملی "
                className="form-control"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-1" md="6" sm="12">
              <Label className="form-label"> تاریخ تولد </Label>
              <Field
                type="date"
                name="birthDay"
                id="birthDay"
                placeholder="  تاریخ تولد"
                className="form-control"
              />
            </Col>
            <Col className="mb-1" md="6" sm="12"></Col>
          </Row>
          <div className="d-flex justify-content-between">
            <Button
              color="primary"
              className="btn-next"
              type="submit"
              // onClick={() => {
              //   Step1(), stepper.next();
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
            <Button color="secondary" className="btn-prev" outline disabled>
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

export default AccountDetails;
