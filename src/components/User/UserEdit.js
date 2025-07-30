import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { USER_URL } from '../../config';

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${USER_URL}/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users data!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: name === 'performanceScore' ? parseFloat(value) : value
    }));
  };

  const handleReviewChange = (e, index) => {
    const { name, value } = e.target;
    const updatedReviews = [...user.reviews];
    updatedReviews[index] = {
      ...updatedReviews[index],
      [name]: name === 'score' ? parseFloat(value) : value
    };
    setUser(prev => ({
      ...prev,
      reviews: updatedReviews
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${URL}/${id}`, user)
      .then(() => {
        alert("Cập nhật nhân viên thành công!");
        navigate('/');
      })
      .catch(error => {
        console.error("Lỗi khi cập nhật nhân viên!", error);
      });
  };

  if (!user) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div style={{ marginLeft: '30px' }}>
      <Link to="/user-mng" className='black-text' style={{ marginBottom: '20px', display: 'inline-block' }}> 🔙 Quay lại danh sách</Link>
      <h1>Cập nhật thông tin nhân viên</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Họ tên:</label>
          <input
            type="text"
            name="name"
            value={user.name || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Tài khoản:</label>
          <input
            type="text"
            name="username"
            value={user.username || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            name="password"
            value={user.password || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Phòng ban:</label>
          <input
            type="text"
            name="department"
            value={user.department || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Chức vụ:</label>
          <input
            type="text"
            name="role"
            value={user.role || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Điểm hiệu suất:</label>
          <input
            type="number"
            step="0.1"
            name="performanceScore"
            value={user.performanceScore || ''}
            onChange={handleChange}
          />
        </div>

        <h3>Đánh giá</h3>
        {user.reviews?.map((review, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', marginRight:'30px' }}>
            <div>
              <label>Tiêu chí:</label>
              <input
                type="text"
                name="criteria"
                value={review.criteria}
                onChange={(e) => handleReviewChange(e, index)}
              />
            </div>

            <div>
              <label>Điểm:</label>
              <input
                type="number"
                step="0.1"
                name="score"
                value={review.score}
                onChange={(e) => handleReviewChange(e, index)}
              />
            </div>

            <div>
              <label>Nhận xét:</label>
              <input
                type="text"
                name="comment"
                value={review.comment}
                onChange={(e) => handleReviewChange(e, index)}
              />
            </div>

            <div>
              <label>Người đánh giá:</label>
              <input
                type="text"
                name="reviewer"
                value={review.reviewer}
                onChange={(e) => handleReviewChange(e, index)}
              />
            </div>

            <div>
              <label>Ngày đánh giá:</label>
              <input
                type="date"
                name="date"
                value={review.date?.slice(0, 10)}
                onChange={(e) => handleReviewChange(e, index)}
              />
            </div>
          </div>
        ))}

        <button type="submit">Lưu thay đổi</button>
      </form>
    </div>
  );
}

export default UserEdit;
