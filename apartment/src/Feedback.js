import React, { useState } from 'react';
import './Feedback.css';


function Feedback() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subject:', subject);
    console.log('Content:', content);
    console.log('Image:', image);
    // Xử lý gửi dữ liệu ở đây
  };

  return (
    <div className="container">
      <h1>PHẢN ÁNH</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Chủ đề</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Nhập chủ đề"
          />
        </div>
        <div className="form-group">
          <label>Nội dung</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nhập nội dung"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Chọn hình ảnh</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="submit-button">Gửi phản ánh</button>
      </form>
    </div>
  );
}

export default Feedback;
