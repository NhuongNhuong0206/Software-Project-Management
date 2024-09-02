import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Bill.css";
import { useNavigate } from "react-router";
import Header from "../../layout/Header";
import { MyDispatcherContext, MyUserContext } from "../../configs/Contexts";
import APIs, { endpoints } from "../../configs/APIs";

const Bill = () => {
    const navigate = useNavigate();
    const user = useContext(MyUserContext);
    const [DataBill, setDataBill] = useState([]);
    const dispatch = useContext(MyDispatcherContext)
    const [reload, setReload] = useState(false);
    
    const handlePayment = (bill) => {
        navigate("/invoice", { state: bill });
    };

    const fetchDataBill = useCallback(async () => {
        try {
            let res = await APIs({
                method: "get",
                url: endpoints.bill,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setDataBill(res.data);
        } catch (ex) {
           navigate("/home");
        }
    }, [ user.token, setDataBill, navigate]);

    useEffect(() => {
        fetchDataBill();
    }, [fetchDataBill]);


    return (
        <>
            <div className="payment-container">
                <h1>THANH TOÁN HÓA ĐƠN</h1>
                <div className="bill-cards">
                    {DataBill.map((bill) => (
                        <div className="bill-card" key={bill.id}>
                            <h2>{bill.name_bill}</h2>
                            <div className="bill-field">
                                <label>Tổng phí:</label>
                                <input
                                    type="text"
                                    value={bill.money}
                                    readOnly
                                />
                            </div>
                            <div className="bill-field">
                                <label>Ngày tạo:</label>
                                <input
                                    type="text"
                                    value={bill.created_date}
                                    readOnly
                                />
                            </div>
                            <div className="bill-field">
                                <label>Loại hóa đơn:</label>
                                <input
                                    type="text"
                                    value={bill.type_bill}
                                    readOnly
                                />
                            </div>
                            <div className="bill-field">
                                <label>Mô tả:</label>
                                <input type="text" value={bill.decription} readOnly />
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
        </>
    );
};
export default Bill;
