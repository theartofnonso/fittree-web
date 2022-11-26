import React, {useState} from "react";
import FittrSmallIcon from "../src/assets/svg/fittr_small.svg";
import FittrBigIcon from "../src/assets/svg/fittr.svg";
import CheckIcon from "../src/assets/svg/check-fill.svg";
import Loading from "../src/components/utils/Loading";
import {isEmailValid} from "../src/utils/general/utils";
import VerifyAuth from "../src/components/screens/auth/verifyauth";
import {getUserFromDB, persistUserToDB, retrieveCognitoUser} from "../src/utils/aws-utils/awsHelperFunctions";
import {Auth} from "aws-amplify";
import {useRouter} from "next/router";
import Link from "next/link";
import {SnackBar, SnackBarType} from "../src/components/views/SnackBar";
import useAuth from "../src/utils/aws-utils/useAuth";
import FittreeLoading from "../src/components/views/FittreeLoading";

export default function SignIn() {

    const auth = useAuth("/admin")

    const router = useRouter()

    const [email, setEmail] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [cognitoUser, setCognitoUser] = useState(null);

    /**
     * Show snackbar for err message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)

    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarType, setSnackbarType] = useState("")

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

        if (email.trim().length === 0) {
            setShowSnackBar(true);
            setSnackbarType(SnackBarType.WARN)
            setSnackbarMessage("Please provide an email");
        } else {
            setIsLoading(true);
            try {
                const user = await retrieveCognitoUser(email);
                if (user) {
                    if (!user.Enabled) {
                        setIsLoading(false);
                        setShowSnackBar(true);
                        setSnackbarType(SnackBarType.ERROR)
                        setSnackbarMessage("Your account has been disabled, please contact hello@fittree.io")
                    } else {
                        const currentUser = await Auth.signIn(email);
                        setCognitoUser(currentUser);
                        setIsLoading(false);
                    }
                }
            } catch (err) {
                setIsLoading(false);
                setShowSnackBar(true);
                setSnackbarType(SnackBarType.ERROR)
                setSnackbarMessage("You don't seem to have a Fittree account, please sign up instead");
            }
        }

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

    /**
     * Auth is being checked
     */
    if (auth === null) {
        return <FittreeLoading/>
    }

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
                Sign in to continue <span className="font-bold">creating</span>
                <span className="font-bold block"> and sharing <span className="font-light">workouts</span></span>
            </p>
            <div className="mt-4 flex flex-col items-end">
                <input
                    className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="search"
                    type="email"
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
            </div>
            <p className="text-center mt-8 font-light">Don't have a Fittree account?&nbsp;
                <Link href="/signup">
                    <a className="font-bold cursor-pointer hover:font-semibold">Sign up</a>
                </Link>
            </p>
            <Link href="/">
                <a className="text-center mt-4 font-light block cursor-pointer hover:font-semibold">Go to home</a>
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
            <SnackBar
                open={showSnackBar}
                close={() => setShowSnackBar(false)}
                message={snackbarMessage}
                type={snackbarType}/>
        </div>
    )

}
