import { useState } from 'react';
import {TextField, Button, Typography, Container, Box, Link, Snackbar, IconButton} from '@mui/material';
import {Close as CloseIcon} from "@mui/icons-material";
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1);
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [user, setUser] = useState(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSubmitEmail = (e) => {
        e.preventDefault();
        axios.get(`https://wygo-ojzf.onrender.com/users/user/${email}`)
            .then(response => {
                setUser(response.data);
                setStep(2);
                axios.post('https://wygo-ojzf.onrender.com/sendOTP', {
                    email: response.data.email,
                    otp: '',
                })
            })
            .catch(error => {
                setOpenSnackbar(true);
                setSnackbarMessage("Không tìm thấy người dùng!");
            });
    };


    const handleSubmitVerification = (e) => {
        e.preventDefault();
        axios.post('https://wygo-ojzf.onrender.com/verifyOTP', {
            email: user.email,
            otp: verificationCode,
        })
            .then(response => {
                axios.post('https://wygo-ojzf.onrender.com/users/change-info', {
                    username: user.username,
                    changeType: 'password',
                    newInfo: newPassword,
                })
                setStep(3);
            })
            .catch(error => {
                setOpenSnackbar(true);
                setSnackbarMessage(error.response.data);
            });
    };
    return (
        <Container
            component="main"
            maxWidth="xs"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
            <Box
                sx={{
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {step === 1 && (
                    <form onSubmit={handleSubmitEmail} style={{ width: '100%' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>Quên Mật Khẩu</Typography>
                        <Typography variant="body1">
                            Hãy cho chúng tôi biết địa chỉ email hoặc username của bạn.
                        </Typography>
                        <TextField
                            sx={{ marginBottom: '1rem', marginTop: '0.5rem',width: '100%' }}
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button variant="contained" color="primary" sx={{ width: '100%' }} type="submit">
                            Xác Nhận
                        </Button>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={handleSubmitVerification} style={{ width: '100%' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>Xác Thực</Typography>
                        <Typography variant="body1">
                            Vui lòng kiểm tra email của bạn và nhập mã xác thực đã được gửi cùng với mật khẩu mới.
                        </Typography>
                        <TextField
                            sx={{ marginBottom: '1rem', marginTop: '0.5rem',width: '100%' }}
                            label="Mã Xác Thực"
                            variant="outlined"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                        <TextField
                            sx={{ marginBottom: '1rem', width: '100%' }}
                            label="Mật Khẩu Mới"
                            type="password"
                            variant="outlined"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Button variant="contained" color="primary" sx={{ width: '100%' }} type="submit">
                            Xác Nhận
                        </Button>
                    </form>
                )}
                {step === 3 && (
                    <Box style={{ marginTop: '1rem' }}>
                        <Typography variant="body1">
                            Mật khẩu của bạn đã được cập nhật thành công. Vui lòng đăng nhập lại bằng mật khẩu mới.
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                            <a href="/">>>Trở lại trang chủ</a>
                        </Typography>
                    </Box>
                )}
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
        </Container>
    );
};

export default ForgotPassword;
