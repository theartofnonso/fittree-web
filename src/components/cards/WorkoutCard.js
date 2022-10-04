import React from 'react';

const WorkoutCard = ({workout}) => {

    return (
        <div className={`bg-[url(https://${workout.thumbnailUrl})] h-60 sm:h-80 bg-cover bg-center rounded-md`}>
            <p>dfsfda</p>
            <p>dfsfda</p>
            <p>dfsfda</p>
            <p>dfsfda</p>
            {/*<div className="bg-primary opacity-25 h-full w-full "/>*/}
            {/*<div className="absolute bg-primary">*/}
            {/*    <div>{Math.round(workout.duration / 60000)} mins</div>*/}
            {/*    <div className="flex flex-col items-start">*/}
            {/*        <p>{workout.title}</p>*/}
            {/*        <p>{workout.intensityLevel}</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default WorkoutCard;
