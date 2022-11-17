/* eslint-disable */
import React from "react";
import Socials from "./Socials";
import Avatar from "./Avatar";

const Profile = ({user}) => {

    return (
        <>
            <div className="flex flex-col items-center">
                <Avatar user={user} uri={user.displayProfile}/>
                <p className="font-semibold text-base md:text-lg">{user.preferred_username}</p>
                <p className="font-light py-1 text-sm md:text-base text-center break-words whitespace-pre-line">{user.displayBrief}</p>
            </div>
            <div className="flex flex-row justify-center items-center px-4">
                <Socials profile={user}/>
            </div>
        </>
    );
};

export default Profile;
