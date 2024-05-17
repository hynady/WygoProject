import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import {useParams} from "react-router-dom";

const StyledTextField = styled(TextField)({
    borderRadius: '20px',
    backgroundColor: '#f4f4f4',
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        '& fieldset': {
            border: 'none',
        },
    },
});

const CommentForm = (post ) => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Bắt đầu quá trình gửi
        try {
            const response = await axios.post('https://wygo-ojzf.onrender.com/posts/comment', {
                postId: id,
                authorUsername: localStorage.getItem("username"),
                content: content
            });
            alert('Bình luận thành công!');
            setContent('');
        } catch (error) {
            if (error.response) {
                alert(`Đã xảy ra lỗi: ${error.response.data}`);
            } else {
                alert('Đã xảy ra lỗi không xác định');
            }
        } finally {
            setIsSubmitting(false); // Kết thúc quá trình gửi (thành công hoặc thất bại)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <StyledTextField
                fullWidth
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập nội dung bình luận..."
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {isSubmitting ? (
                                <CircularProgress size={24} />
                            ) : (
                                <IconButton type="submit">
                                    <SendIcon />
                                </IconButton>
                            )}
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    );
};

export default CommentForm;
