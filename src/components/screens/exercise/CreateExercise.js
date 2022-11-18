import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createExercise, selectExerciseById, updateExercise} from "../../../features/auth/authExercisesSlice";
import CloseIcon from "../../../assets/svg/close-line.svg";
import PageDescription from "../../views/PageDescription";
import BodyParts from "../../views/BodyParts";
import Equipments from "../../views/Equipments";
import Loading from "../../utils/Loading";
import {selectAuthUser} from "../../../features/auth/authUserSlice";
import {SnackBar, SnackBarType} from "../../views/SnackBar";
import Modal from "../../views/modal";
import SelectVideoCarousel from "../../views/SelectVideoCarousel";
import awsConstants from "../../../utils/aws-utils/awsConstants";
import {capitaliseWords} from "../../../utils/general/utils";
import utilsConstants from "../../../utils/utilsConstants";
import {useLeavePageConfirm} from "../../../utils/general/hooks";
import {uploadAndDeleteS3} from "../../../utils/aws-utils/awsHelperFunctions";

export default function CreateExercise({params, close}) {

    const user = useSelector(selectAuthUser);

    const dispatch = useDispatch();

    const exercise = useSelector(state => selectExerciseById(state, params.exerciseId));

    /**
     * Title
     */
    const [title, setTitle] = useState(exercise ? exercise.title : "");

    /**
     * Description
     */
    const [description, setDescription] = useState(exercise ? exercise.description : "");

    /**
     * Body Parts
     */
    const [selectedBodyParts, setSelectedBodyParts] = useState(exercise ? exercise.bodyParts : []);

    /**
     * Equipment
     */
    const [selectedEquipments, setSelectedEquipments] = useState(exercise ? exercise.equipments : []);

    /**
     * Selected videos
     */
    const [selectedVideos, setSelectedVideos] = useState([])

    /**
     * Show snackbar message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)

    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarType, setSnackbarType] = useState("")

    const [isLoading, setIsLoading] = useState(false);

    const [openExitScreenModal, setOpenExitScreenModal] = useState(false)

    // /**
    //  * Upload videos to AWS S3
    //  * @param uri
    //  * @returns {Promise<string>}
    //  */
    // const uploadVideo = async (uri) => {
    //     const blobResponse = await fetch(uri);
    //
    //     const blob = await blobResponse.blob();
    //
    //     const videoFileName = generateFileName("mp4");
    //
    //     const s3Response = await Storage.put(awsConstants.awsStorage.folders.VIDEOS + "/" + videoFileName, blob)
    //
    //     return generateCDNUrl(s3Response.key);
    // }

    /**
     * Upload video urls
     */
    const uploadVideos = async () => {
        const videoUrls = [];
        selectedVideos.forEach((async uri => {
            if (uri) {
                const videoUrl =  await uploadAndDeleteS3(uri, awsConstants.awsStorage.folders.VIDEOS, null, "mp4") //uploadVideo(uri)
                videoUrls.push(videoUrl)
            }
        }))
        return videoUrls;
    }

    /**
     * Perform sanity checks on required details and call createExerciseHelper
     */
    const doCreateExercise = async () => {
        if (selectedVideos.length === 0) {
            setShowSnackBar(true)
            setSnackbarType(SnackBarType.WARN)
            setSnackbarMessage("Please select at least one video")
        } else if (title.trim().length === 0) {
            setShowSnackBar(true)
            setSnackbarType(SnackBarType.WARN)
            setSnackbarMessage("Please provide a title")
        } else {
            setIsLoading(true)
            try {
                await createExerciseHelper();
                setIsLoading(false)
                close()
            } catch (err) {
                console.log(err)
                setIsLoading(false)
                setShowSnackBar(true)
                setSnackbarType(SnackBarType.ERROR)
                const message = exercise ? "Oops! unable to edit exercise at this moment" : "Oops! unable to create exericse at this moment"
                setSnackbarMessage(message)
            }
        }
    }

    /**
     * Create an exercise and upload it to DynamoDB
     */
    const createExerciseHelper = async () => {

        const videoUrls = exercise ? exercise.videoUrls : await uploadVideos();

        const payload = {
            creatorId: user.id,
            title: capitaliseWords(title.trim()),
            description: description.trim().length > 0 ? description.trim() : utilsConstants.defaults.DEFAULT_VALUE_DESCRIPTION,
            bodyParts: selectedBodyParts,
            equipments: selectedEquipments,
            videoUrls: videoUrls
        };

        /**
         * Call the update function if we have a exercise
         */
        if (exercise) {
            return dispatch(updateExercise({id: exercise.id, ...payload})).unwrap();
        }

        return dispatch(createExercise(payload)).unwrap();

    };


    /**
     * Determine new changes differ from old exercise
     * @returns {boolean}
     */
    const hasExerciseChanged = () => {

        /**
         * Extract necessary fields from workout
         */
        const {
            title: _title,
            description: _description,
            bodyParts: _bodyParts,
            equipments: _equipments,}  = exercise

        const prevState = {
            title: _title,
            description: _description,
            bodyParts: _bodyParts,
            equipments: _equipments,
        }

        /**
         * Capture recent changes
         */
        const changes = {
            title: title,
            description: description,
            bodyParts: selectedBodyParts,
            equipments: selectedEquipments,
        }

        /**
         * Convert both objects to JSON for easy comparison and compare
         * @type {string}
         */
        const prevStateJSON = JSON.stringify(prevState)
        const changesJSON = JSON.stringify(changes)

        return prevStateJSON !== changesJSON
    }

    /**
     * Check changes to page when creating a new workout
     * @returns {boolean}
     */
    const hasPageBeenPopulated = () => {
        const changes = {
            hasTitle: title !== "",
            hasDescription: description !== "",
            hasBodyParts: selectedBodyParts.length > 0,
            hasEquipments: selectedEquipments.length > 0,
        }

        for (const property in changes) {
            if(changes[property]) {
                return true
            }
        }
        return false;
    }

    /**
     * Close this screen
     */
    const shouldConfirmLeavePage = () => exercise ? hasExerciseChanged() : hasPageBeenPopulated()

    /**
     * Not certain if this function is necessary
     */
    useLeavePageConfirm(shouldConfirmLeavePage(), "Are you sure you want to leave?")

    /**
     * Store the selected equipment
     * @param values
     */
    const selectEquipmentHandler = values => {
        setSelectedEquipments(values);
    };

    /**
     * Handle select body part
     * @param values
     */
    const selectBodyPartsHandler = values => {
        setSelectedBodyParts(values);
    };

    /**
     * Close the Create workout screen
     */
    const closeScreen = () => {
        setOpenExitScreenModal(false)
        close()
    }

    return (
        <div className="px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 w-full h-screen bg-white overflow-y-scroll">
            <div className="my-4 flex flex-row place-content-between">
                <div className="cursor-pointer" onClick={() => {
                    const shouldConfirm = shouldConfirmLeavePage();
                    shouldConfirm ? setOpenExitScreenModal(shouldConfirm) : close()
                }}>
                    <CloseIcon/>
                </div>
            </div>
            <PageDescription
                title="Create Exercise"
                description="Create an 5 seconds exercise to demonstrate the movement"/>
            <div className="my-4">
                <SelectVideoCarousel onSelect={(videos) => setSelectedVideos(videos)}/>
            </div>
            <div className="mt-2 flex flex-col">
                <input
                    className="appearance-none border-none w-5/6 bg-gray2 h-14 sm:h-18 rounded w-full py-2 px-3 my-2"
                    id="search"
                    type="text"
                    placeholder="What's the title "
                    value={title}
                    maxLength={35}
                    onChange={event => setTitle(event.target.value)}/>
                <textarea
                    className="appearance-none border-none w-full h-56 bg-gray2 rounded py-4 px-3 my-2 font-light "
                    placeholder="Tell us more about this exercise"
                    value={description}
                    maxLength={250}
                    onChange={event => setDescription(event.target.value)}
                />
                <BodyParts prevValues={selectedBodyParts} onSelect={selectBodyPartsHandler}/>
                <Equipments
                    prevEquipments={selectedEquipments}
                    onSelect={selectEquipmentHandler}/>
            </div>
            <button
                type="button"
                onClick={doCreateExercise}
                className="mt-4 mb-2 bg-primary rounded-3xl py-2 px-8 text-white font-semibold hover:bg-darkPrimary">{exercise ? "Update exercise" : "Create exercise"}
            </button>
            <Modal
                open={openExitScreenModal}
                title={"Unsaved changes"}
                message={"You have unsaved changes. Are you sure you want to leave?"}
                actionPositive={{title: "No", action: () => setOpenExitScreenModal(false)}}
                actionNegative={{title: "Yes", action: closeScreen}}/>
            {isLoading ? <Loading message={exercise ? "Updating exercise" : "Creating exercise"}/> : null}
            <SnackBar
                open={showSnackBar}
                close={() => setShowSnackBar(false)}
                message={snackbarMessage}
                type={snackbarType}/>
        </div>
    )
}
