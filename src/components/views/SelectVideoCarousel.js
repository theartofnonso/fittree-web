/* eslint-disable */
import React, {useEffect, useRef, useState} from "react";
import EditIcon from "../../assets/svg/edit-2-line-white.svg";
import DeleteIcon from "../../assets/svg/delete-bin-white-line.svg";
import AddIcon from "../../assets/svg/add-line-white.svg";

const SelectVideoCarousel = ({onSelect}) => {

    const inputFileRef = useRef()

    const videoRef = useRef()

    /**
     * Video URIs
     */
    const [uris, setUris] = useState([null, null, null]);
    const [currentUriIndex, setCurrentUriIndex] = useState(-1)
    const [selectedFile, setSelectedFile] = useState();

    /**
     * Handle selected file
     */
    useEffect(() => {
        let objectURL;
        if (selectedFile) {
            // Trim video and strip off audio
            setUris(prevValues => {
                prevValues[currentUriIndex] = URL.createObjectURL(selectedFile)
                return [...prevValues]
            });
        }
        return () => URL.revokeObjectURL(objectURL);
    }, [selectedFile]);

    /**
     * Open file explorer
     */
    const selectFile = (index) => {
        setCurrentUriIndex(index)
        inputFileRef.current.click();
    };

    // useEffect(() => {
    //     console.log("Hi")
    //     videoRef.current?.load();
    // }, [uris[currentUriIndex]]);

    /**
     * Handle selected file
     * @param event
     */
    const handleSelectedFile = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    return (
        <div
            className={`flex flex-row rounded-md h-96 overflow-x-auto`}>
            {uris.map((uri, index) => {
                console.log(uri)
                return (
                    <div
                        key={index}
                        className={`relative flex-none sm:flex-1 rounded-md w-5/6 sm:w-full h-full object-cover ${index !== 0 && index !== uris.length - 1 ? "mx-1" : null}`}>
                        <video
                               ref={videoRef}
                               autoPlay
                               className="w-full h-full object-cover"
                               playsInline loop>
                            <source src={uri} type="video/mp4,video/x-m4v,video/*"/>
                            Your browser does not support the video tag.
                        </video>
                        <div
                            className="flex flex-row items-center justify-center absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack hover:bg-transparentBlack1">
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
    );
};

export default SelectVideoCarousel;
