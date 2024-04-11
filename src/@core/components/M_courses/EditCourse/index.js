
import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'

import BreadCrumbs from '@components/breadcrumbs'
import { useParams } from 'react-router-dom';


const Wizard = () => {

  return (
    <Fragment>
      <BreadCrumbs title='Form Wizard' data={[{ title: 'Form' }, { title: 'Form Wizard' }]} />
      <Row>
        <Col sm='12'>
          <WizardHorizontal />
        </Col>
      </Row>
    </Fragment>
  )
}
export default Wizard
