/* eslint-disable */
import React from "react";
import PlayArrowIcon from "../../svg/play-mini-fill.svg";
import InfoOutlinedIcon from "../../svg/information-white-line.svg";
import OrderPlayIcon from "../../svg/order-play-white-line.svg";

const PauseModal = props => {

    return (
        <div className="px-5 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-full w-screen bg-transparentBlack9">
            <div className="my-4 flex flex-row justify-end">
                <div className="mx-2" onClick={props.previewExercise}>
                    <InfoOutlinedIcon/>
                </div>
                <div className="mx-2" onClick={props.toggleWorkoutList}>
                    <OrderPlayIcon/>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
                <div onClick={props.play}>
                    <PlayArrowIcon/>
                </div>
                <button
                    type="button"
                    onClick={props.navigateToWorkoutPreview}
                    className="absolute bottom-0 mb-10 bg-primary rounded-3xl py-2 px-10 mt-6 text-white font-medium hover:bg-darkPrimary">End
                    Workout
                </button>
            </div>
        </div>
    );
};

export default PauseModal;
