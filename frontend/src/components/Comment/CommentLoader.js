import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

const CommentList = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('https://wygo-ojzf.onrender.com/posts/2/comments'); // Adjust URL as needed
                setComments(response.data.map(comment => ({
                    ...comment,
                    showFullContent: false // Thêm trường showFullContent để xác định xem nội dung có được hiển thị đầy đủ hay không
                })));
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, []);

    const handleReadMoreClick = (index) => {
        setComments(prevComments => {
            const updatedComments = [...prevComments];
            updatedComments[index] = {
                ...updatedComments[index],
                showFullContent: true // Cập nhật trạng thái của comment tương ứng để hiển thị nội dung đầy đủ
            };
            return updatedComments;
        });
    };

    return (
        <div className="post_container">
            {comments.map((comment, index) => (
                <StyledComment key={comment.id}>
                    <Avatar>
                        <img src={comment.avatar} alt="Avatar" />
                    </Avatar>
                    <CommentContent>
                        <div>
                            <AuthorName>{comment.authorName}</AuthorName>
                        </div>
                        <Content>
                            {comment.showFullContent ? (
                                comment.content
                            ) : (
                                <>
                                    {comment.content.length > 30 ? (
                                        <>
                                            {comment.content.slice(0, 30)}...
                                            <ReadMoreButton onClick={() => handleReadMoreClick(index)}> Xem thêm </ReadMoreButton>
                                        </>
                                    ) : (
                                        comment.content
                                    )}
                                </>
                            )}
                        </Content>
                    </CommentContent>
                </StyledComment>
            ))}
        </div>
    );
};

const StyledComment = styled.div`
    display: flex;
    align-items: flex-start; /* Căn lên trên */
    margin-bottom: 20px;
`;

const Avatar = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 10px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`;

const CommentContent = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #E6E6E6; /* Màu khác cho hình chữ nhật */
    border-radius: 13px; /* Bo tròn hình chữ nhật */
    padding: 10px;
`;

const AuthorName = styled.h4`
    font-size: 16px;
    font-weight: bold;
    margin-top: 0px;
    margin-bottom: 9px;
`;

const Content = styled.div`
    font-size: 14px;
`;

const ReadMoreButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: blue;
    font-size: 14px;
    font-weight: bold;
`;

export default CommentList;
