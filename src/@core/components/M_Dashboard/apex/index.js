// ** React Imports
import { Fragment, useContext } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Charts
import ApexDonutChart from './ApexDonutChart'


// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const ApexCharts = () => {
  // ** Hooks
  const [isRtl] = useRTL()

  // ** Theme Colors
  const { colors } = useContext(ThemeColors)

  return (
    <Fragment>
      {/* <Breadcrumbs title='Apex Charts' data={[{ title: 'Charts' }, { title: 'Apex' }]} /> */}
      <Row  className='match-height'>
        <Col xl='12' lg='12'>
          <ApexDonutChart />
        </Col>
      </Row>
    </Fragment>
  )
}

export default ApexCharts
