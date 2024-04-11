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
import { handleId, handleStepOne } from "../../../../../redux/editCourse";
import { useParams } from "react-router-dom";

const AccountDetails = ({ stepper, type,data }) => {


  const [courseLevel, setCourseLevel] = useState([]);
  const [courseType, setCourseType] = useState([]);
  const [courseStatus, setCourseStatus] = useState([]);
  const [courseClassRoom, setCourseClassRoom] = useState([]);
  const [courseTeacher, setCourseTeacher] = useState([]);
  const [courseTerm, setCourseTerm] = useState([]);
  const [courseTechnology, setCourseTechnology] = useState([]);

  const paramId = useParams();
  console.log("paramId", paramId);


  const getCourse = async () => {
    const result = await http.get(
      `/Course/GetEditCourse?CourseId=${paramId.id}`
    );
    console.log(result);

    setCourseType(
      result?.getCourseFor.courseTypeDtos?.map((m) => ({
        value: m.id,
        label: m.typeName,
      }))
    );
    setCourseLevel(
      result?.getCourseFor.courseLevelDtos?.map((m) => ({
        value: m.id,
        label: m.levelName,
      }))
    );
    setCourseClassRoom(
      result?.getCourseFor.classRoomDtos?.map((m) => ({
        value: m.id,
        label: m.classRoomName,
      }))
    );
    setCourseTeacher(
      result?.getCourseFor.teachers?.map((m) => ({
        value: m.teacherId,
        label: m.fullName,
      }))
    );
    setCourseTerm(
      result?.getCourseFor.termDtos.map((m) => ({
        value: m.id,
        label: m.termName,
      }))
    );
    setCourseStatus(
      result?.getCourseFor.statusDtos.map((m) => ({
        value: m.id,
        label: m.statusName,
      }))
    );
    setCourseTechnology(
      result?.getCourseFor.technologyDtos.map((m) => ({
        value: m.id,
        label: m.techName,
      }))
    );
    console.log("result", result);

    return result;
  };
  const { data: dataGet, status: statusGet } = useQuery("getCourse", getCourse);

  console.log("dataGet", dataGet);



  useEffect(() => {
    getCourse();
  }, [statusGet , dataGet]);

  const [currentLevel, setCurrentLevel] = useState({
    value: dataGet?.courseLvlId,
    label: data?.courseLevelName,
  });
  const [currentType, setCurrentType] = useState({
    value: dataGet?.courseTypeId,
    label: data?.courseTypeName,
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: dataGet?.currentStatusNumber,
    label: data?.courseStatusName,
  });
  const [currentClassRoom, setCurrentClassRoom] = useState({
    value: dataGet?.classId,
    label: data?.courseClassRoomName,
  });
  const [currentTeacher, setCurrentTeacher] = useState({
    value: dataGet?.teacherId,
    label: data?.teacherName,
  });
  const [currentTerm, setCurrentTerm] = useState({
    value: dataGet?.tremId,
    label: dataGet?.termName,
  });
  const [currentTechnology, setCurrentTechnology] = useState(
    dataGet?.thisCourseTechnology.map((m) => ({
      value: m?.id,
      label: m?.techName,
    }))
  );

  const dispatch = useDispatch();
  const Step1 = () => {
    dispatch(
      handleStepOne({
        CourseTypeId: currentType.value,
        CourseLvlId: currentLevel.value,
        TremId: currentTerm.value,
        ClassId: currentClassRoom.value,
        TeacherId: currentTeacher.value,
        techId: currentTechnology.value,
      })     
    );
    dispatch(
      handleId({
        Id:paramId.id
      })
    )
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات اولیه دوره</h5>
        <small className="text-muted">
          لطفا اطلاعات اولیه را ویرایش نمایید.
        </small>
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
            isMulti
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
