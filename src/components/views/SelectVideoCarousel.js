/* eslint-disable */
import React, {useEffect, useRef, useState} from "react";
import EditIcon from "../../assets/svg/edit-2-line-white.svg";
import DeleteIcon from "../../assets/svg/delete-bin-white-line.svg";
import AddIcon from "../../assets/svg/add-line.svg";
import ReactPlayer from "react-player";
import {SnackBar, SnackBarType} from "./SnackBar";

const SelectVideoCarousel = ({onSelect}) => {

    const inputFileRef = useRef()

    /**
     * Video URIs
     */
    const [uris, setUris] = useState([null, null, null]);
    const [currentUriIndex, setCurrentUriIndex] = useState(-1)
    const [selectedFile, setSelectedFile] = useState();

    /**
     * Show snackbar for err message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    /**
     * Handle selected file
     */
    useEffect(() => {
        let objectURL;
        if (selectedFile) {
            //Trim video and strip off audio
            setUris(prevValues => {
                prevValues[currentUriIndex] = URL.createObjectURL(selectedFile)
                return [...prevValues]
            });
        }
        return () => URL.revokeObjectURL(objectURL);
    }, [selectedFile]);

    /**
     * Pass the selected videos to parent
     */
    useEffect(() => {
        onSelect(uris)
    }, [uris])

    /**
     * Open file explorer
     */
    const selectFile = (index) => {
        setCurrentUriIndex(index)
        inputFileRef.current.click();
    };

    /**
     * Delete selected file
     */
    const deleteFile = (index) => {
        setUris(prevValues => {
            prevValues[index] = null
            return [...prevValues]
        });
    };

    /**
     * Check video length
     */
    const checkVideoLength = (duration, index) => {
        if(duration > 6) {
            setShowSnackBar(true)
            setErrorMessage("Video duration is longer than 5 seconds")
            deleteFile(index)
        }

        if(duration < 5) {
            setShowSnackBar(true)
            setErrorMessage("Video duration is shorter than 5 seconds")
            deleteFile(index)
        }


    }

    /**
     * Handle selected file
     * @param event
     */
    const handleSelectedFile = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    return (
        <>
        <div
            className={`flex flex-row rounded-md h-96 overflow-x-auto`}>
            {uris.map((uri, index) => {
                return (
                    <div
                        key={index}
                        className={`bg-grayOpacity6 relative flex-none sm:flex-1 rounded-md overflow-y-hidden w-5/6 sm:w-96 ${index !== 0 && index !== uris.length - 1 ? "mx-1" : null}`}>
                        <ReactPlayer
                            className='bg-grayOpacity6'
                            url={uri}
                            muted={true}
                            playing={true}
                            loop={true}
                            controls={true}
                            width='100%'
                            height='100%'
                            onDuration={(duration) => checkVideoLength(duration, index)}
                        />
                        <div
                            className="rounded-md flex flex-row items-center justify-center absolute w-1/2 h-12 ml-auto mr-auto mt-auto mb-auto left-0 right-0 top-0 bottom-0">
                            {uri ?
                                <div className="flex flex-row">
                                    <button
                                        type="button"
                                        onClick={() => selectFile(index)}
                                        className="flex flex-row items-center justify-center mx-4">
                                        <EditIcon/>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteFile(index)}
                                        className="flex flex-row items-center justify-center mx-4">
                                        <DeleteIcon/>
                                    </button>
                                </div>
                                :
                                <button
                                    type="button"
                                    onClick={() => selectFile(index)}
                                    className="flex flex-row items-center justify-center">
                                    <AddIcon/>
                                </button>}
                        </div>
                        <input type='file' id='file' accept="video/mp4,video/x-m4v,video/*" ref={inputFileRef}
                               style={{display: 'none'}}
                               onChange={handleSelectedFile}/>
                    </div>
                )
            })}
        </div>
            <SnackBar
                open={showSnackBar}
                close={() => setShowSnackBar(false)}
                message={errorMessage}
                type={SnackBarType.ERROR}/>
        </>
    );
};

export default SelectVideoCarousel;
