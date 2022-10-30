import React, {useState} from "react";
import FittrSmallIcon from "../src/components/svg/fittr_small.svg";
import FittrBigIcon from "../src/components/svg/fittr.svg";
import CheckIcon from "../src/components/svg/check-fill.svg";
import Loading from "../src/components/utils/Loading";
import {isEmailValid, onlyPeriodsUnderscore} from "../src/utils/general/utils";
import {APP_NAME} from "../src/utils/utilsConstants";
import VerifyAuth from "../src/components/modals/auth/verifyauth";
import {
    deleteCognitoUser,
    doesPreferredUsernameExists,
    persistUserToDB,
    retrieveCognitoUser
} from "../src/utils/aws-utils/awsHelperFunctions";
import {Auth} from "aws-amplify";
import awsConstants from "../src/utils/aws-utils/awsConstants";
import {useRouter} from "next/router";

export default function SignUp() {

    const router = useRouter()

    const [email, setEmail] = useState("");

    const [preferredUsernameName, setPreferredUsernameName] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [cognitoUser, setCognitoUser] = useState(null);

    const [canUsePreferredUsername, setCanUsePreferredUsername] = useState(false);

    const [canUseEmail, setCanUseEmail] = useState(false);

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
            checkIfUsernameExists(value);
        } else {
            setErrorMessage("Email is invalid, please check your email");
        }
    };

    /**
     * Check that the entered fit name is a valid format
     * @param value
     */
    const onEnterFitNameHandler = value => {
        setPreferredUsernameName(value);
        const isWithinRange = value.trim().length >= 4;
        const isValidPattern = onlyPeriodsUnderscore(value.trim());

        if (value.length === 0) {
            setErrorMessage("");
            return;
        }

        if (!isWithinRange) {
            setErrorMessage("Username must be at least 4 characters and not more than 15");
        } else if (!isValidPattern) {
            setErrorMessage("Username can only include words, periods and underscores");
        } else {
            setErrorMessage("");
            checkIfPreferredUsernameExists(value);
        }
    };

    /**
     * Check if chosen name is FitPin proprietary
     */
    const isProprietaryName = value => value.toLowerCase() === APP_NAME;

    /**
     * Sign Up new subscriber with email
     * @returns {Promise<void>}
     */
    const signUpHandler = async () => {
        if (preferredUsernameName.trim().length === 0) {
            showAlert("Please provide a username");
            return;
        }

        if (preferredUsernameName.trim().length < 4) {
            showAlert("Username must be at least 4 characters and not more than 15");
            return;
        }

        if (email.trim().length === 0) {
            showAlert("Please provide an email");
            return;
        }

        if (isProprietaryName(preferredUsernameName)) {
            setErrorMessage("Fittree is a proprietary name");
            return;
        }

        if (canUsePreferredUsername && canUseEmail) {
            await signUpHelper();
        }
    };

    /**
     * Check if preferred username already exists
     */
    const checkIfPreferredUsernameExists = (preferredUsernameName) => {
        doesPreferredUsernameExists(preferredUsernameName).then(isExisting => {
            if (isExisting) {
                setErrorMessage(preferredUsernameName + " is has been taken");
                setCanUsePreferredUsername(false);
            } else {
                setErrorMessage("");
                setCanUsePreferredUsername(true);
            }
        });
    };

    /**
     * Check if username (email) already exists
     */
    const checkIfUsernameExists = (email) => {
        retrieveCognitoUser(email)
            .then(_ => {
                setErrorMessage(email + " already exists");
                setCanUseEmail(false);
            }).catch(_ => {
            setErrorMessage("");
            setCanUseEmail(true);
        });
    };

    /**
     * Sign up user
     */
    const signUpHelper = async () => {
        setIsLoading(true);
        try {
            await Auth.signUp({
                username: email,
                password: awsConstants.awsCognitoAuth.PLACEHOLDER_PASSWORD, // Password isn't used
                attributes: {
                    email: email.toLowerCase(),
                    preferred_username: preferredUsernameName,
                },
            });
            const signedInUser = await Auth.signIn(email);
            setCognitoUser(signedInUser);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
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
        await deleteCognitoUser(email)
        setCognitoUser(null);
    };

    /**
     * Verify authentication
     * @param verifiedUser
     */
    const onVerifyAuthHandler = async verifiedUser => {

        try {
            await persistUserToDB(verifiedUser.attributes);
            await router.replace('/admin')
        } catch (err) {
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
                    <a rel="noreferrer" href="/" className="lg:hidden">
                        <FittrSmallIcon/>
                    </a>
                    <a rel="noreferrer" href="/" target="_blank" className="hidden lg:block">
                        <FittrBigIcon/>
                    </a>
                </div>
            </div>
            <p className="text-lg sm:text-2xl md:text-3xl font-light leading-7 sm:leading-10">
                Sign up to start <span className="font-bold">creating</span>
                <span className="font-bold block"> and sharing <span className="font-light">workouts</span></span>
            </p>
            <form className="mt-4 flex flex-col items-end">
                <input
                    className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 my-1 leading-tight focus:outline-none focus:shadow-outline"
                    id="search"
                    type="text"
                    placeholder={APP_NAME + ".io/username"}
                    value={preferredUsernameName}
                    onChange={event => onEnterFitNameHandler(event.target.value.toLowerCase())}/>
                <input
                    className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 my-1 leading-tight focus:outline-none focus:shadow-outline"
                    id="search"
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={event => onEnterEmailHandler(event.target.value.toLowerCase())}/>
                {errorMessage.length > 0 ? <p className="text-red my-2">{errorMessage} </p> : null}
                <button
                    type="button"
                    onClick={signUpHandler}
                    className="mt-4 bg-primary rounded-3xl py-2 px-4 w-1/6 text-white font-medium hover:bg-darkPrimary hidden sm:block">Sign
                    up
                </button>
            </form>
            <p className="text-center mt-8 font-light">Don't have a Fittree account? <a rel="noreferrer" href="/signin"
                                                                                        className="cursor-pointer"><span
                className="font-bold">Sign in</span></a></p>
            <a rel="noreferrer" href="/" className="cursor-pointer">
                <span className="text-center mt-4 font-light block">Go to home</span>
            </a>
            <button
                type="button"
                onClick={signUpHandler}
                className="flex flex-row items-center justify-center bg-primary rounded-md w-14 h-14 sm:w-20 sm:h-20 fixed bottom-0 right-0 mr-8 mb-8 hover:bg-darkPrimary sm:hidden">
                <CheckIcon/>
            </button>
            {isLoading ? <Loading message={"Signing you up"}/> : null}
            {cognitoUser ? (
                <VerifyAuth
                    testID="VerifyAuthScreen_Modal"
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
