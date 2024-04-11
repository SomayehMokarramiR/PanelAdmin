// ** Icons Imports
import { Award } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { Button, Card, CardBody, CardText } from "reactstrap";

// ** Images
import decorationLeft from "../../assets/images/decore-left.png";
import decorationRight from "../../assets/images/decore-right.png";
import { useSelector } from "react-redux";

const CardCongratulations = ({ dataDashboard, dataUserDetail }) => {
  // const user = useSelector((state) => state.user);

  console.log(dataDashboard);
  console.log(dataUserDetail);
  return (
    <Card className="card-congratulations">
      <CardBody className="text-center">
        <img
          className="congratulations-img-left"
          src={decorationLeft}
          alt="decor-left"
        />
        <img
          className="congratulations-img-right"
          src={decorationRight}
          alt="decor-right"
        />
        <Avatar
          icon={<Award size={28} />}
          className="shadow"
          color="primary"
          size="xl"
        />
        <div className="text-center">
          <h1 className="mb-2 text-white">تبریک!</h1>
          <CardText className="m-auto w-75 fs-5 text-nowrap">
              کاربر گرامی
              <strong>
                {dataUserDetail?.fName + " " + dataUserDetail?.lName}
              </strong>شما با رول<strong>{dataUserDetail?.roles[0].roleName} </strong>وارد شدید
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardCongratulations;
