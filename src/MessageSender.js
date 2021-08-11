import React from 'react';
import './MessageSender.css'
import { Avatar } from '@material-ui/core';
import { InsertEmoticon, PhotoLibrary, Videocam } from '@material-ui/icons';
import { useState } from 'react';
import { useStateValue } from './StateProvider';
import db from './firebase';
import { LinearProgress } from '@material-ui/core';
import firebase from 'firebase'
import axios from 'axios';
const MessageSender = () => {
    const [{ user }] = useStateValue();
    const [input, setInput] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input !== '' ||  imgUrl !== '') {
            db.collection("posts").add({
                posterEmail: user.email,
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                image: imgUrl,
                displayName: user.displayName,
                photoURL: user.photoURL,
                likersEmail: [],
                comments: []
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
    return (
        <div className='messageSender'>
            <div className="messageSender_top">
                <Avatar src={user.photoURL} />
                <form>
                    <input
                        placeholder={`What's on your mind, ${user.displayName}?`}
                        className='messageSender_input'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <input placeholder="image URL (Optional )"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                    />
                    <button onClick={handleSubmit} type='submit'>
                        Submit
                    </button>
                </form>
            </div>
            {
                imgLoad && <LinearProgress color="secondary" />
            }
            <div className="messageSender_Bottom">
                <div className="messageSender_option">
                    <Videocam style={{ color: 'red' }} />
                    <h3>Go live</h3>
                </div>
                <label htmlFor="photo">
                    <div className="messageSender_option">
                        <PhotoLibrary style={{ color: 'green' }} />
                        <h3>Photo/Video</h3>
                    </div>
                    <input type="file" id="photo" hidden onChange={handleImgUpload} />
                </label>
                <div className="messageSender_option">
                    <InsertEmoticon style={{ color: 'orange' }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
        </div>
    );
};

export default MessageSender;