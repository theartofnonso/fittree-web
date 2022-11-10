import {Storage, withSSRContext} from "aws-amplify";
import NavBar from "../../src/components/views/NavBar";
import Footer from "../../src/components/views/Footer";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, selectAuthUser, selectAuthUserStatus, updateUser} from "../../src/features/auth/authUserSlice";
import InstagramIcon from "../../src/components/svg/instagram-primary-line.svg";
import YoutubeIcon from "../../src/components/svg/youtube-primary-line.svg";
import TikTokIcon from "../../src/components/svg/tiktok-primary-line.svg";
import TwitterIcon from "../../src/components/svg/twitter-primary-line.svg";
import FacebookIcon from "../../src/components/svg/facebook-circle-primary-line.svg";
import PageDescription from "../../src/components/views/PageDescription";
import Success from "../../src/components/views/snackbars/Success";
import Error from "../../src/components/views/snackbars/Error";
import Avatar from "../../src/components/views/Avatar";
import Compressor from 'compressorjs';
import {generateCDNUrl, generateFileName} from "../../src/utils/general/utils";
import awsConstants from "../../src/utils/aws-utils/awsConstants";
import workoutsConstants from "../../src/utils/workout/workoutsConstants";
import FittreeLoading from "../../src/components/views/FittreeLoading";
import {useLeavePageConfirm} from "../../src/utils/general/hooks";

export default function Settings({username}) {

    const inputFileRef = useRef()

    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    const status = useSelector(selectAuthUserStatus)

    /**
     * Avatar URI
     */
    const [uri, setUri] = useState("");

    const [displayBrief, setDisplayBrief] = useState("");

    const [instagram, setInstagram] = useState("");

    const [facebook, setFacebook] = useState("");

    const [twitter, setTwitter] = useState("");

    const [tiktok, setTiktok] = useState("");

    const [youtube, setYoutube] = useState("");

    const [selectedFile, setSelectedFile] = useState();

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
     * Return a list of changes
     * @returns {*[]}
     */
    const getPageChanges = () => {
        const data = []
        data.push({key: "instagram", value: instagram.trim()})
        data.push({key: "facebook", value: facebook.trim()})
        data.push({key: "twitter", value: twitter.trim()})
        data.push({key: "tiktok", value: tiktok.trim()})
        data.push({key: "youtube", value: youtube.trim()})
        data.push({key: "displayBrief", value: displayBrief.trim()})
        data.push({key: "displayProfile", value: uri.split("//")[1]})

        return data
            .filter(item => user[item.key] !== item.value);
    }

    /**
     * Helper function to update user profile
     * @returns {Promise<void>}
     */
    const saveProfileHelper = async () => {

        const payload = {}

        const listOfChanges = getPageChanges();
        listOfChanges.forEach(item => {
            payload[item.key] = item.value
        })

        if (uri) {
            payload.displayProfile = await uploadAvatar();
        }

        await dispatch(updateUser({id: user.id, ...payload})).unwrap();
    };

    /**
     * Handle file upload
     */
    const selectFile = () => {
        inputFileRef.current.click();
    };

    /**
     * Handle selected file
     * @param event
     */
    const handleSelectedFile = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    /**
     * Upload selected avatar
     * @returns {Promise<string>}
     */
    const uploadAvatar = async () => {
        const blobResponse = await fetch(uri);
        const blob = await blobResponse.blob();

        const thumbnailFileName = generateFileName("jpg");

        const s3Response = await Storage.put(
            awsConstants.awsStorage.folders.THUMBNAILS + "/" + thumbnailFileName,
            blob,
        );

        /**
         * Delete the workout thumbnail
         */
        const thumbnail = user.displayProfile.split("/")[3];
        const key = "Thumbnails/" + thumbnail;
        Storage.remove(key);

        return generateCDNUrl(s3Response.key);
    };

    /**
     * Determine if user is about to navigate when changes are unsaved
     * @returns {boolean}
     */
    const shouldConfirmLeavePage = () => {

        if(!user) return false

        const listOfChanges = getPageChanges();
        
        return listOfChanges.length > 0
    }

    useLeavePageConfirm(shouldConfirmLeavePage(), "Are you sure you want to leave?")

    /**
     * Fetch user
     */
    useEffect(() => {
        if (username) {
            dispatch(fetchUser({username}));
        }
    }, [username])

    /**
     * Handle selected file
     */
    useEffect(() => {
        if (selectedFile) {
            new Compressor(selectedFile, {
                quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
                success: (compressedFile) => {
                    // compressedResult has the compressed file.
                    // Use the compressed file to upload the images to your server.
                    const objectURL = URL.createObjectURL(compressedFile);
                    setUri(objectURL);
                },
            });
            // return () => URL.revokeObjectURL(objectURL);
        }
    }, [selectedFile]);

    /**
     * Set User if available
     */
    useEffect(() => {
        if (user) {
            setDisplayBrief(user ? user.displayBrief : "")
            setInstagram(user ? user.instagram : "")
            setFacebook(user ? user.facebook : "")
            setTwitter(user ? user.twitter : "")
            setTiktok(user ? user.tiktok : "")
            setYoutube(user ? user.youtube : "")
            setUri(user ? "https://" + user.displayProfile : "")
        }
    }, [user])

    /**
     * Creator page is still loading
     */
    if (status === workoutsConstants.profileStatus.LOADING) {
        return <FittreeLoading/>
    }

    return (
        <>
            <div className="container mx-auto p-4 min-h-screen divide-y-2 divide-gray2">
                <div>
                    <NavBar username={username}/>
                    <PageDescription title="Settings" description="Manage all your settings here"/>
                    <div className="flex flex-col items-center">
                        <div
                            className="flex flex-col items-center">
                            <Avatar user={user} uri={uri}/>
                            <p onClick={selectFile}
                               className="font-semibold text-primary text-sm hover:font-bold cursor-pointer"> Change
                                display profile</p>
                        </div>
                        <textarea
                            className="border-none w-full h-56 bg-gray2 rounded py-4 px-3 mt-4 font-light text-dustBlack"
                            placeholder="Tell your followers what you do"
                            value={displayBrief}
                            maxLength={100}
                            onChange={(event) => setDisplayBrief(event.target.value.toLowerCase())}
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
                <Success
                    open={showSuccessSnackBar}
                    close={() => setSuccessShowSnackBar(false)}
                    message={snackbarMessage}/>
                <Error
                    open={showErrorSnackBar}
                    close={() => setShowErrorSnackBar(false)}
                    message={snackbarMessage}/>

                <input type='file' id='file' accept="image/png, image/jpeg" ref={inputFileRef} style={{display: 'none'}}
                       onChange={handleSelectedFile}/>
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
