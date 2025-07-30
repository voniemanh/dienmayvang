import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CUSTOMER_URL } from '../../config';

function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    axios.get(`${CUSTOMER_URL}/${id}`)
      .then(response => setCustomer(response.data))
      .catch(error => console.error("Lỗi khi tải dữ liệu khách hàng!", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${CUSTOMER_URL}/${id}`, customer)
      .then(() => {
        alert("Cập nhật khách hàng thành công!");
        navigate('/customer-mng');
      })
      .catch(error => {
        console.error("Lỗi khi cập nhật khách hàng!", error);
      });
  };

  if (!customer) return <div>Đang tải dữ liệu...</div>;

  return (
    <div style={{ marginLeft: '30px' }}>
      <Link to="/customer-mng" className='black-text' style={{ marginBottom: '20px', display: 'inline-block' }}>🔙 Quay lại danh sách</Link>
      <h1>Cập nhật thông tin khách hàng</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Họ tên:</label>
          <input type="text" name="name" value={customer.name || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={customer.email || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Số điện thoại:</label>
          <input type="text" name="phone" value={customer.phone || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Địa chỉ:</label>
          <input type="text" name="address" value={customer.address || ''} onChange={handleChange} />
        </div>
        <button type="submit">Lưu thay đổi</button>
      </form>
    </div>
  );
}

export default CustomerEdit;
