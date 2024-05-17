import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import PostInfoWrapper from "./PostInfoWrapper"; // Import UserInfoWrapper component

const ViewPostReport = () => {
    const { id } = useParams();// Receive reportPostId as props
    const [postDetail, setPostDetail] = useState(null);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await axios.get(`https://wygo-ojzf.onrender.com/reports/post/${id}/get-post-id`);
                const postId = response.data; // Get postId from API response
                const postDetailResponse = await axios.post(`https://wygo-ojzf.onrender.com/posts/detail`, { postId });
                setPostDetail(postDetailResponse.data);
            } catch (error) {
                console.error('Error fetching post detail:', error);
            }
        };

        fetchPostDetail();
    }, [id]);

    if (!postDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Display post detail using UserInfoWrapper or any other component */}
            <PostInfoWrapper postDetail={postDetail} />
        </div>
    );
};

export default ViewPostReport;
