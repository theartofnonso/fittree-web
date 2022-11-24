import ShareIcon from "../../assets/svg/share-box-line.svg";
import FunctionsIcon from "../../assets/svg/function-fill.svg";
import {useState} from "react";
import {generateShareableLink} from "../../utils/workout/workoutsHelperFunctions";
import {useRouter} from "next/router";
import {Auth} from "aws-amplify";
import {SnackBar, SnackBarType} from "./SnackBar";

const NavBar = ({user, onCreateCircuit, onCreateRepsAndSets}) => {

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
        navigator.clipboard.writeText(generateShareableLink(user.username)).then(() => {
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
                {user ? <div className="relative cursor-pointer"
                             onMouseOver={() => setShowMenuOptions(true)}
                             onMouseLeave={() => setShowMenuOptions(false)}>
                    <FunctionsIcon/>
                    {showMenuOptions ? <div className="absolute text-left right-0 w-52 z-10">
                        <div
                            className="mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none space-y-2"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            {/*<div className="py-2 hover:bg-secondary rounded-t-md" role="none">*/}
                            {/*    <Link href="/admin">*/}
                            {/*        <a className="text-gray-700 block px-4 py-2 text-md font-medium"*/}
                            {/*           role="menuitem" tabIndex="-1"*/}
                            {/*           id="menu-item-6">Create Circuits</a>*/}
                            {/*    </Link>*/}
                            {/*</div>*/}
                            <button type="button"
                                    onClick={() => {
                                        onCreateCircuit()
                                        setShowMenuOptions(false)
                                    }}
                                    className="hover:bg-secondary rounded-t-md text-gray-700 block px-4 py-2 text-md font-medium">Create Circuit
                            </button>
                            <button type="button"
                                    onClick={() => {
                                        onCreateRepsAndSets()
                                        setShowMenuOptions(false)
                                    }}
                                    className="hover:bg-secondary rounded-t-md text-gray-700 block px-4 py-2 text-md font-medium">Create Reps and Sets
                            </button>
                            <div
                                className="hover:bg-darkPrimary bg-primary w-full text-white rounded-b-md text-gray-700 block px-4 py-2 text-md text-left font-medium"
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
                type={SnackBarType.SUCCESS}/>
        </>
    )
}

export default NavBar;
