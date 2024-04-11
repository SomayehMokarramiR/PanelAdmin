// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components


// ** Steps

import PersonalInfo from './steps/PersonalInfo'
import AccountDetails from './steps/AccountDetails'
import Wizard from '../../wizard'


const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'account-details',
      title: 'اطلاعات اولیه کاربر',
      subtitle: 'لطفا اطلاعات اولیه کاربر را ویرایش کنید.',
      content: <AccountDetails stepper={stepper} />
    },
    {
      id: 'personal-info',
      title: '  اطلاعات تکمیلی کاربر',
      subtitle: ' ویرایش اطلاعات تکمیلی',
      content: <PersonalInfo stepper={stepper} />
    },
  
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard  instance={(el) => setStepper(el)}  ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontal
