import React, { useEffect, useState } from 'react';
import Service from '../../Components/Service';
import AddNewServiceModal from '../../Components/AddNewServiceModal';
import axios from 'axios';
import { toast } from 'react-toastify';

function ManageServices() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEditing(null); 
    setOpen(false);
  };

  const getAllServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:8080/services/allservices", {
        headers: { 'Authorization': token }
      });
      setServices(response.data);
    } catch (err) {
      toast.error("Error while loading services!", {
        position: "top-center",
        autoClose: 1111,
      });
      // toast.error("Failed to load services");
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const handleAdd = async (serviceName, serviceDescription, servicePrice, serviceIcon) => {
    const token = localStorage.getItem('token');

    try {
      if (editing) {
        await axios.put(
          `http://localhost:8080/services/update/${editing.serviceId}`,
          {
            serviceName,
            description: serviceDescription,
            price: servicePrice,
          },
          { headers: { 'Authorization': token } }
        );
        toast.success("Service updated successfully!");
      } else {
        await axios.post(
          "http://localhost:8080/services/addservice",
          {
            serviceName,
            description: serviceDescription,
            price: servicePrice,
            icon: serviceIcon
          },
          { headers: { 'Authorization': token } }
        );
        toast.success("Service added successfully!", {
          position: "top-center",
          autoClose: 1111,
        });
      }

      getAllServices();
      handleClose();
    } catch (err) {
      toast.error("Error while saving service!");
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/services/delete/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      toast.success("Service deleted!", {
        position: "top-center",
        autoClose: 1111,
      });
      setServices(services.filter((s) => s.serviceId !== id));
    } catch (err) {
      toast.error("Error while deleting!");
    }
  };

  const handleDelete = (id) => {
    deleteService(id);
  };

  const handleEdit = (id) => {
    const serviceToEdit = services.find((s) => s.serviceId === id);
    setEditing(serviceToEdit);
    setOpen(true);
  };

  return (
    <div className='container min-ht'>
      <button className='btn btn-primary mx-5 mt-3' onClick={handleOpen}>Add New</button>
      <div>
        {services.map((service) =>
          <Service
            key={service.serviceId}
            service={service}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
      </div>
      <AddNewServiceModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleAdd={handleAdd}
        getAllServices={getAllServices}
        editing={editing}
      />
    </div>
  );
}

export default ManageServices;
