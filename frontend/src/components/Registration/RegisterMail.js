import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, CircularProgress, Grid, Paper, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        position: 'relative',
    },
    message: {
        position: 'absolute',
        bottom: -5,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'fit-content',
        backgroundColor: theme.palette.error.main,
        color: '#fff',
        padding: theme.spacing(1.5),
        borderRadius: theme.shape.borderRadius,
        textAlign: 'center',
        zIndex: 1,
        transition: 'bottom 0.5s',
    },
    successMessage: {
        backgroundColor: theme.palette.success.main,
    },
}));

const OtpForm = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleSendOTP = async () => {
        if (!validateEmail(email)) {
            setMessage({ type: 'error', content: 'Địa chỉ email không hợp lệ' });
            return;
        }

        setIsSending(true);

        try {
            // Kiểm tra xem email đã tồn tại chưa
            const checkEmailResponse = await axios.get(`https://wygo-ojzf.onrender.com/users/user/${email}`);

            // Nếu nhận được một object, nghĩa là email đã tồn tại
            if (checkEmailResponse.data) {
                setMessage({ type: 'error', content: 'Email đã tồn tại' });
                return;
            }

            // Nếu email không tồn tại, gửi OTP
            const response = await axios.post('https://wygo-ojzf.onrender.com/sendOTP', { email });
            setMessage({ type: 'success', content: response.data });
            setIsOtpSent(true);
        } catch (error) {
            if (error.response.status === 400 || error.response.status === 500) {
                // Nếu nhận được bad request, cho phép tiếp tục gửi OTP
                const response = await axios.post('https://wygo-ojzf.onrender.com/sendOTP', { email });
                setMessage({ type: 'success', content: response.data });
                setIsOtpSent(true);
            } else {
                // Xử lý các lỗi khác
                setMessage({ type: 'error', content: error.response.data });
            }
        } finally {
            setIsSending(false);
        }
    };




    const handleVerifyOTP = async () => {
        setIsVerifying(true);
        try {
            const response = await axios.post('https://wygo-ojzf.onrender.com/verifyOTP', { email, otp });
            setMessage({ type: 'success', content: response.data });
            // Lưu email đã xác thực vào local storage
            localStorage.setItem('verifiedEmail', email);
            setShowSuccessPopup(true);
        } catch (error) {
            setMessage({ type: 'error', content: error.response.data });
        } finally {
            setIsVerifying(false);
        }
    };


    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleResendOTP = async () => {
        setIsOtpSent(false);
        setOtp('');
        setMessage({ type: '', content: '' });
    };

    useEffect(() => {
        if (showSuccessPopup) {
            setTimeout(() => {
                // Chuyển đến trang đăng ký sau 3 giây
                window.location.href = '/registration';
            }, 3000);
        }
    }, [showSuccessPopup]);
    const handleCloseMessage = () => {
        setMessage({ type: '', content: '' });
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h5" gutterBottom align="center">
                        Xác thực OTP
                    </Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                    {!isOtpSent ? (
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSendOTP}
                            disabled={isSending || !validateEmail(email)}
                        >
                            {isSending ? <CircularProgress size={24} color="inherit" /> : 'Gửi OTP'}
                        </Button>
                    ) : (
                        <>
                            <TextField
                                fullWidth
                                label="OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                variant="outlined"
                                margin="normal"
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={!otp || isVerifying}
                                onClick={handleVerifyOTP}
                            >
                                {isVerifying ? <CircularProgress size={24} color="inherit" /> : 'Xác nhận OTP'}
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                onClick={handleResendOTP}
                                disabled={isSending}
                            >
                                Gửi lại OTP
                            </Button>
                        </>
                    )}
                </Paper>
                {message.content && (
                    <div className={`${classes.message} ${message.type === 'success' ? classes.successMessage : ''}`}>
                        <Typography align="center">{message.content}</Typography>
                    </div>
                )}
                {/* Hiển thị popup thành công */}
                {showSuccessPopup && (
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', maxWidth: '80%', backgroundColor: '#fff', borderRadius: '10px' }}>
                            <Typography variant="h6">Xác thực email thành công!</Typography>
                            <Typography variant="body1">Chuyển đến trang đăng ký sau 3 giây...</Typography>
                            <Button variant="contained" color="primary" style={{ marginTop: '10px' }} href="/registration">
                                Đăng ký tài khoản
                            </Button>
                            <Button variant="text" color="primary" style={{ marginTop: '10px' }} onClick={() => setShowSuccessPopup(false)}>
                                Quay lại
                            </Button>
                        </Paper>
                    </div>
                )}
            </Grid>
        </Grid>
    );
};

export default OtpForm;