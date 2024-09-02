import React, { useCallback, useContext, useEffect, useState } from "react";
import "./FeedbackList.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import Header from "../../layout/Header";
import { MyDispatcherContext, MyUserContext } from "../../configs/Contexts";
import APIs, { endpoints } from "../../configs/APIs";

const FeedbackList = () => {
    const navigate = useNavigate();
    const user = useContext(MyUserContext);
    const [DataFeedback, setFeedback] = useState([]);
    const dispatch = useContext(MyDispatcherContext)
    const [reload, setReload] = useState(false);
    

    const fetchDataFeedback = useCallback(async () => {
        try {
            let res = await APIs({
                method: "get",
                url: endpoints.feedback,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setFeedback(res.data);
        } catch (ex) {
           navigate("/home");
        }
    }, [ user.token, setFeedback, navigate]);

    useEffect(() => {
        fetchDataFeedback();
    }, [fetchDataFeedback]);

    

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Số phản ánh hiển thị trên mỗi trang

    // Tính toán các phản ánh hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = DataFeedback.slice(indexOfFirstItem, indexOfLastItem);

    // Tổng số trang
    const totalPages = Math.ceil(DataFeedback.length / itemsPerPage);

    // Hàm chuyển trang
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFeedback = () => {
        navigate("/create_feedback");
    };

    return (
        <>
            <div className="feedback-fullscreen">
                <h1 className="feedback-title">PHẢN ÁNH ĐÃ GỬI</h1>

                <div className="feadback-create">
                    <p className="feedback-subtitle">
                        Danh sách các phản ánh đã gửi
                    </p>
                    <Button
                        className="button-feedback"
                        onClick={() => handleFeedback()}
                    >
                        Tạo Phản Ánh
                    </Button>
                </div>
                <div className="feedback-container">
                    {DataFeedback.map((feedback) => (
                        <div className="feedback-item" key={feedback.id}>
                            <div>
                                <img
                                    className="feedback-image"
                                    src={feedback.img_letter || "https://via.placeholder.com/40"}
                                ></img>
                            </div>
                            <div className="feedback-content">
                                <h3>{feedback.title_letter}</h3>
                                <p>{feedback.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button onClick={prevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>{`Trang ${currentPage} / ${totalPages}`}</span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default FeedbackList;
