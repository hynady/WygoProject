import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Grid, CircularProgress, Paper, Modal } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const StyledContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
}));

const StyledForm = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    backgroundColor: '#f5f5f5', // Màu nền
}));

const StyledModal = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(localStorage.getItem('verifiedEmail') || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Thêm state mới cho mật khẩu nhập lại
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });
    const [showRedirectModal, setShowRedirectModal] = useState(false); // State để hiển thị modal chuyển hướng
    const [countdown, setCountdown] = useState(3); // Số giây còn lại cho đến khi chuyển hướng

    useEffect(() => {
        if (email !== '' && email !== null) {
            setEmail(email);
            console.log(email);
        }
        else {
            window.location.href = '/email-verification';
        }
    }, []);

    const handleChangeEmail = () => {
        localStorage.setItem('verifiedEmail', '');
        window.location.href = '/email-verification';
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !email || !password || !confirmPassword || !name || !birth || !gender) { // Kiểm tra cả mật khẩu và mật khẩu nhập lại
            setMessage({ type: 'error', content: 'Vui lòng điền đầy đủ thông tin' });
            return;
        }

        if (password !== confirmPassword) { // Kiểm tra hai mật khẩu có khớp nhau không
            setMessage({ type: 'error', content: 'Mật khẩu và mật khẩu nhập lại không khớp' });
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://wygo-ojzf.onrender.com/users/register', {
                username,
                email,
                password,
                name,
                birth,
                gender
            });

            if (response.status === 200) {
                setMessage({ type: 'success', content: 'Đăng ký thành công' });
                localStorage.setItem('verifiedEmail', '');
                setUsername('');
                setPassword('');
                setConfirmPassword(''); // Đặt lại mật khẩu nhập lại sau khi đăng ký thành công
                setName('');
                setBirth('');
                setGender('');
                setShowRedirectModal(true); // Hiển thị modal chuyển hướng
                startCountdown(); // Bắt đầu đếm ngược
            }
        } catch (error) {
            setMessage({ type: 'error', content: error.response.data });
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = username !== '' && email !== '' && password !== '' && confirmPassword !== '' && name !== '' && birth !== '' && gender !== '';

    const startCountdown = () => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    clearInterval(timer);
                    window.location.href = '/';
                    return prevCountdown;
                } else {
                    return prevCountdown - 1;
                }
            });
        }, 1000);
    };

    return (
        <StyledContainer maxWidth="sm">
            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Đăng ký
                    </Typography>
                </Grid>
                {message.content && (
                    <Grid item xs={12}>
                        <Typography color={message.type} align="center" gutterBottom>
                            {message.content}
                        </Typography>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <StyledPaper elevation={3}>
                        <StyledForm onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Tên đăng nhập"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        disabled
                                        InputProps={{
                                            endAdornment: (
                                                <Button onClick={handleChangeEmail}>
                                                    Thay đổi email
                                                </Button>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Mật khẩu"
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Nhập lại mật khẩu"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Tên"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Ngày sinh"
                                        type="date"
                                        value={birth}
                                        onChange={e => setBirth(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Giới tính"
                                        value={gender}
                                        onChange={e => setGender(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <StyledButton
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={!isFormValid || loading}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng ký'}
                                    </StyledButton>
                                </Grid>
                            </Grid>
                        </StyledForm>
                    </StyledPaper>
                </Grid>
                {/* Modal chuyển hướng */}
                <StyledModal
                    open={showRedirectModal}
                    onClose={() => setShowRedirectModal(false)}
                    aria-labelledby="redirect-modal-title"
                    aria-describedby="redirect-modal-description"
                >
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Đăng ký thành công!</Typography>
                        <Typography variant="body1" style={{ marginTop: '10px' }}>Chuyển đến trang đăng nhập sau {countdown} giây...</Typography>
                    </Paper>
                </StyledModal>
            </Grid>
        </StyledContainer>
    );
};

export default RegistrationForm;
