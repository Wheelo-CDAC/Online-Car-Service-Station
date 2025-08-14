import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProfilePage() {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get("http://localhost:8080/customers/profile", { headers: { 'Authorization': token } })
      return response.data
    } catch (err) {
      toast.error("Error while fetching details!")
      return {}
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile()
      setUser(profile)
    }
    fetchProfile()
  }
    , [])

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEdit = () => {
    setEditedUser({ ...user }); 
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));

  };

  const handleSave = async(e) => {
    e.preventDefault();
    setUser(editedUser);

    try{
          const resp = await axios.put("http://localhost:8080/customers/update", 
            {
              firstName : editedUser.firstName,
              lastName : editedUser.lastName,
              phone : editedUser.phone,
              address : editedUser.address
            }, {headers : { "Authorization" : localStorage.getItem('token')}})

            toast.success(resp.data)
    }catch(err){
      toast.error('Could not Update!', {
  position: "top-center",
  autoClose: 1111,
})

    }

    setEditMode(false);
    toast.success('Profile updated successfully!', {
  position: "top-center",
  autoClose: 1111,
});
  };

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }
  return (
    <div className="container mt-5 min-ht d-flex flex-column align-items-center">
      <div className='d-flex justify-content-between'>
        <h2 className="mb-4">User Profile</h2>
        
      </div>
      {!editMode ? (
        <div className="card p-4 shadow w-50">
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Password:</strong> ••••••••</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>

          <button className="btn btn-primary mt-3" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSave} className="card p-4 shadow w-50">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <p className="form-control">{user.email}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">First Name<span style={{ color: "red" }}>*</span></label>
            <input
              type="text"
              className="form-control"
              required
              name="firstName"
              value={editedUser.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name<span style={{ color: "red" }}>*</span></label>
            <input
              type="text"
              className="form-control"
              required
              name="lastName"
              value={editedUser.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone<span style={{ color: "red" }}>*</span></label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              required
              value={editedUser.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address<span style={{ color: "red" }}>*</span></label>
            <textarea
              className="form-control"
              name="address"
              rows="3"
              required
              value={editedUser.address}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">Save</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
      <h5 className='logout my-2 btn' onClick={logout}>Logout</h5>
    </div>
  );
}

export default ProfilePage;
