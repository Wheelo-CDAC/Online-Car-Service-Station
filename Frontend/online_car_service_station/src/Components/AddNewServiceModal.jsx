
import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddNewServiceModal({ open, setOpen, handleClose, getAllServices, editing }) {

    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        serviceName: "",
        description: "",
        price: ""
    });

    useEffect(() => {
        if (editing) {
            setFormData({
                serviceName: editing.serviceName,
                description: editing.description,
                price: editing.price
            });
        } else {
            setFormData({
                serviceName: "",
                description: "",
                price: ""
            });
        }
    }, [editing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editing) {
                // UPDATE service
                await axios.put(
                    `http://localhost:8080/services/updateservice/${editing.serviceId}`,
                    formData,
                    {
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    }
                );
                toast.success("Service updated successfully!");
            } else {
                await axios.post(
                    'http://localhost:8080/services/addservice',
                    formData,
                    {
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    }
                );
                toast.success("Service added successfully!");
            }

            await getAllServices();
            setOpen(false);
            setFormData({ serviceName: "", description: "", price: "" });
        } catch (err) {
            toast.error('Error while saving service');
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {editing ? "Update Service" : "Create New Service"}
                </Typography>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <input
                        className='form-control mt-1'
                        name="serviceName"
                        type="text"
                        required
                        placeholder='Service Name'
                        value={formData.serviceName}
                        onChange={handleChange}
                    />
                    <textarea
                        className='form-control mt-2'
                        name="description"
                        required
                        placeholder='Service Description'
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                    <input
                        className='form-control mt-2'
                        name="price"
                        type="number"
                        min={0}
                        required
                        placeholder='Price'
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <input
                        className='btn btn-success mt-2 w-100'
                        type="submit"
                        value={editing ? "Update" : "Add"}
                    />
                </form>
            </Box>
        </Modal>
    );
}

export default AddNewServiceModal;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
};
