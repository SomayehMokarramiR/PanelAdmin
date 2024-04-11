// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components


// ** Steps
import Address from './steps/Address'
import SocialLinks from './steps/SocialLinks'
import PersonalInfo from './steps/PersonalInfo'
import AccountDetails from './steps/AccountDetails'
import Wizard from '../../../components/wizard'


const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'account-details',
      title: 'اطلاعات اولیه دوره',
      subtitle: 'لطفا اطلاعات اولیه را وارد کنید.',
      content: <AccountDetails stepper={stepper} />
    },
    {
      id: 'personal-info',
      title: 'اطلاعات تکمیلی',
      subtitle: 'اضاقه کردن اطلاعات تکمیلی',
      content: <PersonalInfo stepper={stepper} />
    },
    {
      id: 'step-address',
      title: ' لینک ها',
      subtitle: 'لطفا لینک ها را وارد کنید',
      content: <Address stepper={stepper} />
    },
    {
      id: 'social-links',
      title: 'تصویر',
      subtitle: 'لطفا تصویر را وارد نمایید',
      content: <SocialLinks stepper={stepper} />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard  instance={(el) => setStepper(el)}  ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontal
