import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Container, Typography } from '@mui/material';
import ViewAllUserReport from './ViewAllUserReport';
import ViewAllPostReport from './ViewAllPostReport';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Container maxWidth="xl">
            <AppBar position="static" color="default" sx={{ backgroundColor: 'white', color: 'black' }}>
                <Tabs value={activeTab} onChange={handleTabChange} centered>
                    <Tab label="Report User" />
                    <Tab label="Report Post" />
                </Tabs>
            </AppBar>

            <Container>
                {activeTab === 0 && <ViewAllUserReport />}
                {activeTab === 1 && <ViewAllPostReport />}
            </Container>

            <footer style={{ marginTop: '20px', textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()} Admin Dashboard
                </Typography>
            </footer>
        </Container>
    );
};

export default AdminDashboard;
