import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PostDetail_Report.css';
import ViewPostDetail from '../Post/ViewPostDetail';

const PostDetail_Report = () => {
    const { id } = useParams(); // Lấy id từ URL

    const [isDisabled, setIsDisabled] = useState(false); // Trạng thái ban đầu của nút "Vô hiệu hóa"
    const [postId, setPostId] = useState(null);

    useEffect(() => {
        const fetchPostId = async () => {
            try {
                const response = await axios.get(`https://wygo-ojzf.onrender.com/reports/post/${id}/get-post-id`);
                setPostId(response.data);
            } catch (error) {
                console.error('There was an error fetching post ID!', error);
            }
        };

        fetchPostId();
    }, [id]);

    const handleDisable = async () => {
        try {
            console.log(postId);
            const response = await axios.post('https://wygo-ojzf.onrender.com/posts/status', {
                postId: postId,
            });
            console.log(response.data);
            // Thêm mã xử lý sau khi gọi API thành công tại đây

            // Đổi trạng thái của nút "Vô hiệu hóa" sau khi gọi API
            setIsDisabled(!isDisabled);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const handleSkip = async () => {
        try {
            const response = await axios.post('https://wygo-ojzf.onrender.com/reports/post/resolve', {
                ReportPostId: id,
            });
            console.log(response.data);
            // Thêm mã xử lý sau khi gọi API thành công tại đây
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div className="user_info_wrapper">
            <div className="user_info_header">
                <h1>Thông tin của người dùng Công Phan</h1>
                <a>
                    <i className="fas fa-times"></i>
                </a>
            </div>
            <ViewPostDetail />
            <div className="option_footer">
                <h1 className="text">Bạn hãy đưa ra các quyết định xử lý sau</h1>
                <div className="options">
                    <a
                        onClick={handleDisable}
                        style={{
                            backgroundColor: isDisabled ? '#ff8a80' : '#a5d6a7',
                            cursor: 'pointer',
                            color: isDisabled ? '#ffffff' : '#000000',
                        }}
                    >
                        <i className="fas fa-ban"></i>
                        <div>{isDisabled ? 'Vô hiệu hóa' : 'Kích hoạt'}</div>
                    </a>
                    <a onClick={handleSkip} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-forward"></i>
                        <div>Bỏ qua</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PostDetail_Report;
