import '../../css/Home.css'
import { getRole } from '../../Utils/jwtUtil';
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate();

   const token = localStorage.getItem('token');
  return (
      <div className="home-wrapper">

      <div className="hero-section">
        <div className="hero-text">
          <h1>Premium Car Services, <br/>Just a Click Away</h1>
          <p>Book, Track & Relax. We’ll handle your car with care.</p>
          <div>
            
            {token ? <button onClick={() => navigate('/view-services')}>View Services</button>:''}
            {token ? '' : (<button onClick={() => navigate('/login')} className="secondary-btn">Login</button>)}
         
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Why Choose Wheelo?</h2>
        <div className="features">
          <div className="feature-card">✓ Certified Mechanics</div>
          <div className="feature-card">✓ Doorstep Pickup & Drop</div>
          <div className="feature-card">✓ Transparent Pricing</div>
          <div className="feature-card">✓ Real-Time Tracking</div>
        </div>
      </div>

      <div className='happy-customers m-5 text-center'>
        <h3>Happy Customers</h3>
          <div className='cust-feedbacks '>
            <div className='feedback-card'><p>“Excellent service and very professional staff. My car feels brand new!”<br/>-Aman Gupta</p></div>
            <div className='feedback-card'><p>“Booked a full service online — seamless experience from start to finish.”<br/>-Namita Thaper</p></div>
            <div className='feedback-card'><p>“Genuine parts used and affordable pricing. Highly recommended!”<br/>-Piyush Bansal</p></div>
            <div className='feedback-card'><p>“Incredible shine after the wash! Feels like a showroom finish.”<br/>-Veenita Singh</p></div>
          </div>
      </div>
    </div>
  )
}

export default Home
