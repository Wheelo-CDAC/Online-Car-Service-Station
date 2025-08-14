import React, { useEffect, useState } from 'react'
import '../../css/SpareParts.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa'
function SpareParts() {
  const [parts, setParts] = useState([]);
  const [newPart, setNewPart] = useState({ partName: '', quantity: 0, price: 0 });
  const [editId, setEditId] = useState(null);

  const handleAddPart = async (id) => {
    if (!newPart.partName || !newPart.quantity || !newPart.price) return;

    if (editId) {
      const updatedRow = parts.map((part) =>
        part.partId === id
          ? { ...part, partName: newPart.partName, quantity: newPart.quantity, price: newPart.price }
          : part
      );
      try {
        const resp = await axios.put(`http://localhost:8080/spareparts/updatepart/${id}`,
          { partName: newPart.partName, price: newPart.price, quantity: newPart.quantity },
          { headers: { 'Authorization': localStorage.getItem('token') } })
      } catch (err) {
        toast.error("Something went wrong!")
      }

      setParts(updatedRow);
      setEditId(null);
      setNewPart({ partName: '', quantity: 0, price: 0 });
    } else {
      toast.success("Added " + newPart.partName, {
        icon: <FaCheckCircle size={30} color="green" />,
        position: "top-center",
        autoClose: 1111,
      })
      const isPresent = parts.some(
        (part) => part.partName.toLowerCase() === newPart.partName.toLowerCase()
      );
      if (isPresent) {
        toast.error('Part Name already exists', {
          position: "top-center",
          autoClose: 1111,
        });
        return;
      }

      try {
        const response = await axios.post(`http://localhost:8080/spareparts/addpart`, {
          "partName": newPart.partName,
          "price": newPart.price,
          "quantity": newPart.quantity
        },
          {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          });

      } catch (err) {
        toast.error("Something went wrong!");
      }
     
      getAllParts()
      setNewPart({ partName: '', quantity: 0, price: 0 });
    }
  };

  const handleEdit = (id) => {
    const editable = parts.find((item) => item.partId === id);
    setNewPart({
      partName: editable.partName,
      quantity: editable.quantity,
      price: editable.price
    });
    setEditId(id);

  };

  const deletePart = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:8080/spareparts/delete/${id}`, { headers: { Authorization: localStorage.getItem('token') } })
    } catch (err) {
      toast("Error while deleting!")
    }
  }

  const handleDelete = (id) => {
    deletePart(id);
    setParts(parts.filter((p) => p.partId !== id));
  };

  const getAllParts = async () => {
    try {
      const token = localStorage.getItem('token')
      const result = await axios.get("http://localhost:8080/spareparts/allparts", { headers: { 'Authorization': token } })
      setParts(result.data)
    } catch (ex) {
      toast.error("Something went wrong!", {
  position: "top-center",
  autoClose: 1111,
})
    }
  }
  useEffect(() => { getAllParts() }, [])

  return (
    <div className='container my-3 min-ht'>
      <div className="add-part-form d-flex flex-wrap">
        <div>
          <label htmlFor="">Part Name : </label>
          <input
            type="text"
            value={newPart.partName}
            onChange={(e) => setNewPart({ ...newPart, partName: e.target.value })}
          /></div>
        <div><label htmlFor="">Quantity : </label>
          <input
            type="number"
            value={newPart.quantity}
            min={0}
            onChange={(e) => setNewPart({ ...newPart, quantity: Number(e.target.value) })}
          /></div>
        <div><label htmlFor="">Price : </label>
          <input
            type="number"
            value={newPart.price}
            min={0}
            onChange={(e) => setNewPart({ ...newPart, price: Number(e.target.value) })}
          /></div>
        <button onClick={() => handleAddPart(editId)}>{editId ? 'Update' : 'Add'}</button>
      </div>

      <table className="table table-bordered text-center shadow-lg">
        <thead className='table-dark'>
          <tr>
            <th>ID</th>
            <th>Part Name</th>
            <th>Quantity</th>
            <th>Price (&#8377;)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.partId} style={{ backgroundColor: part.quantity <= 10 ? '#ffd6d6' : '' }}>
              <td>{part.partId}</td>
              <td>{part.partName}</td>
              <td>{part.quantity}</td>
              <td>{part.price}</td>
              <td>
                <button className='btn btn-warning' onClick={() => handleEdit(part.partId)}>Edit</button>
                <button className='btn btn-danger mx-1' onClick={() => handleDelete(part.partId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SpareParts;
