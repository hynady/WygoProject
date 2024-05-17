import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import SearchBar from "../Search/SearchBar";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#ffffff', // Màu nền thanh nav
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)', // Đổ bóng nhẹ dưới
    position: 'sticky', // Sticky to top
    top: 0, // Align to top of viewport
    width: '100%', // Full width
}));

const NavBar = () => {
    const [results, setResults] = useState({ users: [], posts: [] });
    const name = localStorage.getItem('name');
    const username = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatar');

    const navigate = useNavigate();

    const search = async (query) => {
        // Gửi yêu cầu tìm kiếm
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div style={{position:'sticky', top:'0'}}>
            <Box sx={{ flexGrow: 1 }}>
                <StyledAppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="home"
                            sx={{ mr: 2 }}
                            onClick={() => window.location.href = '/'}
                        >
                            <HomeIcon />
                        </IconButton>
                        <SearchBar onSearch={search} />
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 'auto' }} onClick={() => window.location.href = `https://wygo-react-frontend.vercel.app/profile/${username}`}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 1 }}>
                                <Typography variant="h6" noWrap component="div" sx={{ color: '#000', fontWeight: 'bold' }}>
                                    {name}
                                </Typography>
                                <Typography variant="body2" noWrap component="div" sx={{ color: '#000' }}>
                                    {username}
                                </Typography>
                            </Box>
                            <Avatar alt={name} src={avatar} sx={{ ml: 1 }} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 2 }}>
                            <Tooltip title="Chỉnh sửa thông tin cá nhân">
                                <IconButton
                                    size="large"
                                    aria-label="edit profile"
                                    color="inherit"
                                    onClick={handleEditProfile}
                                >
                                    <Avatar sx={{ bgcolor: 'white' }}>
                                        <EditIcon color="action" />
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Đăng xuất">
                                <IconButton
                                    size="large"
                                    aria-label="logout"
                                    color="inherit"
                                    onClick={handleLogout}
                                >
                                    <Avatar sx={{ bgcolor: 'white' }}>
                                        <LogoutIcon color="action" />
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </StyledAppBar>
            </Box>
        </div>
    );
};

export default NavBar;
