/* eslint-disable */
import React from "react";

const Avatar = ({username}) => {

    /**
     * Display Avatar
     * @returns {JSX.Element}
     */
    const displayAvatar = () => {
        const initials = username.substring(0, 1).toUpperCase()
        return (<p className="text-3xl text-white font-semibold">{initials}</p>)
    };

    return (
        <div
            className="rounded-full w-24 h-24 overflow-hidden mb-2 bg-primary flex flex-row items-center justify-center">
            {displayAvatar()}
        </div>
    );
};

export default Avatar;
