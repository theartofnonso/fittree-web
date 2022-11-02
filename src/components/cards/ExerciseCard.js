/* eslint-disable */
import React from "react";

const ExerciseCard = ({exercise}) => {

    return (
        <div className="relative h-40 rounded-md flex flex-col justify-end text-white overflow-hidden">
            <video className="rounded-md w-full h-full object-cover mr-2 bg-dustBlack" playsInline>
                <source src={`https://${exercise.videoUrls[0]}#t=0.1`} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className="absolute rounded-md top-0 right-0 bottom-0 left-0 hover:bg-transparentBlack5"/>
        </div>
    );
};

export default ExerciseCard;
