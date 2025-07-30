import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_URL } from '../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserAdd() {
  const [user, setUser] = useState({
    name: '',
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleAdd = () => {
    if (!user.name || !user.username || !user.password) {
      alert("Please fill in all fields");
      return;
    }
    axios.post(USER_URL, user)
      .then(() => {
        alert("User added successfully");
        navigate('/user-mng'); 
      })
      .catch(error => {
        console.error("There was an error adding the user!", error);
        alert("There was an error adding the user!");
      });
    setUser({ name: '', username: '', password: '' }); 
    navigate('/user-mng'); 
  };

  return (
    <>
      <div className="page-container">
        <div className="back-link">
          <Link to="/user-mng" className="black-text">🔙 Quay lại danh sách</Link>
        </div>
        <div className="content-center">
          <p>Thêm mới người dùng</p>
          <div><input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} /></div>
          <div><input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} /></div>
          <div><input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" /></div>
          <br />
          <button onClick={handleAdd}>Add User</button>
        </div>
      </div>
    </>
  );
}
export default UserAdd;