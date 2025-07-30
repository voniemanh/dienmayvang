import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { USER_URL, PRODUCT_URL, CUSTOMER_URL } from '../config';
import '../App.css';

function HomePage() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get(USER_URL).then(res => setUsers(res.data)).catch(console.error);
    axios.get(PRODUCT_URL).then(res => setProducts(res.data)).catch(console.error);
    axios.get(CUSTOMER_URL).then(res => setCustomers(res.data)).catch(console.error);
  }, []);

  const topUser = users.reduce((a, b) => a.performanceScore > b.performanceScore ? a : b, users[0]);
  const topProduct = products[0];
  const latestCustomer = customers[customers.length - 1];

  return (
    <div className="detail-content">
      <div className="summary-box">
        <h2>Tổng quan</h2>
        <ul>
          <li>Người dùng: {users.length}</li>
          <li>Sản phẩm: {products.length}</li>
          <li>Khách hàng: {customers.length}</li>
        </ul>
      </div>

      {users.length > 0 && (
        <div className="highlight-section">
          <h2>Top Người Dùng</h2>
          <p><strong>{topUser.name}</strong> ({topUser.role}) - Điểm đánh giá: {topUser.performanceScore}</p>
          <Link className='black-text' to={`/user-mng/detail/${topUser.id}`}>Xem chi tiết</Link>
        </div>
      )}

      {products.length > 0 && (
        <div className="highlight-section">
          <h2>Sản Phẩm Nổi Bật</h2>
          <p><strong>{topProduct.name}</strong> - Giá: {topProduct.price.toLocaleString()}đ - Tồn kho: {topProduct.stock}</p>
          <Link className='black-text' to={`/product-mng/detail/${topProduct.id}`}>Xem chi tiết</Link>
        </div>
      )}

      {customers.length > 0 && (
        <div className="highlight-section">
          <h2>Khách Hàng Gần Nhất</h2>
          <p><strong>{latestCustomer.name}</strong> - SĐT: {latestCustomer.phone}</p>
          <Link className='black-text' to={`/customer-mng/detail/${latestCustomer.id}`}>Xem chi tiết</Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
