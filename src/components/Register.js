import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { USER_URL } from '../config';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({ name: '', username: '', password: '' });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const { name, username, password } = newUser;
    if (!name || !username || !password) {
    alert("Vui lòng nhập đầy đủ các trường");
    return;
  }
    axios.post(USER_URL, newUser)
      .then(response => {
        alert("User registered successfully");
        navigate('/login');
      })
      .catch(error => {
        alert("There was an error registering the user!");
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <div>
        <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleChange} />
      </div>
      <div>
        <input type="text" name="username" placeholder="Username" value={newUser.username} onChange={handleChange} />
      </div>
      <div>
        <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange} />
      </div>
      <button onClick={handleRegister}>Register</button>
      <button><Link to="/login">Login</Link></button>
    </div>
  );
}

export default Register;
