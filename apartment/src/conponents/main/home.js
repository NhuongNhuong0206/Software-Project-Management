// src/components/Home.js
import React from "react";
import { Button } from "react-bootstrap";
import "../../static/home.css"; // Nhập tệp CSS

const Home = () => {
    return (
        <div className="home">
            <h1 className="homeTitle">Chào mừng đến với Chung cư TNVV</h1>
            <div className="homeButtons">
                <Button className="homeButton btnl" variant="primary">
                    Tiện ích
                </Button>
                <Button className="homeButton btnc" variant="primary">
                    Dịch vụ
                </Button>
                <Button className="homeButton btnl" variant="primary">
                    Hóa đơn
                </Button>
                <Button className="homeButton btnc" variant="primary">
                    Phản ánh
                </Button>
            </div>
        </div>
    );
};

export default Home;
