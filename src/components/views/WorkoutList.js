/* eslint-disable */
import React, {useState} from "react";
import WorkoutCard from "../cards/WorkoutCard";
import EmptyState from "../svg/empty_state.svg";
import {sortWorkouts} from "../../utils/workout/workoutsHelperFunctions";
import PreviewWorkout from "../modals/workout/PreviewWorkout";

const WorkoutList = ({emptyListMessage, workouts, exercises, showDuration}) => {

    const [currentWorkout, setCurrentWorkout] = useState(null)

    /**
     * Preview a workout from the list
     */
    const previewWorkout = (selectedWorkout) => {
        const enrichedWorkout = {
            ...selectedWorkout,
            workoutExercises: sortWorkouts(selectedWorkout, exercises),
        };
        setCurrentWorkout(enrichedWorkout);
    }

    /**
     * Close the preview modal
     */
    const closePreview = () => {
        setCurrentWorkout(null)
    }

    return (
        <>
            <p className="text-sm sm:text-md md:text-lg font-light">{`${workouts.length} workouts`}</p>
            {workouts.length > 0 ?
                <div className="mt-1 grid gap-0.5 grid-cols-2 sm:grid-cols-3">
                    {workouts.map((item, index) => {
                        return (
                            <div key={index} onClick={() => previewWorkout(item)}>
                                <WorkoutCard workout={item} showDuration={showDuration}/>
                            </div>
                        );
                    })}
                </div> :
                <div className="flex flex-col justify-center items-center h-screen">
                    <EmptyState/>
                    <p className="font-normal mt-4">{emptyListMessage}</p>
                </div>}
            <PreviewWorkout
                workout={currentWorkout}
                close={closePreview}/>
        </>
    );
};

export default WorkoutList;
