/* eslint-disable */
import React from "react";

const Tags = ({items, title, emptyState, containerStyle}) => {

    return (
        <div className={containerStyle || "mb-4"}>
            {title ? <p className="font-semibold">{title}</p> : null}
            {items.length > 0 ?
                <div className="flex flex-row flex-wrap text-sm sm:text-xs font-medium">
                    {items.map((item, index) => <p key={index} className="mr-2">{item}</p>)}
                </div> :
                <p className="text-sm sm:text-xs font-medium">{emptyState}</p>}
        </div>
    );
};

export default Tags;
