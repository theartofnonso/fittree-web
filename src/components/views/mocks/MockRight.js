import React from 'react';

const MockRight = (props) => {

    return (
        <div className="flex flex-col sm:flex-row items-center sm:w-3/5 sm:place-content-between">
            <div className="flex flex-col items-center sm:items-start w-80">
                <p className="font-Montserrat font-bold text-2xl sm:text-4xl">{props.headerOne}</p>
                <p className="font-Montserrat font-bold text-2xl sm:text-4xl">{props.headerTwo}</p>
                <p className="font-Montserrat font-normal text-md my-1.5">{props.bodyOne}</p>
                <p className="font-Montserrat font-normal text-md my-1.5">{props.bodyTwo}</p>
            </div>
            <div className="w-full">
                <img src={props.url}  alt='Image of phone'/>
            </div>
        </div>
    )
}

export default MockRight
