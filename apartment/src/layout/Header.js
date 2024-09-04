import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import Login from "../components/Login/Login";
import { MyDispatcherContext, MyUserContext } from "../configs/Contexts";
import APIs, { endpoints } from "../configs/APIs";

const Header = () => {
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatcherContext)
    const [avatar, setAvatar] = useState({});
    const navigate = useNavigate(); // Khởi tạo useNavigate

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch({type: "logout"})
        navigate("/login");
	}



    return (
        <header className="header">
            <div className="header__logo">
                <img
                    src="https://res.cloudinary.com/dr9h3ttpy/image/upload/v1724141015/aaaa.png"
                    alt="Logo"
                    className="logo-image"
                />
                <h1>Chung Cư TNVV</h1>
            </div>
            <nav className="header__nav">
                <ul>
                {user ? (
                    <><li>
                            <Link to="/home">Trang Chủ</Link>
                        </li><li>
                                <Link to="/profile">Hồ Sơ</Link>
                            </li><li className="header__user-info">
                                <button onClick={handleLogout} className="btn-link">
                                    Đăng xuất
                                </button>
                            </li></>
                    ) : (
                        <li>
                            <Link to="/login">Đăng nhập</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
