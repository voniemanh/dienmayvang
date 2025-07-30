import { useState } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_URL } from '../config';
import axios from 'axios';
import { Link } from 'react-router-dom';

function  Login() {
  const [user, setUser]= useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    if (!user.username || !user.password) {
      alert("Please enter both username and password");
      return;
    }
    axios.get(USER_URL)
      .then(response => {
        const users = response.data;
        const foundUser = users.find(u => u.username === user.username && u.password === user.password);
        if (foundUser) {
          alert("Login successful");
          navigate('/'); 
        } else {
          alert("Invalid username or password");
        }
      })
      .catch(error => {
        console.error("There was an error logging in!", error);
        alert("There was an error logging in!");
      }
    );
    setUser({ username: '', password: '' });
  };
  return (
    <div>
      <h1>Login</h1>
      <div><input type="text" placeholder="Username" value={user.username} onChange={handleChange} /></div>
      <div><input type="password" placeholder="Password" value={user.password} onChange={handleChange} /></div>
      <br />
      <button onClick={handleLogin}>Login</button>
      <button><Link to={"/register"}>Register</Link></button>
    </div>
  );
}
export default Login;