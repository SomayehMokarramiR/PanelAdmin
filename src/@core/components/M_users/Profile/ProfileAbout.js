// ** Reactstrap Imports
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
} from "reactstrap";

const ProfileAbout = ({ data }) => {
  return (
    <Card>
      <CardHeader className="text-center d-flex justify-content-center fw-bolder text-primary">
        <CardTitle tag="h4"> اطلاعات کاربر </CardTitle>
      </CardHeader>
      <CardBody>
        <div >
          <h5 className="mb-75 text-nowrap">نام و نام خانوادگی :</h5>
          <CardText className="d-flex me-4">{data.fName + " " + data.lName}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">کدملی:</h5>
          <CardText>{data.nationalCode}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">وضعیت:</h5>
          {data.active ? (
            <Badge color="light-success">فعال</Badge>
          ) : (
            <Badge color="light-danger">غیر فعال</Badge>
          )}
        </div>
        <div className="mt-2">
          <h5 className="mb-75">شماره تماس:</h5>
          <CardText>{data.phoneNumber}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">نام کاربری:</h5>
          <CardText>{data.userName}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75"> جنسیت :</h5>
          <CardText>{data.gender ? "مرد" : "زن"}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">تاریخ درج :</h5>
          <CardText>{data.insertDate.substr(0, 10)}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">تاریخ تولد :</h5>
          <CardText>{data.birthDay.substr(0, 10)}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">آدرس محل زندگی:</h5>
          <CardText>{data.homeAdderess}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75"> ایمیل :</h5>
          <CardText>{data.gmail}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75"> نقش های کاربر :</h5>
          {data.roles.map((item, index) => {
            return <CardText>{item.roleName}</CardText>;
          })}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileAbout;
