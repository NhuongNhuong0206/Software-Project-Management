import React, { useCallback, useContext, useEffect, useState } from "react";
import './InvoiceInfo.css'; // Tạo file CSS để thêm style
import { useLocation, useNavigate } from 'react-router';
import Header from '../../layout/Header';
import { MyDispatcherContext, MyUserContext } from "../../configs/Contexts";
import APIs, { endpoints } from "../../configs/APIs";

const InvoiceInfo = () => {
    const location = useLocation();
    const bill = location.state;
    const user = useContext(MyUserContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false); // Để theo dõi trạng thái upload
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleComplete = async () => {
        if (!selectedImage) {
            alert("Please upload an image.");
            return;
        }
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('id', bill.id);
            formData.append('total', bill.money);
            formData.append('image', selectedImage); // Gửi ảnh đã chọn

            const response = await APIs({
                method: 'post',
                url: endpoints.updateImgBill,
                headers: {
                    'Authorization': `Bearer ${user.token}` // Gửi token trong header
                },
                data: formData,
            });

            if (response.status === 201) {
                alert(response.data.message);
                navigate("/bill")
                // Có thể thêm logic xử lý thành công tại đây
            } else {
                alert("Failed to upload image.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("An error occurred while uploading the image.");
        } finally {
            setUploading(false);
        }
    };


    return (
        <>
    
            <div className="invoice-page">
                <div className="invoice-container">
                    <div className="invoice-card">
                        <h2>THÔNG TIN HÓA ĐƠN</h2>
                        <div className="invoice-field">
                            <label>Mã hóa đơn:</label>
                            <input type="text" value={bill.id} readOnly />
                        </div>
                        <div className="invoice-field">
                            <label>Tên hóa đơn:</label>
                            <input type="text" value={bill.name_bill} readOnly />
                        </div>
                        <div className="invoice-field">
                            <label>Tổng tiền:</label>
                            <input type="text" value={bill.money} readOnly />
                        </div>
                        <div className="invoice-field">
                            <label>Ngày tạo:</label>
                            <input type="text" value={bill.created_date} readOnly />
                        </div>
                        <div className="invoice-field">
                            <label>Loại hóa đơn:</label>
                            <input type="text" value={bill.type_bill} readOnly />
                        </div>
                        <div className="invoice-field">
                            <label>Ghi chú:</label>
                            <input type="text" value={bill.decription} readOnly />
                        </div>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <button className="upload-button"                             
                            onClick={() => document.getElementById('imageUpload').click()}
                        >
                            ẢNH CHỨNG MINH
                        </button>
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="selected-image"
                            />
                        )}
                        <button className="complete-button" onClick={handleComplete}
                            disabled={uploading}>
                            {uploading ? 'Đang tải...' : '✔️ Hoàn Thành'}
                        </button>
                    </div>
                    <div className="payment-note">
                        <p>
                            <strong>CHÚ Ý:</strong>
                        </p>
                        <p>
                            *Quý khách hàng vui lòng chuyển khoản qua ngân hàng
                            theo thông tin sau:
                        </p>
                        <p>STK: 12345678</p>
                        <p>TÊN TK: CHUNG CU TNVV</p>
                        <p>NGÂN HÀNG: MBBank</p>
                        <p>
                            *Hoặc quý khách có thể vào app ngân hàng, chọn hóa
                            đơn, tìm kiếm <strong>CHUNG CU TNVV</strong> và tiến
                            hành thanh toán hóa đơn
                        </p>
                        <p>
                            *Sau khi thanh toán hóa đơn vui lòng chụp ảnh màn
                            hình và gửi minh chứng!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvoiceInfo;
