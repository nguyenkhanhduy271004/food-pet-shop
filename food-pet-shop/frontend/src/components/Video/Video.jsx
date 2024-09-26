import React from 'react'
import './Video.scss'
function Video() {
    return (
        <div className='video-container'>
            <video className="desktop-video" autoPlay loop muted width="300" height="150">
                <source src="https://zigly-happy-pets.s3.ap-south-1.amazonaws.com/videos/playful-temptations-desktop.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default Video
