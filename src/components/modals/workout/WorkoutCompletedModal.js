import React from 'react';
import CheckIcon from "../../../assets/svg/check.svg";

const WorkoutCompletedModal = props => {

    /**
     * calculate workout duration
     * @returns {string}
     */
    const calculateWorkoutDuration = () => {
        const startTime = props.startTime;
        const endTime = Date.now();
        const difference = (endTime - startTime) / 1000
        return toReadableTime(difference)
    };

    /**
     * Convert date to readable format
     * @param difference
     * @returns {string}
     */
    const toReadableTime = (difference) => {
        /* extend the String by using prototypical inheritance */
        let seconds = parseInt(difference, 10); // don't forget the second param
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds - (hours * 3600)) / 60);
        seconds = seconds - (hours * 3600) - (minutes * 60);

        return minutes > 1 ? minutes + ' min(s)' : ' less than a min';
    }

    return (
        <div
            className="px-5 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-full w-screen flex flex-col items-center bg-white">
            <div className="flex flex-col items-center justify-center h-full">
                <CheckIcon/>
                <p className="mt-4 font-medium">It took you {calculateWorkoutDuration()}</p>
            </div>
            <button
                type="button"
                onClick={props.navigateToWorkoutPreview}
                className="absolute bottom-0 mb-10 bg-primary rounded-3xl py-2 px-10 mt-6 text-white font-medium hover:bg-darkPrimary">Close
                Workout
            </button>
        </div>
    );
};

export default WorkoutCompletedModal;
