import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function MyBookings() {
  const [myBookings, setMyBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [feedBackText, setFeedbackText] = useState("")

  useEffect(() => {
    myBookings
      .filter(b => b.paymentStatus === "PAID")
      .forEach(b => {
        if (!feedbacks[b.bookingId]) {
          getFeedback(b.bookingId);
        }
      });
  }, [myBookings]);

  const getFeedback = async (bookingId) => {
    try {
      const resp = await axios.get(
        `http://localhost:8080/feedback/get/${bookingId}`, 
        { headers: { 'Authorization': localStorage.getItem('token') } });
      setFeedbacks(prev => ({
        ...prev,
        [bookingId]: resp.data.comment || null
      }));
    } catch (err) {
      toast.error("Error while fethincg bookings", { position: "top-center", autoClose: 1111, })
    }
  };

  const handleCancel = async (id, newStatus) => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.put(`http://localhost:8080/booking/${id}?bookingStatus=CANCELED`,
         {}, { headers: { 'Authorization': token } })
      toast.error("Canceled booking!", {
        position: "top-center",
        autoClose: 1111,
      })
    } catch (err) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 1111,
      })
    }
    getMyBookings()
  }

  const getMyBookings = async () => {
    try {
      const token = localStorage.getItem('token').substring(7).trim()
      const response = await axios.get("http://localhost:8080/booking", 
        { headers: { 'Authorization': localStorage.getItem('token') } })
      setMyBookings(response.data)
    } catch (err) {
      toast.warn("Error while loading Bookings!", { position: "top-center", autoClose: 1111, })
      return []
    }
  }

  const fetchBookings = async () => {
    const allServices = await getMyBookings()
  }
  useEffect(() => {
    fetchBookings()
  }, [])

  const handlePayment = async (bookingId) => {

    const token = localStorage.getItem("token")
    try {
      const resp = await axios.put(`http://localhost:8080/booking/${bookingId}/payment?paymentStatus=PAID`,
         {}, { headers: { 'Authorization': token } })
      toast.success(resp.data, { position: "top-center", autoClose: 1111, })
      fetchBookings()
    } catch (err) {
      toast.warn("Something went wrong!", { position: "top-center", autoClose: 1111, })
    }
  }

  const handleSubmit = async (bookingId) => {
    const token = localStorage.getItem('token')
    try {
      const resp = await axios.post(`http://localhost:8080/feedback/${bookingId}`,
        { rating: 0, comment: feedBackText },
        { headers: { 'Authorization': token } })
      getMyBookings()
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <div className='container min-ht'>
      {myBookings.map((booking) =>

        <div className="card m-2 booking-card w-sm-100" key={booking.bookingId}>
          <h5 className="mx-3 mt-3">Booking ID: {booking.bookingId}</h5>
          <div className="card-body d-flex flex-wrap justify-content-around">
            <div className="">
              <p className="mb-1"><strong>Date:</strong> {booking.serviceDate}</p>
              <p className="mb-1">
                <strong>Status:</strong>{" "}<span className={`badge ${getStatusClass(booking.bookingStatus)}`}> {booking.bookingStatus}</span>
              </p>
              <p className="mb-1"><strong>Vehicle:</strong> {booking.model}</p>
            </div>
            <div>
              <p className="mb-1"><strong>Services:</strong></p>
              <ul className="service-list">
                {booking.serviceNames.map((service) => <li key={service}>{service}</li>)}
              </ul>
            </div>
            <div><p><strong>Amount : </strong>{booking.amount}</p></div>
            <div className="text-end">
              {
                booking.bookingStatus === "CONFIRM" &&
                (<button className="btn btn-warning" onClick={() => handleCancel(booking.bookingId)}>Cancel</button>)
              }

              {
                booking.bookingStatus === "COMPLETED" && booking.paymentStatus !== "PAID" &&
                (<button className="btn btn-success mt-2" onClick={() => handlePayment(booking.bookingId)}> Pay Now </button>)
              }

              {
                booking.paymentStatus === "PAID" &&
                <>
                  <div>

                    <label name="feedback"><strong>Feedback: </strong></label>
                    {feedbacks[booking.bookingId] ||
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(booking.bookingId);
                      }}>
                        <textarea name="feedback" className="w-100" onChange={(e) => setFeedbackText(e.target.value)} placeholder="Give feedback"></textarea>
                        <input type="submit" value="Send" className="btn" />
                      </form>}
                  </div>
                </>
              }
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default MyBookings


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


