import {withSSRContext} from "aws-amplify";
import NavBar from "../../src/components/views/NavBar";
import Footer from "../../src/components/views/Footer";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, selectAuthUser, selectAuthUserStatus, updateUser} from "../../src/features/auth/authUserSlice";
import InstagramIcon from "../../src/assets/svg/instagram-primary-line.svg";
import YoutubeIcon from "../../src/assets/svg/youtube-primary-line.svg";
import TikTokIcon from "../../src/assets/svg/tiktok-primary-line.svg";
import TwitterIcon from "../../src/assets/svg/twitter-primary-line.svg";
import FacebookIcon from "../../src/assets/svg/facebook-circle-primary-line.svg";
import PageDescription from "../../src/components/views/PageDescription";
import Avatar from "../../src/components/views/Avatar";
import Compressor from 'compressorjs';
import awsConstants from "../../src/utils/aws-utils/awsConstants";
import workoutsConstants from "../../src/utils/workout/workoutsConstants";
import FittreeLoading from "../../src/components/views/FittreeLoading";
import {useLeavePageConfirm} from "../../src/utils/general/hooks";
import {uploadAndDeleteS3} from "../../src/utils/aws-utils/awsHelperFunctions";
import {SnackBar, SnackBarType} from "../../src/components/views/SnackBar";

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
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMessage, setSnackbarMessage] = useState("");

    /**
     * Update the user profile
     * @returns {Promise<void>}
     */
    const saveProfile = async () => {

        const listOfChanges = getPageChanges();

        if(listOfChanges.length > 0) {
            try {
                await saveProfileHelper();
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
     * Determine if user is about to navigate when changes are unsaved
     * @returns {boolean}
     */
    const shouldConfirmLeavePage = () => {

        if (!user) return false

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
            setDisplayBrief(user.displayBrief || "")
            setInstagram(user.instagram || "")
            setFacebook(user.facebook || "")
            setTwitter(user.twitter || "")
            setTiktok(user.tiktok || "")
            setYoutube(user.youtube || "")
            setUri(user.displayProfile ? "https://" + user.displayProfile : "")
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
                            className="mt-4 bg-primary rounded-3xl py-2 px-4 w-1/6 text-white font-medium hover:bg-darkPrimary block">Save
                        </button>
                    </div>
                </div>

                <SnackBar
                    open={showSnackBar}
                    close={() => setShowSnackBar(false)}
                    message={snackbarMessage}
                    type={snackbarType}/>

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
