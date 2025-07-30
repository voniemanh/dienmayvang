import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { USER_URL } from '../../config';
import axios from 'axios';

function applyFilters(data, search, dept) {
  const keyword = search.toLowerCase();
  return data.filter(u =>
    (u.name.toLowerCase().includes(keyword) ||
     u.department.toLowerCase().includes(keyword) ||
     u.role.toLowerCase().includes(keyword) ||
     u.performanceScore.toString().includes(keyword)) &&
    (dept === 'Tất cả' || u.department === dept)
  );
}

function UsersManage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('Tất cả');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Bạn cần đăng nhập để truy cập');
      navigate('/login');
      return;
    }

    axios.get(USER_URL)
      .then(res => {
        setUsers(res.data);
        setFilteredUsers(applyFilters(res.data, searchTerm, selectedDepartment));
      })
      .catch(error => console.error("Lỗi khi tải danh sách người dùng:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredUsers(applyFilters(users, value, selectedDepartment));
  };

  const handleSort = () => {
    const sorted = [...filteredUsers].sort((a, b) =>
      sortAsc
        ? a.performanceScore - b.performanceScore
        : b.performanceScore - a.performanceScore
    );
    setFilteredUsers(sorted);
    setSortAsc(!sortAsc);
  };

  const handleFilterByDepartment = (dept) => {
    setSelectedDepartment(dept);
    setFilteredUsers(applyFilters(users, searchTerm, dept));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá người dùng này không?")) {
      try {
        await axios.delete(`${USER_URL}/${id}`);
        const updated = users.filter(u => u.id !== id);
        setUsers(updated);
        setFilteredUsers(applyFilters(updated, searchTerm, selectedDepartment));
      } catch (error) {
        console.error("Lỗi khi xoá người dùng:", error);
      }
    }
  };

  const uniqueDepartments = ['Tất cả', ...new Set(users.map(u => u.department))];

  if (loading) return null;

  return (
    <div className='container'>
      <div className='left-content'>
        <p>Danh sách phòng ban</p>
        <ul>
          {uniqueDepartments.map((dept, idx) => (
            <li
              key={idx}
              style={{ cursor: 'pointer', fontWeight: dept === selectedDepartment ? 'bold' : 'normal' }}
              onClick={() => handleFilterByDepartment(dept)}
            >
              {dept}
            </li>
          ))}
        </ul>
      </div>

      <div className='right-content'>
        <div style={{ marginBottom: '10px' }}>
          <label>Thêm người dùng </label>
          <button><Link to="/user-mng/add">Thêm mới</Link></button>
        </div>

        <p>Quản lý người dùng</p>

        <input
          placeholder='Tìm kiếm theo tên, phòng ban, vai trò, score'
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleSort}>
          Sắp xếp theo điểm ({sortAsc ? '↑' : '↓'})
        </button>

        <ol style={{ marginTop: '30px' }}>
          {filteredUsers.map((u) => (
            <li key={u.id}>
              <strong>{u.name}</strong>, {u.role} - {u.department} | Score: <b>{u.performanceScore}</b> |{' '}
              <Link className='black-text' to={`/user-mng/edit/${u.id}`}>Sửa</Link> |{' '}
              <Link className='black-text' to={`/user-mng/detail/${u.id}`}>Xem</Link> |{' '}
              <span className='black-text' style={{ cursor: 'pointer' }} onClick={() => handleDelete(u.id)}>Xoá</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default UsersManage;
