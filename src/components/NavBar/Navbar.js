import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <nav className='navbar'>
      <div className='left'>
        <Link to="/">Home |</Link>
        <Link to="/user-mng">Quản lí người dùng |</Link>
        <Link to="/product-mng">Quản lí sản phẩm |</Link>
        <Link to="/customer-mng">Quản lí khách</Link>
      </div>
      <div className='right'>
        {currentUser ? (
          <>
            <span>Hello, {currentUser.username} | </span>
            <span style={{ cursor: 'pointer', color: 'grey' }} onClick={handleLogout}>Logout</span>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
