import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCT_URL } from '../../config';
import axios from 'axios';

function applyFilters(data, search, category) {
  const keyword = search.toLowerCase();
  return data.filter(p =>
    (p.name.toLowerCase().includes(keyword) ||
     p.category.toLowerCase().includes(keyword) ||
     p.price.toString().includes(keyword) ||
     p.stock.toString().includes(keyword)) &&
    (category === 'Tất cả' || p.category === category)
  );
}

function ProductsManage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Bạn cần đăng nhập để truy cập');
      navigate('/login');
      return;
    }

    axios.get(PRODUCT_URL)
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(applyFilters(res.data, searchTerm, selectedCategory));
      })
      .catch(error => console.error("Lỗi khi tải danh sách sản phẩm:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredProducts(applyFilters(products, value, selectedCategory));
  };

  const handleSort = () => {
    const sorted = [...filteredProducts].sort((a, b) =>
      sortAsc
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );
    setFilteredProducts(sorted);
    setSortAsc(!sortAsc);
  };

  const handleFilterByCategory = (cat) => {
    setSelectedCategory(cat);
    setFilteredProducts(applyFilters(products, searchTerm, cat));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này không?")) {
      try {
        await axios.delete(`${PRODUCT_URL}/${id}`);
        const updated = products.filter(p => p.id !== id);
        setProducts(updated);
        setFilteredProducts(applyFilters(updated, searchTerm, selectedCategory));
      } catch (error) {
        console.error("Lỗi khi xoá sản phẩm:", error);
      }
    }
  };

  const uniqueCategories = ['Tất cả', ...new Set(products.map(p => p.category))];

  if (loading) return null;

  return (
    <div className='container'>
      <div className='left-content'>
        <p>Danh mục</p>
        <ul>
          {uniqueCategories.map((cat, idx) => (
            <li
              key={idx}
              style={{ cursor: 'pointer', fontWeight: cat === selectedCategory ? 'bold' : 'normal' }}
              onClick={() => handleFilterByCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className='right-content'>
        <div style={{ marginBottom: '10px' }}>
          <label>Thêm sản phẩm </label>
          <button><Link to="/product-mng/add">Thêm mới</Link></button>
        </div>

        <p>Quản lý sản phẩm</p>

        <input
          placeholder='Tìm theo tên, danh mục, giá, tồn kho'
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleSort}>
          Sắp xếp theo ngày tạo ({sortAsc ? '↑' : '↓'})
        </button>

        <ol style={{ marginTop: '30px' }}>
          {filteredProducts.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong> - {p.category} | Giá: {p.price.toLocaleString()}₫ | Kho: {p.stock} |{' '}
              <Link className='black-text' to={`/product-mng/edit/${p.id}`}>Sửa</Link> |{' '}
              <Link className='black-text' to={`/product-mng/detail/${p.id}`}>Xem</Link> |{' '}
              <span className='black-text' style={{ cursor: 'pointer' }} onClick={() => handleDelete(p.id)}>Xoá</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default ProductsManage;
