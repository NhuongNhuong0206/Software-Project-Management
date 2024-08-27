import React, { useContext, useState } from 'react';
import './Login.css';
import { MyDispatchContext, MyUserContext } from '../utils/MyContext';
import { useNavigate } from 'react-router';
import APIFunctions, { authAPIs, endpoints } from '../utils/APIFunctions';
import cookie from "react-cookies";

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);
    const [loading, setLoading] = useState(false);

    const login = async (e) => {
        e.preventDefault();

       try {
            let res = await APIFunctions.post(endpoints['login'], {
                "username": username, 
                "password": password
            });

        
            cookie.save("access-token", res.data)

            let user = await authAPIs().get(endpoints['current-user']);
            cookie.save("user", user.data);

            dispatch({
                "type": "login",
                "payload": user.data
            });
            alert('Đăng nhập thành công!!!');
       } catch(ex) {
           console.error(ex);
           alert('Cảnh báo: Tên đăng nhập hoặc mật khẩu không hợp lệ!!!');
       }
    }

    return (
        <div className='home'>
            <div className="login-container">
                <h1 className='nhi'>Đăng nhập</h1>
                <p className='nhi1'>Chào mừng bạn đến với chung cư TNVV</p>
                <form className="login-form" method="post" onSubmit={login} >
                    <div className="input-group">
                        <input type="text" placeholder="Tên đăng nhập" value={username} onChange={e => setUsername(e.target.value)}
                            required />
                        <span className="input-icon">👀</span>
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                            required />
                        <span className="input-icon">👀</span>
                    </div>
                    <a className="forgot-password">Quên mật khẩu?</a>
                    <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;