import { NavLink } from "react-router-dom";
import '../css/Navbar.css'
import { CgProfile } from "react-icons/cg";
import { getRole } from "../Utils/jwtUtil";
import { useNavigate } from "react-router-dom";
export default function Navbar() {

  const navigate = useNavigate();

  const closeOffcanvasAndNavigate = (path) => {
    const offcanvasEl = document.getElementById('mobileMenu');
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    bsOffcanvas.hide(); 
    navigate(path);
  };
  const token = localStorage.getItem('token');
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-3 shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold text-primary" to="/"><i>Wheelo</i></NavLink>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center d-none d-lg-flex">
            <ul className="navbar-nav gap-4">
              {getRole() === 'ROLE_CUSTOMER' && (
                <>
                  <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/view-services">View Services</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/my-bookings">My Bookings</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/about">About Us</NavLink></li>
                </>
              )
              }

              {getRole() === 'ROLE_ADMIN' && (
                <>
                  <li className="nav-item"><NavLink className="nav-link" to="/manage-services">Manage Services</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/manage-bookings">Manage Bookings</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/spare-parts">Spare Parts</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/manage-customers">Customers</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/dashboard">Dashboard</NavLink></li>
                </>)
              }

            </ul>
          </div>

          {token && (<div className="d-none d-lg-block">
            <NavLink className="nav-item nav-link" to="/profile"><CgProfile size={"35px"} /></NavLink>
          </div>)}
        </div>
      </nav>
      <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="mobileMenu"
      aria-labelledby="mobileMenuLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="mobileMenuLabel">Menu</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav">

          {getRole() === 'ROLE_CUSTOMER' && <>
            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="/" onClick={() => closeOffcanvasAndNavigate("/")}>Home</NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="/view-services" onClick={() => closeOffcanvasAndNavigate("/view-services")}>View Services</NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="/my-bookings" onClick={() => closeOffcanvasAndNavigate("/my-bookings")}>My Bookings</NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="/about" onClick={() => closeOffcanvasAndNavigate("/about")}>About Us</NavLink>
            </li>
            <li className="nav-item mt-3">
              <NavLink className="btn btn-primary w-100" to="/profile" onClick={() => closeOffcanvasAndNavigate("/profile")}>Profile</NavLink>
            </li>
          </>}

          {getRole() === 'ROLE_ADMIN' && <>
            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="/manage-services" onClick={() => closeOffcanvasAndNavigate("/manage-services")}>Manage Services</NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="/manage-bookings" onClick={() => closeOffcanvasAndNavigate("/manage-bookings")}>Manage Bookings</NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="/spare-parts" onClick={() => closeOffcanvasAndNavigate("/spare-parts")}>Spare Parts</NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="/manage-customers" onClick={() => closeOffcanvasAndNavigate("/manage-customers")}>Customers</NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="/dashboard" onClick={() => closeOffcanvasAndNavigate("/dashboard")}>Dashboard</NavLink>
            </li>
            <li className="nav-item mt-3">
              <NavLink className="btn btn-primary w-100" to="/profile" onClick={() => closeOffcanvasAndNavigate("/profile")}>Profile</NavLink>
            </li>
          </>}
          
        </ul>
      </div>
    </div>
    </>
  );
}
