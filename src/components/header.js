import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6" style={{ marginRight: '20px' }}>
                            Your Logo
                        </Typography>
                    </Link>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
                            <Typography variant="subtitle1">התחברות</Typography>
                        </Link>
                        <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
                            <Typography variant="subtitle1">הרשמה</Typography>
                        </Link>
                        <Link to="/events" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
                            <Typography variant="subtitle1">אירועים</Typography>
                        </Link>
                        <Link to="/searchdrives" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
                            <Typography variant="subtitle1">חיפוש נסיעות</Typography>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
                <div
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                       
                        <ListItem button component={Link} to="/profile">
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button component={Link} to="/waiting-list">
                            <ListItemText primary=" נסיעות שאני מחכה להם" />
                        </ListItem>
                        <ListItem button component={Link} to="/demand-list">
                            <ListItemText primary="בקשות לנסיעות" />
                        </ListItem>
                        {/* Add other sidebar links or content */}
                    </List>
                </div>
            </Drawer>
        </>
    );
};

export default Header;
