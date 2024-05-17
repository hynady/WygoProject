import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import './Post.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ReportPost from "../Report/ReportPost";
import {useNavigate} from "react-router-dom";



const Post = (props) => {
    const { post, comments, reactionAuthors, fromUser, toUser } = props;
    function formatDate(dateString) {
        const date = new Date(dateString);

        // Check if date is valid
        if (isNaN(date)) {
            return 'Invalid date';
        }

        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const year = date.getFullYear();

        // Construct the formatted date string
        const formattedDate = `${day} tháng ${month}, ${year}`;

        return formattedDate;
    }

    const formattedDate = formatDate(post.postTime);

    const [commentsFetched, setCommentsFetched] = useState(false);
    const [hasReacted, setHasReacted] = useState(reactionAuthors && reactionAuthors.includes(fromUser));
    const [showMap, setShowMap] = useState(false);
    const [showReport, setShowReport] = useState(false); // State for showing the ReportPost component
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    useEffect(() => {
        if (comments && comments.length > 0) {
            setCommentsFetched(true);
        }
    }, [comments]);

    useEffect(() => {
        if (showMap && mapContainerRef.current && post.location) {
            const [latitude, longitude] = post.location.split(',').map(parseFloat);
            mapRef.current = L.map(mapContainerRef.current).setView([latitude, longitude], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(mapRef.current);
            L.marker([latitude, longitude]).addTo(mapRef.current)
                .bindPopup(post.location)
                .openPopup();
        }
    }, [showMap, post.location]);

    const handleReactClick = async () => {
        try {
            const response = await fetch('https://wygo-ojzf.onrender.com/reactions/react', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    author: fromUser,
                    post: post.id,
                }),
            });
            if (response.ok) {
                console.log('Reacted successfully');
                setHasReacted(prevState => !prevState); // Toggle hasReacted state
            } else {
                console.error('Failed to react:', response.statusText);
            }
        } catch (error) {
            console.error('Error while reacting:', error);
        }
    };

    const handleReportClick = () => {
        setShowReport(true);
    };

    const handleCloseReport = () => {
        setShowReport(false);
    };

    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate(`/profile/${post.author.username}`);
    };

    const handleCommentClick = () => {
        navigate(`/posts/${post.id}`);
    };

    return (
        <div className='post_container'>
            <div className='post_header'>
                <div className='mini_avatar' onClick={handleImageClick}>
                    <img src={post.author.avatar} alt='Avatar' ></img>
                </div>
                <div className='post_header_info'>
                    <h4>{post.author.name}</h4>
                    <div>{formattedDate}</div>
                    <a
                        className='post_header_info_location'
                        href={`https://www.google.com/maps/search/?api=1&query=${post.location}`}
                        onMouseEnter={() => setShowMap(true)}
                        onMouseLeave={() => setShowMap(false)}
                    >
                        <i className="fas fa-map-marker-alt"></i>
                        <div>{post.location}</div>
                    </a>
                </div>
                {fromUser !== toUser && (
                    <div style={{cursor:'pointer'}} className='post_more_button'>
                        <i style={{color:"red"}} className="fas fa-flag" onClick={handleReportClick}></i>
                    </div>
                )}
            </div>
            {showMap && (
                <MapContainer className={'map_hover'} center={post.location.split(',').map(parseFloat)} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                    />
                    {post.location && (
                        <Marker position={post.location.split(',').map(parseFloat)}>
                            <Popup>{post.location}</Popup>
                        </Marker>
                    )}
                </MapContainer>
            )}
            <div className='post_content'>
                {post.content}
            </div>
            {post.media && (
                <div className='post_media'>
                    {post.media.startsWith('https://firebasestorage.googleapis.com/') ? (
                        (post.media.includes('.mp4') || post.media.includes('.mov') || post.media.includes('.avi') || post.media.includes('.wmv')) ? (
                            <video controls style={{width: '100%', height: '100%'}}>
                                <source src={post.media} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            (post.media.includes('.png') || post.media.includes('.jpg') || post.media.includes('.jpeg') || post.media.includes('.gif')) ? (
                                <img src={post.media} style={{width: 'auto', height: 'auto'}} alt='Media'></img>
                            ) : (
                                <iframe title="Media" src={post.media} style={{width: '100%', height: '100%'}}></iframe>
                            )
                        )
                    ) : (
                        <img src={post.media} alt='Media'></img>
                    )}
                </div>
            )}
            <div className='posting_breakline'></div>
            <div className='post_option_buttons'>
                <a style={{ cursor: 'pointer' }} className={`post_option_button ${hasReacted ? 'reacted' : ''}`} onClick={handleReactClick}>
                    <i className="far fa-heart"></i>
                    <div>React</div>
                </a>
                <div className='post_option_button' onClick={handleCommentClick}>
                    <i className="far fa-comment"></i>
                    <div>Bình luận</div>
                </div>
            </div>
            <div className='posting_breakline'></div>
            {commentsFetched && comments && comments.map(comment => (
                <div key={comment.id} className='post_comment'>
                    <div className='mini_avatar'>
                        <img src='https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg' alt='Avatar'></img>
                    </div>
                    <div className='comment_info'>
                        <h4>{comment.authorName}</h4>
                        <div>{comment.content}</div>
                    </div>
                </div>
            ))}
            {showReport && <ReportPost postId={post.id} onClose={handleCloseReport} />}
        </div>
    );
}

export default Post;
