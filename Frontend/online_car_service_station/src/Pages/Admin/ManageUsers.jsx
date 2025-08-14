import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function ManageUsers() {

  const [userInfo, setUserInfo] = useState([])

  const getAllCustomers = async()=>{
    try{
      const resp = await axios.get('http://localhost:8080/customers/all',{headers:{'Authorization' : localStorage.getItem('token')}})
      setUserInfo(resp.data)
    }catch(err){
      toast.err("Error while fetching data!")
    }
  }

  useEffect(()=>{
    getAllCustomers();
  },[])


  return (
    <div className='container text-center  min-ht'>
      <div className='shadow-lg'>
        <table className="table table-bordered table-hover table-lg table-responsive my-3 shadow-lg">
          <thead>
            <tr className='table-dark'>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody className=''>
            {
              userInfo.map((user) =>
                <tr key={user.customerId}>
                  <td>{user.customerId}</td>
                  <td>{user.firstName + " " + user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUsers

