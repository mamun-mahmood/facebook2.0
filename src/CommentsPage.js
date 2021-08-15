import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import MenuItem from '@material-ui/core/MenuItem';
import { useStateValue } from './StateProvider';
import './CommentsPage.css'
import { ChatBubbleOutline, ThumbUp } from '@material-ui/icons';
import { InsertEmoticon } from '@material-ui/icons';
import { LinearProgress } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Picker from 'emoji-picker-react';
import Popover from '@material-ui/core/Popover';
import axios from 'axios';
import firebase from 'firebase'
const CommentsPage = ({state, id }) => {
    const handleCommentMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    }
    const [{ user }] = useStateValue();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        db.collection("posts").doc(id).get().then((doc) => {
            if (doc.exists) {
                setComments(doc.data().comments)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    })
    const [input, setInput] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input !== '' || imgUrl !== '') {
            db.collection("posts").doc(id).update({

                comments: firebase.firestore.FieldValue.arrayUnion(
                    {
                        comment: input,
                        userName: user.displayName,
                        photo: user.photoURL,
                        posterEmail: user.email,
                        commentPhoto: imgUrl,
                    }
                )
            })
        }
        setInput('');
        setImgUrl('');
    }
    const [imgLoad, setImgLoad] = useState(false)
    const handleImgUpload = event => {
        setImgLoad(true)
        const imgData = new FormData();
        imgData.set('key', 'c52ef286d44538b5e35cd23b4743904e');
        imgData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload',
            imgData)
            .then(res => {
                setImgLoad(false)
                setImgUrl(res.data.data.display_url)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const [openEmoji, setOpenEmoji] = useState(false)

    const onEmojiClick = (emojiObject) => {
        const newInput = input.concat(emojiObject.emoji)
        setInput(newInput);
    };
    const [to, setTo] = useState(3)
    const slicedComments = comments.slice(0,to)
    const handleEditComment = (id, data) => {
        // setInput(data);
    }
    return (
                 <div style={{ borderTop: '1px solid rgb(175, 175, 175)', borderRadius: '0' }} className="post">
                {
                    slicedComments.map(data =>
                        <>
                            <div className="post_top">
                                <Avatar src={data.photo}
                                    className="post_avatar" />
                                <div className="post_topInfo comment-area">
                                    <div className="comment-area-top">
                                        <h3>{data.userName}</h3>
                                        <IconButton style={{ marginLeft: 'auto' }} onClick={handleCommentMenu}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </div>
                                    {/* <p>{new Date(timestamp?.toDate()).toUTCString()}</p> */}
                                    <div>
                                        <p className="comment-text">{data.comment}</p>
                                    </div>
                                    <div className="comment-img">
                                        <img src={data.commentPhoto} alt="" />
                                    </div>
                                    <div style={{ fontSize: 'small', padding: '0px ' }} className="post-options">
                                        <div title="Like" className="post-option">
                                            <ThumbUp />
                                        </div>
                                        <div title="Reply" className="post-option">
                                            <ChatBubbleOutline />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Menu
                                        id="fade-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={open}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                    >
                                        {/* <div style={{ display: `${data.posterEmail === user.email ? 'block' : 'block'}` }}> */}
                                        <MenuItem onClick={() => handleEditComment(id, data.comment)}>Edit</MenuItem>
                                        <MenuItem >Delete</MenuItem>
                                        {/* </div> */}
                                    </Menu>
    
                                </div>
                            </div>
                        </>)
                }
                {
                    comments.length > 3 && <div style={{display: `${comments.length <= to ? 'none': 'block'}`}} className="seeMoreBtn">
                        <button onClick={() => setTo(to+3)}>see more</button>
                    </div>
                }
                {
                    comments.length <= to && <div  className="seeMoreBtn">
                        <button onClick={() => setTo(3)}>see less</button>
                    </div>
                }
                <div style={{ borderTop: '1px solid rgb(175, 175, 175)', borderRadius: '10px' }} className="messageSender_top">
                    <Avatar src={user.photoURL} />
                    <form>
                        <input
                            placeholder={`Write a comment...`}
                            className='messageSender_input'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        >
                        </input>
                        <div className="comment-options">
                            <label htmlFor="upload_comment">
                                <div className="comment-option">
                                    <AddAPhotoIcon />
                                </div>
                            </label>
                            <input type="file" onChange={handleImgUpload} id="upload_comment" style={{ display: 'none' }} />
                            <div className="comment-option" onClick={() => setOpenEmoji(!openEmoji)}>
                                <InsertEmoticon />
                            </div>
                        </div>
    
                        <button onClick={(e) => handleSubmit(e)} type='submit'>
                            Submit
                        </button>
                    </form>
                <Popover
                    open={openEmoji}
                    onClose={() => setOpenEmoji(false)}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >   <div>
                        <Picker onEmojiClick={onEmojiClick} />
                    </div>
                </Popover>
                </div >
                {
                    imgLoad && <LinearProgress />
                }
            </div>
    );
};

export default CommentsPage;