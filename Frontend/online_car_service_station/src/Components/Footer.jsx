import '../css/Footer.css'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
export default function Footer() {
    return (
        <div className='footer text-center p-2'>
            <h5>&copy;{new Date().getFullYear()} Wheelo</h5>
            <div className="row" >
                <div className="col">
                    <h6>Reach Us</h6>
                    <p>Address:<br/>Wheelo Car Services,<br/>
                        Phase 1, IT park, Hinjewadi, Pune</p>
                    <p></p>
                    <p></p>
                </div>
                <div className="col">
                    <h6>Contact Us</h6>
                    <p>Phone:<br />9876543210</p>
                    <p>Email:<br />wheelocarservices@gmail.com</p>
                    <p></p>
                </div>
                <div className="col">
                    <h6>Social</h6>
                    <p className='cursor-pointer'><FaFacebook size={"20px"}/><Link style={{textDecoration : "none"}}>WheeloCarServices</Link></p>
                    <p className='cursor-pointer'><FaSquareInstagram size={"20px"}/><Link style={{textDecoration : "none"}}>Wheelo_Car_Services</Link></p>
                </div>
            </div>
        </div>
    )
}

