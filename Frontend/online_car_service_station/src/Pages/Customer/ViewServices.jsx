import React, { useEffect, useState } from 'react'
import Service from '../../Components/Service';
import CarDetailsModal from '../../Components/CarDetailsModal'
import axios from 'axios'
import { toast } from 'react-toastify'

function ViewServices() {

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    if (selectedServices.length > 0)
      setOpen(true)
    else
      toast.warn("Select at least one service!", {
        position: "top-center",
        autoClose: 1551,
      })
  }

  const handleClose = () => setOpen(false)


  const [services, setServices] = useState([])
  const [selectedServices, setSelectedServices] = useState([])

  const handleToggleService = (serviceId) => {
    const alreadyAdded = selectedServices.some(s => s === serviceId)
    if (alreadyAdded) {
      setSelectedServices(prev => prev.filter(s => s !== serviceId))
    } else {
      setSelectedServices(prev => [...prev, serviceId])
    }
  };

  const isServiceSelected = (id) => {
    return selectedServices.some(s => s === id)
  };

  const getAllServices = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get("http://localhost:8080/services/allservices", { headers: { 'Authorization': token } })
      return response.data
    } catch (err) {
      toast.error("Error while loading services!", {
        position: "top-center",
        autoClose: 1111,
      })
      return []
    }
  }

  useEffect(() => {

    const fetchServices = async () => {
      const allServices = await getAllServices()
      setServices(allServices)
    }
    fetchServices()
  }, [])


  return (
    <div className='container view-services min-ht'>
      <button className='btn btn-primary mx-4 mt-3' onClick={handleOpen} >Book</button>
      {services.map(service => (
        <Service
          key={service.serviceId}
          service={service}
          isSelected={isServiceSelected(service.serviceId)}
          onToggle={() => handleToggleService(service.serviceId)}
        />
      ))}
      <CarDetailsModal open={open} setOpen={setOpen} selectedServices={selectedServices} setSelectedServices={setSelectedServices} handleClose={handleClose} />

    </div>

  )
}

export default ViewServices


