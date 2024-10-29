import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import SideBar from './components/SideBar'; // Fixed capitalization
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import ApplicantList from './components/ApplicantList';
import JobPostingList from './components/JobPostingList';
import EditEmployee from './components/EditEmployee';
import EditJob from './components/EditJob';
import UserProfile from './components/UserProfile';


const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: 1201 }}>
                    <Toolbar>
                        <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Employee Management
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Toolbar />

                <Box sx={{ display: 'flex', flexGrow: 1, height: '100%' }}>
                    <SideBar
                        darkMode={darkMode}
                        toggleDarkMode={toggleDarkMode}
                    />

                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            transition: 'margin 0.3s',
                            overflowY: 'auto',
                        }}
                    >
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <Header />
                                    <EmployeeList />
                                </>
                            } />
                            <Route path="/userprofile/:id" element={<UserProfile />} />
                            <Route path="/edituserprofile/:id" element={<EditEmployee />} />
                            <Route path="/job" element={<JobPostingList />} />
                            <Route path="/editJob/:id" element={<EditJob />} />
                            <Route path="/applicants" element={<ApplicantList />} />
                        </Routes>
                    </Box>
                </Box>
            </div>
        </Router>
    );
};

export default App;