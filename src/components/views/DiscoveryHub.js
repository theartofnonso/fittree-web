/* eslint-disable */
import React from "react";
import CloseIcon from "../../assets/svg/close-line.svg";
import Link from "next/link";
import EmptyState from "../../assets/svg/empty_state.svg";

const YoutubeDiscoveryHub = ({videos, label, onClose}) => {

    const spanCols = [2, 5, 8]

    return (
        <div
            className=" pb-4 px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 w-full overflow-y-auto bg-white">
            <div className="my-4 flex flex-row place-content-between">
                <div className="cursor-pointer" onClick={onClose}>
                    <CloseIcon/>
                </div>
            </div>
            <div className="my-4">
                <p className={`text-lg sm:text-2xl md:text-3xl font-medium`}>Video Recommendations</p>
                <p className={`text-sm sm:text-md md:text-lg font-normal`}>{`Find videos for ${label}`}</p>
            </div>

            {videos.length ?
                <div className="grid gap-1 grid-cols-2 sm:grid-cols-4">
                    {videos.map((video, index) => {
                        return (
                            <Link href={`https://www.youtube.com/watch/${video.id.videoId}`}>
                                <a target="_blank"
                                   className={`rounded-md overflow-hidden cursor-pointer ${spanCols.includes(index) ? "col-span-2 sm:col-auto" : ""}`}>
                                    <img src={video.snippet.thumbnails.high.url} alt="Thumbnail"
                                         className="rounded-md object-contain hover:bg-primary"/>
                                </a>
                            </Link>
                        )
                    })}
                </div> : <div className="flex flex-col justify-center items-center h-screen">
                    <EmptyState/>
                    <p className="font-normal mt-4">{`We can't find videos for ${label}`}</p>
                </div>}
        </div>
    );
};

export default YoutubeDiscoveryHub;
