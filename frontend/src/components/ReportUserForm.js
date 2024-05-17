import React, { useState } from 'react';
import './Report/ReportPost.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import {Box, IconButton, Snackbar, Typography} from "@mui/material";

const ReportPost = ({ onClose }) => {
    const [selectedReason, setSelectedReason] = useState('');
    const [otherReason, setOtherReason] = useState('');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleReport = () => {
        const data = {
            authorUsername: "imloki",
            targetUsername: "phancong1609",
            reason: selectedReason === 'Khác' ? otherReason : selectedReason
        };

        axios.post('https://wygo-ojzf.onrender.com/reports/user', data)
            .then(response => {
                setOpenSnackbar(true);
                setSnackbarMessage(response.data);
                setSnackbarColor('success');
                onClose();
            })
            .catch(error => {
                if (error.response) {
                    setOpenSnackbar(true);
                    setSnackbarMessage(error.response.data);
                    setSnackbarColor('error');
                }
            });
    };
    const setSnackbarColor = (color) => {
        setColor(color);
    };
    const [snackbarColor, setColor] = useState('success');

    return (
        <div className="report-post-container">
            <div className="report-post">
                <div className="close-button" onClick={onClose}>
                    <CloseIcon />
                </div>
                <div className="report-header">
                    <h2>Báo cáo người dùng</h2>
                </div>
                <div className="report-reasons">
                    <h3>Hãy chọn lý do báo cáo người dùng này:</h3>
                    <label>
                        <input
                            type="radio"
                            value="Tên không phù hợp"
                            checked={selectedReason === 'Tên không phù hợp'}
                            onChange={() => setSelectedReason('Tên không phù hợp')}
                        />
                        Tên không phù hợp
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Đăng nội dung không phù hợp"
                            checked={selectedReason === 'Đăng nội dung không phù hợp'}
                            onChange={() => setSelectedReason('Đăng nội dung không phù hợp')}
                        />
                        Đăng nội dung không phù hợp
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Tài khoản giả mạo"
                            checked={selectedReason === 'Tài khoản giả mạo'}
                            onChange={() => setSelectedReason('Tài khoản giả mạo')}
                        />
                        Tài khoản giả mạo
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Quấy rối bắt nạt"
                            checked={selectedReason === 'Quấy rối bắt nạt'}
                            onChange={() => setSelectedReason('Quấy rối bắt nạt')}
                        />
                        Quấy rối bắt nạt
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Khác"
                            checked={selectedReason === 'Khác'}
                            onChange={() => setSelectedReason('Khác')}
                        />
                        Khác
                    </label>
                    {selectedReason === 'Khác' && (
                        <div className="other-reason-container">
                            <input
                                type="text"
                                placeholder="Lý do khác"
                                value={otherReason}
                                onChange={(e) => setOtherReason(e.target.value)}
                            />
                        </div>
                    )}
                </div>
                <button className="report-button" onClick={handleReport}>Báo cáo</button>
            </div>
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
        </div>
    );
};

export default ReportPost;
