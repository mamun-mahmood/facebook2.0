import React, { useEffect } from 'react';
import Story from './Story';
import AddIcon from '@material-ui/icons/Add';
import './StoryReel.css'
import axios from 'axios';
import { useState } from 'react';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'
import db from './firebase';

const StoryReel = () => {
    const [stories, setStories] = useState([]);
    useEffect(() => {
        db.collection("stories").orderBy("timeStamp", "desc").onSnapshot((snapshot) =>
            setStories(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
        );
    }, [])
    const [{ user }] = useStateValue();
    const handleImgUpload = event => {
        const imgData = new FormData();
        imgData.set('key', 'c52ef286d44538b5e35cd23b4743904e');
        imgData.append('image', event.target.files[0]);
        // setImgLoad(true)
        axios.post('https://api.imgbb.com/1/upload',
            imgData)
            .then(res => {
                // setImgLoad(false)
                db.collection("stories").add({
                    userName: user.displayName,
                    userImg: user.photoURL,
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                    storyImage: res.data.data.display_url,
                })
            })
            .catch(err => {
                // setImgLoad(false)
                console.log(err);
            })
    }
    return (
        <div className='storyReel'>
            <label htmlFor="upload">
                <div className='add-story'>
                    <AddIcon />
                    <input type="file" onChange={handleImgUpload} id="upload" style={{ display: 'none' }} />
                    <h4>Add To Your Story</h4>
                </div>
            </label>
            {
                stories.map( story => <Story key = {story.id} data = {story}></Story>)
            }
        </div>
    );
};

export default StoryReel;