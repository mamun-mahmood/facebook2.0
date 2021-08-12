import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import { InsertEmoticon } from '@material-ui/icons';
import { LinearProgress } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useStateValue } from './StateProvider';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import './CommentsPage.css'
import { ChatBubbleOutline, ThumbUp } from '@material-ui/icons';
import Picker from 'emoji-picker-react';
import axios from 'axios';
import firebase from 'firebase';
import Popover from '@material-ui/core/Popover';

const CommentsPage = ({ id }) => {
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
    }, [id])
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

    const onEmojiClick = (event, emojiObject) => {
        const newInput = input.concat(emojiObject.emoji)
        setInput(newInput);
    };
    return (
        <div className="post">
            <div style={{ borderTop: '1px solid rgb(175, 175, 175)' }} className="messageSender_top">
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

                    <button onClick={handleSubmit} type='submit'>
                        Submit
                    </button>
                </form>
            </div>
            <Popover
                open={openEmoji}
                onClose={() => setOpenEmoji(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >   <div>
                    <Picker onEmojiClick={onEmojiClick} />
                </div>
            </Popover>
            {
                imgLoad && <LinearProgress />
            }
            {
                comments.map(data =>
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
                                    <MenuItem>Edit</MenuItem>
                                    <MenuItem >Delete</MenuItem>
                                    {/* </div> */}
                                </Menu>

                            </div>
                        </div>
                    </>)
            }
            <div className="post_image">
                {/* <img src={image} alt="" onClick={() => handleImg()} /> */}
            </div>
            <div className="comments">
                {/* <div style={{ display: `${likersEmail.length > 0 ? 'block' : 'none'}` }} className="like both">
                    <p>{likersEmail.length} Like<span style={{ display: `${likersEmail.length < 2 && 'none'}` }}>s</span></p>
                </div>
                <div onClick={() => handleAllComments(props.data.id)} style={{ display: `${comments.length > 0 ? 'block' : 'none'}` }} className="comment both">
                    <p>{comments.length} Comment<span style={{ display: `${comments.length < 2 && 'none'}` }}>s</span></p>
                </div> */}
            </div>
        </div>
    );
};

export default CommentsPage;