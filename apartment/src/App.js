import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Container } from "react-bootstrap";
import Home from "./components/Home/Home";
import Bill from "./components/Bill/Bill";
import InvoiceInfo from "./components/Bill/InvoiceInfo";
import Login from "./components/Login/Login";
import RegisterParking from "./components/Car/RegisterParking";
import Cabinet from "./components/Cabinet/Cabinet";
import Goods from "./components/Good/Good";
import TienIch from "./components/Home/tienich";
import Feedback from "./components/Feedback/Feedback";
import FeedbackList from "./components/Feedback/FeedbackList";
import VehicleInfo from "./components/Car/Car";
import Profile from "./components/Login/Profile";
import { MyDispatcherContext, MyUserContext } from "./configs/Contexts";
import { MyUserReducer } from "./configs/Reducers";
import { useEffect, useReducer, useState } from 'react';

// Định nghĩa component App
function App() {
    // Khởi tạo trạng thái người dùng và dispatcher với useReducer
    const [user, dispatcher] = useReducer(MyUserReducer, null);
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    // Kiểm tra trạng thái đăng nhập khi component mount
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // Lấy token từ localStorage (hoặc AsyncStorage nếu bạn đang sử dụng React Native)
                const token = localStorage.getItem("access_token");
                setUserToken(token);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    // Hiển thị loading indicator trong khi kiểm tra trạng thái đăng nhập
    if (isLoading) {
        return (
            <div className="loading-container">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <MyUserContext.Provider value={user}>
                <MyDispatcherContext.Provider value={dispatcher}>
                <Header />
                    <Container>
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="/login" />}
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/bill" element={<Bill />} />
                            <Route path="/invoice" element={<InvoiceInfo />} />

                            <Route
                                path="/register-parking"
                                element={<RegisterParking />}
                            />
                            <Route path="/cabinet" element={<Cabinet />} />
                            <Route path="/good" element={<Goods />} />
                            <Route path="/tienich" element={<TienIch />} />
                            <Route
                                path="/feedback"
                                element={<FeedbackList />}
                            />
                            <Route
                                path="/create_feedback"
                                element={<Feedback />}
                            />
                            <Route path="/car" element={<VehicleInfo />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </Container>
                    <Footer />
                </MyDispatcherContext.Provider>
            </MyUserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
