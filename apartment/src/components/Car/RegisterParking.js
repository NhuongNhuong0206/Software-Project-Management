import React, { useContext, useState } from "react";
import "./RegisterParking.css";
import Header from "../../layout/Header";
import { MyUserContext } from "../../configs/Contexts";
import APIs, { endpoints } from "../../configs/APIs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const RegisterParking = ({ isAdmin }) => {
    const [loading, setLoading] = React.useState(false);
    const [area, setArea] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [requests, setRequests] = useState([]);
    const nav = useNavigate();
    const user = useContext(MyUserContext);
    const send = async () => {
        console.log("user: ", user);
        if (area && vehicleType) {
            setLoading(true);

            const payload = {
                area: area,
                vehicleType: vehicleType,
            };
            let esc = encodeURIComponent;
            let query = Object.keys(payload)
                .map((k) => esc(k) + "=" + esc(payload[k]))
                .join("&");

            try {
                console.log("Trước res", payload);
                let res = await APIs({
                    method: "post",
                    url: endpoints.carCard,
                    withCredentials: true,
                    crossdomain: true,
                    data: payload,
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                console.log("Tới đây");

                if (res.status === 201) {
                    Swal.fire(
                        "Đăng ký thành công",
                        "Gửi xét duyệt thành công",
                        "success"
                    ).then(() => {
                        nav("/home");
                    });
                }
            } catch (ex) {
                console.log("eeeee: ", ex.response.status);
                if (ex.response.status === 403) {
                    Swal.fire("Lỗi", "Quá số lượng", "error").then((result) => {
                        if (result.isConfirmed) {
                            nav("/home");
                        }
                    });
                }
            } finally {
                setLoading(false);
            }
        } else {
            Swal.fire("Thông báo", "Bạn chưa nhập đủ thông tin", "warning");
            console.log("Lỗi");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRequest = { area, vehicleType, status: "Pending" };
        setRequests([...requests, newRequest]);
        setArea("");
        setVehicleType("");
    };

    const handleApprove = (index) => {
        const updatedRequests = [...requests];
        updatedRequests[index].status = "Approved";
        setRequests(updatedRequests);
    };

    const handleReject = (index) => {
        const updatedRequests = [...requests];
        updatedRequests[index].status = "Rejected";
        setRequests(updatedRequests);
    };

    return (
        <>
            <div className="home">
                <div className="register-parking">
                    <h1 className="title">ĐĂNG KÝ THẺ GIỮ XE</h1>
                    <form onSubmit={handleSubmit} className="form">
                        <input
                            type="text"
                            placeholder="Nhập khu đăng ký thẻ giữ xe"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Loại xe"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="input-field"
                            required
                        />
                        <button className="submit-button" onClick={send}>
                            <i className="check-icon">✔️</i> Gửi xét duyệt
                        </button>
                    </form>

                    {/* Render review section only if the user is an admin */}
                    {isAdmin && (
                        <div className="review-section">
                            <h2 className="review-title">
                                Xét Duyệt Thẻ Giữ Xe
                            </h2>
                            {requests.length > 0 ? (
                                <ul className="request-list">
                                    {requests.map((request, index) => (
                                        <li
                                            key={index}
                                            className="request-item"
                                        >
                                            <p>Khu vực: {request.area}</p>
                                            <p>
                                                Loại xe: {request.vehicleType}
                                            </p>
                                            <p>Trạng thái: {request.status}</p>
                                            {request.status === "Pending" && (
                                                <div className="action-buttons">
                                                    <button
                                                        onClick={() =>
                                                            handleApprove(index)
                                                        }
                                                        className="approve-button"
                                                    >
                                                        Duyệt
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleReject(index)
                                                        }
                                                        className="reject-button"
                                                    >
                                                        Từ chối
                                                    </button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Không có yêu cầu nào đang chờ xét duyệt.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RegisterParking;