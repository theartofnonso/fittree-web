/* eslint-disable */
import React, {useEffect, useState} from "react";
import WorkoutCardBig from "../../views/cards/WorkoutCardBig";
import CloseIcon from "../../../assets/svg/close-line.svg";
import PlayIcon from "../../../assets/svg/play-mini-fill.svg";
import PlayWorkout from "./PlayWorkout";
import OverflowIcon from "../../../assets/svg/overflow.svg";
import CreateWorkout from "./CreateWorkout";
import {useDispatch, useSelector} from "react-redux";
import {deleteWorkout, selectWorkoutById} from "../../../features/auth/authWorkoutsSlice";
import {selectWorkoutById as unauthSelectWorkoutById} from "../../../features/unauth/unAuthWorkoutsSlice"
import {
    isValidWorkout,
    loadCircuitWorkout,
    loadRepsAndSetsWorkout
} from "../../../utils/workout/workoutsHelperFunctions";
import Loading from "../../utils/Loading";
import {SnackBar, SnackBarType} from "../../views/SnackBar";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {selectAuthUser} from "../../../features/auth/authUserSlice";
import DiscoveryHub from "../../views/DiscoveryHub";
import WorkoutPlaylist from "../../views/WorkoutPlaylist";
import Controls from "../../views/Controls";
import PlayCircuitWorkout from "./PlayCircuitWorkout";
import PlayRepsAndSetsWorkout from "./PlayRepsAndSetsWorkout";

