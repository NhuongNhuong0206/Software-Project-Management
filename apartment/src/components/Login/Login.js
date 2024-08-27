import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <div className='home'>
            <div className="login-container">
                <h1 className='nhi'>Đăng nhập</h1>
                <p className='nhi1'>Chào mừng bạn đến với chung cư TNVV</p>
                <form className="login-form">
                    <div className="input-group">
                        <input type="text" placeholder="Tên đăng nhập" />
                        <span className="input-icon">👀</span>
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" />
                        <span className="input-icon">👀</span>
                    </div>
                    <a className="forgot-password">Quên mật khẩu?</a>
                    <button type="submit" className="login-button">
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;