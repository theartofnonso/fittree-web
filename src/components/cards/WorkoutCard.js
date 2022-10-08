import React from 'react';

const WorkoutCard = ({workout}) => {

    console.log(workout.thumbnailUrl)

    return (
        <div className={`relative bg-[url(https://d2ez6lox3k9lt0.cloudfront.net/public/Thumbnails/EyWL2QZSw7ci0Xu6UamE0IbH6920mMVaXWqaeni7awKMaVe4wb.jpg)] h-60 bg-no-repeat bg-cover bg-center rounded-lg p-2 flex flex-col justify-end text-white overflow-hidden hover:bg-transparentBlack`}>
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack"/>
            <div className="absolute top-0 right-0 m-2 py-0.5 px-2 rounded-md bg-primary text-xs font-medium">
                <p>{Math.round(workout.duration / 60000)} mins</p>
            </div>
            <div className="absolute flex flex-col items-start">
                <p className="font-bold text-left">{workout.title}</p>
                <p className="text-sm">{workout.intensityLevel}</p>
            </div>
        </div>
    );
};

export default WorkoutCard;
