/* eslint-disable */
import React from "react";
import PageDescription from "./PageDescription";

const DiscoveryHub = ({videos, tag}) => {

    const getThumbnailUrl = (video) => video.snippet.thumbnails.high.url

    return (
        <div>
            <PageDescription title="Video Recommendations" description={`Find videos for ${tag}`}/>
            <div
                className={`flex flex-row justify-start rounded-md overflow-x-auto mt-4`}>
                {videos.map((video, index) => {
                    return (
                        <img src={getThumbnailUrl(video)} alt="Display profile" key={index} className="h-52 mr-1 rounded-md"/>
                    )
                })}
            </div>
        </div>
    );
};

export default DiscoveryHub;
