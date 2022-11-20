/* eslint-disable */
import React from "react";
import PauseIcon from "../../assets/svg/pause-mini-line.svg";

const Controls = (props, isPaused) => {

    return (
        <div className="my-8 flex flex-row justify-center">
            <div className="flex flex-row items-center bg-primary rounded-md py-2 px-4 text-white font-semibold">
                <button type="button" className="mr-2" onClick={props.seekBackward}>
                    Prev
                </button>
                {isPaused ?
                    <button type="button" className="mx-2" onClick={props.pause}>
                        <PauseIcon/>
                    </button> : null}
                <button type="button" className="mx-2" onClick={props.seekForward}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Controls;
