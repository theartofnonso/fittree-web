import React from "react";
import MockRight from "../src/components/views/mocks/MockRight";
import MockLeft from "../src/components/views/mocks/MockLeft";
import {APP_STORE_URL} from "../src/utils/utilsConstants";
import InstagramIcon from "../src/components/svg/instagram-primary-line.svg";
import TwitterIcon from "../src/components/svg/twitter-primary-line.svg";
import FittrBigIcon from "../src/components/svg/fittr.svg";
import FittrSmallIcon from "../src/components/svg/fittr_small.svg";

export default function App() {

    return (
        <div className="container mx-auto">
            <div className="ml-8 sm:ml-10">
                <a rel="noreferrer" href="/" target="_blank" className="lg:hidden">
                    <FittrSmallIcon/>
                </a>
                <a rel="noreferrer" href="/" target="_blank" className="hidden lg:block">
                    <FittrBigIcon/>
                </a>
            </div>

            <div className="flex flex-col items-center my-2 sm:my-4">
                <div className="flex flex-col items-center">
                    <p className="font-bold text-2xl sm:text-4xl">Your workouts</p>
                    <p className="font-bold text-2xl sm:text-4xl">everywhere you go</p>
                    <p className="font-normal text-xs my-1.5">Create, share and play workouts on any device</p>
                </div>
                <a rel="noreferrer" href={APP_STORE_URL} target="_blank"
                   className="bg-primary rounded-3xl py-2 px-10 mt-6 text-white font-medium">Get it on
                    IOS</a>
            </div>

            <div className="flex flex-col items-center">
                <MockRight
                    url={"https://d2ez6lox3k9lt0.cloudfront.net/public/fitpin-public/mocks/create_exercise.png"}
                    headerOne="Create 5 secs"
                    headerTwo="exercise videos"
                    bodyOne="Shoot 5 seconds videos"
                    bodyTwo="to demonstrate an exercise"/>
                <MockLeft
                    url={"https://d2ez6lox3k9lt0.cloudfront.net/public/fitpin-public/mocks/curate_workouts.png"}
                    headerOne="Curate exercises"
                    headerTwo="into workouts"
                    bodyOne="Curate various exercises into"
                    bodyTwo="workouts of Circuits or Reps and Sets"/>
                <MockRight
                    url={"https://d2ez6lox3k9lt0.cloudfront.net/public/fitpin-public/mocks/go_live.png"}
                    headerOne="Go live"
                    headerTwo=""
                    bodyOne="launch your workouts"
                    bodyTwo="with an improved experience"/>
            </div>
            <div className="flex flex-col mx-6 sm:mx-8">
                <button
                    className="accordion bg-primary w-full text-start px-3 py-5 my-2 rounded-lg font-semibold text-md text-white">What
                    is Fittree ?
                </button>
                <div className="p-3">
                    <p>Fittree is a link to your workouts.
                        All you need is a fittree.io/username to share with everyone, everywhere.
                        Create awesome workouts and share them with your followers, clients, brand partners etc.
                        Take your link everywhere your fitness brand exists.</p>
                </div>

                <button
                    className="accordion bg-primary w-full text-start px-3 py-5 my-2 rounded-lg font-semibold text-md text-white">Why
                    do I need Fittree ?
                </button>
                <div className="p-3">
                    <p>It is simple, you have a brand (sense of value and reputation) to build, and we have the means to
                        help you achieve that. Fittree is a fit-for-purpose link to the value you have to offer to your
                        community.</p>
                </div>

                <button
                    className="accordion bg-primary w-full text-start px-3 py-5 my-2 rounded-lg font-semibold text-md text-white">How
                    can I share my workouts ?
                </button>
                <div className="p-3">
                    <p>All you need is a fittree.io/username link.</p>
                </div>
            </div>
            <div className="flex flex-row my-4 mx-6 sm:mx-8 place-content-between">
                <div>
                    <p className="font-medium">hello@fittree.io</p>
                </div>
                <div className="flex flex-row place-content-around">
                    <div className="mx-2">
                        <InstagramIcon/>
                    </div>
                    <div className="mx-2">
                        <TwitterIcon/>
                    </div>
                </div>
            </div>
        </div>
    );
}
