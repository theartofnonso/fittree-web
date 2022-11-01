import {withSSRContext} from "aws-amplify";
import NavBar from "../../src/components/views/NavBar";
import Footer from "../../src/components/views/Footer";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthUser} from "../../src/features/auth/authUserSlice";
import InstagramIcon from "../../src/components/svg/instagram-primary-line.svg";
import YoutubeIcon from "../../src/components/svg/youtube-primary-line.svg";
import TikTokIcon from "../../src/components/svg/tiktok-primary-line.svg";
import TwitterIcon from "../../src/components/svg/twitter-primary-line.svg";
import FacebookIcon from "../../src/components/svg/facebook-circle-primary-line.svg";
import PageDescription from "../../src/components/views/PageDescription";

export default function Settings({username}) {

    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    const [instagram, setInstagram] = useState(user ? user.instagram : "");

    const [facebook, setFacebook] = useState(user ? user.facebook : "");

    const [twitter, setTwitter] = useState(user ? user.twitter : "");

    const [tiktok, setTiktok] = useState(user ? user.tiktok : "");

    const [youtube, setYoutube] = useState(user ? user.youtube : "");

    /**
     * Close this screen
     */
    const checkForAccidentalClose = () => {

        if (user.instagram !== instagram.trim()) {
            showCloseScreenAlert();
            return;
        }

        if (user.facebook !== facebook.trim()) {
            showCloseScreenAlert();
            return;
        }

        if (user.twitter !== twitter.trim()) {
            showCloseScreenAlert();
            return;
        }

        /**
         * Not supported at the moment
         */
        // if (user.spotify !== spotify) {
        //   showCloseScreenAlert();
        //   return;
        // }

        if (user.tiktok !== tiktok.trim()) {
            showCloseScreenAlert();
            return;
        }

        if (user.youtube !== youtube.trim()) {
            showCloseScreenAlert();
            return;
        }

        navigateBack();
    };

    /**
     * Update the user profile
     * @returns {Promise<void>}
     */
    const saveProfile = async () => {

        try {
            await saveProfileHelper();
            navigateBack();
        } catch (err) {
            setLoadingStatus(userSliceEnums.STATUS_IDLE);
            setErrSnackbarMessage("Oops! unable to update socials at this time");
            setErrSnackbarVisible(true);
        }
    };

    /**
     * Helper function to update user profile
     * @returns {Promise<void>}
     */
    const saveProfileHelper = async () => {
        if (loadingStatus === userSliceEnums.STATUS_IDLE) {

            setLoadingStatus(userSliceEnums.STATUS_PENDING);

            const payload = {
                instagram: instagram.trim(),
                facebook: facebook.trim(),
                twitter: twitter.trim(),
                tiktok: tiktok.trim(),
                youtube: youtube.trim(),
            };

            /**
             * Not supported at the moment
             */
            // if (spotify) {
            //   payload.spotify = spotify;
            // }


            await dispatch(updateUser({id: user.id, ...payload})).unwrap();
        }
    };


    return (
        <>
            <div className="container mx-auto p-4 min-h-screen">
                <NavBar username={username}/>
                <PageDescription title="Settings" description="Manage your social links "/>
                <form className="flex flex-col">
                    <div className="flex flex-row items-center">
                        <InstagramIcon/>
                        <input
                            className="ml-4 my-4 border-gray w-56 bg-secondary shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={instagram}
                            onChange={(event) => setInstagram(event.target.value.toLowerCase())}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <FacebookIcon/>
                        <input
                            className="ml-4 my-4 border-gray w-56 bg-secondary shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={facebook}
                            onChange={(event) => setFacebook(event.target.value.toLowerCase())}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <TwitterIcon/>
                        <input
                            className="ml-4 my-4 border-gray w-56 bg-secondary shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={twitter}
                            onChange={(event) => setTwitter(event.target.value.toLowerCase())}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <TikTokIcon/>
                        <input
                            className="ml-4 my-4 border-gray w-56 bg-secondary shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={tiktok}
                            onChange={(event) => setTiktok(event.target.value.toLowerCase())}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <YoutubeIcon/>
                        <input
                            className="ml-4 my-4 border-gray w-56 bg-secondary shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={youtube}
                            onChange={(event) => setYoutube(event.target.value.toLowerCase())}
                        />
                    </div>
                </form>
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
