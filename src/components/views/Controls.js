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
            className={`relative h-12 ${isRepsSets ? "w-64" : "w-52"} flex flex-col bg-whiteOpacity1 justify-center items-center rounded-lg text-white font-semibold shadow-darkSecondary shadow-md`}>
            <div
                className="absolute flex flex-row items-center justify-center top-0 right-0 bottom-0 left-0 text-black m-4">
                {isRepsSets ?
                    <button type="button" className="mr-4 p-2 rounded hover:bg-darkSecondary"
                            onClick={props.prevExercise}>
                        <SkipBackwardIcon/>
                    </button> : null}
                <button type="button" className="hover:font-bold" onClick={props.prev}>Prev</button>
                <button type="button" className="px-2 mx-3 hover:bg-darkSecondary rounded" onClick={props.pause}>
                    <PauseIcon/>
                </button>
                <button type="button" className="hover:font-bold" onClick={props.next}>Next</button>
                {isRepsSets ?
                    <button type="button" className="ml-4 p-2 rounded hover:bg-darkSecondary"
                            onClick={props.skipExercise}>
                        <SkipForwardIcon/>
                    </button> : null}
            </div>
        </div>
    );
};

export default Controls;
