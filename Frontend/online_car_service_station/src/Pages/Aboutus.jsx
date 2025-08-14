import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Aboutus.css'

function Aboutus() {
  return (
    <div className="about-us-page">
      <section className="hero-section-about text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">About Wheelo</h1>
          <p className="lead">Smart. Trusted. Affordable Car Care at Your Fingertips.</p>
        </div>
      </section>

      <section className="container my-5">
        <div className="card p-4 shadow border-0">
          <h2 className="mb-3 text-primary">Who We Are</h2>
          <p>
            We are a passionate team of automotive engineers, service
            professionals, and tech enthusiasts transforming the car servicing
            experience in India. Our goal is simple: to provide reliable,
            doorstep car service with complete transparency.
          </p>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">What We Offer</h2>
          <div className="row g-4">
            {[
              "General Servicing",
              "Car Spa & Detailing",
              "Battery Replacement",
              "AC Repair & Gas Top-Up",
              "Brake & Suspension Work",
              "Engine Diagnostics",
            ].map((service, i) => (
              <div className="col-md-4" key={i}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">{service}</h5>
                    <p className="card-text">
                      Trusted by thousands. Done by certified mechanics with OEM
                      parts.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="text-center mb-4">Our Core Values</h2>
        <div className="row text-center">
          {[
            { title: "Transparency", icon: "🧾", text: "No hidden charges" },
            { title: "Quality", icon: "🔧", text: "OEM parts, certified staff" },
            { title: "Trust", icon: "🛡️", text: "Verified professionals" },
            { title: "Customer First", icon: "📞", text: "24/7 service support" },
          ].map((item, i) => (
            <div className="col-md-3 mb-4" key={i}>
              <div className="value-box p-4 shadow-sm">
                <div className="fs-1">{item.icon}</div>
                <h5 className="fw-bold mt-3">{item.title}</h5>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card p-4 h-100 shadow-sm">
                <h4 className="text-success">Our Mission</h4>
                <p>
                  To make car servicing effortless, transparent, and accessible
                  to every car owner in India with the help of technology and
                  service excellence.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-4 h-100 shadow-sm">
                <h4 className="text-info">Our Vision</h4>
                <p>
                  To become India’s most trusted and used online car service
                  platform by 2030, one happy car owner at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="text-center mb-4">Why Car Owners Trust Us</h2>
        <div className="row text-center g-4">
          {[
            { title: "Digital Booking", icon: "💻" },
            { title: "Affordable Pricing", icon: "💰" },
            { title: "Doorstep Service", icon: "🚗" },
            { title: "Service Warranty", icon: "📜" },
          ].map((item, i) => (
            <div className="col-md-3" key={i}>
              <div className="trust-box p-4 shadow-sm">
                <div className="fs-1">{item.icon}</div>
                <h6 className="mt-3 fw-bold">{item.title}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section text-white py-5 text-center">
        <div className="container">
          <h3>Experience worry-free car servicing today!</h3>
          <p className="mb-4">
            Join thousands of happy customers who trust CarServicePro.
          </p>
          <Link to="/view-services" className="btn btn-light btn-lg">
            Book a Service
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Aboutus
