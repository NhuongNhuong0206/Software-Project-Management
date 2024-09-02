import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Profile.css"; // Bạn có thể thêm CSS vào đây để điều chỉnh giao diện
import Header from "../../layout/Header";
import APIs, { endpoints } from "../../configs/APIs";
import { useNavigate } from "react-router";
import { MyDispatcherContext, MyUserContext } from "../../configs/Contexts";


function Profile() {
    const user = useContext(MyUserContext);
    const [DataProfile, setDataProfile] = useState({});
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);
    const dispatch = useContext(MyDispatcherContext)

    const handleLogout = () => {
		
        localStorage.removeItem("token");
        dispatch({type: "logout"})
        navigate("/login");
	}

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
                <div className="container_van">
                    <h1 className="h1_van">Thông tin cá nhân</h1>
                    
                    <form>
                        <div className="form-group_van">
                            <label className="label-van">Họ và tên:</label>
                            <input
                                type="text"
                                className="input_van"
                                value={DataProfile.name_people || "********"}
                                readOnly
                            />
                        </div>
                        <div className="form-group_van">
                            <label className="label-van">Số điện thoại:</label>
                            <input
                                type="text"
                                className="input_van"
                                value={DataProfile.phone || "********"}
                                readOnly
                            />
                        </div>
                        <div className="form-group_van">
                            <div className="form-inline_van">
                                <div className="form-item_van">
                                    <label className="label-van">Ngày sinh:</label>
                                    <input
                                        type="text"
                                        className="input_van"
                                        value={DataProfile.birthday || "**/**/****"}
                                        readOnly
                                    />
                                </div>
                                <div className="form-item_van">
                                    <label className="label-van">Giới tính:</label>
                                    <input
                                        type="text"
                                        className="input_van"
                                        value={DataProfile.sex || "********"}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group_van">
                            <div className="form-inline_van">
                                <div className="form-item_van">
                                    <label className="label-van">Ngày hết hạn:</label>
                                    <input
                                        type="text"
                                        className="input_van"
                                        value={DataProfile.expiry || "**/**/****"}
                                        readOnly
                                    />
                                </div>
                                <div className="form-item_van">
                                    <label className="label-van">Số căn hộ:</label>
                                    <input
                                        type="text"
                                        className="input_van"
                                        value={DataProfile.ApartNum || "********"}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group_van">
                            <label className="label-van">CMND/CCCD:</label>
                            <input
                                type="text"
                                className="input_van"
                                value={DataProfile.identification_card || "********"}
                                readOnly
                            />
                        </div>
                        <button type="button" className="btn-logout" onClick={() => handleLogout()}>
                            Đăng xuất
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Profile;
