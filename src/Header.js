import React from 'react';
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import { Avatar, Fade, IconButton, Menu, MenuItem } from '@material-ui/core';
import { useStateValue } from './StateProvider';

const Header = () => {
    const [{ user }] = useStateValue();
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <div className="header">
            <div className="header_left">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png" alt="" />
                <div className="header_input">
                    <SearchIcon />
                    <input type="text" placeholder="Search Facebook" />
                </div>
            </div>
            <div className="header_center">
                <div className="header_option header_option__active">
                    <HomeIcon fontSize="large" />
                </div>
                <div className="header_option">
                    <FlagIcon fontSize="large" />
                </div>
                <div className="header_option">
                    <SubscriptionsOutlinedIcon fontSize="large" />
                </div>
                <div className="header_option">
                    <StorefrontOutlinedIcon
                        fontSize="large" />
                </div>
                <div className="header_option">
                    <SupervisedUserCircleOutlinedIcon fontSize="large" />
                </div>
            </div>
            <div className="header_right">
                <div className="header_info">
                    <Avatar src={user.photoURL} />
                    <h4>{user.displayName}</h4>
                </div>
                <IconButton>
                    <AddOutlinedIcon />
                </IconButton>
                <IconButton>
                    <ForumOutlinedIcon />
                </IconButton>
                <IconButton>
                    <NotificationsActiveOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleMenu}>
                    <ExpandMoreOutlinedIcon />
                </IconButton>
                <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleClose}>Log out</MenuItem>
                </Menu>
            </div>
        </div>
    );
};

export default Header;