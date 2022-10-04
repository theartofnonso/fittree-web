import React from 'react';

const WorkoutCard = ({workout}) => {

    console.log(workout.thumbnailUrl)

    return (
        <div className={`bg-center bg-[url(https://${workout.thumbnailUrl})] h-60 sm:h-80 bg-cover rounded-md`}>
            <div className="">
                <div className="">{Math.round(workout.duration / 60000)} mins</div>
                <div className="flex flex-col items-start">
                    <p>{workout.title}</p>
                    <p>{workout.intensityLevel}</p>
                </div>
            </div>
        </div>
    );
};

export default WorkoutCard;
