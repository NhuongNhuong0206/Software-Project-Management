import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Car.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import Header from "../../layout/Header";
import APIs, { endpoints } from "../../configs/APIs";
import { MyUserContext } from "../../configs/Contexts";
import Swal from "sweetalert2";

function VehicleInfo() {
    const navigate = useNavigate();
    const user = useContext(MyUserContext);
    const [reload, setReload] = useState(false);
    const [DataListBox, setDataListBox] = useState({});

    const fetchDataBox = useCallback(async () => {
        try {
            let res = await APIs({
                method: "get",
                url: endpoints.ListCarCardOfUser,
                headers: {
                    Authorization: `Bearer ${user}`,
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
    }, [reload, user, setDataListBox, navigate]);

    useEffect(() => {
        fetchDataBox();
    }, [fetchDataBox]);
    const handleGood = () => {
        navigate("/car");
    };
    const orders =
        DataListBox && Object.keys(DataListBox).length > 0
            ? Object.values(DataListBox).map((item) => ({
                  area: item.area,
                  user: item.user,
                  id: item.id,
                  created_date: item.created_date.split("T")[0], // Chuyển đổi ngày để chỉ lấy phần ngày
                  vehicle_type: item.vehicle_type,
              }))
            : [];
    console.log("DataListBox: ", DataListBox);
    const handleRegister = () => {
        navigate("/register-parking");
    };

    return (
        <div className="home">
            <Header />
            <div style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
                <h1 style={{ textAlign: "center", color: "#555" }}>
                    DANH SÁCH THẺ XE ĐANG SỬ DỤNG
                </h1>
                <Button
                    style={{ marginBottom: "10px" }}
                    onClick={() => handleRegister()}
                >
                    Đăng Ký Thẻ Xe
                </Button>
                <div style={{ marginBottom: "20px" }}>
                    {orders.map((order, index) => (
                        <div key={index} style={cardStyle}>
                            <div style={iconStyle}>icon</div>
                            <div style={infoStyle}>
                                <p>
                                    <strong>Cư dân:</strong>{" "}
                                    <span style={infoSpanStyle}>
                                        {order.user}
                                    </span>
                                </p>
                                <p>
                                    <strong>Khu vực giữ xe:</strong>{" "}
                                    <span style={infoSpanStyle}>
                                        {order.area}
                                    </span>
                                </p>
                                <p>
                                    <strong>Loại xe:</strong>{" "}
                                    <span style={infoSpanStyle}>
                                        {/* {order.vehicle_type} */}
                                        Xe máy
                                    </span>
                                </p>
                                <p>
                                    <strong>Ngày tạo:</strong>{" "}
                                    <span style={infoSpanStyle}>
                                        {order.created_date}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const cardStyle = {
    display: "flex",
    backgroundColor: "#003366",
    color: "white",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "8px",
};

const iconStyle = {
    width: "60px",
    height: "60px",
    backgroundColor: "white",
    color: "#003366",
    textAlign: "center",
    lineHeight: "60px",
    fontWeight: "bold",
    marginRight: "20px",
    borderRadius: "8px",
};

const infoStyle = {
    flexGrow: 1,
};

const infoSpanStyle = {
    display: "inline-block",
    backgroundColor: "#555",
    width: "150px",
    height: "20px",
    marginLeft: "10px",
    borderRadius: "4px",
};

export default VehicleInfo;
