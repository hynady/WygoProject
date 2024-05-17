import React, { useState, useEffect } from 'react';
import './UserInfoWrapper.css';
import Post from '../Post/Post'; // Import Post component
import axios from 'axios'; // Import axios for making HTTP requests
import {useNavigate} from "react-router-dom";
const PostInfoWrapper = ({ postDetail }) => {
    const [reportStatus, setReportStatus] = useState(null); // State to track report status

    // Function to handle disable click
    const handleDisableClick = async () => {
        try {
            // Call endpoint to change post status
            const response = await axios.post('https://wygo-ojzf.onrender.com/posts/status', {
                postId: postDetail.id // Pass post id to endpoint
            });
            // If request successful, update report status
            if (response.status === 200) {
                setReportStatus(!reportStatus);
            }
        } catch (error) {
            // Handle error
            console.error('Error changing post status:', error);
        }
    };

    useEffect(() => {
        // Fetch report status when component mounts
        const fetchReportStatus = async () => {
            try {
                const response = await axios.get(`https://wygo-ojzf.onrender.com/reports/post/${postDetail.id}/get-post-id`);
                setReportStatus(response.data); // Update report status
            } catch (error) {
                // Handle error
                console.error('Error fetching report status:', error);
            }
        };
        fetchReportStatus();
    }, [postDetail.id]); // Fetch status whenever postDetail.id changes

    return (
        <div className='user_info_wrapper'>
            <div className='user_info_header'>
                <h1>Thông tin của bài viết</h1>
                <a>
                    <i className="fas fa-times"></i>
                </a>
            </div>
            {/* Render Post component with postDetail */}
            <Post post={postDetail} />
            <div className='option_footer'>
                <h1 className='text'>Bạn hãy đưa ra các quyết định xử lý sau</h1>
                <div className='options'>
                    {/* Icon to disable post */}
                    <a className={`disable_button ${reportStatus ? 'red_button' : 'green_button'}`}
                       onClick={handleDisableClick}>
                        <i className={reportStatus ? 'fas fa-ban' : 'fas fa-check'}></i>
                        <div>{reportStatus ? 'Vô hiệu hóa' : 'Kích hoạt'}</div>
                    </a>
                    <a>
                        <i className="fas fa-forward"></i>
                        <div>Bỏ qua</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PostInfoWrapper;