const PreviewWorkout = ({workoutId, close}) => {

    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    /**
     * Monitors the workout from store
     * @type {unknown}
     */
    const workoutFromStore = user ? useSelector(state => selectWorkoutById(state, workoutId)) : useSelector(state => unauthSelectWorkoutById(state, workoutId));

    const [workout, setWorkout] = useState(() => {
        return {
            ...workoutFromStore,
            workoutExercises: workoutFromStore.workoutExercises.map(exercise => JSON.parse(exercise))
        }
    })

    const [shouldPlayWorkout, setShouldPlayWorkout] = useState(true)

    /**
     * Show menu options
     */
    const [showMenuOptions, setShowMenuOptions] = useState(false)

    const [openCreateWorkout, setOpenCreateWorkout] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    const [loadingMessage, setLoadingMessage] = useState("")

    /**
     * Show snackbar
     */
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [recommendedVideos, setRecommendedVideos] = useState(new Map())

    const [selectedExercise, setSelectedExercises] = useState(null)

    const [roundsOrExercises, setRoundsExercises] = useState(loadCircuitWorkout(workout))

    /**
     * Only set the workout when one from store changes
     * Such scenarios include: Lite updates i.e. going live or not
     */
    useEffect(() => {
        if (workoutFromStore) {
            const enrichedWorkout = {
                ...workoutFromStore,
                workoutExercises: workoutFromStore.workoutExercises.map(exercise => JSON.parse(exercise))
            };
            setWorkout(enrichedWorkout);
        }
    }, [workoutFromStore]);

    /**
     * Fetch videos for all exercises
     */
    useEffect(() => {
        const fetchVideoRecommendations = async () => {
            // for (const exercise of workout.workoutExercises) {
            //     const response = await youtubeApi.get("/search", {
            //         params: {
            //             q: exercise.title
            //         }
            //     })
            //
            //     setRecommendedVideos(prevValues => {
            //         prevValues.set(exercise.id, response.data)
            //         return new Map(prevValues.entries())
            //     })
            // }
            const response = [{
                "data": {
                    "kind": "youtube#searchListResponse",
                    "etag": "reKV38UYCa0Zn462paKPQNJmI4M",
                    "nextPageToken": "CAUQAA",
                    "regionCode": "GB",
                    "pageInfo": {"totalResults": 574979, "resultsPerPage": 5},
                    "items": [{
                        "kind": "youtube#searchResult",
                        "etag": "fi95NQsBfKgOep07-FggDS5o0uk",
                        "id": {"kind": "youtube#video", "videoId": "YyvSfVjQeL0"},
                        "snippet": {
                            "publishedAt": "2009-10-07T16:19:34Z",
                            "channelId": "UCEtMRF1ywKMc4sf3EXYyDzw",
                            "title": "How To: Leg Extension (Cybex)",
                            "description": "FULL 12 WEEK PUSH,PULL,LEGS PROGRAM!- BUILD MUSCLE & STRENGTH! - http://goo.gl/X8HeL5 FULL 12 WEEK MUSCLE ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/YyvSfVjQeL0/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/YyvSfVjQeL0/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/YyvSfVjQeL0/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "ScottHermanFitness",
                            "liveBroadcastContent": "none",
                            "publishTime": "2009-10-07T16:19:34Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "jVcpvlOoZvjC8-wXE_RPl3p3Y_c",
                        "id": {"kind": "youtube#video", "videoId": "KO0-I-JAi8Q"},
                        "snippet": {
                            "publishedAt": "2015-01-27T20:00:04Z",
                            "channelId": "UC5_i5V3xXxdqF5VKVmJWVZQ",
                            "title": "Jay Cutler&#39;s Training Tips: Leg Extension Targeting Upper Quads",
                            "description": "Jay Cutler Explains the proper way to perform Leg Extensions for targeting the upper quads. Check out Jay's products: ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/KO0-I-JAi8Q/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/KO0-I-JAi8Q/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/KO0-I-JAi8Q/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Muscle & Strength",
                            "liveBroadcastContent": "none",
                            "publishTime": "2015-01-27T20:00:04Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "o35q_OYn4HKXeyoI1zcrMcXP42Y",
                        "id": {"kind": "youtube#video", "videoId": "fP6uMgfwqOA"},
                        "snippet": {
                            "publishedAt": "2021-11-12T20:17:44Z",
                            "channelId": "UCOsFVEylgXEcnxAEt9E0c4Q",
                            "title": "You NEED to do your LEG EXTENSIONS like this!",
                            "description": "Alright here's another quick tip I learned from jpg coaching, when you're doing leg extensions, a slight lean forward actually yields ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/fP6uMgfwqOA/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/fP6uMgfwqOA/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/fP6uMgfwqOA/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Max Euceda",
                            "liveBroadcastContent": "none",
                            "publishTime": "2021-11-12T20:17:44Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "BYd-_PhK7l4BfGaDBGRuaQNUCpM",
                        "id": {"kind": "youtube#video", "videoId": "swZQC689o9U"},
                        "snippet": {
                            "publishedAt": "2019-12-07T19:37:00Z",
                            "channelId": "UCakojKTeRtxJi1mMRYtXw5w",
                            "title": "How to Use Leg Extension Machine for Best Results",
                            "description": "Free Custom Workout Programs by Gentech Nutrition: www.gentechnutrition.com/pages/free-custom-workout-programs.",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/swZQC689o9U/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/swZQC689o9U/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/swZQC689o9U/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "David Duncan",
                            "liveBroadcastContent": "none",
                            "publishTime": "2019-12-07T19:37:00Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "G-jdJVcmY4UnXaCPbu8vrDPx9UI",
                        "id": {"kind": "youtube#video", "videoId": "vRQpiTwUeyM"},
                        "snippet": {
                            "publishedAt": "2009-07-01T21:37:09Z",
                            "channelId": "UCE8wCVw_ZfRw-D6RJ5EXWbw",
                            "title": "How to Do Quad Extensions",
                            "description": "Exercising the quadriceps muscle with quad extensions. Learn about increasing leg strength in this training video.",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/vRQpiTwUeyM/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/vRQpiTwUeyM/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/vRQpiTwUeyM/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "LIVESTRONG.COM",
                            "liveBroadcastContent": "none",
                            "publishTime": "2009-07-01T21:37:09Z"
                        }
                    }]
                },
                "status": 200,
                "statusText": "",
                "headers": {
                    "cache-control": "private",
                    "content-encoding": "gzip",
                    "content-length": "1446",
                    "content-type": "application/json; charset=UTF-8",
                    "date": "Sun, 20 Nov 2022 04:17:45 GMT",
                    "server": "scaffolding on HTTPServer2",
                    "vary": "Origin, X-Origin, Referer"
                },
                "config": {
                    "transitional": {
                        "silentJSONParsing": true,
                        "forcedJSONParsing": true,
                        "clarifyTimeoutError": false
                    },
                    "transformRequest": [null],
                    "transformResponse": [null],
                    "timeout": 0,
                    "xsrfCookieName": "XSRF-TOKEN",
                    "xsrfHeaderName": "X-XSRF-TOKEN",
                    "maxContentLength": -1,
                    "maxBodyLength": -1,
                    "env": {},
                    "headers": {"Accept": "application/json, text/plain, */*"},
                    "baseURL": "https://www.googleapis.com/youtube/v3",
                    "params": {
                        "part": "snippet",
                        "maxResults": 5,
                        "safeSearch": "strict",
                        "type": "video",
                        "videoDuration": "short",
                        "key": "AIzaSyBkKTUrlLvDFobTj5co40soHCe2lcOShzA",
                        "q": "Leg extensions"
                    },
                    "method": "get",
                    "url": "/search"
                },
                "request": {
                    "__sentry_xhr__": {
                        "method": "GET",
                        "url": "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&safeSearch=strict&type=video&videoDuration=short&key=AIzaSyBkKTUrlLvDFobTj5co40soHCe2lcOShzA&q=Leg+extensions",
                        "body": null,
                        "status_code": 200
                    }
                }
            }, {
                "data": {
                    "kind": "youtube#searchListResponse",
                    "etag": "nlgweFfkTOWM4WTMWM7XIiFtu0o",
                    "nextPageToken": "CAUQAA",
                    "regionCode": "GB",
                    "pageInfo": {"totalResults": 192396, "resultsPerPage": 5},
                    "items": [{
                        "kind": "youtube#searchResult",
                        "etag": "nL5H2j9PfwrPZyyv3J5NAI-PXcU",
                        "id": {"kind": "youtube#video", "videoId": "F488k67BTNo"},
                        "snippet": {
                            "publishedAt": "2009-07-01T21:07:45Z",
                            "channelId": "UCE8wCVw_ZfRw-D6RJ5EXWbw",
                            "title": "How to Do Hamstring Curls",
                            "description": "Strengthen the hamstrings and increase flexibility with hamstring curls. Learn about hamstring exercises, and muscle growth in ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/F488k67BTNo/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/F488k67BTNo/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/F488k67BTNo/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "LIVESTRONG.COM",
                            "liveBroadcastContent": "none",
                            "publishTime": "2009-07-01T21:07:45Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "4uYqEjtrWm21UdEvYuH5n42ShlE",
                        "id": {"kind": "youtube#video", "videoId": "HeNjxoJhyow"},
                        "snippet": {
                            "publishedAt": "2022-02-22T01:12:59Z",
                            "channelId": "UCOsFVEylgXEcnxAEt9E0c4Q",
                            "title": "You NEED to do this during HAMSTRING CURLS",
                            "description": "Alright quick tip, when you're setting up for hamstring curls make sure to set the thigh pad as low as possible leaving no space ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/HeNjxoJhyow/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/HeNjxoJhyow/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/HeNjxoJhyow/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Max Euceda",
                            "liveBroadcastContent": "none",
                            "publishTime": "2022-02-22T01:12:59Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "Amf9ADMwHPeJ3-a8stkVK2WdoyI",
                        "id": {"kind": "youtube#video", "videoId": "ELOCsoDSmrg"},
                        "snippet": {
                            "publishedAt": "2009-10-05T20:43:01Z",
                            "channelId": "UCEtMRF1ywKMc4sf3EXYyDzw",
                            "title": "How To: Seated Leg Curl (Cybex)",
                            "description": "FULL 12 WEEK PUSH,PULL,LEGS PROGRAM!- BUILD MUSCLE & STRENGTH! - http://goo.gl/X8HeL5 FULL 12 WEEK MUSCLE ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/ELOCsoDSmrg/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/ELOCsoDSmrg/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/ELOCsoDSmrg/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "ScottHermanFitness",
                            "liveBroadcastContent": "none",
                            "publishTime": "2009-10-05T20:43:01Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "iDmAWlsf1IEBF02RkXoFKrBp0Yk",
                        "id": {"kind": "youtube#video", "videoId": "dY7BmNR7RJk"},
                        "snippet": {
                            "publishedAt": "2022-07-26T16:00:32Z",
                            "channelId": "UCndvbnArPZw7jHRmE9qBcFg",
                            "title": "Huge Hamstrings With One Simple Movement | Dumbbell Hamstring Curls Exercise Tutorial",
                            "description": "GRAB our HOME GYM WORKOUT PLAN   here: https://bit.ly/homegymplan http://eepurl.com/cTlXxf Subscribe to our ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/dY7BmNR7RJk/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/dY7BmNR7RJk/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/dY7BmNR7RJk/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Buff Dudes Workouts",
                            "liveBroadcastContent": "none",
                            "publishTime": "2022-07-26T16:00:32Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "WlrlzjX-ZQB13uw47oL916EqNPs",
                        "id": {"kind": "youtube#video", "videoId": "1xqDtgEzddM"},
                        "snippet": {
                            "publishedAt": "2022-04-07T15:26:17Z",
                            "channelId": "UCRFHN6P57B4MqntXD_iIPhQ",
                            "title": "Ask Al – The BEST Bodyweight Hamstrings Exercise",
                            "description": "Bodyweight Leg Curls, also known as Nordic Curls, Harop Curls or Glute Ham Raises are a great exercise for the hamstrings, but ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/1xqDtgEzddM/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/1xqDtgEzddM/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/1xqDtgEzddM/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Al Kavadlo",
                            "liveBroadcastContent": "none",
                            "publishTime": "2022-04-07T15:26:17Z"
                        }
                    }]
                },
                "status": 200,
                "statusText": "",
                "headers": {
                    "cache-control": "private",
                    "content-encoding": "gzip",
                    "content-length": "1493",
                    "content-type": "application/json; charset=UTF-8",
                    "date": "Sun, 20 Nov 2022 04:17:45 GMT",
                    "server": "scaffolding on HTTPServer2",
                    "vary": "Origin, X-Origin, Referer"
                },
                "config": {
                    "transitional": {
                        "silentJSONParsing": true,
                        "forcedJSONParsing": true,
                        "clarifyTimeoutError": false
                    },
                    "transformRequest": [null],
                    "transformResponse": [null],
                    "timeout": 0,
                    "xsrfCookieName": "XSRF-TOKEN",
                    "xsrfHeaderName": "X-XSRF-TOKEN",
                    "maxContentLength": -1,
                    "maxBodyLength": -1,
                    "env": {},
                    "headers": {"Accept": "application/json, text/plain, */*"},
                    "baseURL": "https://www.googleapis.com/youtube/v3",
                    "params": {
                        "part": "snippet",
                        "maxResults": 5,
                        "safeSearch": "strict",
                        "type": "video",
                        "videoDuration": "short",
                        "key": "AIzaSyBkKTUrlLvDFobTj5co40soHCe2lcOShzA",
                        "q": "Hamstring curls"
                    },
                    "method": "get",
                    "url": "/search"
                },
                "request": {
                    "__sentry_xhr__": {
                        "method": "GET",
                        "url": "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&safeSearch=strict&type=video&videoDuration=short&key=AIzaSyBkKTUrlLvDFobTj5co40soHCe2lcOShzA&q=Hamstring+curls",
                        "body": null,
                        "status_code": 200
                    }
                }
            }, {
                "data": {
                    "kind": "youtube#searchListResponse",
                    "etag": "a4MkBtAkdCGpgkvY8ewtUut8lLk",
                    "nextPageToken": "CAUQAA",
                    "regionCode": "GB",
                    "pageInfo": {"totalResults": 1000000, "resultsPerPage": 5},
                    "items": [{
                        "kind": "youtube#searchResult",
                        "etag": "3KRjQl7Gu9_JOh_dD1hXlAxqddE",
                        "id": {"kind": "youtube#video", "videoId": "IB_icWRzi4E"},
                        "snippet": {
                            "publishedAt": "2018-02-01T16:38:37Z",
                            "channelId": "UCVLZmDKeT-mV4H3ToYXIFYg",
                            "title": "How To Do The Perfect Squat, And Why  You Should Do It Every Day",
                            "description": "Business Insider spoke with Roger Frampton, movement coach and author of \"The Flexible Body\", about the importance of the ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/IB_icWRzi4E/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/IB_icWRzi4E/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/IB_icWRzi4E/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Tech Insider",
                            "liveBroadcastContent": "none",
                            "publishTime": "2018-02-01T16:38:37Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "trtzP_EpuTFGqsLtRETYpkhE70o",
                        "id": {"kind": "youtube#video", "videoId": "YaXPRqUwItQ"},
                        "snippet": {
                            "publishedAt": "2017-07-28T02:00:01Z",
                            "channelId": "UC8QZDYMwbYyjW71pWK30gog",
                            "title": "How To Do Perfect SQUAT | FITNESS SPECIAL | SQUATS For Beginners | WORKOUT VIDEO",
                            "description": "Check out this FITNESS SPECIAL video and learn to do the SQUAT perfectly only on Mind Body Soul. Squats tone your body well.",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/YaXPRqUwItQ/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/YaXPRqUwItQ/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/YaXPRqUwItQ/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Mind Body Soul",
                            "liveBroadcastContent": "none",
                            "publishTime": "2017-07-28T02:00:01Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "8qDR-cxiV4pQv3RWFPLn6i3NnhU",
                        "id": {"kind": "youtube#video", "videoId": "aclHkVaku9U"},
                        "snippet": {
                            "publishedAt": "2016-08-31T19:03:37Z",
                            "channelId": "UCKik8uG08NYJStvTW7ZgUAQ",
                            "title": "Bowflex® How-To | Squats for Beginners",
                            "description": "Check out more Bowflex workouts here: https://bit.ly/33juCla We squat all the time - doing yard work, picking things up off the ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/aclHkVaku9U/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/aclHkVaku9U/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/aclHkVaku9U/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Bowflex",
                            "liveBroadcastContent": "none",
                            "publishTime": "2016-08-31T19:03:37Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "HBkabiikJkCTgoTB45kIL_JN1gg",
                        "id": {"kind": "youtube#video", "videoId": "byxWus7BwfQ"},
                        "snippet": {
                            "publishedAt": "2015-04-29T00:11:16Z",
                            "channelId": "UCmTe0LsfEbpkDpgrxKAWbRA",
                            "title": "How to Squat Correctly (3 Rules for Proper Squat Form &amp; Technique)",
                            "description": "Famous Physical Therapist's Bob Schrupp and Brad Heineck demonstrate the 3 rules for performing a squat correctly, safely, and ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/byxWus7BwfQ/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/byxWus7BwfQ/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/byxWus7BwfQ/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Bob & Brad",
                            "liveBroadcastContent": "none",
                            "publishTime": "2015-04-29T00:11:16Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "Cfq97kg4b2IAVYpnj4cWNhi0hIY",
                        "id": {"kind": "youtube#video", "videoId": "xqvCmoLULNY"},
                        "snippet": {
                            "publishedAt": "2012-09-25T03:28:05Z",
                            "channelId": "UCM1Nde-9eorUhq-teaWlgUA",
                            "title": "Exercise Tutorial - Squat",
                            "description": "How To Do The Move 1. Stand with your feet slightly wider than shoulder width apart. 2. Cross your arms in front of you so that ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/xqvCmoLULNY/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/xqvCmoLULNY/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/xqvCmoLULNY/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "XHIT Daily",
                            "liveBroadcastContent": "none",
                            "publishTime": "2012-09-25T03:28:05Z"
                        }
                    }]
                },
                "status": 200,
                "statusText": "",
                "headers": {
                    "cache-control": "private",
                    "content-encoding": "gzip",
                    "content-length": "1499",
                    "content-type": "application/json; charset=UTF-8",
                    "date": "Sun, 20 Nov 2022 04:17:46 GMT",
                    "server": "scaffolding on HTTPServer2",
                    "vary": "Origin, X-Origin, Referer"
                },
                "config": {
                    "transitional": {
                        "silentJSONParsing": true,
                        "forcedJSONParsing": true,
                        "clarifyTimeoutError": false
                    },
                    "transformRequest": [null],
                    "transformResponse": [null],
                    "timeout": 0,
                    "xsrfCookieName": "XSRF-TOKEN",
                    "xsrfHeaderName": "X-XSRF-TOKEN",
                    "maxContentLength": -1,
                    "maxBodyLength": -1,
                    "env": {},
                    "headers": {"Accept": "application/json, text/plain, */*"},
                    "baseURL": "https://www.googleapis.com/youtube/v3",
                    "params": {
                        "part": "snippet",
                        "maxResults": 5,
                        "safeSearch": "strict",
                        "type": "video",
                        "videoDuration": "short",
                        "key": "AIzaSyBkKTUrlLvDFobTj5co40soHCe2lcOShzA",
                        "q": "Squats"
                    },
                    "method": "get",
                    "url": "/search"
                },
                "request": {
                    "__sentry_xhr__": {
                        "method": "GET",
                        "url": "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&safeSearch=strict&type=video&videoDuration=short&key=AIzaSyBkKTUrlLvDFobTj5co40soHCe2lcOShzA&q=Squats",
                        "body": null,
                        "status_code": 200
                    }
                }
            }, {
                "data": {
                    "kind": "youtube#searchListResponse",
                    "etag": "kBkKaAFXuG5dS3XlEXX5SlrO3U0",
                    "nextPageToken": "CAUQAA",
                    "regionCode": "GB",
                    "pageInfo": {"totalResults": 1000000, "resultsPerPage": 5},
                    "items": [{
                        "kind": "youtube#searchResult",
                        "etag": "wUko2ONuS4BSNgzMpmJx_y0GKC4",
                        "id": {"kind": "youtube#video", "videoId": "Hu8i9d_IgpM"},
                        "snippet": {
                            "publishedAt": "2019-12-07T19:25:34Z",
                            "channelId": "UCakojKTeRtxJi1mMRYtXw5w",
                            "title": "How To Do Calf Raises On Leg Press Machine [best exercise for big calfs]",
                            "description": "Free Custom Workout Programs by Gentech Nutrition: www.gentechnutrition.com/pages/free-custom-workout-programs.",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/Hu8i9d_IgpM/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/Hu8i9d_IgpM/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/Hu8i9d_IgpM/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "David Duncan",
                            "liveBroadcastContent": "none",
                            "publishTime": "2019-12-07T19:25:34Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "xqmArCjAzIXYdNEuYEKVdhNOM2k",
                        "id": {"kind": "youtube#video", "videoId": "D-jcJWDdbbU"},
                        "snippet": {
                            "publishedAt": "2020-10-02T20:29:38Z",
                            "channelId": "UCUHk5K_L1Iyj1Yz2DN0aq1A",
                            "title": "HOW TO USE A CALF PRESS MACHINE",
                            "description": "IN THIS VIDEO I SHOW YOU HOW TO SAFLEY AND EFFECTIVELY USE THE CALF PRESS MACHINE. whether you train in The ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/D-jcJWDdbbU/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/D-jcJWDdbbU/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/D-jcJWDdbbU/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Mike Sewell Fitness",
                            "liveBroadcastContent": "none",
                            "publishTime": "2020-10-02T20:29:38Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "y-MnnjaCgR2Bus5_J-2N9nV27Q4",
                        "id": {"kind": "youtube#video", "videoId": "M4FojyRAcuE"},
                        "snippet": {
                            "publishedAt": "2017-03-03T12:45:57Z",
                            "channelId": "UCzzYnZ8GIzfB1Vr3hk2Nj9Q",
                            "title": "How to do a Leg Press Calf Raise for Shredded Calves | Tiger Fitness",
                            "description": "SUBSCRIBE to our channel: http://bit.ly/subTigerFitness Keep it healthy at home with our Cooking w/Kara Playlist!",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/M4FojyRAcuE/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/M4FojyRAcuE/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/M4FojyRAcuE/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Tiger Fitness",
                            "liveBroadcastContent": "none",
                            "publishTime": "2017-03-03T12:45:57Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "GBFQvarHKUOGZPTTXwrWjn__T1M",
                        "id": {"kind": "youtube#video", "videoId": "7jeGWp1IWyQ"},
                        "snippet": {
                            "publishedAt": "2013-06-25T19:22:53Z",
                            "channelId": "UCiUcRAtmd5KQbiSSZOuBLWA",
                            "title": "Matrix Aura G3 Calf Press - Fit Supply",
                            "description": "http://www.fitsupply.com/matrix-aura-calf-press-g3-s77.html Fit Supply is an authorized Matrix Dealer, call us today!",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/7jeGWp1IWyQ/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/7jeGWp1IWyQ/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/7jeGWp1IWyQ/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "FitSupply",
                            "liveBroadcastContent": "none",
                            "publishTime": "2013-06-25T19:22:53Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "Kqd3QNshOofgSX9IKvkOmFC6YeA",
                        "id": {"kind": "youtube#video", "videoId": "XdtWVYFVhGU"},
                        "snippet": {
                            "publishedAt": "2018-09-27T19:30:00Z",
                            "channelId": "UCurr1wG6ZW90uIb79GonuLQ",
                            "title": "Build your Calves on the Leg Press: Calf Raises on the Leg Press",
                            "description": "Superset your heavy leg press with some heavy calf raises for total leg destruction. Visit our website to see more fitness related ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/XdtWVYFVhGU/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/XdtWVYFVhGU/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/XdtWVYFVhGU/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Seriously Strong Training",
                            "liveBroadcastContent": "none",
                            "publishTime": "2018-09-27T19:30:00Z"
                        }
                    }]
                },
                "status": 200,
                "statusText": "",
                "headers": {
                    "cache-control": "private",
                    "content-encoding": "gzip",
                    "content-length": "1480",
                    "content-type": "application/json; charset=UTF-8",
                    "date": "Sun, 20 Nov 2022 04:17:46 GMT",
                    "server": "scaffolding on HTTPServer2",
                    "vary": "Origin, X-Origin, Referer"
                },
                "config": {
                    "transitional": {
                        "silentJSONParsing": true,
                        "forcedJSONParsing": true,
                        "clarifyTimeoutError": false
                    },
                    "transformRequest": [null],
                    "transformResponse": [null],
                    "timeout": 0,
                    "xsrfCookieName": "XSRF-TOKEN",
                    "xsrfHeaderName": "X-XSRF-TOKEN",
                    "maxContentLength": -1,
                    "maxBodyLength": -1,
                    "env": {},
                    "headers": {"Accept": "application/json, text/plain, */*"},
                    "baseURL": "https://www.googleapis.com/youtube/v3",
                    "params": {
                        "part": "snippet",
                        "maxResults": 5,
                        "safeSearch": "strict",
                        "type": "video",
                        "videoDuration": "short",
                        "key": "AIzaSyBkKTUrlLvDFobTj5co40soHCe2lcOShzA",
                        "q": "Calve Press"
                    },
                    "method": "get",
                    "url": "/search"
                },
                "request": {
                    "__sentry_xhr__": {
                        "method": "GET",
                        "url": "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&safeSearch=strict&type=video&videoDuration=short&key=AIzaSyBkKTUrlLvDFobTj5co40soHCe2lcOShzA&q=Calve+Press",
                        "body": null,
                        "status_code": 200
                    }
                }
            }, {
                "data": {
                    "kind": "youtube#searchListResponse",
                    "etag": "yo5UVoIPrjQChCEYLsVlJdVIb-c",
                    "nextPageToken": "CAUQAA",
                    "regionCode": "GB",
                    "pageInfo": {"totalResults": 308517, "resultsPerPage": 5},
                    "items": [{
                        "kind": "youtube#searchResult",
                        "etag": "wCVAfV-yvhJEKKT8rshNXZR7RFc",
                        "id": {"kind": "youtube#video", "videoId": "r49nFlyDvTc"},
                        "snippet": {
                            "publishedAt": "2017-07-05T17:28:25Z",
                            "channelId": "UC8fQzKHIhSoZeSq3bwQx4mw",
                            "title": "Wellness Wednesday: Walking Lunges",
                            "description": "Find a hallway and get lunging. Warm up with a functional move that strengthens your whole lower body. Expert tips provided by ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/r49nFlyDvTc/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/r49nFlyDvTc/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/r49nFlyDvTc/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Mayo Clinic",
                            "liveBroadcastContent": "none",
                            "publishTime": "2017-07-05T17:28:25Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "rkZSJ7BEPy9PTxHxR5tb4wUPoeY",
                        "id": {"kind": "youtube#video", "videoId": "YYWhkctnP2o"},
                        "snippet": {
                            "publishedAt": "2009-01-20T06:04:14Z",
                            "channelId": "UCE8wCVw_ZfRw-D6RJ5EXWbw",
                            "title": "How to Do Walking Lunges",
                            "description": "Walking lunges take the basic lunge and add a walk, stepping forward one leg at a time. Learn how to do walk lunge exercises in ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/YYWhkctnP2o/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/YYWhkctnP2o/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/YYWhkctnP2o/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "LIVESTRONG.COM",
                            "liveBroadcastContent": "none",
                            "publishTime": "2009-01-20T06:04:14Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "BlAE4yRHgebTUYtXFuDMh7RDdGE",
                        "id": {"kind": "youtube#video", "videoId": "wrwwXE_x-pQ"},
                        "snippet": {
                            "publishedAt": "2017-08-11T02:00:02Z",
                            "channelId": "UC8QZDYMwbYyjW71pWK30gog",
                            "title": "How To Do A LUNGE | Lunges for BEGINNERS | FITNESS SPECIAL | WORKOUT VIDEO",
                            "description": "Check out this FITNESS SPECIAL video and learn to do a LUNGE perfectly only on Mind Body Soul. Lunges are a quintessential ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/wrwwXE_x-pQ/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/wrwwXE_x-pQ/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/wrwwXE_x-pQ/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Mind Body Soul",
                            "liveBroadcastContent": "none",
                            "publishTime": "2017-08-11T02:00:02Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "cDoNOTgsTMe-QsL8vM_aOiVEzPg",
                        "id": {"kind": "youtube#video", "videoId": "83pKWaXl8VE"},
                        "snippet": {
                            "publishedAt": "2017-12-11T22:08:31Z",
                            "channelId": "UC5efErrEnb4krh7dwJdj3RA",
                            "title": "Bulldozer Quads - 2 Ways to do Walking Lunges with a Barbell",
                            "description": "FREE Workout - The 5-Minute Glute Workout http://www.criticalbench.com/glutes Strength Coach Brian Klepacki, MS, CSCS ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/83pKWaXl8VE/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/83pKWaXl8VE/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/83pKWaXl8VE/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Criticalbench",
                            "liveBroadcastContent": "none",
                            "publishTime": "2017-12-11T22:08:31Z"
                        }
                    }, {
                        "kind": "youtube#searchResult",
                        "etag": "LW1qHMZgUTmdDarnsOAO0SKclB4",
                        "id": {"kind": "youtube#video", "videoId": "G_cv0yXpNPU"},
                        "snippet": {
                            "publishedAt": "2021-10-27T12:00:07Z",
                            "channelId": "UCwL6i80ui6Po2Jov2jVRlbQ",
                            "title": "Glute-Focused Walking Lunges | Correct Form, Mistakes, &amp; More",
                            "description": "In this video, Physique Development Coach Austin Current takes you through the correct form and exercise technique for the glute ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/G_cv0yXpNPU/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/G_cv0yXpNPU/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/G_cv0yXpNPU/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Physique Development",
                            "liveBroadcastContent": "none",
                            "publishTime": "2021-10-27T12:00:07Z"
                        }
                    }]
                },
                "status": 200,
                "statusText": "",
                "headers": {
                    "cache-control": "private",
                    "content-encoding": "gzip",
                    "content-length": "1480",
                    "content-type": "application/json; charset=UTF-8",
                    "date": "Sun, 20 Nov 2022 04:17:46 GMT",
                    "server": "scaffolding on HTTPServer2",
                    "vary": "Origin, X-Origin, Referer"
                },
                "config": {
                    "transitional": {
                        "silentJSONParsing": true,
                        "forcedJSONParsing": true,
                        "clarifyTimeoutError": false
                    },
                    "transformRequest": [null],
                    "transformResponse": [null],
                    "timeout": 0,
                    "xsrfCookieName": "XSRF-TOKEN",
                    "xsrfHeaderName": "X-XSRF-TOKEN",
                    "maxContentLength": -1,
                    "maxBodyLength": -1,
                    "env": {},
                    "headers": {"Accept": "application/json, text/plain, */*"},
                    "baseURL": "https://www.googleapis.com/youtube/v3",
                    "params": {
                        "part": "snippet",
                        "maxResults": 5,
                        "safeSearch": "strict",
                        "type": "video",
                        "videoDuration": "short",
                        "key": "AIzaSyBkKTUrlLvDFobTj5co40soHCe2lcOShzA",
                        "q": "Walking Lunges"
                    },
                    "method": "get",
                    "url": "/search"
                },
                "request": {
                    "__sentry_xhr__": {
                        "method": "GET",
                        "url": "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&safeSearch=strict&type=video&videoDuration=short&key=AIzaSyBkKTUrlLvDFobTj5co40soHCe2lcOShzA&q=Walking+Lunges",
                        "body": null,
                        "status_code": 200
                    }
                }
            }]
            for (let [index, exercise] of workout.workoutExercises.entries()) {
                setRecommendedVideos(prevValues => {
                    prevValues.set(exercise.id, response[index].data)
                    return new Map(prevValues.entries())
                })
            }
        }
        fetchVideoRecommendations()
    }, [])

    /**
     * Load rounds or exercises for workout
     */
    useEffect(() => {
        let items;
        if(shouldPlayWorkout) {
            if (workout.type === workoutsConstants.workoutType.CIRCUIT) {
                items = loadCircuitWorkout(workout);
            } else {
                items = loadRepsAndSetsWorkout(workout);
            }
            setRoundsExercises(items)
        }
    }, [shouldPlayWorkout])

    /**
     * Play the appropriate workout
     */
    const playWorkout = () => {
        const isValid = isValidWorkout(workout)
        if (isValid) {
            setShouldPlayWorkout(true)
        } else {
            setShowSnackBar(true)
            setSnackbarType(SnackBarType.ERROR)
            setSnackbarMessage("This workout has no exercises to play")
        }
    };

    /**
     * Stop the appropriate workout
     */
    const stopWorkout = () => {
        setShouldPlayWorkout(false)
    };

    /**
     * Delete workout
     * @returns {Promise<void>}
     */
    const deleteWorkoutHelper = async () => {
        return dispatch(deleteWorkout(workout)).unwrap();
    };

    /**
     * Delete the workout
     */
    const doDeleteWorkout = async () => {
        if (!workout.isLive) {
            setIsLoading(true)
            setLoadingMessage("Deleting workout")
            try {
                await deleteWorkoutHelper();
                setIsLoading(false)
                close()
            } catch (err) {
                setIsLoading(false)
                setShowSnackBar(true)
                setSnackbarType(SnackBarType.ERROR)
                setSnackbarMessage("Oops! unable to delete workout at this moment")
            }
        } else {
            setShowSnackBar(true)
            setSnackbarType(SnackBarType.WARN)
            setSnackbarMessage("Remove workout from live before deleting it")
        }

    };

    if (!openCreateWorkout) {
        return (
            <div
                className="container mx-auto px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-white overflow-y-scroll">
                <div className="flex flex-row items-center place-content-between">
                    <div className="my-4 cursor-pointer" onClick={close}>
                        <CloseIcon/>
                    </div>
                    {user ?
                        <div className="relative cursor-pointer" onMouseOver={() => setShowMenuOptions(true)}
                             onMouseLeave={() => setShowMenuOptions(false)}>
                            <OverflowIcon/>
                            {showMenuOptions ? <div className="absolute text-left right-0 w-52 z-10">
                                <div
                                    className="mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div
                                        onClick={() => setOpenCreateWorkout(true)}
                                        className="py-2 hover:bg-secondary w-full rounded-b-md text-gray-700 block px-4 py-2 text-md text-left font-medium"
                                        role="menuitem" tabIndex="-1"
                                        id="menu-item-6">Edit
                                    </div>
                                    <div
                                        onClick={doDeleteWorkout}
                                        className="py-2 hover:bg-darkPrimary bg-primary w-full text-white rounded-b-md text-gray-700 block px-4 py-2 text-md text-left font-medium"
                                        role="menuitem" tabIndex="-1"
                                        id="menu-item-6">Delete
                                    </div>
                                </div>
                            </div> : null}
                        </div> : null}
                </div>

                <WorkoutCardBig workout={workout}/>

                <div className="overscroll-contain">
                    <p className="my-4 font-light break-words whitespace-pre-line">{workout.description}</p>
                </div>

                <div className="pb-2">
                    <div className="flex flex-row items-center mb-2">
                        <div
                            className={`flex flex-row items-center px-2 outline outline-2 bg-secondary text-primary ${workout.type === workoutsConstants.workoutType.CIRCUIT ? "rounded-l" : "rounded"} text-xs font-semibold`}>{workout.workoutExercises.length} exercises
                        </div>
                        {workout.type === workoutsConstants.workoutType.CIRCUIT ?
                            <div
                                className="flex flex-row items-center ml-1.5 px-2 outline outline-2 bg-secondary text-primary rounded-r text-xs font-semibold">
                                {workout.rounds} Rounds
                            </div> : null}
                    </div>
                    <WorkoutPlaylist workout={workout} playlist={roundsOrExercises}/>
                </div>

                {selectedExercise ?
                    <div className="mt-2 mb-4 pl-4">
                        <DiscoveryHub recommendation={recommendedVideos.get(selectedExercise.id)}
                                      tag={{title: selectedExercise.title}}/>
                    </div> : null}

                <div onClick={playWorkout}
                     className="flex flex-row items-center justify-center bg-primary rounded-md w-14 h-14 sm:w-20 sm:h-20 fixed bottom-0 right-0 mr-8 mb-8 hover:bg-darkPrimary sm:hidden">
                    <PlayIcon/>
                </div>
                <button
                    type="button"
                    onClick={playWorkout}
                    className="mb-8 w-full bg-primary rounded-3xl py-2 px-10 text-white font-medium hover:bg-darkPrimary hidden sm:block">Play
                    workout
                </button>

                <div className="fixed left-0 right-0 bottom-0">
                    <Controls prev={() => console.log("Previous")}
                              play={() => console.log("Play")}
                              next={() => console.log("Next")}
                              isPaused={() => console.log("Is Paused")}/>
                </div>

                {isLoading ? <Loading message={loadingMessage}/> : null}

                <SnackBar
                    open={showSnackBar}
                    close={() => setShowSnackBar(false)}
                    message={snackbarMessage}
                    type={snackbarType}/>
            </div>
        );
    }

    if (openCreateWorkout) {
        return (
            <CreateWorkout
                close={() => setOpenCreateWorkout(false)}
                params={{workoutId: workout.id, workoutType: workout.type}}/>
        )
    }
};

export default PreviewWorkout;
