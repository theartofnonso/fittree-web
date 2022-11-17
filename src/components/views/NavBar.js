import ShareIcon from "../../assets/svg/share-box-line.svg";
import FunctionsIcon from "../../assets/svg/function-fill.svg";
import Link from "next/link";
import {useState} from "react";
import {generateShareableLink} from "../../utils/workout/workoutsHelperFunctions";
import {useRouter} from "next/router";
import {Auth} from "aws-amplify";
import {SnackBar, SnackBarType} from "./SnackBar";

const NavBar = ({username}) => {

    const router = useRouter()

    /**
     * Show snackbar for err message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)

    /**
     * Show menu options
     */
    const [showMenuOptions, setShowMenuOptions] = useState(false)

    /**
     * copy shareable link
     */
    const copyShareableLink = () => {
        navigator.clipboard.writeText(generateShareableLink(username)).then(() => {
            setShowSnackBar(true)
        });
    }

    /**
     * Sign out the user
     * @returns {Promise<void>}
     */
    const signOutHandler = async () => {
        await Auth.signOut();
        await router.replace('/')
    }

    return (
        <>
            <div className="mb-6 flex flex-row items-center place-content-between">
                <div className="cursor-pointer" onClick={copyShareableLink}>
                    <ShareIcon/>
                </div>
                {username ? <div className="relative cursor-pointer" onMouseOver={() => setShowMenuOptions(true)}
                                 onMouseLeave={() => setShowMenuOptions(false)}>
                    <FunctionsIcon/>
                    {showMenuOptions ? <div className="absolute text-left right-0 w-52 z-10">
                        <div
                            className="mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-2 hover:bg-secondary rounded-t-md" role="none">
                                <Link href="/admin">
                                    <a className="text-gray-700 block px-4 py-2 text-md font-medium"
                                       role="menuitem" tabIndex="-1"
                                       id="menu-item-6">Dashboard</a>
                                </Link>
                            </div>
                            <div className="py-2 hover:bg-secondary" role="none">
                                <Link href="/admin/exercises">
                                    <a className="text-gray-700 block px-4 py-2 text-md font-medium"
                                       role="menuitem" tabIndex="-1"
                                       id="menu-item-6">Exercises</a>
                                </Link>
                            </div>
                            <div className="py-2 hover:bg-secondary" role="none">
                                <Link href="/admin/workouts">
                                    <a className="text-gray-700 block px-4 py-2 text-md font-medium"
                                       role="menuitem" tabIndex="-1"
                                       id="menu-item-6">Workouts</a>
                                </Link>
                            </div>
                            <div className="py-2 hover:bg-secondary" role="none">
                                <Link href="/admin/settings">
                                    <a className="text-gray-700 block px-4 py-2 text-md font-medium"
                                       role="menuitem" tabIndex="-1"
                                       id="menu-item-6">Settings</a>
                                </Link>
                            </div>
                            <div
                                className="py-2 hover:bg-darkPrimary bg-primary w-full text-white rounded-b-md text-gray-700 block px-4 py-2 text-md text-left font-medium"
                                role="menuitem" tabIndex="-1"
                                id="menu-item-6" onClick={signOutHandler}>Sign out
                            </div>
                        </div>
                    </div> : null}
                </div> : null}
            </div>
            <SnackBar
                open={showSnackBar}
                close={() => setShowSnackBar(false)}
                message={"Link copied"}
                type={SnackBarType.INFO}/>
        </>
    )
}

export default NavBar;
