/* eslint-disable */
import React from "react";
import CloseIcon from "../../svg/close-line.svg";

const PreviewExercise = ({exercise, close}) => {

    /**
     * Exercise videos
     */
    const videos = () => {
        return exercise.videoUrls.map((url, index) => {
            return (
                <video key={index}
                       className={exercise.videoUrls.length > 1 ? "mr-1" : null}
                       autoPlay
                       playsInline loop>
                    <source src={`https://${url}`} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            )
        })
    }

    return (
        <div
            className="container mx-auto px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-white overflow-y-scroll">
            <button className="my-4" onClick={close}>
                <CloseIcon/>
            </button>
            {exercise.videoUrls.length > 1 ?
                <div
                    className="flex flex-row justify-start rounded-md h-96 bg-dustBlack overflow-x-scroll pr-8 lg:pr-0">
                    {videos()}
                </div> : null
            }
            {exercise.videoUrls.length === 1 ?
                <div
                    className="flex flex-row justify-center rounded-md h-96 bg-dustBlack overflow-x-hidden">
                    {videos()}
                </div> : null
            }
            <div>
                <p className="my-4 font-light break-words whitespace-pre-line">{exercise.description}</p>
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
