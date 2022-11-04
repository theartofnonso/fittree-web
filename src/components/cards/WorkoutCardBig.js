import React from 'react';
import {workoutDurationSummary} from "../../utils/workout/workoutsHelperFunctions";

const WorkoutCardBig = ({workout}) => {

    return (
        <div
            className={`relative h-96 rounded-lg flex flex-col justify-end text-white overflow-hidden`}>
            <img src={"https://" + workout.thumbnailUrl} alt="Display profile" className="object-cover lg:object-top h-full w-full"/>
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack"/>
            <div className="absolute top-0 right-0 m-2 py-0.5 px-2 rounded-full bg-primary text-xs font-medium">
                <p>{workoutDurationSummary(workout.duration)}</p>
            </div>
            <div className="absolute flex flex-col items-start pl-2 pb-2">
                <p className="font-bold text-left">{workout.title}</p>
                <p className="text-sm font-medium my-0.5">{workout.intensityLevel}</p>
                <div className="flex flex-row text-sm overflow-x-scroll my-0.5">
                    {workout.bodyParts.map((item, index) => <p key={index} className="mr-2">{item}</p>)}
                </div>
                <div className="flex flex-row text-sm overflow-x-scroll my-0.5">
                    {workout.equipments.map((item, index) => <p key={index} className="mr-2">{item}</p>)}
                </div>
            </div>
            <img src={"https://" + workout.thumbnailUrl} alt="Display profile" className="rounded-lg absolute right-0 bottom-0 mr-2 mb-2 h-24 w-24 hidden sm:block"/>
        </div>
    );
};

export default WorkoutCardBig;
