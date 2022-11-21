/* eslint-disable */
import React from "react";
import PauseIcon from "../../assets/svg/pause-mini-line.svg";
import PlayIcon from "../../assets/svg/play-mini-fill.svg";

const Controls = (props) => {

    console.log(props.isPlaying)

    return (
        <div className="flex flex-row bg-primary justify-center w-52 m-auto rounded-md">
            <div className="flex flex-row items-center py-2 px-4 text-white font-semibold">
                <button type="button" className="mr-2" onClick={props.seekBackward}>
                    Prev
                </button>
                {props.isPlaying ?
                    <button type="button" className="mx-2" onClick={props.pause}>
                        <PauseIcon/>
                    </button> :
                    <button type="button" className="mx-2" onClick={props.play}>
                        <PlayIcon/>
                    </button>}
                <button type="button" className="mx-2" onClick={props.seekForward}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Controls;
