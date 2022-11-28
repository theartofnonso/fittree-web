/* eslint-disable */
import React from "react";
import PauseIcon from "../../assets/svg/pause-mini-line.svg";
import SkipForwardIcon from "../../assets/svg/skip-forward-fill.svg";
import SkipBackwardIcon from "../../assets/svg/skip-back-fill.svg";
import workoutsConstants from "../../utils/workout/workoutsConstants";

const Controls = (props) => {

    const isRepsSets = props.workoutType === workoutsConstants.workoutType.REPS_SETS

    return (
        <div
            className={`relative ${isRepsSets ? "h-24" : "h-12"} flex flex-col bg-whiteOpacity1 justify-center items-center w-48 rounded-lg text-white font-semibold shadow-darkSecondary shadow-md`}>
            <div className="absolute top-0 right-0 bottom-0 left-0 blur-lg"></div>
            <div
                className="absolute flex flex-col items-center space-y-3 py-2 top-0 right-0 bottom-0 left-0 flex flex-row justify-center text-black">
                <div className="flex flex-row">
                    <button type="button" className="hover:font-bold" onClick={props.prev}>Prev</button>
                    <button type="button" className="px-2 mx-1 hover:bg-darkSecondary rounded" onClick={props.pause}>
                        <PauseIcon/>
                    </button>
                    <button type="button" className="hover:font-bold" onClick={props.next}>Next</button>
                </div>
                {isRepsSets ? <div className="flex flex-row pb-1">
                    <button type="button" className="mx-4 p-2 bg-secondary rounded hover:bg-darkSecondary" onClick={props.prevExercise}>
                        <SkipBackwardIcon/>
                    </button>
                    <button type="button" className="mx-4 p-2 bg-secondary rounded hover:bg-darkSecondary" onClick={props.skipExercise}>
                        <SkipForwardIcon/>
                    </button>
                </div> : null}
            </div>
        </div>
    );
};

export default Controls;
