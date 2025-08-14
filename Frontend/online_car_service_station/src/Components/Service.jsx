import '../css/Service.css'
import { FaPlus } from 'react-icons/fa'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import serviceIcon from "../assets/icons/serviceIcon.gif"
import { getRole } from '../Utils/jwtUtil'

function Service({ service, isSelected, onToggle ,handleDelete, handleEdit}) {
  return (
    <div className='row m-4 p-2 border rounded single-service d-flex align-items-center' style={{ backgroundColor: "white" }}>
      <div className='col-2'><img style={{ height: '50px' }} src={serviceIcon} alt="service-icon" /></div>
      <div className='col-5'>
        <span className='serviceName'>{service.serviceName}</span>
        <p>{service.description}</p>
      </div>
      <div className='col-2 price fw-semibold'>&#x20B9;{service.price}</div>
      <div className={` col-3 plus ${getRole() === 'ROLE_CUSTOMER' ? "text-end" : ""}`}>
        {
          getRole() === 'ROLE_CUSTOMER' ?
            (isSelected ?
              <SiTicktick size={'35px'} color='#00ff2aff' onClick={onToggle} />
              :
              <FaPlus color='#1b892dff' size={'35px'} onClick={onToggle} />
            )
            :
            <>
              <MdEdit size={'35px'} color='blue' className='mx-3 my-1' onClick={()=>handleEdit(service.serviceId)} />
              <MdDelete size={'35px'} color='red' className='mx-3 my-1' onClick={()=> handleDelete(service.serviceId)} />
            </>
        }
      </div>
    </div>
  );
}

export default Service