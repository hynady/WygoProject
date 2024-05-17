import './UserInfoWrapper.css';
import PersonalPage from "../Profile/PersonalPage";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserInfoWrapper = () => {
    const { username } = useParams();
    const [reportStatus, setReportStatus] = useState(null);

    useEffect(() => {
        // Fetch initial user status when component mounts
        fetchUserStatus();
    }, []);

    const fetchUserStatus = async () => {
        try {
            // Fetch user status from backend
            const response = await axios.post('https://wygo-ojzf.onrender.com/users/status', { username });

            // Set initial report status based on backend response
            setReportStatus(response.data.status === 'disabled');
        } catch (error) {
            console.error('Error fetching user status:', error);
        }
    };

    const handleDisableClick = async () => {
        try {
            // Send POST request to change user status
            const response = await axios.post('https://wygo-ojzf.onrender.com/users/status', { username });

            // If successful, toggle report status
            if (response.status === 200) {
                setReportStatus(prevStatus => !prevStatus);
            }
        } catch (error) {
            console.error('Error changing user status:', error);
        }
    };

    return (
        <div className='user_info_wrapper'>
            <div className='user_info_header'>
                <h1>Thông tin của người dùng {username}</h1>
                <a>
                    <i className="fas fa-times"></i>
                </a>
            </div>
            <PersonalPage />
            <div className='option_footer'>
                <h1 className='text'>Bạn hãy đưa ra các quyết định xử lý sau</h1>
                <div className='options'>
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
    )
}

export default UserInfoWrapper;
