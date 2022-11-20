import React from 'react';
import {workoutTagDisplay} from "../../../utils/workout/workoutsHelperFunctions";
import {useSelector} from "react-redux";
import {selectAuthUser} from "../../../features/auth/authUserSlice";
import Tags from "../Tags";

const WorkoutCardBig = ({workout}) => {

    const user = useSelector(selectAuthUser);

    return (
        <div
            className={`relative h-52 rounded-lg flex flex-col justify-end text-white overflow-hidden`}>
            <img src={workout.thumbnailUrl ? "https://" + workout.thumbnailUrl : "/wallpaper.jpg"} alt="Display profile"
                 className="object-cover lg:object-top h-full w-full"/>
            <div
                className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack"/>
            <div className="absolute top-0 right-0 m-2 py-0.5 px-2 rounded-full bg-primary text-xs font-medium">
                <p>{workoutTagDisplay(user !== null, workout)}</p>
            </div>
            <div className="absolute flex flex-col items-start pl-3 pb-3">
                <p className="font-bold text-left">{workout.title}</p>
                <p className="text-sm font-medium my-0.5">{workout.intensityLevel}</p>
                <Tags items={workout.bodyParts} emptyState={"No body parts trained"} containerStyle="flex flex-row text-sm overflow-x-scroll my-0.5"/>
                <Tags items={workout.equipments} emptyState={"No equipment"} containerStyle="flex flex-row text-sm overflow-x-scroll my-0.5"/>
            </div>
            {workout.thumbnailUrl ? <img src={"https://" + workout.thumbnailUrl} alt="Display profile"
                                         className="rounded-lg absolute right-0 bottom-0 mr-2 mb-2 h-24 w-24 hidden sm:block object-cover"/> : null}
        </div>
    );
};

export default WorkoutCardBig;
