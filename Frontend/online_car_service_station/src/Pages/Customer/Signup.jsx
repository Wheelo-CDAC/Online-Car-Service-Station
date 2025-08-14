import { Link } from "react-router-dom";
import '../../css/Signup.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { use } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Signup() {

  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "", address: "" })

  const createUser = async () => {
    try {
      const result = await axios.post("http://localhost:8080/customers/signup", userInfo);
     
      navigate("/login")
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 1111,
      });
    }
  };

  const signup = (e) => {
    e.preventDefault()
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/;//min length 5 , at least one special character
    const nameRegex = /^[A-Za-z]{2,20}$/; // only alphabets, min length 2 , max length 20
    const phoneNumberRegex = /^[6-9]\d{9}$/; //starts with 6,7,8,9 , only 10 digit, no character  

    if (nameRegex.test(userInfo.firstName) && nameRegex.test(userInfo.lastName)) {
      if (phoneNumberRegex.test(userInfo.phone)) {
        if (passwordRegex.test(userInfo.password)) {
          if (userInfo.password === userInfo.confirmPassword) {
            createUser()
          } else {
            toast.warn("Confirm password again!", {
              position: "top-center",
              autoClose: 1111,
            })
          }

        } else {
          toast.warn("Weak Password", {
            position: "top-center",
            autoClose: 1111,
          })
        }
      } else {
        toast.warn("Invalid Phone Number", {
          position: "top-center",
          autoClose: 1111,
        })
      }
    } else {
      toast.warn("Invalid Name Value", {
        position: "top-center",
        autoClose: 1111,
      })
    }


  }

  return (
    <div className="signup-wrapper d-flex justify-content-center align-items-center vh-100 bg-light">
      <form className="signup-form p-4 shadow rounded bg-white w-100" style={{ maxWidth: "450px" }}
        onSubmit={signup}
      >
        <h2 className="signup-title text-center mb-4 text-primary">Create Account</h2>

        <div className="row">
          <div className="col-md-6 mb-3">
            <input type="text" placeholder="First Name *" required className="signup-input form-control" onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })} />
          </div>

          <div className="col-md-6 mb-3">
            <input type="text" placeholder="Last Name *" required className="signup-input form-control" onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })} />
          </div>
        </div>

        <input type="tel" placeholder="Phone Number *" required className="signup-input form-control mb-3" onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />

        <textarea placeholder="Address *" required className="signup-input form-control mb-3" onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })} />

        <input type="email" placeholder="Email *" required className="signup-input form-control mb-3" onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />

        <input type="password" placeholder="Password *" required className="signup-input form-control mb-4" onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} />
        <input type="password" placeholder="Confirm Password *" required className="signup-input form-control mb-4" onChange={(e) => setUserInfo({ ...userInfo, confirmPassword: e.target.value })} />

        <button type="submit" className="signup-button btn btn-primary w-100 mb-3"> Sign Up </button>

        <p className="login-text text-center">
          Already have an account?{' '}
          <Link to="/login" className="login-link text-decoration-none text-primary fw-semibold">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
