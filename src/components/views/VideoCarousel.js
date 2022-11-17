/* eslint-disable */
import React from "react";

const VideoCarousel = ({videos}) => {

    return (
        <div
            className={`flex flex-row ${videos.length > 1 ? "justify-start" : "justify-center"} rounded-md h-96 overflow-x-auto`}>
            {videos.map((video, index) => {
                return (
                    <video key={index}
                           className={`rounded-md w-5/6 sm:w-full h-full object-cover ${index !== 0  && index !== videos.length -1 ? "mx-1" : null}`}
                           autoPlay
                           playsInline loop>
                        <source src={`https://${video}`} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                )
            })}
        </div>
    );
};

export default VideoCarousel;
