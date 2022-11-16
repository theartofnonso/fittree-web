/* eslint-disable */
import React from "react";
import CloseIcon from "../../../assets/svg/close-line.svg";
import VideoCarousel from "../../views/VideoCarousel";

const PreviewExercise = ({exercise, close}) => {

    if(!exercise) {
        return null;
    }

    return (
        <div
            className="px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-white overflow-y-scroll">
            <div className="my-4 cursor-pointer" onClick={close}>
                <CloseIcon/>
            </div>
            <VideoCarousel videos={exercise.videoUrls}/>
            <div className="my-4">
                <p className="font-semibold text-xl text-left">{exercise.title}</p>
                <p className="mt-4 font-light break-words whitespace-pre-line text-sm">{exercise.description}</p>
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
