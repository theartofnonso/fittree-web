import React from "react";
import MockRight from "../src/components/views/mocks/MockRight";
import MockLeft from "../src/components/views/mocks/MockLeft";
import {APP_STORE_URL} from "../src/utils/utilsConstants";
import InstagramIcon from "../src/components/svg/instagram-primary-line.svg";
import TwitterIcon from "../src/components/svg/twitter-primary-line.svg";
import FittrBigIcon from "../src/components/svg/fittr.svg";
import FittrSmallIcon from "../src/components/svg/fittr_small.svg";
import Link from "next/link";
import {withSSRContext} from "aws-amplify";

export default function App({authenticated}) {

    return (
        <div className="container mx-auto">
            <div className="mx-8 sm:mx-10 flex flex-row items-center place-content-between">
                <div>
                    <Link href="/">
                        <a className="lg:hidden">
                            <FittrSmallIcon/>
                        </a>
                    </Link>
                    <Link href="/">
                        <a className="hidden lg:block">
                            <FittrBigIcon/>
                        </a>
                    </Link>
                </div>
                <div className="flex flex-row h-10 bg-primary rounded-3xl place-content-between">
                    {authenticated ?
                        <Link href="/admin">
                            <a
                                className="flex flex-row items-center font-medium text-secondary text-sm rounded-3xl h-full pl-5 pr-5 cursor-pointer hover:bg-darkPrimary">
                                Admin
                            </a>
                        </Link> :
                        <>
                            <Link href="/signin">
                                <a className="flex flex-row items-center font-medium text-primary text-sm rounded-3xl h-full bg-secondary hover:bg-darkSecondary px-4 cursor-pointer z-10">
                                    Sign In
                                </a>
                            </Link>
                            <Link href="/signup">
                                <a
                                    className="flex flex-row items-center font-medium text-secondary text-sm rounded-r-3xl h-full pl-5 pr-5 cursor-pointer hover:bg-darkPrimary -ml-4">
                                    Sign Up
                                </a>
                            </Link>
                        </>}
                </div>
            </div>

            <div className="flex flex-col items-center my-2 sm:my-4">
                <div className="flex flex-col items-center">
                    <p className="font-bold text-2xl sm:text-4xl">Your workouts</p>
                    <p className="font-bold text-2xl sm:text-4xl">everywhere you go</p>
                    <p className="font-normal text-xs my-1.5">Create, share and play workouts on any device</p>
                </div>
                <Link href={APP_STORE_URL}>
                    <a className="bg-primary rounded-3xl py-2 px-10 mt-6 text-white font-medium hover:bg-darkPrimary">
                        Get it on IOS
                    </a>
                </Link>
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
            <div className="flex flex-col mx-8">
                <div className="p-4 bg-secondary rounded-sm text-primary my-2">
                    <p className="text-xl font-semibold mb-1">What is Fittree ?</p>
                    <p className="text-justify">Fittree is a link to your workouts.
                        All you need is a fittree.io/username to create awesome workouts and share them with your community.
                    </p>
                </div>
                <div className="p-4 bg-secondary rounded-sm text-primary my-2">
                    <p className="text-xl font-semibold mb-1">Why do I need Fittree ?</p>
                    <p className="text-justify">It is simple, Fittree is a fit-for-purpose platform for workouts you have to share with your
                        community.</p>
                </div>
                <div className="p-4 bg-secondary rounded-sm text-primary mt-2">
                    <p className="text-xl font-semibold mb-1">How can I share my workouts ?</p>
                    <p className="text-justify">All you need is a fittree.io/username link.</p>
                </div>
            </div>
            <div className="flex flex-row my-4 mx-6 sm:mx-8 place-content-between">
                <div>
                    <p className="font-medium">hello@fittree.io</p>
                </div>
                <div className="flex flex-row place-content-around">
                    <Link href="https://instagram.com/fittree.io">
                        <a target="_blank" className="mx-2">
                            <InstagramIcon/>
                        </a>
                    </Link>
                    <Link href="https://twitter.com/fittreeio">
                        <a target="_blank" className="mx-2">
                            <TwitterIcon/>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {

    const {Auth} = withSSRContext(context)

    try {

        await Auth.currentAuthenticatedUser()

        return {
            props: {
                authenticated: true,
            }
        }

    } catch (err) {
        return {
            props: {
                authenticated: false,
            }
        }
    }
}
