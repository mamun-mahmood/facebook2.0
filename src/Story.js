import React from 'react';
import './Story.css'
import { Avatar } from '@material-ui/core';
const Story = (props) => {
    const {storyImage, userImg, userName, timeStamp} = props.data.data
    return (
        <div style={{ backgroundImage: `url(${storyImage})` }} className='story'>
            <Avatar className='story_avatar' src={userImg} />
            <h4>{userName}</h4>
        </div>
    );
};

export default Story;