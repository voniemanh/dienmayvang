import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { USER_URL, PRODUCT_URL, CUSTOMER_URL } from '../config';
import '../App.css';

function HomePage() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Bạn cần đăng nhập để truy cập');
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [userRes, productRes, customerRes] = await Promise.all([
          axios.get(USER_URL),
          axios.get(PRODUCT_URL),
          axios.get(CUSTOMER_URL),
        ]);
        setUsers(userRes.data);
        setProducts(productRes.data);
        setCustomers(customerRes.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return null;

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
