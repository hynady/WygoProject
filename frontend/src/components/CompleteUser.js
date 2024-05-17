import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container } from '@mui/material';

const UserForm = ({ username }) => {
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [hometown, setHometown] = useState('');
    const [avatar, setAvatar] = useState('');
    const [gender, setGender] = useState('');
    const [bio, setBio] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://wygo-ojzf.onrender.com/users/create', {
                username,
                name,
                birth,
                hometown,
                avatar,
                gender,
                bio
            });
            if (response.status === 200) {
                alert('Người dùng đã được tạo thành công.');
            }
        } catch (error) {
            setErrorMessage('Đã xảy ra lỗi khi tạo người dùng.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Tạo người dùng mới
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { marginBottom: 2 } }}>
                <TextField fullWidth label="Họ và tên" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField fullWidth type="date" label="Ngày sinh" value={birth} onChange={(e) => setBirth(e.target.value)} />
                <TextField fullWidth label="Quê quán" value={hometown} onChange={(e) => setHometown(e.target.value)} />
                <TextField fullWidth label="Ảnh đại diện" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
                <TextField fullWidth label="Giới tính" value={gender} onChange={(e) => setGender(e.target.value)} />
                <TextField fullWidth multiline rows={4} label="Tiểu sử" value={bio} onChange={(e) => setBio(e.target.value)} />
                <Button type="submit" variant="contained" color="primary">Tạo người dùng</Button>
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            </Box>
        </Container>
    );
};

export default UserForm;
