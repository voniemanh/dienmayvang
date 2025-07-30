import React, { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import UsersManage from './components/User/UsersManage';
import ProductsManage from './components/Products/ProductsManage';
import ProductsAdd from './components/Products/ProductsAdd';
import ProductsEdit from './components/Products/ProductsEdit';
import ProductsDetail from './components/Products/ProductsDetail';
import CustomerManage from './components/Customer/CustomerManage';
import CustomerAdd from './components/Customer/CustomerAdd';
import CustomerEdit from './components/Customer/CustomerEdit';
import CustomerDetail from './components/Customer/CustomerDetail';  
import UserAdd from './components/User/UserAdd';
import UserEdit from './components/User/UserEdit';
import UserDetail from './components/User/UserDetail';
import Navbar from './components/NavBar/Navbar';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className='app'>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-mng" element={<UsersManage />} />
          <Route path="/user-mng/add" element={<UserAdd />} />
          <Route path="/user-mng/edit/:id" element={<UserEdit />} />
          <Route path="/user-mng/detail/:id" element={<UserDetail />} />
          <Route path="/product-mng" element={<ProductsManage />} />
          <Route path="/product-mng/add" element={<ProductsAdd />} />
          <Route path="/product-mng/edit/:id" element={<ProductsEdit />} />
          <Route path="/product-mng/detail/:id" element={<ProductsDetail />} />
          <Route path="/customer-mng/add" element={<CustomerAdd />} />
          <Route path="/customer-mng/edit/:id" element={<CustomerEdit />} />
          <Route path="/customer-mng/detail/:id" element={<CustomerDetail />} />  
          <Route path="/customer-mng" element={<CustomerManage />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
