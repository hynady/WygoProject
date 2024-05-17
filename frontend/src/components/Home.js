import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {Link, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import Post from "./Post/Post";
import PostingInput from "./Post/PostingInput";
import Posting from "./Post/Posting";
import NavBar from "./NavBar/NavBar";

const Home = () => {

    const [isPostingInputVisible, setPostingInputVisible] = useState(false)

    const [contentVisible, setContentVisible] = useState(false);

    const [requestTime, setRequestTime] = useState([]);




    useEffect(() => {
        const currentDate = new Date();

// Lấy các thành phần thời gian từ đối tượng Date
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth()+1;
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const milliseconds = currentDate.getMilliseconds();

// Tạo dãy số từ các thành phần thời gian
        const timestampArray = [year, month, day, hours, minutes, seconds, milliseconds];

// Chuyển đổi dãy số thành chuỗi và lưu vào localStorage
        localStorage.setItem('lastTimePost', timestampArray.join(','));
        if (localStorage.getItem('loginState')!=='ok'){
            navigate('/');
        }
        const timeout = setTimeout(() => {
            setContentVisible(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);



    const currentTime = new Date();
    currentTime.setUTCHours(currentTime.getHours());
    currentTime.setUTCDate(currentTime.getDate()+1);
    currentTime.setUTCMonth(currentTime.getMonth());

    const formattedTime = currentTime.toISOString().slice(0, 19);

    const [favorList, setFavorList] = useState([]);
    const [favorPost, setFavorPost] = useState([]);

    const [hasPost, setHasPost] = useState(true);
    const [stack, setStack] = useState(0);
    const getFavorPost = () => {
        console.log('getMore');

        let formattedTimeString= localStorage.getItem('lastTimePost').slice(0, 19);
        if (!localStorage.getItem('lastTimePost').includes('T')){
            const timestampArray = localStorage.getItem('lastTimePost').split(',');

            const parsedArray = timestampArray.map(value => parseInt(value));
            console.log(parsedArray);
            const time = new Date(parsedArray[0], parsedArray[1] - 1, parsedArray[2], parsedArray[3], parsedArray[4], parsedArray[5], parsedArray[6]);
            time.setUTCHours(parsedArray[3]);
            time.setUTCMinutes(parsedArray[4]);
            time.setUTCSeconds(parsedArray[5]);
            time.setUTCDate(parsedArray[2]);
            formattedTimeString = time.toISOString().slice(0, 19);
        }

        if (requestTime.includes(formattedTimeString)){
            return;
        }
        setRequestTime(prevState => [...prevState, formattedTimeString])
        axios.get('https://wygo-ojzf.onrender.com/homepage/recommend-post/'+localStorage.getItem('username')+'/'+formattedTimeString)
            .then(response =>{
                if (response.data.length===0){
                    // setStack(stack+1);
                    // if (stack>5){
                    //     setHasPost(false);
                    // }
                    // return;
                    setHasPost(false);
                }
                setFavorPost(prevFavorPost => [...prevFavorPost, ...response.data]); // Cập nhật favorPost bằng cách kết hợp mảng cũ và mảng mới
                if (response.data.length > 0) {
                    const lastFavorPost = response.data.slice(-1)[0];
                    localStorage.setItem('lastTimePost', lastFavorPost.postTime);
                }
            });
    }
    useEffect(() =>{
        if (localStorage.getItem('username')!==null)
        {
            console.log('first'+formattedTime);
            axios.get('https://wygo-ojzf.onrender.com/homepage/recommend-user/'+localStorage.getItem('username'))
                .then(response =>{
                    setFavorList(response.data);
                });
            if (!requestTime.includes(formattedTime))
            {
                setRequestTime(prevState => [...prevState, formattedTime]);
                axios.get('https://wygo-ojzf.onrender.com/homepage/recommend-post/'+localStorage.getItem('username')+'/'+formattedTime)
                    .then(response =>{
                        setFavorPost(response.data);
                        console.log("get first data ok");
                        console.log(response.data.length);
                        if (response.data.length>0){
                            const lastFavorPost = response.data.slice(-1)[0];
                            localStorage.setItem('lastTimePost',lastFavorPost.postTime);
                            console.log("stored");
                        }
                    });
            }
        }
    },[])
    const navigate = useNavigate();
    const redirectToUserDetail = (username) => {
        navigate(`/profile/${username}`);
    }

    ///////////////////////////////////////////////////
    const [loading, setLoading] = useState(false);
    const observer = useRef(null);

    useEffect(() => {
        if (hasPost){
            const lastPostElement = document.querySelector('.last-post');
            if (!lastPostElement) return; //
            console.log("obs ok here");
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    console.log("in obs");
                    loadMorePosts();
                }
            });

            if (observer.current && !loading) {
                observer.current.observe(lastPostElement);
            }

            return () => {
                if (observer.current) {
                    observer.current.disconnect();
                }
            };
        }
    });



    const loadMorePosts = async () => {

        let formattedTimeString= localStorage.getItem('lastTimePost').slice(0, 19);
        if (!localStorage.getItem('lastTimePost').includes('T')){
            const timestampArray = localStorage.getItem('lastTimePost').split(',');

            const parsedArray = timestampArray.map(value => parseInt(value));
            console.log(parsedArray);
            const time = new Date(parsedArray[0], parsedArray[1] - 1, parsedArray[2], parsedArray[3], parsedArray[4], parsedArray[5], parsedArray[6]);
            time.setUTCHours(parsedArray[3]);
            time.setUTCMinutes(parsedArray[4]);
            time.setUTCSeconds(parsedArray[5]);
            time.setUTCDate(parsedArray[2]);
            formattedTimeString = time.toISOString().slice(0, 19);
        }

        if (requestTime.includes(formattedTimeString)){
            return;
        }


        setLoading(true);
        try {
            console.log("in try catch");
            getFavorPost();
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        } catch (error) {
            console.error('Error fetching more posts:', error);
        }
    };

    ///////////////////////////////////////////////////
    useEffect(() => {
        favorPost.forEach(post => {
            getPostData(post.id);
        });
    }, [favorPost]);

    const [id, setID ] =useState(0);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [reactionAuthors, setReactionAuthors] = useState(null);
    const [fromUser, setFromUser] = useState(null);
    const [toUser, setToUser] = useState(null);

    const getPostData = (id) => {
        setID(id);
        axios.post('https://wygo-ojzf.onrender.com/posts/detail',{
            postId : id
        })
            .then(response => {
                setPost(response.data)
                setToUser(response.data.author.username);
                setFromUser(localStorage.getItem('username'));
            })
        axios.get('https://wygo-ojzf.onrender.com/posts/'+id+'/comments')
            .then(response => {
                setComments(response.data);
            })
        axios.get('https://wygo-ojzf.onrender.com/reactions/'+id+'/getauthors')
            .then(response => {
                setReactionAuthors(response.data);
            })
    }
    ///////////////////////////////////////////////////

    return (
        <>
            {contentVisible && (
                <div>
                    <NavBar/>
                    <div style={{ display: 'flex', justifyContent:'center', backgroundColor:'#dddfe2' }}>
                        <div style={{ width: '50%', minHeight:"100vh",paddingRight:'10%', marginTop:'2rem' }}>
                            {/* Nội dung của phần bên trái */}
                            < Posting togglePostingInput={() => setPostingInputVisible(!isPostingInputVisible)} />
                            {isPostingInputVisible && (
                                <div className='posting_input_presenter'>
                                    <div className='posting_input_background '></div>
                                    <div className='posting_input'>
                                        <PostingInput togglePostingInput={() => setPostingInputVisible(!isPostingInputVisible)}/>
                                    </div>
                                </div>
                            )}
                            {favorPost && favorPost.map((post, index) => (
                                <div key={post.id} className={`${index === favorPost.length - 1 ? 'last-post' : ''}`}>
                                    <div style={{  width: '100%', marginTop: '2rem' }}>
                                        <div>
                                            <Post key={id}
                                                  post={post}
                                                  comments={null}
                                                  reactionAuthors={reactionAuthors}
                                                  fromUser={fromUser}
                                                  toUser={toUser} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {loading && <Typography variant="h6" gutterBottom fontWeight="bold"  style={{marginTop:"1rem", marginBottom:"1rem"}}>
                                Đang tải thêm bài viết...
                            </Typography>}
                            {!loading && !hasPost && (
                                <Typography variant="h6" gutterBottom fontWeight="bold"  style={{marginTop:"1rem", marginBottom:"1rem"}}>
                                    Bạn đã xem hết bài viết mới!
                                </Typography>
                            )}
                        </div>
                        <div style={{ width: '25%', backgroundColor: '#fff', height:'fit-content', marginTop:'2rem', borderRadius: '10px', padding:'0.5rem' }}>
                            {/* Nội dung của phần bên phải */}
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                Có thể bạn muốn xem
                            </Typography>
                            {favorList && favorList.map((report, index) => (
                                <div key={index} className='user_info' onClick={() => redirectToUserDetail(report.username)} style={{display:'flex', flexDirection:'row', alignItems:'center', marginLeft:'0.5rem', marginTop: '1rem', cursor: 'pointer'}}>
                                    <div className='user_info_avatar' style={{width:'3.3rem', height:'3.3rem'}}>
                                        <img src={report.avatar} alt="Avatar"></img>
                                    </div>
                                    <div>
                                        <h3 style={{margin:'0'}}>{report.name}</h3>
                                        <div >/{report.username}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default Home;