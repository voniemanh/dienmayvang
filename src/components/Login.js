import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { USER_URL } from '../config';
import axios from 'axios';

function Login({setCurrentUser}) {
  const [user, setUser] = useState({
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
          localStorage.setItem('currentUser', JSON.stringify(foundUser));
          setCurrentUser(foundUser);
          alert("Login successful");
          navigate('/');
        } else {
          alert("Invalid username or password");
        }
      })
      .catch(error => {
        console.error("There was an error logging in!", error);
        alert("There was an error logging in!");
      });

    setUser({ username: '', password: '' });
  };

  return (
    <div className="content-center">
      <h1>Login</h1>
      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <br />
      <button onClick={handleLogin}>Login</button>
      <button>
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
}

export default Login;
