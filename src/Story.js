import React from 'react';
import './Story.css'
import { Avatar } from '@material-ui/core';
import Swal from 'sweetalert2'
const Story = (props) => {
    const {storyImage, userImg, userName, timeStamp} = props.data.data
    const handleZoomImage = () => {
        Swal.fire({
            title: userName,
            text: new Date(timeStamp?.toDate()).toUTCString(),
            imageUrl: storyImage,
            imageWidth: 1000,
            imageHeight: 500,
            imageAlt: 'Custom image',
            
          })
    }
    return (
        <div onClick={() => handleZoomImage()} style={{ backgroundImage: `url(${storyImage})` }} className='story'>
            <Avatar className='story_avatar' src={userImg} />
            <h4>{userName}</h4>
        </div>
    );
};

export default Story;