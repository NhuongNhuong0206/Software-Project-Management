import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Good.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faScaleBalanced,
    faBreadSlice,
} from "@fortawesome/free-solid-svg-icons";

const Goods = () => {
    const [formData, setFormData] = useState({
        name: "",
        size: "",
        otherInfo: ""
    });
    const [message, setMessage] = useState("");
    const [goods, setGoods] = useState([]);

    // Hàm để xử lý khi người dùng nhập dữ liệu vào form
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Hàm để lấy danh sách hàng hóa từ API
    const fetchGoods = async () => {
        try {
            const response = await axios.get('http://localhost:8000/goods/get_goods/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setGoods(response.data);  // Lưu danh sách hàng hóa vào state
        } catch (error) {
            console.error("Error fetching goods:", error.response);
        }
    };

    // Hàm để tạo mới hàng hóa
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/goods/create_goods/', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 201) {
                setMessage("Hàng hóa đã được tạo thành công!");
                fetchGoods();  // Cập nhật danh sách hàng hóa sau khi tạo mới
            } else {
                setMessage("Đã xảy ra lỗi khi tạo hàng hóa.");
            }
        } catch (error) {
            setMessage("Lỗi khi kết nối với API. Vui lòng thử lại.");
        }
    };

    // Hàm để cập nhật trạng thái hàng hóa
    const updateItemStatus = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:8000/goods/Update_items_tatus/${id}/`, { id }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                setMessage("Cập nhật trạng thái thành công!");
                fetchGoods();  // Cập nhật danh sách hàng hóa sau khi thay đổi trạng thái
            } else {
                setMessage("Không thể cập nhật trạng thái hàng hóa.");
            }
        } catch (error) {
            setMessage("Lỗi khi cập nhật trạng thái hàng hóa. Vui lòng thử lại.");
        }
    };

    // Sử dụng useEffect để lấy danh sách hàng hóa khi component được mount
    useEffect(() => {
        fetchGoods();
    }, []);

    return (
        <div className="form-container">
            <h1 className="vy">Nhập thông tin hàng hóa</h1>
            <div className="container">
                <form className="goods-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="input_vy"
                            placeholder="Nhập tên hàng"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <FontAwesomeIcon className="icon" icon={faBoxOpen} />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="input_vy"
                            placeholder="Kích cỡ hàng hóa"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                        />
                        <FontAwesomeIcon
                            className="icon"
                            icon={faScaleBalanced}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="input_vy"
                            placeholder="Thông tin khác"
                            name="otherInfo"
                            value={formData.otherInfo}
                            onChange={handleChange}
                        />
                        <FontAwesomeIcon className="icon" icon={faBreadSlice} />
                    </div>
                    <button type="submit">Gửi</button>
                </form>
                {message && <p>{message}</p>}
            </div>

            <h2>Danh sách hàng hóa</h2>
            <ul>
                {goods.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.size}
                        <button onClick={() => updateItemStatus(item.id)}>Cập nhật trạng thái</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Goods;
