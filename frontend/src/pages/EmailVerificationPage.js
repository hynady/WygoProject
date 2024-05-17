import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import ArrowBackIcon từ MUI
import OtpForm from '../components/Registration/RegisterMail';
import { makeStyles } from '@mui/styles'; // Correct import for makeStyles

const useStyles = makeStyles((theme) => ({
    backButtonContainer: {
        position: 'absolute',
        left: theme.spacing(2),
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
}));

const EmailVerificationPage = () => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.backButtonContainer}>
                <IconButton component={Link} to="/" className={classes.backButton}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">Trở về trang đăng nhập</Typography>
            </div>
            <OtpForm />
        </div>
    );
};

export default EmailVerificationPage;
