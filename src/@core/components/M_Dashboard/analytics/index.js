// ** React Imports
import { useContext, useEffect, useState } from "react";

// ** Icons Imports
import { Heart, List, MessageSquare, ShoppingBag, User } from "react-feather";

// ** Custom Components
// import Avatar from '@components/avatar'
// import Timeline from '@components/timeline'
// import AvatarGroup from '@components/avatar-group'

// ** Utils
import { kFormatter } from "@utils";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import CardCongratulations from "../CardCongratulations";
import SubscribersGained from "../SubscribersGained";
import SupportTracker from "../SupportTracker";
// import OrdersReceived from "../OrdersReceived";
import http from "../../../interceptor";
import { useQuery } from "react-query";
import { getItem } from "../../../common/storage.services";
import StatsCard from "../StatsCard";
import StatsVertical from "../StatsVertical";
import ApexCharts from "../apex";

const AnalyticsDashboard = () => {
  const [data, setData] = useState([]);

  const getReportDashdoard = async () => {
    const result = await http.get(`/Report/DashboardReport`);
    return result;
  };
  const { data: dataDashboard, status } = useQuery(
    "getReportDashdoard",
    getReportDashdoard
  );
  dataDashboard && console.log("rrrr", dataDashboard);

  useEffect(() => {
    if (status === "success") {
      setData(dataDashboard);
    }
  }, [status, data]);
  console.log("dddddddddddddata", data);
  //==================================
  const geUserDetails = async () => {
    const result = await http.get(`/User/UserDetails/${getItem("userId")}`);
    return result;
  };
  const { data: dataUserDetail } = useQuery("geUserDetails", geUserDetails);
  dataUserDetail && console.log("ddddd", dataUserDetail);

  // ** Context
  const { colors } = useContext(ThemeColors);

  return (
    <div id="dashboard-analytics">
      <Row className="match-height">
        <Col lg="6" sm="12">
          <CardCongratulations dataUserDetail={dataUserDetail} />
        </Col>
        <Col lg="2" sm="6">
          <StatsVertical
            icon={<ShoppingBag size={21} />}
            color="success"
            stats={data.allPaymentCost}
            statTitle="مبلغ کل پرداختی"
          />
        </Col>
        <Col lg="2" sm="6">
          <StatsVertical
            icon={<User size={21} />}
            color="success"
            stats={data.allUser}
            statTitle="تعداد کل کاربران"
          />
        </Col>
        <Col lg="2" sm="6">
          <StatsVertical
            icon={<MessageSquare size={21} />}
            color="success"
            stats={data.allReserve}
            statTitle=" تعداد تمام دوره های رزرو شده "
          />
        </Col>
      </Row>
      <Row>
        <Col xl="12" md="6" xs="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} />
        </Col>
      </Row>
      <Row className="match-height ">
        <Col lg="6" md="12" xs="12">
          <SupportTracker
            data={data}
            primary={colors.primary.main}
            danger={colors.danger.main}
            title={"اطلاعات کاربران"}
            total={"همه ی کاربران"}
            active={"کاربران فعال"}
            diactive={"کاربران غیر فعال"}
            totalCount={data.allUser}
            activeCount={data.inCompeletUserCount}
            diactiveCount={data.deactiveUsers}
            activePercent={data.activeUserPercent}
            diactivePercent={data.interActiveUserPercent}
            activelabel={"کاربران فعال"}
            diactivelabel={"کاربران غیرفعال"}
          />
        </Col>
        <Col lg="6" md="12" xs="12">
          <SupportTracker
            data={data}
            primary={colors.primary.main}
            danger={colors.danger.main}
            title={"اطلاعات دوره ها"}
            total={"همه ی دوره های رزرو شده"}
            active={"رزرو های تایید شده"}
            diactive={"رزرو های تایید نشده"}
            totalCount={data.allReserve}
            activeCount={data.allReserveAccept}
            diactiveCount={data.allReserveNotAccept}
            activePercent={
              data.reserveAcceptPercent && data.reserveAcceptPercent.slice(0, 2)
            }
            activelabel={"رزوهای تایید شده"}
            diactivePercent={
              data.reserveNotAcceptPercent &&
              data.reserveNotAcceptPercent.slice(0, 2)
            }
            diactivelabel={"رزوهای تایید نشده"}
          />
        </Col>
      </Row>
      <Row>
        <Col xl="6" md="12" xs="12">
          <ApexCharts />
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsDashboard;
