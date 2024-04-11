// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";
import { useQuery } from "react-query";

// ** Reactstrap Imports
import { Label, Row, Col, Button } from "reactstrap";
import http from "../../../../interceptor";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { handleStepOne } from "../../../../../redux/createCourse";
import { useFormikContext } from "formik";

const AccountDetails = ({ stepper, type }) => {
  //==========================================================
  const [courseLevel, setCourseLevel] = useState([]);
  const [courseType, setCourseType] = useState([]);
  const [courseStatus, setCourseStatus] = useState([]);
  const [courseClassRoom, setCourseClassRoom] = useState([]);
  const [courseTeacher, setCourseTeacher] = useState([]);
  const [courseTerm, setCourseTerm] = useState([]);
  const [courseTechnology, setCourseTechnology] = useState([]);

  const [currentLevel, setCurrentLevel] = useState({
    value: "",
    label: "انتخاب کنید",
  });
  const [currentType, setCurrentType] = useState({
    value: "",
    label: "انتخاب کنید",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "انتخاب کنید",
  });
  const [currentClassRoom, setCurrentClassRoom] = useState({
    value: "",
    label: "انتخاب کنید",
  });
  const [currentTeacher, setCurrentTeacher] = useState({
    value: "",
    label: "انتخاب کنید",
  });
  const [currentTerm, setCurrentTerm] = useState({
    value: "",
    label: "انتخاب کنید",
  });
  const [currentTechnology, setCurrentTechnology] = useState({
    value: "",
    label: "انتخاب کنید",
  });

  const getCreatCourse = async () => {
    const result = await http.get(`/Course/GetCreate`);

    setCourseType(
      result?.courseTypeDtos?.map((m) => ({ value: m.id, label: m.typeName }))
    );
    setCourseLevel(
      result?.courseLevelDtos?.map((m) => ({ value: m.id, label: m.levelName }))
    );
    setCourseStatus(
      result?.statusDtos?.map((m) => ({ value: m.id, label: m.statusName }))
    );
    setCourseClassRoom(
      result?.classRoomDtos?.map((m) => ({
        value: m.id,
        label: m.classRoomName,
      }))
    );
    setCourseTeacher(
      result?.teachers?.map((m) => ({ value: m.teacherId, label: m.fullName }))
    );
    setCourseTerm(
      result?.termDtos?.map((m) => ({ value: m.id, label: m.termName }))
    );
    setCourseTechnology(
      result?.technologyDtos?.map((m) => ({ value: m.id, label: m.techName }))
    );

    return result;
  };
  const { data, status } = useQuery("getCreatCourse", getCreatCourse);

  useEffect(() => {
    if (status === "success") {
      getCreatCourse();
    }
  }, [status, data]);

  data && console.log(data);

  const dispatch = useDispatch();
  const Step1 = () => {
    dispatch(
      handleStepOne({
        courseTypeId: currentType.value,
        CourseLvlId: currentLevel.value,
        termId:  currentTerm.value,
        classId:  currentClassRoom.value,
        TeacherId:  currentTeacher.value,
        techId:  currentTechnology.value,
        // status: courseStatus.value,
      })
    );
  };

  // const { setFieldValue } = useFormikContext();
  //==========================================================

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات اولیه دوره</h5>
        <small className="text-muted">لطفا اطلاعات اولیه را وارد نمایید.</small>
      </div>
      <Row>
        <Col className="mb-1" md="6" sm="12">
          <Label className="form-label"> نوع کلاس </Label>
          <Select
            options={courseType}
            value={currentType}
            className="react-select"
            classNamePrefix="select"
            onChange={(val) => setCurrentType(val)}
          />
        </Col>

        <Col className="mb-1" md="6" sm="12">
          <Label className="form-label"> سطح دوره </Label>
          <Select
            options={courseLevel}
            value={currentLevel}
            className="react-select"
            classNamePrefix="select"
            onChange={(val) => setCurrentLevel(val)}
          />
        </Col>

        <Col className="mb-1" md="6" sm="12">
          <Label className="form-label"> وضعیت دوره </Label>
          <Select
            options={courseStatus}
            value={currentStatus}
            className="react-select"
            classNamePrefix="select"
            onChange={(val) => setCurrentStatus(val)}
          />
        </Col>

        <Col className="mb-1" md="6" sm="12">
          <Label className="form-label"> کلاس درس </Label>
          <Select
            options={courseClassRoom}
            value={currentClassRoom}
            className="react-select"
            classNamePrefix="select"
            onChange={(val) => setCurrentClassRoom(val)}
          />
        </Col>

        <Col className="mb-1" md="6" sm="12">
          <Label className="form-label"> استاد </Label>
          <Select
            options={courseTeacher}
            value={currentTeacher}
            className="react-select"
            classNamePrefix="select"
            onChange={(val) => setCurrentTeacher(val)}
          />
        </Col>

        <Col className="mb-1" md="6" sm="12">
          <Label className="form-label"> ترم </Label>
          <Select
            options={courseTerm}
            value={currentTerm}
            className="react-select"
            classNamePrefix="select"
            onChange={(val) => setCurrentTerm(val)}
          />
        </Col>

        <Col className="mb-1" md="6" sm="12">
          <Label className="form-label">آموزش و یادگیری</Label>
          <Select
            options={courseTechnology}
            value={currentTechnology}
            className="react-select"
            classNamePrefix="select"
            onChange={(val) => setCurrentTechnology(val)}
          />
        </Col>
      </Row>
      <div className="d-flex justify-content-between">
        <Button
          color="primary"
          className="btn-next"
          type="submit"
          onClick={() => {
            Step1(), stepper.next();
          }}
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
    </Fragment>
  );
};

export default AccountDetails;
