import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Customer/Home'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Customer/Signup.jsx'
import Navbar from './Components/Navbar.jsx'
import Aboutus from './Pages/Aboutus.jsx'
import ViewServices from './Pages/Customer/ViewServices.jsx'
import MyBookings from './Pages/Customer/MyBookings.jsx'
import ManageServices from './Pages/Admin/ManageServices.jsx'
import ManageBookings from './Pages/Admin/ManageBookings.jsx'
import SpareParts from './Pages/Admin/SpareParts.jsx'
import ManageUsers from './Pages/Admin/ManageUsers.jsx'
import Footer from './Components/Footer.jsx'
import Profile from './Pages/Customer/Profile.jsx'
import Dashboard from './Pages/Admin/Dashboard.jsx'
import { ToastContainer } from 'react-toastify';
import Protected from './Components/Protected.jsx'
function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<Protected><Aboutus /></Protected>} />
        <Route path='/view-services' element={<Protected><ViewServices /></Protected>} />
        <Route path='/my-bookings' element={<Protected><MyBookings /></Protected>} />
        <Route path='/profile' element={<Protected><Profile /></Protected>} />

        <Route path='/manage-services' element={<Protected><ManageServices /></Protected>} />
        <Route path='/manage-bookings' element={<Protected><ManageBookings /></Protected>} />
        <Route path='/spare-parts' element={<Protected><SpareParts /></Protected>} />
        <Route path='/manage-customers' element={<Protected><ManageUsers /></Protected>} />
        <Route path='/dashboard' element={<Protected><Dashboard /></Protected>} />
        <Route path='/*' element={<h1 className='min-ht'>404 Page Not Found!</h1>} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>

  )
}

export default App
