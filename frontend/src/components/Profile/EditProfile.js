import React, {useEffect, useState} from 'react';
import './EditProfile.css'
import {Avatar, Box, Button, Container, Grid, IconButton, Paper, Snackbar, TextField, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Close as CloseIcon, Edit as EditIcon} from '@mui/icons-material';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref as storageRef, uploadBytesResumable} from "firebase/storage";
import NavBar from "../NavBar/NavBar";


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '1rem',
        backgroundColor: '#e9ebee',
    },
    avatarContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: '10rem',
        height: '10rem',
        marginBottom: '1rem',
    },
    bio: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    paper: {
        padding: '1.5rem',
    },
    infoContainer: {
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
    },
    infoText: {
        marginRight: '1rem',
        minWidth: '100px',
    },
}));

const EditProfile = () => {
    const classes = useStyles();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [username, setUserName] = useState(localStorage.getItem('username'));

    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('loginState')!=='ok'){
            navigate('/');
        }
    })

    const [userTempData, setUserTempData] = useState({
        name: '',
        birth: '',
        address: '',
        gender: '',
        username: '',
        password: '',
        email: '',
        avatar: '',
        bio: '',
    });

    const [editMode, setEditMode] = useState({
        fullName: false,
        birthday: false,
        address: false,
        gender: false,
        username: false,
        password: false,
        email: false,
        bio: false,
        otp: false,
        fake: false,
    });

    const handleEditClick = (field) => {
        setEditMode((prevState) => ({
            ...prevState,
            [field]: true,
        }));
    };

    const handleCancelClick = (field) => {
        setUserTempData(userData);
        setEditMode((prevState) => ({
            ...prevState,
            [field]: false,
        }));
    };

    const handleUpdateClick = (username, changeType, newInfo, field) => {
        if (changeType==='password'){
            if (userData.password!==currentPassword){
                setOpenSnackbar(true);
                setSnackbarMessage("Mật khẩu hiện tại không đúng!");
                setSnackbarColor('error');
                return;
            }
        }
        if (changeType==='email'){
            axios.post('https://wygo-ojzf.onrender.com/verifyOTP', {
                email: userData.email,
                otp: userTempData.otp,
            })
                .then(response => {
                    axios.post('https://wygo-ojzf.onrender.com/users/change-info', {
                        username: username,
                        changeType: changeType,
                        newInfo: newInfo,
                    })
                        .then(response => {
                            setOpenSnackbar(true);
                            setSnackbarMessage(response.data);
                            setSnackbarColor('success');
                            if (changeType !== 'birth')
                                setUserData((prevData) => ({ ...prevData, [changeType]: newInfo }));
                            else
                                setUserData((prevData) => ({ ...prevData, [changeType]: userTempData.birth }));
                        })
                        .catch(error => {
                            setOpenSnackbar(true);
                            setSnackbarMessage(error.response.data);
                            setSnackbarColor('error');
                        });
                    setEditMode((prevState) => ({
                        ...prevState,
                        [field]: false,
                    }));
                })
                .catch(error => {
                    setOpenSnackbar(true);
                    setSnackbarMessage(error.response.data);
                    setSnackbarColor('error');
                });
        }
        if (changeType!=='email'){
            axios.post('https://wygo-ojzf.onrender.com/users/change-info', {
                username: username,
                changeType: changeType,
                newInfo: newInfo,
            })
                .then(response => {
                    if (changeType==='name'){
                        localStorage.setItem('name', newInfo);
                    }
                    setOpenSnackbar(true);
                    setSnackbarMessage(response.data);
                    setSnackbarColor('success');
                    if (changeType !== 'birth')
                        setUserData((prevData) => ({ ...prevData, [changeType]: newInfo }));
                    else
                        setUserData((prevData) => ({ ...prevData, [changeType]: userTempData.birth }));
                })
                .catch(error => {
                    setOpenSnackbar(true);
                    setSnackbarMessage(error.response.data);
                    setSnackbarColor('error');
                });
            setEditMode((prevState) => ({
                ...prevState,
                [field]: false,
            }));
        }
    };

    const handleSendEmailClick = () => {
        axios.post('https://wygo-ojzf.onrender.com/sendOTP', {
            email: userData.email,
            otp: '',
        })
            .then(response => {
                setOpenSnackbar(true);
                setSnackbarMessage("Vui lòng kiểm tra OTP đã được gửi qua email!");
                setSnackbarColor('success');
            })
            .catch(error => {
                setOpenSnackbar(true);
                setSnackbarMessage("Có lỗi đã xảy ra!");
                setSnackbarColor('error');
            });
        setEditMode({ ...editMode, email: false, otp: true });
    };

    const setSnackbarColor = (color) => {
        setColor(color);
    };
    const [snackbarColor, setColor] = useState('success');

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        birth: '',
        address: '',
        avatar: '',
        gender: '',
        bio: '',
    });
    useEffect(() => {
        axios.get('https://wygo-ojzf.onrender.com/users/'+username)
            .then(response => {
                const { user } = response.data;
                setUserData({
                    username: user.username,
                    password: user.password,
                    name: user.name,
                    email: response.data.email,
                    birth: user.birth,
                    address: user.hometown,
                    avatar: user.avatar,
                    gender: user.gender,
                    bio: user.bio,
                });
                setUserTempData({
                    username: user.username,
                    password: user.password,
                    name: user.name,
                    email: response.data.email,
                    birth: user.birth,
                    address: user.hometown,
                    avatar: user.avatar,
                    gender: user.gender,
                    bio: user.bio,
                });
            })
            .catch(error => {
                setOpenSnackbar(true);
                setSnackbarMessage(error.response.data);
            });
    }, []);

    const firebaseConfig = {
        apiKey : "AIzaSyDzVEplqgnutPKvGohdq-OVD1pyyPQYHWE" ,
        authDomain : "wygofirebase.firebaseapp.com" ,
        databaseURL : "https://wygofirebase-default-rtdb.firebaseio.com" ,
        projectId : "wygofirebase" ,
        storageBucket : "wygofirebase.appspot.com" ,
        messagingSenderId : "116194002232" ,
        appId : "1:116194002232:web:3e27fdef9a117e0de0adcd"
    };
    const app = initializeApp(firebaseConfig);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const handleUploadAvatar = (event) => {
        const file = event.target.files[0];
        setSelectedMedia(file);
    };
    useEffect(() => {
        if (app) {
            console.log(selectedMedia);
            try {
                if (selectedMedia) {
                    console.log("in2");
                    const storage = getStorage(app);
                    const storageReference = storageRef(storage, 'media/' + selectedMedia.name);
                    const uploadTask = uploadBytesResumable(storageReference, selectedMedia);

                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                        },
                        (error) => {
                            console.error('Error uploading media:', error);
                        },
                        async () => {
                            try {
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                localStorage.setItem('avatar', downloadURL);
                                console.log(downloadURL);
                                handleUpdateClick(username, 'avatar', downloadURL, 'fake');
                                //setUserTempData({avatar : downloadURL});
                                //setUserData({avatar: downloadURL});
                            } catch (error) {
                                console.error('Error sending post data:', error);
                            }
                        }
                    );
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }, [selectedMedia])

    return (
        <div>
            <NavBar/>
            <Container className={classes.root}>
                <Grid container spacing={4}>
                    {/* Left Section */}
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            <div className={classes.avatarContainer}>
                                <Avatar className={classes.avatar} src={userData.avatar} style={{ width: '10rem', height: '10rem' }} />
                                <input
                                    id='file-upload'
                                    type='file'
                                    accept='image/*,video/*'
                                    onChange={handleUploadAvatar}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="file-upload">
                                    <IconButton component="span">
                                        <CloudUploadIcon />
                                    </IconButton>
                                </label>
                                {editMode.bio ? (
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        placeholder="Bio"
                                        value={userTempData.bio}
                                        onChange={(e, preData) => setUserTempData({...preData, bio : e.target.value})}
                                    />
                                ) : (
                                    <Typography variant="subtitle1" className={classes.bio}>
                                        {userData.bio}
                                    </Typography>
                                )}
                                {editMode.bio ? (
                                    <div style={{ display: 'flex' }}>
                                        <Button variant="outlined" onClick={() => handleUpdateClick(username, 'bio', userTempData.bio, 'bio')} style={{ marginRight: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            Cập Nhật
                                        </Button>
                                        <Button variant="outlined" onClick={() => handleCancelClick('bio')} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            Hủy
                                        </Button>
                                    </div>
                                ) : (
                                    <IconButton onClick={() => handleEditClick('bio')}><EditIcon /></IconButton>
                                )}
                            </div>
                        </Paper>
                    </Grid>

                    {/* Right Section */}
                    <Grid item xs={12} md={8}>
                        <Paper className={classes.paper}>
                            {/* User Information */}
                            <Typography variant="h6" gutterBottom>
                                Thông Tin Người Dùng
                            </Typography>
                            <div className={classes.infoContainer} style={{marginLeft:"1rem"}}>
                                <Typography variant="body1" className={classes.infoText}>Họ và Tên:</Typography>
                                <div style={{ flexGrow: 1 }}>
                                    {editMode.fullName ? (
                                        <TextField value={userTempData.name} fullWidth margin="normal"
                                                   onChange={(e, preData) => setUserTempData({...preData, name : e.target.value})}/>
                                    ) : (
                                        <Typography variant="body1">{userData.name}</Typography>
                                    )}
                                </div>
                                {editMode.fullName ? (
                                    <>
                                        <Button onClick={() => handleUpdateClick(username, 'name', userTempData.name, 'fullName')}>Cập Nhật</Button>
                                        <Button onClick={() => handleCancelClick('fullName')}>Hủy</Button>
                                    </>
                                ) : (
                                    <IconButton onClick={() => handleEditClick('fullName')}><EditIcon /></IconButton>
                                )}
                            </div>

                            {/* Birthday */}
                            <div className={classes.infoContainer} style={{marginLeft:"1rem"}}>
                                <Typography variant="body1" className={classes.infoText}>Ngày Sinh:</Typography>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {editMode.birthday ? (
                                        <>
                                            <TextField type="number" value={new Date(userTempData.birth).getDate()} margin="normal" style={{ marginRight: '10px' }}
                                                       onChange={(e) => setUserTempData({ ...userTempData, birth: new Date(userTempData.birth).setDate(parseInt(e.target.value)) })}/>
                                            <TextField type="number" value={new Date(userTempData.birth).getMonth() + 1} margin="normal" style={{ marginRight: '10px' }}
                                                       onChange={(e) => setUserTempData({ ...userTempData, birth: new Date(userTempData.birth).setMonth(parseInt(e.target.value) - 1) })}/>
                                            <TextField type="number" value={new Date(userTempData.birth).getFullYear()} margin="normal"
                                                       onChange={(e) => setUserTempData({ ...userTempData, birth: new Date(parseInt(e.target.value), new Date(userTempData.birth).getMonth(), new Date(userTempData.birth).getDate()) })}/>
                                        </>

                                    ) : (
                                        <Typography variant="body1">{new Date(userData.birth).getDate()}/{new Date(userData.birth).getMonth() + 1}/{new Date(userData.birth).getFullYear()}</Typography>

                                    )}
                                </div>
                                {editMode.birthday ? (
                                    <>
                                        <Button onClick={() => handleUpdateClick(username, 'birth', new Date(userTempData.birth).toLocaleDateString('vi-VN'), 'birthday')}>Cập Nhật</Button>
                                        <Button onClick={() => handleCancelClick('birthday')}>Hủy</Button>
                                    </>
                                ) : (
                                    <IconButton style={{ marginLeft: 'auto' }} onClick={() => handleEditClick('birthday')}><EditIcon /></IconButton>
                                )}
                            </div>


                            {/* Address */}
                            <div className={classes.infoContainer} style={{marginLeft:"1rem"}}>
                                <Typography variant="body1" className={classes.infoText}>Địa Chỉ:</Typography>
                                <div style={{ flexGrow: 1 }}>
                                    {editMode.address ? (
                                        <TextField value={userTempData.address} fullWidth margin="normal"
                                                   onChange={(e) => setUserTempData({ ...userTempData, address: e.target.value })}/>
                                    ) : (
                                        <Typography variant="body1">{userData.address}</Typography>
                                    )}
                                </div>
                                {editMode.address ? (
                                    <>
                                        <Button onClick={() => handleUpdateClick(username, 'address', userTempData.address, 'address')}>Cập Nhật</Button>
                                        <Button onClick={() => handleCancelClick('address')}>Hủy</Button>
                                    </>
                                ) : (
                                    <IconButton onClick={() => handleEditClick('address')}><EditIcon /></IconButton>
                                )}
                            </div>

                            {/* Gender */}
                            <div className={classes.infoContainer} style={{marginLeft:"1rem"}}>
                                <Typography variant="body1" className={classes.infoText}>Giới Tính:</Typography>
                                <div style={{ flexGrow: 1 }}>
                                    {editMode.gender ? (
                                        <TextField value={userTempData.gender} fullWidth margin="normal"
                                                   onChange={(e) => setUserTempData({ ...userTempData, gender: e.target.value })}/>
                                    ) : (
                                        <Typography variant="body1">{userData.gender}</Typography>
                                    )}
                                </div>
                                {editMode.gender ? (
                                    <>
                                        <Button onClick={() => handleUpdateClick(username, 'gender', userTempData.gender, 'gender')}>Cập Nhật</Button>
                                        <Button onClick={() => handleCancelClick('gender')}>Hủy</Button>
                                    </>
                                ) : (
                                    <IconButton onClick={() => handleEditClick('gender')}><EditIcon /></IconButton>
                                )}
                            </div>


                            <Typography variant="h6" gutterBottom>
                                Thông Tin Tài Khoản
                            </Typography>
                            {/* Username */}
                            <div className={classes.infoContainer} style={{marginTop:"1.2rem"}} style={{marginTop:"1.2rem" ,marginLeft:"1rem"}}>
                                <Typography variant="body1" className={classes.infoText}>Username:</Typography>
                                <div style={{ flexGrow: 1 }}>
                                    {editMode.username ? (
                                        <TextField value={userTempData.username} fullWidth margin="normal"
                                                   onChange={(e) => setUserTempData({ ...userTempData, username: e.target.value })}/>
                                    ) : (
                                        <Typography variant="body1">{userData.username}</Typography>
                                    )}
                                </div>
                            </div>
                            {/* Password*/}
                            <div className={classes.infoContainer} style={{marginLeft:"1rem"}}>
                                <Typography variant="body1" className={classes.infoText}>Mật Khẩu:</Typography>
                                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    {editMode.password ? (
                                        <>
                                            <TextField
                                                fullWidth
                                                margin="normal"
                                                type={"password"}
                                                onChange={(e) => setCurrentPassword(e.target.value )}
                                                label="Mật khẩu hiện tại"
                                            />
                                            <TextField
                                                fullWidth
                                                margin="normal"
                                                type={"password"}
                                                onChange={(e) => setNewPassword(e.target.value )}
                                                label="Mật khẩu mới"
                                            />
                                        </>
                                    ) : (
                                        <Typography variant="body1">**********</Typography>
                                    )}
                                </div>
                                {editMode.password ? (
                                    <>
                                        <Button onClick={() => handleUpdateClick(username, 'password', newPassword, 'password')}>Cập Nhật</Button>
                                        <Button onClick={() => handleCancelClick('password')}>Hủy</Button>
                                    </>
                                ) : (
                                    <IconButton onClick={() => handleEditClick('password')}><EditIcon /></IconButton>
                                )}
                            </div>
                            {/* Email */}
                            <div className={classes.infoContainer} style={{marginLeft:"1rem"}}>
                                <Typography variant="body1" className={classes.infoText}>Email:</Typography>
                                <div style={{ flexGrow: 1 }}>
                                    {!editMode.email && !editMode.otp && (
                                        <Typography variant="body1">{userData.email}</Typography>
                                    )}
                                    {editMode.email && !editMode.otp && (
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            onChange={(e) => setUserTempData({ ...userTempData, email: e.target.value })}
                                            label="Email mới"
                                        />
                                    )}
                                </div>
                                {editMode.email && !editMode.otp && (
                                    <>
                                        <Button onClick={handleSendEmailClick}>Xác Nhận</Button>
                                        <Button onClick={() => handleCancelClick('email')}>Hủy</Button>
                                    </>
                                )}
                                {editMode.otp && (
                                    <>
                                        <TextField
                                            value={userTempData.otp}
                                            fullWidth
                                            margin="normal"
                                            onChange={(e) => setUserTempData({ ...userTempData, otp: e.target.value })}
                                            label="Mã OTP"
                                        />
                                        <Button onClick={() => handleUpdateClick(username, 'email', userTempData.email,'otp')}>Cập Nhật</Button>
                                        <Button onClick={() => handleCancelClick('otp')}>Hủy</Button>
                                    </>
                                )}
                                {!editMode.email && !editMode.otp && (
                                    <IconButton onClick={() => handleEditClick('email')}><EditIcon /></IconButton>
                                )}
                            </div>

                        </Paper>
                    </Grid>
                </Grid>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={5000}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    sx={{
                        backgroundColor: snackbarColor === 'success' ? '#4caf50' : '#ff4d4f',
                        color: '#fff',
                        borderRadius: '8px',
                        width: '300px',
                        height: '50px',
                        '& .MuiSnackbarContent-action': {
                            paddingLeft: 0,
                        },
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        px: 2,
                    }}>
                        <Typography variant="body1">{snackbarMessage}</Typography>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpenSnackbar(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Snackbar>
            </Container>
        </div>
    );
};

export default EditProfile;
