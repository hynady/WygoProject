import backgroundImage from '../../images/login_background.png';
import './Login.css'
import {useState, useEffect } from "react";
import {TextField, Button, Box, Typography, Link, IconButton, Snackbar, CircularProgress} from '@mui/material';
import axios from 'axios';
import { Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const navigate = useNavigate();

    const [contentVisible, setContentVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('loginState')==='ok'){
            if (localStorage.getItem('isAdmin')==='ok'){
                navigate('/admin');
            }
            navigate('/home');
        }
        const timeout = setTimeout(() => {
            setContentVisible(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    const handleLogin = () => {
        setIsLoading(true);
        axios.post('https://wygo-ojzf.onrender.com/users/login', {
            username: email,
            password: password
        })
            .then(response => {
                setIsLoading(false);
                axios.get(`https://wygo-ojzf.onrender.com/users/user/${email}`)
                    .then(response => {
                        localStorage.setItem('username', response.data.username);
                        localStorage.setItem('idUser', response.data.id);
                        localStorage.setItem('loginState', 'ok');
                        localStorage.setItem('avatar',response.data.avatar);
                        if (response.data.username==='admin' || response.data.username==='admin1' || response.data.username==='admin2'){
                            localStorage.setItem('isAdmin', 'ok');
                            navigate('/admin');
                        }
                        else{
                            localStorage.setItem('name', response.data.name);
                            navigate('/home');
                        }

                    })
            })
            .catch(error => {
                setIsLoading(false);
                console.error(error.response.data);
                setOpenSnackbar(true);
                setSnackbarMessage(error.response.data);
            });
    };
    return (
        <>
            {contentVisible && (
                <div className="login-container" style={{backgroundImage: `url(${backgroundImage})`}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: 'rgba(255, 255, 255, 0.5)', p: 3 }}>
                        <Typography variant="h4" mb={2} fontWeight="bold">Đăng Nhập</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px' }}>
                            <TextField label="Email" type="email"
                                       variant="outlined"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       sx={{ mb: 2, width: '100%' }} />
                            <TextField label="Mật khẩu" type="password"
                                       variant="outlined"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       sx={{ mb: 2, width: '100%' }} />
                            <Link href="/forgot-password" variant="body2" sx={{ mb: 2 }}>Quên mật khẩu?</Link>
                            {isLoading ? ( // Hiển thị hiệu ứng processing nếu isLoading là true
                                <CircularProgress sx={{ color: '#007bff' }} />
                            ) : (
                                <Button variant="contained" onClick={handleLogin} sx={{ width: '100%', bgcolor: '#007bff', color: 'white', '&:hover': { bgcolor: '#0056b3' } }}>Đăng Nhập</Button>
                            )}
                            <Link href="/registration" variant="body2" sx={{ mb: 2, margin: '1.5rem' }}>Chưa có tài khoản? Đăng ký ngay</Link>
                        </Box>
                    </Box>

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={5000}
                        onClose={() => setOpenSnackbar(false)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        sx={{
                            backgroundColor: '#ff4d4f',
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
                </div>
            )}
        </>
    );
};
export default Login;

