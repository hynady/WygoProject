import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserActivation = () => {
    const [isActive, setIsActive] = useState(false);
    const userId = 1; // Mặc định là user có id = 2

    useEffect(() => {
        // Lấy trạng thái kích hoạt hiện tại của người dùng từ server
        axios.get(`https://wygo-ojzf.onrender.com/users/id/${userId}`)
            .then(response => setIsActive(response.data.available))
            .catch(error => console.error('Error during fetch', error));
    }, [userId]);

    const toggleActivation = () => {
        const url =`https://wygo-ojzf.onrender.com/users/${userId}/${isActive ? 'disable' : 'enable'}`;
        axios.post(url)
            .then(response => setIsActive(response.data.available))
            .catch(error => console.error('Error during activation', error));
    };

    return (
        <div>
            <label>
                <input type="checkbox" checked={isActive} onChange={toggleActivation} />
                Kích hoạt người dùng
            </label>
        </div>
    );
};

export default UserActivation;
