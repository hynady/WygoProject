import React, { useState } from 'react';
import './ReportPost.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { Box, IconButton, Snackbar, Typography } from "@mui/material";

const ReportPost = ({ postId, userReportedId, onClose }) => {
    const [selectedReason, setSelectedReason] = useState('');
    const [otherReason, setOtherReason] = useState('');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('success');
    const handleReport = () => {
        console.log(selectedReason)
        const data = {
            postId: postId, // Use the postId prop
            userReportedId: localStorage.getItem('idUser'), // Use the userReportedId prop
            reportType: selectedReason === 'Khác' ? otherReason : selectedReason
        };

        axios.post('https://wygo-ojzf.onrender.com/reports/post', data)
            .then(response => {
                setOpenSnackbar(true);
                setSnackbarMessage(response.data);
                setSnackbarColor('success');
                //onClose();
            })
            .catch(error => {
                if (error.response) {
                    setOpenSnackbar(true);
                    setSnackbarMessage(error.response.data);
                    setSnackbarColor('error');
                }
            });
    };

    return (
        <div className="report-post-container">
            <div className="report-post">
                <div className="close-button" onClick={onClose}>
                    <CloseIcon />
                </div>
                <div className="report-header">
                    <h2>Báo cáo bài viết</h2>
                </div>
                <div className="report-reasons">
                    <h3>Hãy chọn lý do báo cáo bài viết này:</h3>
                    <label>
                        <input
                            type="radio"
                            value="Spam"
                            checked={selectedReason === 'Spam'}
                            onChange={() => setSelectedReason('Spam')}
                        />
                        Spam
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Nội dung không phù hợp"
                            checked={selectedReason === 'Nội dung không phù hợp'}
                            onChange={() => setSelectedReason('Nội dung không phù hợp')}
                        />
                        Nội dung không phù hợp
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Nội dung khiêu dâm"
                            checked={selectedReason === 'Nội dung khiêu dâm'}
                            onChange={() => setSelectedReason('Nội dung khiêu dâm')}
                        />
                        Nội dung khiêu dâm
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Bạo lực"
                            checked={selectedReason === 'Bạo lực'}
                            onChange={() => setSelectedReason('Bạo lực')}
                        />
                        Bạo lực
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Chất cấm, chất gây nghiện"
                            checked={selectedReason === 'Chất cấm, chất gây nghiện'}
                            onChange={() => setSelectedReason('Chất cấm, chất gây nghiện')}
                        />
                        Chất cấm, chất gây nghiện
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Ngôn từ gây kích động"
                            checked={selectedReason === 'Ngôn từ gây kích động'}
                            onChange={() => setSelectedReason('Ngôn từ gây kích động')}
                        />
                        Ngôn từ gây kích động
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Nội dung chính trị"
                            checked={selectedReason === 'Nội dung chính trị'}
                            onChange={() => setSelectedReason('Nội dung chính trị')}
                        />
                        Nội dung chính trị
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
