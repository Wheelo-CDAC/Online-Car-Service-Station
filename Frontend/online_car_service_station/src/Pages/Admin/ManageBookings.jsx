import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
function ManageBookings() {

  const [allBookings, setAllBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});

  const handleStatus = async (id, newStatus) => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.put(`http://localhost:8080/booking/${id}?bookingStatus=${newStatus}`, {}, { headers: { 'Authorization': token } })
      toast.success(response.data, {
        position: "top-center",
        autoClose: 1111,
      })
    } catch (err) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 1111,
      })
    }
    getAllBookings()
  }

  useEffect(() => {
    allBookings
      .filter(b => b.paymentStatus === "PAID")
      .forEach(b => {
        if (!feedbacks[b.bookingId]) {
          getFeedback(b.bookingId);
        }
      });
  }, [allBookings]);

  const getFeedback = async (bookingId) => {
    try {
      const resp = await axios.get(
        `http://localhost:8080/feedback/get/${bookingId}`, { headers: { 'Authorization': localStorage.getItem('token') } });
      setFeedbacks(prev => ({
        ...prev,
        [bookingId]: resp.data.comment || null
      }));
    } catch (err) {
      toast.error(err)
    }
  };

  const getAllBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8080/booking", { headers: { 'Authorization': localStorage.getItem('token') } })
      setAllBookings(response.data)

    } catch (err) {
      toast.error("Error while loading Bookings!", {
        position: "top-center",
        autoClose: 1111,
      })
      return []
    }
  }

  useEffect(() => {
    getAllBookings()
  }, [])



  return (

    <div className='container min-ht'>
      {allBookings.map((booking) =>
        <div className="card m-2 booking-card w-sm-100" key={booking.bookingId}>
          <h5 className="mx-3 mt-3">Booking ID: {booking.bookingId}</h5>
          <div className="card-body d-flex flex-wrap justify-content-around">
            <div className="">
              <p className="mb-1"><strong>Date:</strong> {booking.serviceDate}</p>
              <p className="mb-1">
                <strong>Status:</strong>{" "}<span className={`badge ${getStatusClass(booking.bookingStatus)}`}> {booking.bookingStatus}</span>
              </p>
              <p className="mb-1"><strong>Car :</strong> {booking.vehicleNo}</p>
            </div>
            <div>
              <p className="mb-1"><strong>Services:</strong></p>
              <ul className="service-list">
                {booking.serviceNames.map((service) => <li key={service}>{service}</li>)}
              </ul>
              <p>Total Amount : {booking.amount}</p>
            </div>
            <div className="text-end">
              {
                !(booking.bookingStatus === 'CANCELED' || booking.paymentStatus === 'PAID') &&

                <select className="form-select"
                  value={booking.bookingStatus}
                  onChange={(e) => handleStatus(booking.bookingId, e.target.value)}>
                  <option value={booking.bookingStatus}>--Status--</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              }
              {
                (booking.paymentStatus === "PAID") &&
                <>
                  <p className="mb-1"><strong>Feedback:</strong></p>
                  <p>{feedbacks[booking.bookingId] || ""}</p>
                </>
              }

            </div>
            <div>

              <p className='mx-2' color='gray'><strong>Customer:</strong> {booking.email}</p>
              <p>Phone : {booking.phoneNo}</p>
            </div>

          </div>
        </div>


      )}
    </div>
  )
}

export default ManageBookings



const getStatusClass = (status) => {
  switch (status) {
    case "COMPLETED":
      return "bg-success";
    case "IN_PROGRESS":
      return "bg-primary"
    case "CONFIRM":
      return "bg-warning text-dark";
    case "CANCELED":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
};
