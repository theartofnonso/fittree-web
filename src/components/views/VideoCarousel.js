/* eslint-disable */
import React from "react";

const VideoCarousel = ({videos}) => {

    return (
        <div
            className={`flex flex-row justify-start sm:justify-center rounded-md h-96 overflow-x-auto bg-grayOpacity6`}>
            {videos.map((video, index) => {
                return (
                    <video key={index}
                           className={`h-96 w-5/6 sm:w-96 object-cover`}
                           autoPlay
                           playsInline loop muted>
                        <source src={`https://${video}`} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                )
            })}
        </div>
    );
};

export default VideoCarousel;
