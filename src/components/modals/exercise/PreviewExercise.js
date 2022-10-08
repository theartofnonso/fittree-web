/* eslint-disable */
import React from "react";
import CloseIcon from "../../svg/close-line.svg";

const PreviewExercise = ({exercise, close}) => {

    return (
        <div
            className="container mx-auto px-2 sm:px-10 absolute top-0 right-0 bottom-0 left-0 h-screen w-screen bg-white">
            <button className="my-4" onClick={close}>
                <CloseIcon/>
            </button>
            <div className="">
                {exercise.videoUrls.map((url, index) => {
                    return (
                        <video key={index}
                               className="rounded-md w-full h-96 sm:w-full sm:h-96 object-contain mr-2 bg-dustBlack"
                               autoPlay
                               playsInline loop>
                            <source src={`https://${url}`} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    )
                })}
            </div>
            <div>
                <p className="my-4 font-light">{exercise.description}</p>
            </div>
            <div>
                <div className="mb-4">
                    <p className="font-semibold">Body Parts</p>
                    <div className="flex flex-row flex-wrap text-sm">
                        {exercise.bodyParts.map((item, index) => <p key={index} className="mr-2">{item}</p>)}
                    </div>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Equipment</p>
                    <div className="flex flex-row flex-wrap text-sm">
                        {exercise.equipments.map((item, index) => <p key={index} className="mr-2">{item}</p>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewExercise;
