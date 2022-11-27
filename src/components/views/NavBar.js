import ShareIcon from "../../assets/svg/share-box-line.svg";
import FunctionsIcon from "../../assets/svg/function-fill.svg";
import {useState} from "react";
import {generateShareableLink} from "../../utils/workout/workoutsHelperFunctions";
import {useRouter} from "next/router";
import {Auth} from "aws-amplify";
import {SnackBar, SnackBarType} from "./SnackBar";
import MenuItem from "./MenuItem";
import Menu from "./Menu";

const NavBar = ({user, isAuth, onCreateCircuit, onCreateRepsAndSets}) => {

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
        navigator.clipboard.writeText(generateShareableLink(user.preferred_username)).then(() => {
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
                {isAuth ?
                    <Menu open={showMenuOptions}
                          icon={<FunctionsIcon/>}
                          onMouseOver={() => setShowMenuOptions(true)}
                          onMouseLeave={() => setShowMenuOptions(false)}>
                        <MenuItem label="Create Circuits"
                                  onClick={() => {
                                      onCreateCircuit()
                                      setShowMenuOptions(false)
                                  }}
                        />
                        <MenuItem label="Create Reps And Sets"
                                  onClick={() => {
                                      onCreateRepsAndSets()
                                      setShowMenuOptions(false)
                                  }}/>
                        <MenuItem label="Sign out"
                                  onClick={signOutHandler}
                                  isHighlighted={true}/>
                    </Menu> : null}
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
