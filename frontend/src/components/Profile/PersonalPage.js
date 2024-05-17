import { useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import Posting from "../Post/Posting";
import Post from "../Post/Post";
import PostingInput from "../Post/PostingInput";
import './PersonalPage.css'
import NavBar from "../NavBar/NavBar";
import ReportPost from "../Report/ReportPost";
import ReportUser from "../Report/ReportUserForm";
import ReportUserForm from "../Report/ReportUserForm";

const PersonalPage = () =>
{
    const {username} = useParams();

    const [userData, setUserData] = useState('');
    const [commentList, setCommentList] = useState('')
    const [activeTab, setActiveTab] = useState('posts');
    const [isPostingInputVisible, setPostingInputVisible] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [fromUser, setFromUser] = useState(localStorage.getItem("username"));
    const [toUser, setToUser] = useState(username);

    const [hasUpvoted, setHasUpvoted] = useState(false);
    const [hasDownvoted, setHasDownvoted] = useState(false);
    const fetchUserData = async () => {
        try {
            const response = await fetch(`https://wygo-ojzf.onrender.com/profile/${toUser}`);
            if (response.ok) {
                const data = await response.json();
                await Promise.all(data.posts.map(async (post) => {
                    const dateObject = new Date(post.postTime[0], post.postTime[1] - 1, post.postTime[2], post.postTime[3], post.postTime[4], post.postTime[5], post.postTime[6]);
                    const day = String(dateObject.getDate()).padStart(2, '0');
                    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
                    const year = dateObject.getFullYear();
                    post.formattedDate = `${day} tháng ${month}, ${year}`;
                    const commentResponse = await fetch(`https://wygo-ojzf.onrender.com/posts/${post.id}/comments`);
                    if (commentResponse.ok) {
                        const commentData = await commentResponse.json();
                        post.comments = commentData;
                    }
                    const reactionAuthorsResponse = await fetch(`https://wygo-ojzf.onrender.com/reactions/${post.id}/getauthors`);
                    if (reactionAuthorsResponse.ok) {
                        const reactionAuthors = await reactionAuthorsResponse.json();
                        post.reactionAuthors = reactionAuthors;
                    }
                }));
                setUserData(data);
                // Set a separate state to indicate that comments are fetched
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchUpvoteStatus = async () => {
        try {
            const response = await fetch(`https://wygo-ojzf.onrender.com/users/hasUpvoted/${fromUser}/${toUser}`);
            if (response.ok) {
                const data = await response.json();
                setHasUpvoted(data);
            } else {
                throw new Error('Failed to fetch upvote status');
            }
        } catch (error) {
            console.error('Error fetching upvote status:', error);
        }
    }

    const fetchDownvoteStatus = async () => {
        try {
            const response = await fetch(`https://wygo-ojzf.onrender.com/users/hasDownvoted/${fromUser}/${toUser}`);
            if (response.ok) {
                const data = await response.json();
                setHasDownvoted(data);
            } else {
                throw new Error('Failed to fetch downvote status');
            }
        } catch (error) {
            console.error('Error fetching downvote status:', error);
        }
    }

    const [favorDisfavorData, setFavorDisfavorData] = useState(null);

    // Fetch favor and disfavor lists
    const fetchFavorDisfavorLists = async () => {
        try {
            const favorDisfavorResponse = await fetch(`https://wygo-ojzf.onrender.com/profile/getfavordisfavor/${toUser}`);
            if (favorDisfavorResponse.ok) {
                const favorDisfavorData = await favorDisfavorResponse.json();
                setFavorDisfavorData(favorDisfavorData);
            } else {
                throw new Error('Failed to fetch favor and disfavor lists');
            }
        } catch (error) {
            console.error('Error fetching favor and disfavor lists:', error);
        }
    };
    const handleReportClick = () => {
        setShowReport(true);
    };

    const handleCloseReport = () => {
        setShowReport(false);
    };

    useEffect(() => {
        fetchFavorDisfavorLists();
    }, []);

    useEffect(() => {
        fetchUserData();
        fetchUpvoteStatus();
        fetchDownvoteStatus();
        fetchFavorDisfavorLists();
    }, [isPostingInputVisible]);


    const handleUpvoteClick = async () => {
        try {
            const response = await fetch('https://wygo-ojzf.onrender.com/users/upvote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    targetUsername: toUser,
                    authorUsername: fromUser,
                }),
            });
            if (response.ok) {
                console.log('Upvoted successfully');
                fetchUserData();
                setHasUpvoted(!hasUpvoted);
            } else {
                console.error('Failed to upvote:', response.statusText);
            }
        } catch (error) {
            console.error('Error while upvoting:', error);
        }
    };

    const handleDownvoteClick = async () => {
        try {
            const response = await fetch('https://wygo-ojzf.onrender.com/downvote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    targetUsername: toUser,
                    authorUsername: fromUser,
                }),
            });
            if (response.ok) {
                console.log('Downvoted successfully');
                fetchUserData();
                setHasDownvoted(!hasDownvoted);
            } else {
                console.error('Failed to downvote:', response.statusText);
            }
        } catch (error) {
            console.error('Error while downvoting:', error);
        }
    };

    return (
        <div>
            <NavBar></NavBar>
            <div className='supercontainer'>
                <div className="header_section">
                    <div className="background_container">
                    </div>
                    <div className='profile_container'>
                        <div className='avatar'>
                            <img src={userData?.user?.avatar ?? ''}/>
                        </div>
                        <div className='profile_info'>
                            <h1>{userData?.user?.name ?? ''}</h1>
                            {userData && (<div>
                                /{userData?.user?.username ?? ''}
                            </div>)}
                            <div className='favor'>
                                <i className='fas fa-arrow-alt-circle-up' style={{color: 'green'}}></i>
                                {userData?.user?.befavoredListSize ?? ''}
                                <i className='fas fa-arrow-alt-circle-down' style={{color: 'red'}}></i>
                                {userData?.user?.bedisfavoredListSize ?? ''}
                            </div>
                        </div>
                        {fromUser !== toUser && (
                            <div className='edit_profile'>
                                {(!hasUpvoted && !hasDownvoted) && (
                                    <>
                                        <a style={{cursor: 'pointer'}} onClick={handleUpvoteClick}>
                                            <i className={`fas fa-arrow-alt-circle-up not_updownvoted`}></i>
                                            <div>Upvote</div>
                                        </a>
                                        <a style={{cursor: 'pointer'}} onClick={handleDownvoteClick}>
                                            <i className={`fas fa-arrow-alt-circle-down not_updownvoted`}></i>
                                            <div>Downvote</div>
                                        </a>
                                    </>
                                )}
                                {hasUpvoted && (
                                    <>
                                        <a style={{cursor: 'pointer'}} onClick={handleUpvoteClick}>
                                            <i className={`fas fa-arrow-alt-circle-up upvoted`}></i>
                                            <div>Upvoted</div>
                                        </a>
                                        <a style={{cursor: 'not-allowed'}}>
                                            <i className={`fas fa-arrow-alt-circle-down not_updownvoted`}></i>
                                            <div>Downvoted</div>
                                        </a>
                                    </>
                                )}
                                {hasDownvoted && (
                                    <>
                                        <a style={{cursor: 'not-allowed'}}>
                                            <i className={`fas fa-arrow-alt-circle-up not_updownvoted`}></i>
                                            <div>Upvoted</div>
                                        </a>
                                        <a style={{cursor: 'pointer'}} onClick={handleDownvoteClick}>
                                            <i className={`fas fa-arrow-alt-circle-down downvoted`}></i>
                                            <div>Downvoted</div>
                                        </a>
                                    </>
                                )}
                                <a style={{cursor: 'pointer'}} onClick={handleReportClick}>
                                    <i style={{color: "red"}} className="fas fa-ban" ></i>
                                    <div>Report</div>
                                </a>
                            </div>
                        )}
                    </div>
                    <div className='breakline'>

                    </div>
                    {toUser !== fromUser && (
                        <div className='profile_tabs'>
                            <div style={{cursor: 'pointer'}} onClick={() => setActiveTab('posts')}>Bài viết</div>
                        </div>
                    )}
                    {toUser === fromUser && (
                        <div className='profile_tabs'>
                            <div style={{cursor: 'pointer'}} onClick={() => setActiveTab('posts')}>Bài viết</div>
                            <div style={{cursor: 'pointer'}} onClick={() => setActiveTab('Favor')}>Favor</div>
                            <div style={{cursor: 'pointer'}} onClick={() => setActiveTab('Befavored')}>Befavored</div>
                            <div style={{cursor: 'pointer'}} onClick={() => setActiveTab('Disfavor')}>Disfavor</div>
                        </div>
                    )}
                </div>
                <div className='content_section'>
                    {activeTab === 'posts' && (
                        <div className='post_and_posting_tab'>
                            <div className='introduce'>
                                <h2>
                                    Giới thiệu
                                </h2>
                                <div className='bio'>{userData?.user?.bio ?? ''}</div>
                                <div className='text'>
                                    <i className="fas fa-home"> </i>
                                    <div>{userData?.user?.hometown ?? ''}</div>
                                </div>
                                <div className='text'>
                                    <i className="fas fa-venus"></i>
                                    <div>{userData?.user?.gender ?? ''}</div>
                                </div>
                            </div>
                            <div className='post_and_posting'>
                                {fromUser === toUser && (
                                    <Posting togglePostingInput={() => setPostingInputVisible(!isPostingInputVisible)}/>
                                )}
                                {userData && userData.posts && userData.posts.filter(post => post.available).map(post => (
                                    <Post key={post.id} post={post} comments={post.comments}
                                          reactionAuthors={post.reactionAuthors} fromUser={fromUser} toUser={toUser}/>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab !== 'posts' && (
                        <div className='updownvote_tab'>
                            <h2>{activeTab}</h2>
                            <div className='updownvote_content'>
                                {activeTab === 'Favor' && (
                                    <>
                                        {favorDisfavorData.favorList.map((user, index) => (
                                            <div key={index} className='updownvote_card'>
                                                <div className='updownvote_avatar'>
                                                    <img src={user.avatar} alt={user.username}/>
                                                </div>
                                                <div className='updownvote_info'>
                                                    <div className='updownvote_name'>{user.name}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {activeTab === 'Befavored' && (
                                    <>
                                        {favorDisfavorData.befavorList.map((user, index) => (
                                            <div key={index} className='updownvote_card'>
                                                <div className='updownvote_avatar'>
                                                    <img src={user.avatar} alt={user.username}/>
                                                </div>
                                                <div className='updownvote_info'>
                                                    <div className='updownvote_name'>{user.name}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {activeTab === 'Disfavor' && (
                                    <>
                                        {favorDisfavorData.disfavorList.map((user, index) => (
                                            <div key={index} className='updownvote_card'>
                                                <div className='updownvote_avatar'>
                                                    <img src={user.avatar} alt={user.username}/>
                                                </div>
                                                <div className='updownvote_info'>
                                                    <div className='updownvote_name'>{user.name}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {isPostingInputVisible && (
                    <div className='posting_input_presenter'>
                        <div className='posting_input_background '></div>
                        <div className='posting_input'>
                            <PostingInput togglePostingInput={() => setPostingInputVisible(!isPostingInputVisible)}/>
                        </div>
                    </div>
                )}
                {showReport && <ReportUserForm username={userData.user.username}  onClose={handleCloseReport} />}
            </div>
        </div>
    )
}

export default PersonalPage