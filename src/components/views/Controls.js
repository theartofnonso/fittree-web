/* eslint-disable */
import React from "react";
import PauseIcon from "../../assets/svg/pause-mini-line.svg";

const Controls = (props) => {

    return (
        <div className="flex flex-row bg-primary justify-center w-48 rounded-full space-x-4 py-2 px-3 text-white font-semibold">
            <button type="button" className="" onClick={props.seekBackward}>Prev</button>
                <button type="button" className="mx-2" onClick={props.pause}>
                    <PauseIcon/>
                </button>
            <button type="button" className="" onClick={props.seekForward}>Next</button>
        </div>
    );
};

export default Controls;
