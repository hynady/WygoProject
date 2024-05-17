    import React, { useState, useEffect } from 'react';
    import axios, {post} from 'axios';
    import { Typography, Grid } from '@mui/material';
    import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
    import '../Post/Post.css';
    import {useNavigate} from "react-router-dom";

    // Avatar mặc định cho trường hợp avatar trống
    const defaultAvatar = 'https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg';

    // Hàm helper để kiểm tra và trả về tên người dùng
    const getUserName = (user) => {
        return user.name || "Người dùng";
    };



    const SearchResult = ({ query }) => {
        const [results, setResults] = useState({ users: [], posts: [] });
        const [scrollLeft, setScrollLeft] = useState(0);

        useEffect(() => {
            const search = async () => {
                try {
                    const response = await axios.get(`https://wygo-ojzf.onrender.com/search?query=${query}`);
                    const formattedPosts = response.data.posts.map(post => {
                        const dateObject = new Date(post.formattedDate);
                        const day = String(dateObject.getDate()).padStart(2, '0');
                        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
                        const year = dateObject.getFullYear();
                        post.formattedDate = `${day} tháng ${month}, ${year}`;
                        return post;
                    });
                    setResults({ posts: formattedPosts, users: response.data.users });
                } catch (error) {
                    console.error('Error during search', error);
                }
            };

            search();
        }, [query]);

        const navigate = useNavigate();

        const handleCard = (username) => {
            navigate(`/profile/${username}`);
        };

        const handlePostClick = (id) => {
            navigate(`/posts/${id}`);
        };

        const handleScroll = (scrollOffset) => {
            const container = document.getElementById('userContainer');
            if (container) {
                const newScrollLeft = Math.min(Math.max(scrollLeft + scrollOffset * container.clientWidth, 0), container.scrollWidth - container.clientWidth);
                container.scrollTo({
                    left: newScrollLeft,
                    behavior: 'smooth'
                });
                setScrollLeft(newScrollLeft);
            }
        };
        return (
            <div style={{paddingLeft: '1rem', paddingRight: '1rem', width: '90rem'}}>
                <Typography variant="h6" component="h2">
                    Users
                </Typography>
                <div className="user_scroll_container">
                    <ArrowBackIos className="scroll_button_left" onClick={() => handleScroll(-100)} />
                    <div id="userContainer" className="user_list_container" >
                        {results.users.map(user => (
                            <div key={user.id} className="user_card" onClick={() => handleCard(user.username)}>
                                <img src={user.avatar || defaultAvatar} alt={getUserName(user)} className="user_avatar" />
                                <div className="user_name">{getUserName(user)}</div>
                                <div className="user_username">{user.username}</div>
                            </div>
                        ))}
                    </div>
                    <ArrowForwardIos className="scroll_button_right" onClick={() => handleScroll(100)} />
                </div>
                <Typography variant="h6" component="h2">
                    Posts
                </Typography>
                <Grid container spacing={3}>
                    {results.posts.map(post => (
                        <Grid item xs={12} key={post.id}>
                        <div>
                            <div className='post_container' onClick={() => handlePostClick(post.id)}>
                                <div className='post_header'>
                                    <div className='mini_avatar'>
                                        <img src={post.author.avatar || defaultAvatar} alt='Avatar' />
                                    </div>
                                    <div className='post_header_info'>
                                        <h4>{getUserName(post.author)}</h4>
                                        <div>{post.formattedDate}</div>
                                    </div>
                                    <div className='post_more_button'>
                                        <i className="fas fa-ellipsis-h"></i>
                                    </div>
                                </div>
                                <div className='post_content'>
                                    {post.content}
                                </div>
                            </div>
                        </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    };

    export default SearchResult;
