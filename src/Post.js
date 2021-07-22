import React from 'react';
import './Post.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Avatar, IconButton } from '@material-ui/core';
import { ChatBubbleOutline, NearMeOutlined, ThumbUp } from '@material-ui/icons';
import db from './firebase';
import swal from 'sweetalert';
import { useState } from 'react';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
const Post = (props) => {
    const [{ user }] = useStateValue();
    const { image, timestamp, message, photoURL, displayName, likes, likersEmail } = props.data.data
    const handlePostMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleDelete = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    db.collection("posts").doc(id).delete().then(() => {
                        console.log("Document successfully deleted!");
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                    swal("Your post has been deleted!", {
                        icon: "success",
                    });
                } else {
                    // swal("Your post is live!");
                }
                handleClose();
            });
    }
    const [like, setLike] = useState(false)
    console.log(like);
    const handleLike = (id) => {
        like ? db.collection("posts").doc(id).update({
            likes: likes - 1,
            likersEmail: firebase.firestore.FieldValue.arrayRemove(user.email)
        })
            : db.collection("posts").doc(id).update({
                likes: likes + 1,
                likersEmail: firebase.firestore.FieldValue.arrayUnion(user.email)
            });
        setLike(!like)
    }
            return (
                <div className="post">
                    <div className="post_top">
                        <Avatar src={photoURL}
                            className="post_avatar" />
                        <div className="post_topInfo">
                            <h3>{displayName}</h3>
                            <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                        </div>
                        <IconButton style={{ marginLeft: 'auto' }} onClick={handlePostMenu}>
                            <MoreVertIcon />
                        </IconButton>
                        <div>
                            <Menu
                                id="fade-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleClose}>Edit</MenuItem>
                                <MenuItem onClick={handleClose}>Privacy</MenuItem>
                                <MenuItem onClick={() => handleDelete(props.data.id)}>Delete</MenuItem>
                            </Menu>
                        </div>
                    </div>
                    <div className="post_bottom">
                        <p>{message}</p>
                    </div>
                    <div className="post_image">
                        <img src={image} alt="" />
                    </div>
                    <div className="post-options">
                        <div className="post-option" onClick={() => handleLike(props.data.id)}
                            style={{ color: `${likersEmail.find(e => e ===  user.email ) ? '#2e81f4' : 'red'}` }}
                        >
                            <ThumbUp />
                            <p>{likes > 0 && likes} Like<span style={{ display: `${likes < 2 && 'none'}` }}>s</span></p>
                        </div>
                        <div className="post-option">
                            <ChatBubbleOutline />
                            <p>Comment</p>
                        </div>
                        <div className="post-option">
                            <NearMeOutlined />
                            <p>Share</p>
                        </div>
                    </div>
                </div>
            );
        };
    export default Post;