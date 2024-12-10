import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Divider, IconButton, Box } from '@mui/material';
import {
    ExpandLess,
    ExpandMore,
    Dashboard,
    People,
    Settings,
    ChevronLeft,
    ChevronRight,
    Brightness4,
    Brightness7,
    Work,
    Event,
    AccountBalance,
    Assessment,
    Notifications,
    BusinessCenter,
    MonetizationOn
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ darkMode, toggleDarkMode }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Manage sidebar state locally
    const [openEmployees, setOpenEmployees] = useState(false); // Toggle for Employee section

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
    };

    const toggleEmployees = () => {
        setOpenEmployees(!openEmployees);
    };
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/job');
    };


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '93vh', // Full height of the screen
                justifyContent: 'space-between',
                width: isSidebarOpen ? '240px' : '60px', // Toggle sidebar width
                backgroundColor: '#f5f5f5',
                transition: 'width 0.3s ease', // Smooth transition for expand/collapse
                overflowX: 'hidden', // Hide overflow when minimized
            }}
        >
            {/* Top section with menu items */}
            {/* Sidebar Minimize/Expand Button */}
            <IconButton onClick={toggleSidebar} sx={{ borderRadius: '50%' }}>
                {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>

            <List>
                <ListItem button onClick={(e) => {
                    navigate(`/`)
                    e.stopPropagation(); // Prevent row click from triggering
                    console.log('redirect');
                }}>
                    <ListItemIcon >
                        <Dashboard />
                    </ListItemIcon>
                    {isSidebarOpen && <ListItemText primary="Dashboard" />}
                </ListItem>

                {/* Employees section */}
                <ListItem button onClick={toggleEmployees}>
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    {isSidebarOpen && <ListItemText primary="Employees" />}
                    {isSidebarOpen && (openEmployees ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>
                <Collapse in={openEmployees} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button sx={{ pl: isSidebarOpen ? 4 : 2 }}>
                            <ListItemText inset primary="Employee List" />
                        </ListItem>
                        <ListItem button sx={{ pl: isSidebarOpen ? 4 : 2 }}>
                            <ListItemText inset primary="Disciplinary" />
                        </ListItem>
                        <ListItem button sx={{ pl: isSidebarOpen ? 4 : 2 }}>
                            <ListItemText inset primary="Inactive User" />
                        </ListItem>
                    </List>
                </Collapse>

                {/* Other menu items */}
                <ListItem button onClick={(e) => {
                    navigate(`/applicants`)
                    e.stopPropagation(); // Prevent row click from triggering
                    console.log('redirect to applicants');
                }}>
                    <ListItemIcon>
                        <Event />
                    </ListItemIcon>
                    {isSidebarOpen && <ListItemText primary="applicants" />}
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <Work />
                    </ListItemIcon>
                    {isSidebarOpen && <ListItemText primary="Leave" />}
                </ListItem>

                <ListItem button onClick={(e) => {
                    navigate(`/Calender`)
                    e.stopPropagation(); // Prevent row click from triggering
                    console.log('redirect to applicants');
                }}>
                    <ListItemIcon>
                        <BusinessCenter />
                    </ListItemIcon>
                    {isSidebarOpen && <ListItemText primary="Calender" />}
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <MonetizationOn />
                    </ListItemIcon>
                    {isSidebarOpen && <ListItemText primary="Payroll" />}
                </ListItem>

                <ListItem button onClick={(e) => {
                    navigate(`/job`)
                    e.stopPropagation(); // Prevent row click from triggering
                    console.log('redirect to applicants');
                }}>
                    <ListItemIcon>
                        <AccountBalance />
                    </ListItemIcon>
                    {isSidebarOpen && (
                        <ListItem >
                            <ListItemText primary="Job" />
                        </ListItem>
                    )}
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <Assessment />
                    </ListItemIcon>
                    {isSidebarOpen && <ListItemText primary="Assets" />}
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <Notifications />
                    </ListItemIcon>
                    {isSidebarOpen && <ListItemText primary="Notice" />}
                </ListItem>
            </List>

            <Divider />

            {/* Bottom section with settings and sidebar toggle */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Settings */}
                <ListItem button>
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    {isSidebarOpen && <ListItemText primary="Settings" />}
                </ListItem>




            </Box>
        </Box>
    );
};

export default Sidebar;
