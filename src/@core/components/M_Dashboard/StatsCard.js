// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import { useQuery } from "react-query";
import http from "../../interceptor";
import { useNavigate } from 'react-router-dom';

const StatsCard = ({ cols }) => {
 
  const {data: dataHomeReport, status} = useQuery("siteStats", () =>  http.get(`/Home/LandingReport`))
console.log("hhhh",dataHomeReport)
const navigate = useNavigate()
  const data = [
    {
      title: 'تعداد اساتید',
      subtitle: dataHomeReport?.teacherCount,
      color: 'light-primary',
      linkTo: '/M_users/list',
      icon: <TrendingUp size={20} />
    },
    {
      title: 'تعداد دانشجویان',
      subtitle:dataHomeReport?.studentCount,
      color: 'light-info',
      linkTo: '/M_users/list',
      icon: <User size={20} />
    },
    {
      title: 'تعداد دوره ها',
      subtitle: dataHomeReport?.courseCount,
      color: 'light-danger',
      linkTo: '/M_courses',
      icon: <Box size={18} />
    },
    {
      title: 'اخبار و مقالات ',
      subtitle: dataHomeReport?.newsCount,
      color: 'light-success',
      linkTo: '/M_News',
      icon: <DollarSign size={20} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
          onClick={() => navigate(item.linkTo)}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='' />
            <div className='my-auto mx-1'>
              <h4 className='fw-bolder mb-0 fs-3 text-nowrap '>{item.title}</h4>
              <CardText className='font-md-3 mb-0 fs-4 '><strong>{item.subtitle}</strong></CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics '>
      <CardHeader>
        <CardTitle tag='h4' className='fs-1 fw-bolder'>آمارسایت</CardTitle>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
