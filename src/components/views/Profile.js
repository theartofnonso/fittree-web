/* eslint-disable */
import React from "react";
import Avatar from "./Avatar";

const Profile = ({username}) => {

    return (
        <div className="flex flex-col items-center">
            <Avatar username={username}/>
            <p className="font-semibold text-base md:text-lg">{username}</p>
        </div>
    );
};

export default Profile;
