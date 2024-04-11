import { Field, Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import React from "react";
import { Button, Col, Label, Row } from "reactstrap";
import http from "../../../interceptor";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

function AddUsers() {
  const onSubmit = async (param) => {
    const addUserobj = {
      firstName: param.firstName,
      lastName: param.lastName,
      password: param.password,
      gmail: param.gmail,
      phoneNumber: param.phoneNumber,
      isStudent: param.isStudent? true:false,
      isTeacher: param.isTeacher? true:false,
    };

    const result = await http.post(`/User/CreateUser`, addUserobj);
    if (result.success === true) {
      toast.success(result.message);
    } else {
      toast.error(result.errors);
    }
    return result;
  };

  const validation = yup.object().shape({
    firstName: yup.string().required(" لطفا نام کاربری  را وارد کنید! "),
    lastName: yup.string().required("لطفا نام خانوادگی  را وارد نمایید"),
    password: yup.string().required("لطفا پسورد  را وارد نمایید"),
    gmail: yup.string().required("لطفا ایمیل  را وارد نمایید"),
    phoneNumber: yup.string().required("لطفاشماره تلفن را وارد نمایید"),
    isStudent: yup.string().required("لطفا سطح دسترسی  را   مشخص کنید"),
    //isTeacher: yup.string().required("لطفا سطح دسترسی  را   مشخص کنید"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          password: "",
          gmail: "",
          phoneNumber: "",
          isStudent: false,
          isTeacher:false,
        }}
        validationSchema={validation}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <h2 className=" ">ایجاد کاربر جدید</h2>
            <Row className="mt-2 ">
              <Col>
                <Label className="form-label" for="firstName">
                  <span className="fs-4">نام</span>
                </Label>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="نام کاربر را وارد کنید"
                  className="form-control"
                />
                <ErrorMessage
                  name="firstName"
                  component={"p"}
                  className="text-danger fs-5 "
                />
              </Col>
              <Col>
                <Label className="form-label" for="lastName">
                  <span className="fs-4">نام خانوادگی</span>
                </Label>
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="نام خانوادگی کاربر را وارد کنید"
                  className="form-control"
                />
                <ErrorMessage
                  name="lastName"
                  component={"p"}
                  className="text-danger fs-5 "
                />
              </Col>
            </Row>
            <Row className="mt-2 ">
              <Col>
                <Label className="form-label" for="gmail">
                  <span className="fs-4">ایمیل</span>
                </Label>
                <Field
                  id="gmail"
                  name="gmail"
                  placeholder="ایمیل کاربر را وارد کنید"
                  className="form-control"
                />
                <ErrorMessage
                  name="gmail"
                  component={"p"}
                  className="text-danger fs-5 "
                />
              </Col>
              <Col>
                <Label className="form-label" for="phoneNumber">
                  <span className="fs-4">شماره تماس </span>
                </Label>
                <Field
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="شماره تماس کاربر را وارد کنید"
                  className="form-control"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component={"p"}
                  className="text-danger fs-5 "
                />
              </Col>
            </Row>
            <Row className="mt-2 ">
              <Col>
                <Label className="form-label" for="password">
                  <span className="fs-4">رمز عبور </span>
                </Label>
                <Field
                  id="password"
                  name="password"
                  placeholder="زمز عبور را  لطفا وارد کنید"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component={"p"}
                  className="text-danger fs-5 "
                />
              </Col>

              <Col>
                <Label className="form-label" for="isStudent">
                  <span className="fs-4">سطح دسترسی کاربر</span>
                </Label>
                <div className="mt-1 d-flex flex-row gap-3">
                  <div className="d-flex flex-row gap-75">
                    <span>استاد</span>
                    <Field
                      id="isTeacher"
                      name="isTeacher"
                      type="checkbox"
                      onChange={(e) =>
                        setFieldValue("isTeacher", e.target.checked)
                      }
                    />
                  </div>
                  <div className="d-flex flex-row gap-75">
                    <span>دانشجو</span>
                    <Field
                      id="isStudent"
                      name="isStudent"
                      type="checkbox"
                      onChange={(e) =>
                        setFieldValue("isStudent", e.target.checked)
                      }
                    />
                  </div>
                </div>
                <ErrorMessage
                  name="isStudent"
                  component={"p"}
                  className="text-danger fs-5 "
                />
              </Col>
            </Row>
            <Button
              type="submit"
              className="btn btn-primary me-1 mt-3 fs-4"
              color="primary"
            >
              ذخیره اطلاعات
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddUsers;
