import {withSSRContext} from "aws-amplify";
import NavBar from "../../src/components/views/NavBar";
import Footer from "../../src/components/views/Footer";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthUser, updateUser} from "../../src/features/auth/authUserSlice";
import InstagramIcon from "../../src/components/svg/instagram-primary-line.svg";
import YoutubeIcon from "../../src/components/svg/youtube-primary-line.svg";
import TikTokIcon from "../../src/components/svg/tiktok-primary-line.svg";
import TwitterIcon from "../../src/components/svg/twitter-primary-line.svg";
import FacebookIcon from "../../src/components/svg/facebook-circle-primary-line.svg";
import PageDescription from "../../src/components/views/PageDescription";
import SuccessBar from "../../src/components/views/snackbars/SuccessBar";
import ErrorBar from "../../src/components/views/snackbars/ErrorBar";
import Avatar from "../../src/components/views/Avatar";

export default function Settings({username}) {

    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    const [bio, setBio] = useState(user ? user.displayBrief : "");

    const [instagram, setInstagram] = useState(user ? user.instagram : "");

    const [facebook, setFacebook] = useState(user ? user.facebook : "");

    const [twitter, setTwitter] = useState(user ? user.twitter : "");

    const [tiktok, setTiktok] = useState(user ? user.tiktok : "");

    const [youtube, setYoutube] = useState(user ? user.youtube : "");

    /**
     * Show snackbar for err message
     */
    const [showSuccessSnackBar, setSuccessShowSnackBar] = useState(false)
    const [showErrorSnackBar, setShowErrorSnackBar] = useState(false)

    const [snackbarMessage, setSnackbarMessage] = useState("");

    /**
     * Update the user profile
     * @returns {Promise<void>}
     */
    const saveProfile = async () => {

        try {
            await saveProfileHelper();
            setSuccessShowSnackBar(true)
            setSnackbarMessage("Saved successfully")
        } catch (err) {
            setShowErrorSnackBar(true)
            setSnackbarMessage("Oops, unable to save your socials");
        }
    };

    /**
     * Helper function to update user profile
     * @returns {Promise<void>}
     */
    const saveProfileHelper = async () => {
        const payload = {
            instagram: instagram.trim(),
            facebook: facebook.trim(),
            twitter: twitter.trim(),
            tiktok: tiktok.trim(),
            youtube: youtube.trim(),
            displayBrief: bio.trim()
        };

        await dispatch(updateUser({id: user.id, ...payload})).unwrap();
    };


    return (
        <>
            <div className="container mx-auto p-4 min-h-screen divide-y-2 divide-gray2">
                <div>
                    <NavBar username={username}/>
                    <PageDescription title="Settings" description="Manage all your settings here"/>
                    <div className="flex flex-col items-center">
                        <div
                            className="flex flex-col items-center">
                            <Avatar user={user}/>
                            <p className="font-semibold text-primary text-sm hover:font-bold cursor-pointer"> Change
                                display profile</p>
                        </div>
                        <textarea
                            className="border-none w-full h-56 bg-gray2 rounded py-4 px-3 mt-4 font-light text-dustBlack"
                            placeholder="Tell your followers what you do"
                            value={bio}
                            maxLength={100}
                            onChange={(event) => setBio(event.target.value.toLowerCase())}
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <div className="mt-8">
                        <PageDescription title="Socials" description="Manage your social links "/>
                        <form className="flex flex-col mt-2 w-3/5">
                            <div className="my-4 flex flex-row items-center outline outline-1 outline-gray2 rounded-md">
                                <div className="mx-4">
                                    <InstagramIcon/>
                                </div>
                                <input
                                    className="border-none w-full bg-gray2 rounded-r py-4 px-3 font-light text-dustBlack"
                                    type="text"
                                    value={instagram}
                                    onChange={(event) => setInstagram(event.target.value.toLowerCase())}
                                />
                            </div>
                            <div className="my-4 flex flex-row items-center outline outline-1 outline-gray2 rounded-md">
                                <div className="mx-4">
                                    <FacebookIcon/>
                                </div>
                                <input
                                    className="border-none w-full bg-gray2 rounded-r py-4 px-3 font-light text-dustBlack"
                                    type="text"
                                    value={facebook}
                                    onChange={(event) => setFacebook(event.target.value.toLowerCase())}
                                />
                            </div>
                            <div className="my-4 flex flex-row items-center outline outline-1 outline-gray2 rounded-md">
                                <div className="mx-4">
                                    <TwitterIcon/>
                                </div>
                                <input
                                    className="border-none w-full bg-gray2 rounded-r py-4 px-3 font-light text-dustBlack"
                                    type="text"
                                    value={twitter}
                                    onChange={(event) => setTwitter(event.target.value.toLowerCase())}
                                />
                            </div>
                            <div className="my-4 flex flex-row items-center outline outline-1 outline-gray2 rounded-md">
                                <div className="mx-4">
                                    <TikTokIcon/>
                                </div>
                                <input
                                    className="border-none w-full bg-gray2 rounded-r py-4 px-3 font-light text-dustBlack"
                                    type="text"
                                    value={tiktok}
                                    onChange={(event) => setTiktok(event.target.value.toLowerCase())}
                                />
                            </div>
                            <div className="my-4 flex flex-row items-center outline outline-1 outline-gray2 rounded-md">
                                <div className="mx-4">
                                    <YoutubeIcon/>
                                </div>
                                <input
                                    className="border-none w-full bg-gray2 rounded-r py-4 px-3 font-light text-dustBlack"
                                    type="text"
                                    value={youtube}
                                    onChange={(event) => setYoutube(event.target.value.toLowerCase())}
                                />
                            </div>
                        </form>
                        <button
                            type="button"
                            onClick={saveProfile}
                            className="mt-4 bg-primary rounded-3xl py-2 px-4 w-1/6 text-white font-medium hover:bg-darkPrimary hidden sm:block">Save
                        </button>
                    </div>
                </div>
                <SuccessBar
                    open={showSuccessSnackBar}
                    close={() => setSuccessShowSnackBar(false)}
                    message={snackbarMessage}/>
                <ErrorBar
                    open={showErrorSnackBar}
                    close={() => setShowErrorSnackBar(false)}
                    message={snackbarMessage}/>

            </div>
            <Footer/>
        </>
    )

}


export async function getServerSideProps(context) {

    const {Auth} = withSSRContext(context)

    try {
        const user = await Auth.currentAuthenticatedUser()

        return {
            props: {
                authenticated: true,
                username: user.username
            }
        }

    } catch (err) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }
}
