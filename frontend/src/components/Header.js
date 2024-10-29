// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Avatar, IconButton } from '@mui/material';
import { Search, Notifications } from '@mui/icons-material';

const Header = () => {
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    Employee Dashboard
                </Typography>
                <div style={{ flexGrow: 1 }} />
                <div style={{ position: 'relative', marginRight: '20px' }}>
                    <Search />
                    <InputBase placeholder="Search…" />
                </div>
                <IconButton color="inherit">
                    <Notifications />
                </IconButton>
                <Avatar alt="David Hussy" src="/static/images/avatar/1.jpg" />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
