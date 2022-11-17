import {withSSRContext} from "aws-amplify";
import NavBar from "../../src/components/views/NavBar";
import Footer from "../../src/components/views/Footer";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, selectAuthUser, updateUser} from "../../src/features/auth/authUserSlice";
import InstagramIcon from "../../src/assets/svg/instagram-primary-line.svg";
import YoutubeIcon from "../../src/assets/svg/youtube-primary-line.svg";
import TikTokIcon from "../../src/assets/svg/tiktok-primary-line.svg";
import TwitterIcon from "../../src/assets/svg/twitter-primary-line.svg";
import FacebookIcon from "../../src/assets/svg/facebook-circle-primary-line.svg";
import PageDescription from "../../src/components/views/PageDescription";
import Avatar from "../../src/components/views/Avatar";
import Compressor from 'compressorjs';
import awsConstants from "../../src/utils/aws-utils/awsConstants";
import FittreeLoading from "../../src/components/views/FittreeLoading";
import {uploadAndDeleteS3} from "../../src/utils/aws-utils/awsHelperFunctions";
import {SnackBar, SnackBarType} from "../../src/components/views/SnackBar";
import {useLeavePageConfirm} from "../../src/utils/general/hooks";

export default function Settings({username}) {

    const inputFileRef = useRef()

    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    /**
     * Avatar URI
     */
    const [uri, setUri] = useState(user ? user.displayProfile : "");

    const [displayBrief, setDisplayBrief] = useState(user ? user.displayBrief : "");

    const [instagram, setInstagram] = useState(user ? user.instagram : "");

    const [facebook, setFacebook] = useState(user ? user.facebook : "");

    const [twitter, setTwitter] = useState(user ? user.twitter : "");

    const [tiktok, setTiktok] = useState(user ? user.tiktok : "");

    const [youtube, setYoutube] = useState(user ? user.youtube : "");

    const [selectedFile, setSelectedFile] = useState();

    /**
     * Show snackbar for err message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMessage, setSnackbarMessage] = useState("");

    /**
     * Fetch user
     */
    useEffect(() => {
        if (username) {
            dispatch(fetchUser({username}));
        }
    }, [username])

    /**
     * Set User if available not available in state (possibly because user reloaded the page)
     */
    useEffect(() => {
        if (user) {
            setDisplayBrief(user.displayBrief || "")
            setInstagram(user.instagram || "")
            setFacebook(user.facebook || "")
            setTwitter(user.twitter || "")
            setTiktok(user.tiktok || "")
            setYoutube(user.youtube || "")
            setUri(user.displayProfile || "")
        }
    }, [user])

    /**
     * Update the user profile
     * @returns {Promise<void>}
     */
    const saveProfile = async () => {

        const listOfChanges = getPageChanges();

        if (listOfChanges.length > 0) {
            try {
                await saveProfileHelper(listOfChanges);
                setShowSnackBar(true)
                setSnackbarType(SnackBarType.SUCCESS)
                setSnackbarMessage("Saved successfully")
            } catch (err) {
                setShowSnackBar(true)
                setSnackbarType(SnackBarType.ERROR)
                setSnackbarMessage("Oops, unable to save your socials at this time");
            }
        }
    };

    /**
     * Return a list of changes
     * @returns {*[]}
     */
    const getPageChanges = () => {

        if(!user) return []

        const data = []
        data.push({key: "instagram", value: instagram.trim()})
        data.push({key: "facebook", value: facebook.trim()})
        data.push({key: "twitter", value: twitter.trim()})
        data.push({key: "tiktok", value: tiktok.trim()})
        data.push({key: "youtube", value: youtube.trim()})
        data.push({key: "displayBrief", value: displayBrief.trim()})
        data.push({key: "displayProfile", value: uri})

        return data
            .filter(item => user[item.key] !== item.value);
    }

    /**
     * Determine new changes differ from old settings
     * @returns {boolean}
     */
    const hasSettingsChanged = () => getPageChanges().length > 0

    /**
     * Not certain if this function is necessary
     */
    useLeavePageConfirm(hasSettingsChanged(), "Are you sure you want to leave?")

    /**
     * Helper function to update user profile
     * @returns {Promise<void>}
     */
    const saveProfileHelper = async (listOfChanges) => {

        const payload = {}

        listOfChanges.forEach(item => {
            payload[item.key] = item.value
        })

        if (payload.displayProfile) {
            payload.displayProfile = await uploadAndDeleteS3(uri, awsConstants.awsStorage.folders.THUMBNAILS, user.displayProfile, "jpg")
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
     * Handle selected file
     */
    useEffect(() => {
        let objectURL;
        if (selectedFile) {
            new Compressor(selectedFile, {
                quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
                success: (compressedFile) => {
                    // compressedResult has the compressed file.
                    // Use the compressed file to upload the images to your server.
                    objectURL = URL.createObjectURL(compressedFile);
                    setUri(objectURL);
                },
            });
        }
        return () => URL.revokeObjectURL(objectURL);
    }, [selectedFile]);
    /**
     * Creator page is still loading
     */
    if (!user) {
        return <FittreeLoading/>
    } else {
        return (
            <>
                <div className="container mx-auto p-4 min-h-screen divide-y-2 divide-gray2">
                    <div>
                        <NavBar username={username}/>
                        <PageDescription title="Settings" description="Manage all your settings here"/>
                        <div className="flex flex-col items-center mt-6">
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
                                <div
                                    className="my-4 flex flex-row items-center outline outline-1 outline-gray2 rounded-md">
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
                                <div
                                    className="my-4 flex flex-row items-center outline outline-1 outline-gray2 rounded-md">
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
                                <div
                                    className="my-4 flex flex-row items-center outline outline-1 outline-gray2 rounded-md">
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
                                <div
                                    className="my-4 flex flex-row items-center outline outline-1 outline-gray2 rounded-md">
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
                                <div
                                    className="my-4 flex flex-row items-center outline outline-1 outline-gray2 rounded-md">
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
                                className="mt-4 bg-primary rounded-3xl py-2 px-4 w-1/6 text-white font-medium hover:bg-darkPrimary block">Save
                            </button>
                        </div>
                    </div>

                    <SnackBar
                        open={showSnackBar}
                        close={() => setShowSnackBar(false)}
                        message={snackbarMessage}
                        type={snackbarType}/>

                    <input type='file' id='file' accept=".png, .jpeg, .jpg" ref={inputFileRef}
                           style={{display: 'none'}}
                           onChange={handleSelectedFile}/>
                </div>
                <Footer/>
            </>
        )
    }

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
