import React, { useContext, useState } from "react";
import "./Good.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faScaleBalanced,
    faBreadSlice,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../layout/Header";
import { useNavigate } from "react-router";
import { MyUserContext } from "../../configs/Contexts";
import APIs, { endpoints } from "../../configs/APIs";
import Home from "../Home/Home";
import Swal from "sweetalert2";
import axios from "axios";

const Goods = () => {
    const [loading, setLoading] = React.useState(false);
    const [NameGoodss, setNameGoodss] = useState("");
    const [NoteGoodss, setNoteGoodss] = useState("");
    const [SizeGoodss, setSizeGoodss] = useState("");
    const nav = useNavigate();
    const user = useContext(MyUserContext);

    const send = async () => {
        console.log("user: ", user);
        if (NameGoodss && NoteGoodss && SizeGoodss) {
            setLoading(true);

            const payload = {
                name_goods: NameGoodss,
                note: NoteGoodss,
                size: SizeGoodss,
            };
            let esc = encodeURIComponent;
            let query = Object.keys(payload)
                .map((k) => esc(k) + "=" + esc(payload[k]))
                .join("&");

            try {
                console.log("Trước res", payload);
                let res = await APIs({
                    method: "post",
                    url: endpoints.createGoodss,
                    withCredentials: true,
                    crossdomain: true,
                    data: payload,
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                });
                console.log("Tới đây");

                if (res.status === 201) {
                    Swal.fire(
                        "Đăng ký thành công",
                        "Gửi xét duyệt thành công",
                        "success"
                    ).then(() => {
                        nav("/home");
                    });
                }
            } catch (ex) {
                console.log("eeeee: ", ex.response.status);
                if (ex.response.status === 400) {
                    Swal.fire(
                        "Lỗi",
                        "Người này không có tủ đồ điện tử",
                        "error"
                    ).then((result) => {
                        if (result.isConfirmed) {
                            nav("/home");
                        }
                    });
                }
            } finally {
                setLoading(false);
            }
        } else {
            Swal.fire("Thông báo", "Bạn chưa nhập đủ thông tin", "warning");
            console.log("Lỗi");
        }
    };
    return (
        <>
            <div className="home">
                <Header />
                <div className="form-container">
                    <h1 className="vy">Nhập thông tin hàng hóa</h1>
                    <div className="container">
                        <form className="goods-form">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="input_vy"
                                    placeholder="Nhập tên hàng"
                                    onChange={(e) =>
                                        setNameGoodss(e.target.value)
                                    }
                                />
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faBoxOpen}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="input_vy"
                                    placeholder="Kích cỡ hàng hóa"
                                    onChange={(e) =>
                                        setSizeGoodss(e.target.value)
                                    }
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
                                    placeholder="Lưu ý cho Ban quản lý"
                                    onChange={(e) =>
                                        setNoteGoodss(e.target.value)
                                    }
                                />
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faBreadSlice}
                                />
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    send();
                                }}
                            >
                                Gửi
                            </button>
                            {/* <button onClick={send}>Gửi</button> */}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Goods;
