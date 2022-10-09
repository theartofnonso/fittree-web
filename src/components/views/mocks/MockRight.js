import React from 'react';

const MockRight = (props) => {

    return (
        <div className="flex flex-col sm:flex-row items-center sm:w-5/6 sm:place-content-around my-8 sm:my-2">
            <div className="flex flex-col items-center sm:items-start w-80">
                <p className="font-bold text-2xl sm:text-4xl">{props.headerOne}</p>
                <p className="font-bold text-2xl sm:text-4xl">{props.headerTwo}</p>
                <div className="mt-1.5 flex flex-col items-center sm:items-start w-full">
                    <p className="font-normal text-sm">{props.bodyOne}</p>
                    <p className="font-normal text-sm">{props.bodyTwo}</p>
                </div>
            </div>
            <div className="w-3/5 sm:w-1/3">
                <img src={props.url} alt='Image of phone'/>
            </div>
        </div>
    )
}

export default MockRight
