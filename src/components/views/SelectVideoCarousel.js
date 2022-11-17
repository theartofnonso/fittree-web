/* eslint-disable */
import React from "react";
import EditIcon from "../../assets/svg/edit-2-line-white.svg";
import DeleteIcon from "../../assets/svg/delete-bin-white-line.svg";
import AddIcon from "../../assets/svg/add-line-white.svg";

const SelectVideoCarousel = ({videos}) => {

    return (
        <div
            className={`flex flex-row rounded-md h-96 overflow-x-auto`}>
            {videos.map((video, index) => {
                return (
                    <div
                        className={`relative flex-none sm:flex-1 rounded-md w-5/6 sm:w-full h-full object-cover ${index !== 0 && index !== videos.length - 1 ? "mx-1" : null}`}>
                        <video key={index}
                               autoPlay
                               playsInline loop>
                            <source src={`https://${video}`} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                        <div
                            className="flex flex-row items-center justify-center absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack hover:bg-transparentBlack1">
                            {video ?
                                <div className="flex flex-row">
                                    <button
                                        type="button"
                                        className="flex flex-row items-center justify-center mx-4">
                                        <EditIcon/>
                                    </button>
                                    <button
                                        type="button"
                                        className="flex flex-row items-center justify-center mx-4">
                                        <DeleteIcon/>
                                    </button>
                                </div>
                                :
                                <button
                                    type="button"
                                    className="flex flex-row items-center justify-center">
                                    <AddIcon/>
                                </button>}
                        </div>
                        <input type='file' id='file' accept="image/png, image/jpeg"
                               style={{display: 'none'}}/>
                    </div>
                )
            })}
        </div>
    );
};

export default SelectVideoCarousel;
