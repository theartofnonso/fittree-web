import React, {useEffect, useState} from "react";
import FittrSmallIcon from "../../../assets/svg/fittr_small.svg";
import FittrBigIcon from "../../../assets/svg/fittr.svg";
import Loading from "../../utils/Loading";
import awsConstants from "../../../utils/aws-utils/awsConstants";
import {Auth} from "aws-amplify";
import Link from "next/link";
import {intervalDurationSummary} from "../../../utils/workout/workoutsHelperFunctions";

const TIME_LEFT = 180000;

export default function VerifyAuth(props) {

    let intervalId = 0;

    const [isLoading, setIsLoading] = useState(false);

    const [enteredCode, setEnteredCodeCode] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [timeLeft, setTimeLeft] = useState(TIME_LEFT);

    /**
     * Countdown the time left before allowing user request another auth code
     */
    useEffect(() => {
        intervalId = setInterval(() => {
            setTimeLeft(prevValue => {
                if (prevValue > 0) {
                    return prevValue - 1000;
                } else {
                    clearInterval(intervalId)
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    /**
     * Verify that entered code is same as verification code sent in email
     * @param value
     */
    const onEnterCodeHandler = value => {
        setEnteredCodeCode(value);
        if (value.length === 4) {
            setIsLoading(true);
            const timeoutID = setTimeout(() => {
                setIsLoading(false);
            }, awsConstants.duration.THIRTY_SECONDS);
            Auth.sendCustomChallengeAnswer(props.cognitoUser, value)
                .then(response => {
                    return Auth.currentAuthenticatedUser();
                })
                .then(cognitoUser => {
                    clearTimeout(timeoutID);
                    props.onVerify(cognitoUser);
                })
                .catch(err => {
                    clearTimeout(timeoutID);
                    setIsLoading(false);
                    switch (err.code) {
                        case awsConstants.awsCognitoAuth.error.INVALID_OTP:
                            setErrorMessage(
                                awsConstants.awsCognitoAuth.error.message.INVALID_OTP,
                            );
                            break;
                        case awsConstants.awsCognitoAuth.error.INVALID_SESSION:
                            setErrorMessage(
                                awsConstants.awsCognitoAuth.error.message.INVALID_SESSION,
                            );
                            break;
                        default:
                            setErrorMessage(
                                awsConstants.awsCognitoAuth.error.message.NO_USER,
                            );
                    }
                });
        } else {
            setErrorMessage("");
        }
    };

    /**
     * Attempt to sign in
     */
    const resendAuthCode = async () => {
        if (timeLeft === 0) {
            setTimeLeft(TIME_LEFT)
            setEnteredCodeCode("");
            setErrorMessage("");
            const user = await Auth.signIn(props.email);
            props.onRefreshCognitoUser(user);
        }
    };

    /**
     * Close auth verification
     */
    const closeAuth = () => {
        clearInterval(intervalId);
        props.onclose();
    };
    return (
        <div className="container mx-auto p-4 fixed top-0 right-0 bottom-0 left-0 h-full w-screen bg-white">
            <div className="flex flex-row items-center">
                <div className="-ml-3">
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
            </div>
            <p className="text-lg sm:text-2xl md:text-3xl font-light leading-7 sm:leading-10">
                We have emailed you with a <span className="font-bold">4 digit code</span>
            </p>
            <form className="mt-4 flex flex-col items-end">
                <input
                    className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="search"
                    type="text"
                    placeholder="Enter code"
                    value={enteredCode}
                    onChange={event => onEnterCodeHandler(event.target.value.toLowerCase())}/>
                {errorMessage.length > 0 ? <p className="text-red my-2">{errorMessage} </p> : null}
            </form>
            {timeLeft === 0 ?
                <button type="button" className="text-center mt-4 font-light block" onClick={resendAuthCode}>Request new code </button> :
                <p className="text-left mt-4 font-light block">wait <span className="font-semibold">{intervalDurationSummary(timeLeft)}</span> until next code</p>
            }

            <button type="button" className="text-center mt-4 font-light block hover:font-semibold" onClick={closeAuth}>Cancel</button>
            {isLoading ? <Loading message={"Verifying you"}/> : null}
        </div>
    )
}
