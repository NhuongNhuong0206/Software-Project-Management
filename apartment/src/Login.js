import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <h1>Đăng nhập</h1>
            <p>Chào mừng bạn đến với Chung Cư TNVV</p>
            <form className="login-form">
                <div className="input-group">
                    <input type="text" placeholder="Tên đăng nhập" />
                    <span className="input-icon">🥸</span>
                </div>
                <div className="input-group">
                    <input type="password" placeholder="Password" />
                    <span className="input-icon">👀</span>
                </div>
                <a href="/" className="forgot-password">Quên mật khẩu?</a>
                <button type="submit" className="login-button">
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}

export default Login;
