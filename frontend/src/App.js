import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import SideBar from './components/SideBar'; // Fixed capitalization
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';
import ApplicantList from './components/ApplicantList';
import JobPostingList from './components/JobPostingList';
import EditEmployee from './components/EditEmployee';
import EditJob from './components/EditJob';
import UserProfile from './components/UserProfile';
import Calender from './components/Calender';

console.log("LOGIN",Login);

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
                    {/* Protect the SideBar */}
                    <ProtectedRoute>
                        <SideBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                    </ProtectedRoute>

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
                            <Route path="/Login" element={<Login />} />
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <Header />
                                        <EmployeeList />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/userprofile/:id"
                                element={
                                    <ProtectedRoute>
                                        <UserProfile />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/edituserprofile/:id"
                                element={
                                    <ProtectedRoute>
                                        <EditEmployee />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/job"
                                element={
                                    <ProtectedRoute>
                                        <JobPostingList />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/editJob/:id"
                                element={
                                    <ProtectedRoute>
                                        <EditJob />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/applicants"
                                element={
                                    <ProtectedRoute>
                                        <ApplicantList />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/Calender"
                                element={
                                    <ProtectedRoute>
                                        <Calender />
                                    </ProtectedRoute>
                                }
                            />
                            {/* Redirect any unknown routes to login */}
                            <Route path="*" element={<Navigate to="/Login" />} />
                        </Routes>
                    </Box>
                </Box>
            </div>
        </Router>
    );
};

export default App;
