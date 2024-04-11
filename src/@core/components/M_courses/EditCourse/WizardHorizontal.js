// ** React Imports
import { useEffect, useRef, useState } from 'react'

// ** Custom Components


// ** Steps
import Address from './steps/Address'
import SocialLinks from './steps/SocialLinks'
import PersonalInfo from './steps/PersonalInfo'
import AccountDetails from './steps/AccountDetails'
import Wizard from '../../../components/wizard'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import http from "../../../interceptor";

const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const paramId = useParams();
  console.log("paramId", paramId);

  const getCourseInfo = async () => {
    const result = await http.get(`/Course/${paramId.id}`);
    return result;
  };
  const { data, status } = useQuery(["courseInfo", paramId.id], getCourseInfo);

  data && console.log("dataByid", data);

  useEffect(() => {
    getCourseInfo();
  }, [status, data]);


  const steps = [
    {
      id: 'account-details',
      title: 'اطلاعات اولیه دوره',
      subtitle: 'لطفا اطلاعات اولیه را ویرایش کنید.',
      content: <AccountDetails stepper={stepper}  data={data} />
    },
    {
      id: 'personal-info',
      title: 'اطلاعات تکمیلی',
      subtitle: ' ویرایش اطلاعات تکمیلی',
      content: <PersonalInfo stepper={stepper} data={data}  />
    },
    {
      id: 'step-address',
      title: ' لینک ها',
      subtitle: 'لطفا لینک ها را ویرایش کنید',
      content: <Address stepper={stepper} data={data}  />
    },
    {
      id: 'social-links',
      title: 'تصویر',
      subtitle: 'لطفا تصویر را ویرایش نمایید',
      content: <SocialLinks stepper={stepper}  data={data} />
    }
  ]




  return (
    <div className='horizontal-wizard'>
      <Wizard  instance={(el) => setStepper(el)}  ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontal
