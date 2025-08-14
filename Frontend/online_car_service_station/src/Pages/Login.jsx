import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState([""])

  const navigate = useNavigate()

  const login =async (e)=>{
    e.preventDefault()
try{
    const result =await axios.post("http://localhost:8080/customers/login",{email,password})
    const token = result.data
    localStorage.setItem("token", `Bearer ${token}`)
    navigate('/')
}catch{
  toast.error("Invalid email or password!", {
  position: "top-center",
  autoClose: 1111,
});
}
}
  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <form className="login-form p-4 shadow rounded bg-white" onSubmit={login}>
        <h2 className="login-title text-center mb-4 text-primary">Login</h2>

        <input
          type="email"
          placeholder="Email *"
          className="login-input form-control mb-3"
          required
          value={email} 
          onChange={(e)=> setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password *"
          className="login-input form-control mb-4"
          required
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />

        <button type="submit" className="login-button btn btn-primary w-100 mb-3">
          Login
        </button>

        <p className="signup-text text-center">
          New user?{" "}
          <Link to="/signup" className="signup-link text-decoration-none text-primary fw-semibold">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
