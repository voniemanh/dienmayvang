import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CUSTOMER_URL } from '../../config';
import axios from 'axios';

function extractCity(address) {
  const parts = address.split(',');
  return parts[parts.length - 1].trim();
}

function applyFilters(data, search, city) {
  const keyword = search.toLowerCase();
  return data.filter(c =>
    (c.name.toLowerCase().includes(keyword) ||
     c.email.toLowerCase().includes(keyword) ||
     c.phone.includes(keyword) ||
     c.address.toLowerCase().includes(keyword)) &&
    (city === 'Tất cả' || extractCity(c.address) === city)
  );
}

function CustomerManage() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Tất cả');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Bạn cần đăng nhập để truy cập');
      navigate('/login');
      return;
    }

    axios.get(CUSTOMER_URL)
      .then(res => {
        setCustomers(res.data);
        setFilteredCustomers(applyFilters(res.data, searchTerm, selectedCity));
      })
      .catch(error => console.error("Lỗi khi tải danh sách khách hàng:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredCustomers(applyFilters(customers, value, selectedCity));
  };

  const handleSort = () => {
    const sorted = [...filteredCustomers].sort((a, b) =>
      sortAsc
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );
    setFilteredCustomers(sorted);
    setSortAsc(!sortAsc);
  };

  const handleFilterByCity = (city) => {
    setSelectedCity(city);
    setFilteredCustomers(applyFilters(customers, searchTerm, city));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá khách hàng này không?")) {
      try {
        await axios.delete(`${CUSTOMER_URL}/${id}`);
        const updated = customers.filter(c => c.id !== id);
        setCustomers(updated);
        setFilteredCustomers(applyFilters(updated, searchTerm, selectedCity));
      } catch (error) {
        console.error("Lỗi khi xoá khách hàng:", error);
      }
    }
  };

  const uniqueCities = ['Tất cả', ...new Set(customers.map(c => extractCity(c.address)))];

  if (loading) return null; // hoặc <p>Đang kiểm tra đăng nhập...</p>;

  return (
    <div className='container'>
      <div className='left-content'>
        <p>Thành phố</p>
        <ul>
          {uniqueCities.map((city, idx) => (
            <li
              key={idx}
              style={{ cursor: 'pointer', fontWeight: city === selectedCity ? 'bold' : 'normal' }}
              onClick={() => handleFilterByCity(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      </div>

      <div className='right-content'>
        <div style={{ marginBottom: '10px' }}>
          <label>Thêm khách hàng </label>
          <button><Link to="/customer-mng/add">Thêm mới</Link></button>
        </div>

        <p>Quản lý khách hàng</p>

        <input
          placeholder='Tìm kiếm theo tên, email, sđt, địa chỉ'
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleSort}>
          Sắp xếp theo ngày tạo ({sortAsc ? '↑' : '↓'})
        </button>

        <ol style={{ marginTop: '30px' }}>
          {filteredCustomers.map(c => (
            <li key={c.id}>
              <strong>{c.name}</strong>, {c.email} - {c.phone} - {c.address} |{' '}
              <Link className='black-text' to={`/customer-mng/edit/${c.id}`}>Sửa</Link> |{' '}
              <Link className='black-text' to={`/customer-mng/detail/${c.id}`}>Xem</Link> |{' '}
              <span className='black-text' style={{ cursor: 'pointer' }} onClick={() => handleDelete(c.id)}>Xoá</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default CustomerManage;
