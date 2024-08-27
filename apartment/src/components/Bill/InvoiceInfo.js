import React from 'react';
import './InvoiceInfo.css'; // Tạo file CSS để thêm style
import { useLocation } from 'react-router';

const InvoiceInfo = () => {
    const location = useLocation();
    const bill = location.state;

    return (
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
                        <input type="text" value={bill.title} readOnly />
                    </div>
                    <div className="invoice-field">
                        <label>Tổng tiền:</label>
                        <input type="text" value={bill.total} readOnly />
                    </div>
                    <div className="invoice-field">
                        <label>Ngày tạo:</label>
                        <input type="text" value={bill.created} readOnly />
                    </div>
                    <div className="invoice-field">
                        <label>Ghi chú:</label>
                        <input type="text" value={bill.note} readOnly />
                    </div>
                    <button className="upload-button">ẢNH CHỨNG MINH</button>
                    <button className="complete-button">&#10004; Hoàn Thành</button>
                </div>
                <div className="payment-note">
                    <p><strong>CHÚ Ý:</strong></p>
                    <p>*Quý khách hàng vui lòng chuyển khoản qua ngân hàng theo thông tin sau:</p>
                    <p>STK: 12345678</p>
                    <p>TÊN TK: CHUNG CU TNVV</p>
                    <p>NGÂN HÀNG: MBBank</p>
                    <p>*Hoặc quý khách có thể vào app ngân hàng, chọn hóa đơn, tìm kiếm <strong>CHUNG CU TNVV</strong> và tiến hành thanh toán hóa đơn</p>
                    <p>*Sau khi thanh toán hóa đơn vui lòng chụp ảnh màn hình và gửi minh chứng!</p>
                </div>
            </div>
        </div>
    );
};

export default InvoiceInfo;
