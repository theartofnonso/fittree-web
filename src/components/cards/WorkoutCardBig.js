import React from 'react';

const WorkoutCardBig = ({workout}) => {

    return (
        <div
            className={`relative h-96 rounded-lg flex flex-col justify-end text-white overflow-hidden`}>
            <img src={"https://" + workout.thumbnailUrl} alt="Display profile" className="object-cover h-full w-full"/>
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack"/>
            <div className="absolute top-0 right-0 m-2 py-0.5 px-2 rounded-md bg-primary text-xs font-medium">
                <p>{Math.round(workout.duration / 60000)} mins</p>
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
        </div>
    );
};

export default WorkoutCardBig;
