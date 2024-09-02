import React, { useContext, useState, useEffect, useCallback } from "react";
import "./Cabinet.css";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Header from "../../layout/Header";
import { MyUserContext } from "../../configs/Contexts";
import APIs, { endpoints } from "../../configs/APIs";

const Cabinet = () => {
    const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);
    const user = useContext(MyUserContext);
    const [DataListBox, setDataListBox] = useState({});

    const fetchDataBox = useCallback(async () => {
        try {
            let res = await APIs({
                method: "get",
                url: endpoints.ListGoodssOfUser,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setDataListBox(res.data);
        } catch (ex) {
            Swal.fire({
                title: "Xoá lỗi",
                text: "Quay lại trang chủ",
                icon: "error",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/home");
            });
        }
    }, [reload, user.token, setDataListBox, navigate]);

    useEffect(() => {
        fetchDataBox();
    }, [fetchDataBox]);
    const handleGood = () => {
        navigate("/good");
    };
    const orders =
        DataListBox && Object.keys(DataListBox).length > 0
            ? Object.values(DataListBox).map((item) => ({
                  name: item.name_goods,
                  size: item.size,
                  receivedDate: item.created_date.split("T")[0], // Chuyển đổi ngày để chỉ lấy phần ngày
                  status: item.received_Goods,
                  imageUrl: item.img_goods,
              }))
            : [];
    const handlePrevious = () => {
        if (currentOrderIndex > 0) {
            setCurrentOrderIndex(currentOrderIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentOrderIndex < orders.length - 1) {
            setCurrentOrderIndex(currentOrderIndex + 1);
        }
    };
    return (
        <>
            <div className="home">
                <div className="cabinet-container">
                    <h1 className="cabinet-title">THÔNG TIN TỦ ĐỒ ĐIỆN TỬ</h1>

                    <div className="order-content">
                        <div className="cabinet-card">
                            <button
                                onClick={() => handleGood()}
                                className="register-button"
                            >
                                <span className="plus-icon">+</span> Đăng ký
                                nhận hàng
                            </button>
                        </div>

                        {orders.length > 0 && (
                            <div className="order-details">
                                <h2 className="order-title">
                                    {orders[currentOrderIndex].name}
                                </h2>
                                <p>
                                    <strong>Kích thước:</strong>{" "}
                                    {orders[currentOrderIndex].size}
                                </p>
                                <p>
                                    <strong>Ngày nhận:</strong>{" "}
                                    {orders[currentOrderIndex].receivedDate}
                                </p>
                                <p>
                                    <strong>Trạng thái:</strong>{" "}
                                    <span
                                        className={`status ${
                                            orders[currentOrderIndex].status ===
                                            "Ready for Pickup"
                                                ? "ready"
                                                : "pending"
                                        }`}
                                    >
                                        {orders[currentOrderIndex].status}
                                    </span>
                                </p>
                                <div className="image-container">
                                    <img
                                        src={orders[currentOrderIndex].imageUrl}
                                        alt="Order"
                                        className="order-image"
                                    />
                                    <p>Hình ảnh</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="navigation-buttons">
                        <button
                            onClick={handlePrevious}
                            disabled={currentOrderIndex === 0}
                            className="nav-button"
                        >
                            &lt; Trước
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentOrderIndex === orders.length - 1}
                            className="nav-button"
                        >
                            Sau &gt;
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cabinet;