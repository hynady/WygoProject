import { useParams } from 'react-router-dom';
import Post from "./Post";
import './Post.css';
import './PostContainer.css'
import {useEffect, useState} from "react";
import axios from "axios";
import CommentForm from "../Comment/CommentForm";
import NavBar from "../NavBar/NavBar";
const ViewPostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [reactionAuthors, setReactionAuthors] = useState(null);
    const [fromUser, setFromUser] = useState(null);
    const [toUser, setToUser] = useState(null);

    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        axios.post('https://wygo-ojzf.onrender.com/posts/detail',{
            postId : id
        })
            .then(response => {
                console.log(response.data)
                setPost(response.data)
                setToUser(response.data.author.username);
                setFromUser(localStorage.getItem('username'));
            })
        axios.get('https://wygo-ojzf.onrender.com/posts/'+id+'/comments')
            .then(response => {
                console.log('cmt')
                setComments(response.data);
            })
        axios.get('https://wygo-ojzf.onrender.com/reactions/'+id+'/getauthors')
            .then(response => {
                console.log('react')
                setReactionAuthors(response.data);
            })
        const timeout = setTimeout(() => {
            setContentVisible(true);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);
    return (
        <>
            <NavBar></NavBar>
            <>
                {contentVisible && (
                    <div style={{ display: 'flex',  justifyContent: 'center', width: '100%', marginTop: '2rem' }}>
                        <div className='post_container_modifier'>
                            <Post key={id}
                                  post={post}
                                  comments={comments}
                                  reactionAuthors={reactionAuthors}
                                  fromUser={fromUser}
                                  toUser={toUser} />
                            <CommentForm post={id}></CommentForm>
                        </div>
                    </div>
                )}
            </>
        </>

    );
}
export default ViewPostDetail