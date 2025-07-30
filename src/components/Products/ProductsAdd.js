import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_URL } from '../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductAdd() {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!product.name || !product.category || !product.price || !product.stock) {
      alert("Please fill in all fields");
      return;
    }
    axios.post(PRODUCT_URL, {
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
      createdAt: new Date().toISOString()
    })
    .then(() => {
      alert("Product added successfully");
      navigate('/product-mng');
    })
    .catch(error => {
      console.error("Error adding product!", error);
      alert("Error adding product!");
    });
  };

  return (
    <div className="page-container">
      <div className="back-link">
        <Link to="/product-mng" className="black-text">🔙 Quay lại danh sách</Link>
      </div>
      <div className="content-center">
        <p>Thêm mới sản phẩm</p>
        <div><input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} /></div>
        <div><input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} /></div>
        <div><input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} /></div>
        <div><input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} /></div>
        <br />
        <button onClick={handleAdd}>Add Product</button>
      </div>
    </div>
  );
}

export default ProductAdd;
