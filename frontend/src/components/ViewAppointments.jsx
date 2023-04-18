import { viewAppts } from '../assets';
import { Link } from 'react-router-dom';

const ViewAppointments = () => (

  <Link to="/appointments" className='justify-between items-center hover:brightness-50'>
    <img src = {viewAppts} alt = 'viewAppts'
      className = 'mt-16 mb-6 w-auto h-auto' />
  </Link>
)

export default ViewAppointments