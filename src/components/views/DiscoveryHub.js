/* eslint-disable */
import React from "react";
import PageDescription from "./PageDescription";

const DiscoveryHub = ({recommendation, tag}) => {

    return (
        <div>
            {/*<PageDescription title="Video Recommendations" description={`Find videos for ${tag.title}`}/>*/}
            {/*<div*/}
            {/*    className={`flex flex-row justify-start rounded-md overflow-x-auto mt-4`}>*/}
            {/*    {recommendation.items.map((video, index) => {*/}
            {/*        return (*/}
            {/*            <iframe key={index} title={video.id.videoId} src={`https://www.youtube.com/embed/${video.id.videoId}`} className="h-52 mr-1 rounded-md"/>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    );
};

export default DiscoveryHub;
