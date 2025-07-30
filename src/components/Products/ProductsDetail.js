import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCT_URL } from '../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductsDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${PRODUCT_URL}/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the product data!", error);
        navigate('/product-mng');
      });
  }, [id, navigate]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='detail-content'>
      <Link to="/product-mng" className='black-text' style={{ marginBottom: '20px', display: 'inline-block' }}>
        🔙 Quay lại danh sách
      </Link>
      <h1>Product Detail</h1>
      <ul>
        <li><strong>Mã sản phẩm:</strong> {product.id}</li>
        <li><strong>Tên sản phẩm:</strong> {product.name}</li>
        <li><strong>Danh mục:</strong> {product.category}</li>
        <li><strong>Giá:</strong> {product.price.toLocaleString()} VND</li>
        <li><strong>Tồn kho:</strong> {product.stock}</li>
        <li><strong>Ngày tạo:</strong> {new Date(product.createdAt).toLocaleDateString()}</li>
      </ul>
    </div>
  );
}

export default ProductsDetail;
