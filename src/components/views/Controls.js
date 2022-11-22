/* eslint-disable */
import React from "react";

const Controls = (props) => {

    return (
        <div
            className="flex flex-row bg-primary justify-center w-48 rounded-md space-x-10 py-2 px-2 text-white font-semibold">
            <button type="button" className="" onClick={props.seekBackward}>Prev</button>
            <button type="button" className="" onClick={props.seekForward}>Next</button>
        </div>
    );
};

export default Controls;
