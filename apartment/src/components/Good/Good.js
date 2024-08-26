import React from "react";
import "./Good.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faScaleBalanced,
    faBreadSlice,
} from "@fortawesome/free-solid-svg-icons";

const Goods = () => {
    return (
        
        <div className="form-container">
            <h1 className="vy">Nhập thông tin hàng hóa</h1>
            <div className="container">
                <form className="goods-form">
                    <div className="input-group">
                        <input type="text" className="input_vy" placeholder="Nhập tên hàng" />
                        <FontAwesomeIcon className="icon" icon={faBoxOpen} />
                    </div>
                    <div className="input-group">
                        <input type="text" className="input_vy" placeholder="Kích cỡ hàng hóa" />
                        <FontAwesomeIcon
                            className="icon"
                            icon={faScaleBalanced}
                        />
                    </div>
                    <div className="input-group">
                        <input type="text" className="input_vy" placeholder="Nhập tên hàng" />
                        <FontAwesomeIcon className="icon" icon={faBreadSlice} />
                    </div>
                    <button type="submit">Gửi</button>
                </form>
            </div>
        </div>
    );
};

export default Goods;