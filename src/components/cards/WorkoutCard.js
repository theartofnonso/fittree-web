import React from 'react';

const WorkoutCard = ({workout}) => {

    return (
        <div className={`relative bg-[url(https://${workout.thumbnailUrl})] h-60 bg-no-repeat bg-cover bg-center rounded-lg p-2 flex flex-col justify-end text-white`}>
            <div className="absolute top-0 right-0 m-2 py-0.5 px-2 rounded-md bg-primary text-xs font-medium">
                <p>{Math.round(workout.duration / 60000)} mins</p>
            </div>
            <div className="flex flex-col items-start">
                <p className="font-bold text-left">{workout.title}</p>
                <p className="text-sm">{workout.intensityLevel}</p>
            </div>
        </div>
    );
};

export default WorkoutCard;
