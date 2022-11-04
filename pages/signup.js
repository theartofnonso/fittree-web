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
import {Auth, withSSRContext} from "aws-amplify";
import awsConstants from "../src/utils/aws-utils/awsConstants";
import {useRouter} from "next/router";
import Link from "next/link";

/**
 * Sign up credential errors
 */
const errors = {
    PATTERN: {name: "ERROR_EMAIL_PATTERN", message: "email is invalid, please check your email"},
    RANGE: {name: "ERROR_LENGTH", message: "username must be at least 4 characters and not more than 15"},
    UNSUPPORTED_CHAR: {
        name: "ERROR_UNSUPPORTED_CHAR",
        message: "username can only include words, periods and underscores"
    },
    EMPTY_EMAIL: {name: "ERR0R_EMPTY_EMAIL", message: "Please provide an email"},
    PROPRIETARY_NAME: {name: "ERROR_PROPRIETARY_NAME", message: "Fittree is a proprietary name"},
    PREFERRED_USERNAME_EXISTS: {name: "ERROR_PREFERRED_USERNAME_EXISTS", message: "username has been taken"},
    EMAIL_EXISTS: {name: "ERROR_EMAIL_EXISTS", message: "email already exists"},
}

export default function SignUp() {

    const router = useRouter()

    const [email, setEmail] = useState("");

    const [preferredUsernameName, setPreferredUsernameName] = useState("");

    const [errorMessages, setErrorMessages] = useState(new Set());

    const [isLoading, setIsLoading] = useState(false);

    const [cognitoUser, setCognitoUser] = useState(null);

    const [canUsePreferredUsername, setCanUsePreferredUsername] = useState(false);

    const [canUseEmail, setCanUseEmail] = useState(false);

    /**
     * Add new error message
     * @param err
     */
    const addError = (err) => {
        setErrorMessages(prevValues => {
            prevValues.add(err)
            return new Set(prevValues);
        })
    }

    /**
     * Delete old error message
     * @param err
     */
    const removeError = (err) => {
        setErrorMessages(prevValues => {
            prevValues.delete(err)
            return new Set(prevValues);
        })
    }

    /**
     * Check that the entered email is a valid format
     * @param value
     */
    const onEnterEmailHandler = value => {

        setEmail(value);

        /**
         * Remove errors when field is empty
         */
        if (value === "") {
            removeError(errors.PATTERN)
            removeError(errors.EMAIL_EXISTS)
            return
        }

        const isValid = isEmailValid(value);
        if (!isValid) {
            addError(errors.PATTERN)
        } else {
            removeError(errors.PATTERN)
            checkIfUsernameExists(value);
        }

    };

    /**
     * Check that the entered fit name is a valid format
     * @param value
     */
    const onEnterFitNameHandler = value => {

        setPreferredUsernameName(value);

        /**
         * Remove errors when field is empty
         */
        if (value === "") {
            removeError(errors.RANGE)
            removeError(errors.UNSUPPORTED_CHAR)
            removeError(errors.PROPRIETARY_NAME)
            return
        }

        checkIfPreferredUsernameExists(value);

        const isWithinRange = value.trim().length >= 4;
        if (!isWithinRange) {
            addError(errors.RANGE)
        } else {
            removeError(errors.RANGE)
        }

        const isValidPattern = onlyPeriodsUnderscore(value.trim());
        if (!isValidPattern) {
            addError(errors.UNSUPPORTED_CHAR)
        } else {
            removeError(errors.UNSUPPORTED_CHAR)
        }

        if (isProprietaryName(value)) {
            addError(errors.PROPRIETARY_NAME)
        } else {
            removeError(errors.PROPRIETARY_NAME)
        }

    };

    /**
     * Check if chosen name is FitPin proprietary
     */
    const isProprietaryName = value => value.toLowerCase() === APP_NAME.toLowerCase();

    /**
     * Sign Up new subscriber with email
     * @returns {Promise<void>}
     */
    const signUpHandler = async () => {

        const errorsLeft = Array.from(errorMessages).length

        if (errorsLeft === 0 && email && preferredUsernameName && canUseEmail && canUsePreferredUsername) {
            await signUpHelper();
        }
    };

    /**
     * Check if preferred username already exists
     */
    const checkIfPreferredUsernameExists = (preferredUsernameName) => {
        doesPreferredUsernameExists(preferredUsernameName).then(isExisting => {
            if (isExisting) {
                addError(errors.PREFERRED_USERNAME_EXISTS)
                setCanUsePreferredUsername(false);
            } else {
                removeError(errors.PREFERRED_USERNAME_EXISTS)
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
                addError(errors.EMAIL_EXISTS)
                setCanUseEmail(false);
            }).catch(_ => {
            removeError(errors.EMAIL_EXISTS)
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
                    maxLength={15}
                    onChange={event => onEnterFitNameHandler(event.target.value.trim().toLowerCase())}/>
                <input
                    className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 my-1 leading-tight focus:outline-none focus:shadow-outline"
                    id="search"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={event => onEnterEmailHandler(event.target.value.trim().toLowerCase())}/>
                <div className="flex flex-col text-right">
                    {Array.from(errorMessages).map((errorMessage, index) => {
                        return <p key={index}
                                  className="text-red text-sm font-medium my-0.5">{errorMessage.message} </p>
                    })}
                </div>
                <button
                    type="button"
                    onClick={signUpHandler}
                    className="mt-4 bg-primary rounded-3xl py-2 px-4 w-1/6 text-white font-medium hover:bg-darkPrimary hidden sm:block">Sign
                    up
                </button>
            </form>
            <p className="text-center mt-8 font-light">Don't have a Fittree account?&nbsp;
                <Link href="/signin">
                    <a className="font-bold cursor-pointer hover:font-semibold">Sign in</a>
                </Link>
            </p>
            <Link href="/">
                <a className="text-center mt-4 font-light block cursor-pointer hover:font-semibold">Go to home</a>
            </Link>
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

export async function getServerSideProps(context) {

    const {Auth} = withSSRContext(context)

    try {
        await Auth.currentAuthenticatedUser()

        return {
            redirect: {
                destination: "/admin",
                permanent: false,
            },
        };

    } catch (err) {
       // Do nothing if user doesn't exist
        return {
            props: {
                authenticated: false,
                username: "",
            }
        }
    }
}
