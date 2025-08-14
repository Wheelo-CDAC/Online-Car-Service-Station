import React, { useState } from 'react'
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';

function CarDetailsModal({ open, setOpen, handleClose, selectedServices, setSelectedServices }) {
    const [car, setCar] = useState({ model: "", regNo: "" })
    const [bookingDate, setBookingDate] = useState('')
    const handleConfirm = (e) => {
        e.preventDefault()
        const regex = /^(AP|AR|AS|BR|CG|CH|DD|DL|DN|GA|GJ|HP|HR|JH|JK|KA|KL|LA|LD|MH|ML|MN|MP|MZ|NL|OD|PB|PY|RJ|SK|TN|TR|TS|UK|UP|WB)[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
        if (regex.test(car.regNo)) {
            //axios post

            const createBooking = async () => {

                try {
                    const result = await axios.post("http://localhost:8080/booking/addbooking",
                        { model: car.model, vehicleNo: car.regNo, serviceIds: selectedServices, serviceDate: bookingDate },
                        {
                            headers: {
                                Authorization: localStorage.getItem('token')
                            }
                        });
                    console.log("Add booking success:", result.data);
                    // Handle success navigate to login, show toast

                } catch (error) {
                    // console.error("Signup error:", error);
                    alert("Something went wrong!", error);
                }
            };
            createBooking();

            console.log(car)
            console.log(bookingDate)
            console.log(selectedServices)
            setOpen(false)
            toast.success("Booking Confirmed", {
                position: "top-center",
                autoClose: 1111,
            })
            setSelectedServices([])
        } else {
            alert("Invalid Reg number")
        }
        // alert(car.model +" " + car.regNo +" ")
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">Add Car Details</Typography>
                <form onSubmit={handleConfirm} >
                    <label>Model <span style={{ color: "red" }}>*</span></label>
                    <input className='form-control mb-1' type="text" onChange={(e) => { setCar({ ...car, model: e.target.value }) }} required placeholder='Model' />
                    <label>Reg. Number <span style={{ color: "red" }}>*</span></label>
                    <input className='form-control ' type="text" onChange={(e) => { setCar({ ...car, regNo: e.target.value }) }} required placeholder='e.g- MH09AD5432' />
                    <label>Select the date to service the car <span style={{ color: "red" }}>*</span></label>
                    <input className='form-control mb-2' type="date" onChange={(e) => { setBookingDate(e.target.value) }} required min={new Date().toISOString().split('T')[0]} />
                    <input className='btn btn-success mt-2 w-100' type="submit" value="Confirm Booking" />
                </form>
            </Box>
        </Modal>
    )
}

export default CarDetailsModal



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