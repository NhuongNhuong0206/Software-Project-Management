import React from 'react';
import './Bill.css';
import { useNavigate } from 'react-router';

const Bill = () => {
    const navigate = useNavigate();

    const handlePayment = (bill) => {
        navigate('/invoice', { state: bill });
    };

    const billData = [
        {
            id: 1,
            title: 'Hóa đơn Internet',
            total: '500,000 VND',
            created: '20/08/2024',
            note: 'Thanh toán trước 25/08/2024',
        },
        {
            id: 2,
            title: 'Hóa đơn sửa chữa',
            total: '1,200,000 VND',
            created: '18/08/2024',
            note: 'Thanh toán trước 23/08/2024',
        },
        {
            id: 3,
            title: 'Hóa đơn rác',
            total: '150,000 VND',
            created: '19/08/2024',
            note: 'Thanh toán trước 22/08/2024',
        },
    ];

    return (
        <div className="payment-container">
            <h1>THANH TOÁN HÓA ĐƠN</h1>
            <div className="bill-cards">
                {billData.map((bill) => (
                    <div className="bill-card" key={bill.id}>
                        <h2>{bill.title}</h2>
                        <div className="bill-field">
                            <label>Tổng phí:</label>
                            <input type="text" value={bill.total} readOnly />
                        </div>
                        <div className="bill-field">
                            <label>Ngày tạo:</label>
                            <input type="text" value={bill.created} readOnly />
                        </div>
                        <div className="bill-field">
                            <label>Ghi chú:</label>
                            <input type="text" value={bill.note} readOnly />
                        </div>
                        <button 
                            className="pay-button" 
                            onClick={() => handlePayment(bill)}
                        >
                            THANH TOÁN
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

}
export default Bill;