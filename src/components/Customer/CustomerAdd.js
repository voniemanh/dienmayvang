import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CUSTOMER_URL } from '../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CustomerAdd() {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      alert("Please fill in all fields");
      return;
    }

    axios.post(CUSTOMER_URL, {
      ...customer,
      createdAt: new Date().toISOString()
    })
    .then(() => {
      alert("Customer added successfully");
      navigate('/customer-mng');
    })
    .catch(error => {
      console.error("Error adding customer!", error);
      alert("Error adding customer!");
    });
  };

  return (
    <div className="page-container">
      <div className="back-link">
        <Link to="/customer-mng" className="black-text">🔙 Quay lại danh sách</Link>
      </div>
      <div className="content-center">
        <p>Thêm mới khách hàng</p>
        <div><input type="text" name="name" placeholder="Name" value={customer.name} onChange={handleChange} /></div>
        <div><input type="email" name="email" placeholder="Email" value={customer.email} onChange={handleChange} /></div>
        <div><input type="text" name="phone" placeholder="Phone" value={customer.phone} onChange={handleChange} /></div>
        <div><input type="text" name="address" placeholder="Address" value={customer.address} onChange={handleChange} /></div>
        <br />
        <button onClick={handleAdd}>Add Customer</button>
      </div>
    </div>
  );
}

export default CustomerAdd;
