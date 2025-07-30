import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CUSTOMER_URL } from '../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CustomerDetail() {
  const [customer, setCustomer] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${CUSTOMER_URL}/${id}`)
      .then(response => {
        setCustomer(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the customer data!", error);
        navigate('/customer-mng');
      });
  }, [id, navigate]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className='detail-content'>
      <Link to="/customer-mng" className='black-text' style={{ marginBottom: '20px', display: 'inline-block' }}>
        🔙 Quay lại danh sách
      </Link>
      <h1>Customer Detail</h1>
      <ul>
        <li><strong>Mã khách hàng:</strong> {customer.id}</li>
        <li><strong>Họ tên:</strong> {customer.name}</li>
        <li><strong>Email:</strong> {customer.email}</li>
        <li><strong>Số điện thoại:</strong> {customer.phone}</li>
        <li><strong>Địa chỉ:</strong> {customer.address}</li>
        <li><strong>Ngày tạo:</strong> {new Date(customer.createdAt).toLocaleDateString()}</li>
      </ul>
    </div>
  );
}

export default CustomerDetail;
