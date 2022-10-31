import React, {useState} from "react";
import FittrSmallIcon from "../src/components/svg/fittr_small.svg";
import FittrBigIcon from "../src/components/svg/fittr.svg";
import CheckIcon from "../src/components/svg/check-fill.svg";
import Loading from "../src/components/utils/Loading";
import {isEmailValid} from "../src/utils/general/utils";
import VerifyAuth from "../src/components/modals/auth/verifyauth";
import {getUserFromDB, persistUserToDB, retrieveCognitoUser} from "../src/utils/aws-utils/awsHelperFunctions";
import {Auth} from "aws-amplify";
import {useRouter} from "next/router";
import Link from "next/link";

export default function SignIn() {

    const router = useRouter()

    const [email, setEmail] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [cognitoUser, setCognitoUser] = useState(null);

    /**
     * Check that the entered email is a valid format
     * @param value
     */
    const onEnterEmailHandler = value => {
        setEmail(value.trim());

        if (value.length === 0) {
            setErrorMessage("");
            return;
        }

        const isValid = isEmailValid(value);
        if (isValid) {
            setErrorMessage("");
        } else {
            setErrorMessage("Email is invalid, please check your email");
        }
    };

    /**
     * Sign In new subscriber with email
     * @returns {Promise<void>}
     */
    const signInHandler = async () => {

        setIsLoading(true);

        if (email.trim().length === 0) {
            showAlert("Please provide an email");
            return;
        }

        try {
            const user = await retrieveCognitoUser(email);
            if (user) {
                if (!user.Enabled) {
                    setIsLoading(false);
                    setErrorMessage("Your account has been disabled, please contact dev@fittree.io");
                } else {
                    const currentUser = await Auth.signIn(email);
                    setCognitoUser(currentUser);
                    setIsLoading(false);
                }
            }
        } catch (err) {
            setIsLoading(false);
            setErrorMessage("You don't seem to have a Fittree account, please sign up instead");
        }

    };

    /**
     * Display alert for empty sign field information
     */
    const showAlert = message => {
        alert(message);
    };

    /**
     * Close the VerifyAuthModal
     */
    const onCloseVerifyAuthModalHandler = async () => {
        setCognitoUser(null);
    };

    /**
     * Verify authentication
     * @param verifiedUser
     */
    const onVerifyAuthHandler = async verifiedUser => {

        try {
            const user = await getUserFromDB(email);
            if (!user) {
                await persistUserToDB(verifiedUser.attributes);
            }
            await router.replace('/admin')
        } catch (err) {
            console.log(err)
            // Do something
        }

    };

    /**
     * Refresh the cognito subscriber by sending a new sign in request
     * @param user
     */
    const onRefreshCognitoUserHandler = user => {
        setCognitoUser(user);
    };

    return (
        <div className="container mx-auto p-4 h-screen">
            <div className="flex flex-row items-center">
                <div className="-ml-3">
                    <Link href="/" className="lg:hidden">
                        <FittrSmallIcon/>
                    </Link>
                    <Link href="/" target="_blank" className="hidden lg:block">
                        <FittrBigIcon/>
                    </Link>
                </div>
            </div>
            <p className="text-lg sm:text-2xl md:text-3xl font-light leading-7 sm:leading-10">
                Sign in to continue <span className="font-bold">creating</span>
                <span className="font-bold block"> and sharing <span className="font-light">workouts</span></span>
            </p>
            <form className="mt-4 flex flex-col items-end">
                <input
                    className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="search"
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={event => onEnterEmailHandler(event.target.value.toLowerCase())}/>
                {errorMessage.length > 0 ? <p className="text-red my-2">{errorMessage} </p> : null}
                <button
                    type="button"
                    onClick={signInHandler}
                    className="mt-4 bg-primary rounded-3xl py-2 px-4 w-1/6 text-white font-medium hover:bg-darkPrimary hidden sm:block">Sign
                    in
                </button>
            </form>
            <p className="text-center mt-8 font-light">Don't have a Fittree account? <Link href="/signup"
                                                                                        className="cursor-pointer"><span
                className="font-bold">Sign up</span></Link></p>
            <Link href="/" className="cursor-pointer">
                <span className="text-center mt-4 font-light block">Go to home</span>
            </Link>
            <button
                type="button"
                onClick={signInHandler}
                className="flex flex-row items-center justify-center bg-primary rounded-md w-14 h-14 sm:w-20 sm:h-20 fixed bottom-0 right-0 mr-8 mb-8 hover:bg-darkPrimary sm:hidden">
                <CheckIcon/>
            </button>
            {isLoading ? <Loading message={"Signing you in"}/> : null}
            {cognitoUser ? (
                <VerifyAuth
                    onclose={onCloseVerifyAuthModalHandler}
                    onVerify={onVerifyAuthHandler}
                    cognitoUser={cognitoUser}
                    onRefreshCognitoUser={onRefreshCognitoUserHandler}
                    email={email}
                />
            ) : null}
        </div>
    )
}
