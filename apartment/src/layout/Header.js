import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <img src="https://res.cloudinary.com/dr9h3ttpy/image/upload/v1724141015/aaaa.png" alt="Logo" className="logo-image" />
                <h1>Chung Cư TNVV</h1>
            </div>
            <nav className="header__nav">
                <ul>
                    <li><Link>Trang Chủ</Link></li>
                    <li><Link>Cư Dân</Link></li>
                    <li><Link>Dịch Vụ</Link></li>
                    <li><Link to='/bill'>Thanh Toán</Link></li>
                    <li><Link>Hồ Sơ</Link></li>
                    <li><Link>Đăng Xuất</Link></li>
                </ul>
            </nav>
        </header>
    );

}
export default Header;