import React, { useContext, useState } from 'react';
import './Feedback.css';
import Header from '../../layout/Header';
import { useNavigate } from 'react-router';
import { MyUserContext } from '../../configs/Contexts';
import APIs, { endpoints } from '../../configs/APIs';


function Feedback() {
    const [title, setTitle] = useState(''); // Đổi từ subject thành title
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false); // Để theo dõi trạng thái upload
    const navigate = useNavigate();
    const user = useContext(MyUserContext)

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(file); // Lưu file gốc, không phải data URL
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please upload an image.");
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('title_letter', title); // Thay vì subject
            formData.append('content', content);
            formData.append('img_letter', image); // Gửi ảnh đã chọn

            const response = await APIs({
                method: 'post',
                url: endpoints.createfeedback, // Đổi url thành endpoint phù hợp
                headers: {
                    'Authorization': `Bearer ${user.token}`, // Gửi token trong header
                },
                data: formData,
            });

            if (response.status === 201) {
                alert("Đã tạo phản ánh thành công");
                navigate("/feedback"); // Chuyển hướng đến trang thành công
            } else {
                alert("Failed to submit feedback.");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("An error occurred while submitting feedback.");
        } finally {
            setUploading(false);
        }
    };

  return (
    <>
          <div className="home">
              <div className="container_nhi">
                  <h1 className="h1_nhi">PHẢN ÁNH</h1>
                  <form onSubmit={handleSubmit}>
                      <div className="form-group_nhi">
                          <label className="label_nhi">Chủ đề</label>
                          <input
                              type="text"
                              className="input_nhi"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="Nhập chủ đề"
                          />
                      </div>
                      <div className="form-group_nhi">
                          <label className="label_nhi">Nội dung</label>
                          <textarea
                              value={content}
                              className="textarea_nhi"
                              onChange={(e) => setContent(e.target.value)}
                              placeholder="Nhập nội dung"
                          ></textarea>
                      </div>
                      <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                      <button
                            type="button"
                            className="submit-button"
                            style={{marginBottom: 5}}
                            onClick={() => document.getElementById('imageUpload').click()}
                        >
                            Chọn hình ảnh
                        </button>
                        {image && (
                            
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Selected"
                                    className="selected-image"
                                />
                        )}
                      <button type="submit" className="submit-button" disabled={uploading}>
                            {uploading ? 'Đang gửi...' : 'Gửi phản ánh'}
                        </button>
                  </form>
              </div>
          </div>
      </>
  );
}

export default Feedback;