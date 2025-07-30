import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { PRODUCT_URL } from '../../config';

function ProductsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${PRODUCT_URL}/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Lỗi khi tải dữ liệu sản phẩm!", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${PRODUCT_URL}/${id}`, product)
      .then(() => {
        alert("Cập nhật sản phẩm thành công!");
        navigate('/product-mng');
      })
      .catch(error => {
        console.error("Lỗi khi cập nhật sản phẩm!", error);
      });
  };

  if (!product) return <div>Đang tải dữ liệu...</div>;

  return (
    <div style={{ marginLeft: '30px' }}>
      <Link to="/product-mng" className='black-text' style={{ marginBottom: '20px', display: 'inline-block' }}>🔙 Quay lại danh sách</Link>
      <h1>Cập nhật thông tin sản phẩm</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên sản phẩm:</label>
          <input type="text" name="name" value={product.name || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Danh mục:</label>
          <input type="text" name="category" value={product.category || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Giá:</label>
          <input type="number" name="price" value={product.price || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Số lượng tồn kho:</label>
          <input type="number" name="stock" value={product.stock || ''} onChange={handleChange} />
        </div>
        <button type="submit">Lưu thay đổi</button>
      </form>
    </div>
  );
}

export default ProductsEdit;
