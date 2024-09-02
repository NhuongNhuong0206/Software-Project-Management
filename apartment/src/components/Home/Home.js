import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./Home.css"; // Nhập tệp CSS
import { useNavigate } from "react-router";
import Header from "../../layout/Header";
import { MyUserContext } from "../../configs/Contexts";
import APIs, { endpoints } from "../../configs/APIs";

const Home = () => {
    const user = useContext(MyUserContext);
    const [DataProfile, setDataProfile] = useState({});
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);

    const handleTienIch = () => {
        navigate("/tienich");
    };

    const handleFeedback = () => {
        navigate("/feedback");
    };

    const handleBill = () => {
        navigate("/bill");
    };

    const fetchDataProfile = useCallback(async () => {
        try {
            let res = await APIs({
                method: "get",
                url: endpoints.getPeople,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setDataProfile(res.data);
        } catch (ex) {
           navigate("/home");
        }
    }, [reload, user.token, setDataProfile, navigate]);

    useEffect(() => {
        fetchDataProfile();
    }, [fetchDataProfile]);

    return (
        <>
            <div className="home">
                
                <div className="login-container-home">
                    <h1 className="homeTitle">
                        Chào mừng {DataProfile.name_people} đến với Chung cư TNVV
                    </h1>
                    <div className="homeButtons">
                        <Button
                            className="homeButton btnl"
                            variant="primary"
                            onClick={() => handleTienIch()}
                        >
                            Tiện ích
                        </Button>
                        <Button className="homeButton btnc" variant="primary">
                            Dịch vụ
                        </Button>
                        <Button
                            className="homeButton btnl"
                            variant="primary"
                            onClick={() => handleBill()}
                        >
                            Hóa đơn
                        </Button>
                        <Button
                            className="homeButton btnc"
                            variant="primary"
                            onClick={() => handleFeedback()}
                        >
                            Phản ánh
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
