import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { USER_URL } from '../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';
function UserDetail () {
  const [user, setUser] = useState(null);
  const { id } = useParams(); 
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${USER_URL}/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
        navigate('/user-mng');
      });
  }, [id, navigate]); 
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className='detail-content'>
      <Link to="/user-mng" className='black-text' style={{ marginBottom: '20px', display: 'inline-block' }}> 🔙 Quay lại danh sách</Link>
      <h1>User Detail</h1>
      <ul>
        <li><strong>Họ tên:</strong> {user.name}</li>
        <li><strong>Phòng ban:</strong> {user.department}</li>
        <li><strong>Điểm hiệu suất:</strong> {user.performanceScore}</li>
        <li><strong>Chức vụ:</strong> {user.role}</li>
        <li>
          <strong>Đánh giá:</strong>
          <ul>
            {user.reviews && user.reviews.length > 0 ? (
              user.reviews.map((review, index) => (
                <li key={index}>
                  <p><strong>Tiêu chí:</strong> {review.criteria}</p>
                  <p><strong>Điểm:</strong> {review.score}</p>
                  <p><strong>Nhận xét:</strong> {review.comment}</p>
                  <p><strong>Ngày:</strong> {new Date(review.date).toLocaleDateString()}</p>
                  <p><strong>Người đánh giá:</strong> {review.reviewer}</p>
                  <hr />
                </li>
              ))
            ) : (
              <p>Chưa có đánh giá nào</p>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
}
export default UserDetail;