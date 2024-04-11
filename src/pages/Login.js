// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link } from "react-router-dom";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

import logo from "../assets/images/logo/logo-academy.png";

import { useForm, Controller } from "react-hook-form";
import { Formik, Form, Field, useFormik, ErrorMessage } from "formik";
import http from "../@core/interceptor";
import { setItem } from "../@core/common/storage.services";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  onEmailChange,
  onPhoneNumberChange,
  onTokenChange,
} from "../redux/user";

const defaultValues = {
  email: "",
  pass: "",
  check: false,
};

const Login = () => {
  const { skin } = useSkin();
  const source = skin === "dark" ? illustrationsDark : illustrationsLight;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const person = {
      phoneOrGmail: values.email,
      password: values.pass,
      rememberMe: values.check,
    };

    const result = await http.post(`/Sign/Login`, person);
    console.log(result);

    if (
      result.roles?.includes(
        "Administrator" || "Teacher" || "Referee" || "TournamentMentor"
      )
    ) {
      navigate("/home");
      setItem("token", result.token);
      setItem("userId", result.id);
      result.roles?.includes("Administrator")
        ? setItem("role", "Administrator")
        : setItem("role", result.roles);
      toast.success("ورود موفقیت آمیز");
      dispatch(onTokenChange(result.token));
    } else if (result.success == false) {
      toast.error("نام کاربری یا کلمه عبور اشتباه است.");
    }
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img className="w-10 h-10" src={logo} alt="آکادمی بحر" />
          <h2 className="brand-text text-primary ms-1">آکادمی بحر</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle
              tag="h2"
              className="fw-bold mb-1"
              style={{ direction: "rtl" }}
            >
              به پنل ادمین خوش آمدید!👋
            </CardTitle>
            <CardText className="mb-2" style={{ direction: "rtl" }}>
              برای ورود فرم زیر را پر کنید
            </CardText>

            <Formik onSubmit={onSubmit} initialValues={defaultValues}>
              {({ values, handleSubmit, handleChange }) => (
                <form className="auth-login-form mt-2" onSubmit={handleSubmit}>
                  <div className="mb-1" style={{ direction: "rtl" }}>
                    <Label className="form-label" for="login-email">
                      ایمیل یا شماره تماس
                    </Label>
                    <Input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      id="login-email"
                      placeholder="john@example.com"
                      autoFocus
                      style={{ direction: "ltr" }}
                    />
                  </div>
                  <div className="mb-1">
                    <div
                      className="d-flex justify-content-between"
                      style={{ direction: "rtl" }}
                    >
                      <Label className="form-label" for="login-password">
                        رمز عبور
                      </Label>
                    </div>
                    <InputPasswordToggle
                      name="pass"
                      value={values.pass}
                      onChange={handleChange}
                      className="input-group-merge"
                      id="login-password"
                    />
                  </div>
                  <div className="form-check mb-1" style={{ direction: "rtl" }}>
                    <Input
                      name="check"
                      value={values.check}
                      onChange={handleChange}
                      type="checkbox"
                      id="remember-me"
                      dir="rtl"
                    />
                    <Label className="form-check-label" for="remember-me">
                      مرا بخاطر بسپار
                    </Label>
                  </div>
                  <Button type="submit" color="primary" block>
                    ورود
                  </Button>
                </form>
              )}
            </Formik>

            <p className="text-center mt-2">
              {/* <span className="me-25">New on our platform?</span> */}
              <Link to="/register">
                <span>ایجاد یک حساب کاربری</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
      {/* <Toaster reverseOrder={false} position="top-left" /> */}
    </div>
  );
};

export default Login;
