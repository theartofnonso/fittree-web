import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {
    fetchCreatorProfile,
    selectCreator,
    selectCreatorStatus,
    selectExercises,
    selectWorkouts
} from "../src/features/CreatorProfileSlice";
import {useDispatch, useSelector} from "react-redux";
import {searchExerciseOrWorkout} from "../src/utils/workoutAndExerciseUtils";
import {
    Alert,
    Avatar,
    Box,
    Container,
    Link,
    Snackbar,
    TextField,
    ThemeProvider,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import workoutsConstants from "../src/utils/workout/workoutsConstants";
import {sortWorkouts} from "../src/utils/workout/workoutsHelperFunctions";
import CreatorProfile404 from "../src/components/views/CreatorProfile404";
import CreatorProfile500 from "../src/components/views/CreatorProfile500";
import CreatorProfileLoading from "../src/components/views/CreatorProfileLoading";
import Socials from "../src/components/views/Socials";
import ShareSvg from "../src/components/icons/ShareSvg";
import styled from "@emotion/styled";
import FittrIconBig from "../src/components/illustrations/FittrIconBig";
import WorkoutCard from "../src/components/cards/WorkoutCard";
import EmptyState from "../src/components/illustrations/NotFound";
import PreviewWorkout from "../src/components/modals/workout/PreviewWorkout";

const CreatorProfile = () => {

    const CssTextField = styled(TextField)({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            }
        },
    });


    const theme = useTheme();
    const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'));

    /**
     * Retrieve creator's username
     */
    const router = useRouter()
    const {username} = router.query

    const dispatch = useDispatch();

    const profile = useSelector(selectCreator)

    const status = useSelector(selectCreatorStatus)

    const workouts = useSelector(selectWorkouts)

    const exercises = useSelector(selectExercises)

    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

    const [currentWorkout, setCurrentWorkout] = useState(null)

    const [shouldPlayWorkout, setShouldPlayWorkout] = useState(false)

    const [searchQuery, setSearchQuery] = React.useState('');

    /**
     * Show snackbar for err message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("");

    /**
     * Load workout into filtered workout
     */
    useEffect(() => {
        if (workouts.length > 0) {
            setFilteredWorkouts(workouts)
        }
    }, [workouts])

    /**
     * Filter workout
     * @param query
     */
    const onChangeSearch = query => {
        setSearchQuery(query);
        const searchResult = searchExerciseOrWorkout(workouts, query)
        setFilteredWorkouts(searchResult);
    };

    /**
     * Play workout
     */
    const togglePlayWorkout = (shouldPlay) => {
        setShouldPlayWorkout(shouldPlay)
    }

    /**
     * Preview a workout from the list
     */
    const previewWorkout = (selectedWorkout) => {
        const enrichedWorkout = {
            ...selectedWorkout,
            workoutExercises: sortWorkouts(selectedWorkout, exercises),
        };
        setCurrentWorkout(enrichedWorkout);
    }

    /**
     * Close the preview modal
     */
    const closePreview = () => {
        setCurrentWorkout(null)
    }

    /**
     * Display appropriate workout play component
     * @returns {JSX.Element}
     */
    const getWorkoutPlayComponent = () => {

        // if (currentWorkout.type === workoutsConstants.workoutType.CIRCUIT) {
        //     const rounds = loadCircuitWorkout(currentWorkout);
        //     return <PlayCircuitWorkout
        //         workout={currentWorkout}
        //         rounds={rounds}
        //         end={() => togglePlayWorkout(false)}/>
        //
        // } else {
        //     const exercises = loadRepsAndSetsWorkout(currentWorkout);
        //     return <PlayRepsAndSetsWorkout
        //         workout={currentWorkout}
        //         exercises={exercises}
        //         end={() => togglePlayWorkout(false)}/>
        // }
    }

    // /**
    //  * copy shareable link
    //  */
    // const copyShareableLink = () => {
    //     Clipboard.setStringAsync(generateShareableLink(username)).then(() => {
    //         setSnackbarMessage("Link copied")
    //         setShowSnackBar(true)
    //     });
    // }

    /**
     * Display Avatar
     * @returns {JSX.Element}
     */
    const displayAvatar = () => {
        if (profile) {
            return profile.displayProfile ?
                <Avatar sx={{backgroundColor: "#ef7a75", width: 80, height: 80}} alt="Display Profile"
                        src={"https://" + profile.displayProfile}/> :
                <Avatar sx={{backgroundColor: "#ef7a75", width: 80, height: 80}} alt="Display profile"
                        src={"https://" + profile.displayProfile}>
                    {profile.preferred_username.slice(0, 1).toUpperCase()}
                </Avatar>
        }
    };

    const handleClose = () => {
        setShowSnackBar(false);
    };

    /**
     * Retrieve creator's profile
     * @type {Dispatch<AnyAction>}
     */
    useEffect(() => {
        if (username) {
            dispatch(fetchCreatorProfile({username: username}));
        }
    }, [username])

    if (status === workoutsConstants.profileStatus.LOADING) {
        /**
         * Creator page is still loading
         */
        return <CreatorProfileLoading/>
    } else if (status === workoutsConstants.profileStatus.FAILED) {
        /**
         * Backend error from server
         */
        return <CreatorProfile500 username={username}/>

    } else {
        /**
         * Page is ready but profile may not exists
         */
        if (profile === null) {
            /**
             * Creator doesn't exist
             */
            return <CreatorProfile404 username={username}/>
        }
        /**
         * Loaded Creator page content
         */
        return (
            <Container maxWidth="md" sx={{padding: 2}}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 2,
                }}>
                    <Box sx={{
                        justifyContent: "space-between",
                        display: 'flex',
                        flexDirection: "row",
                        alignItems: 'center',
                        paddingHorizontal: 10,
                    }}>
                        <ShareSvg/>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {displayAvatar()}
                        <ThemeProvider theme={theme}>
                            <Typography variant="h6" textAlign='center' sx={{
                                my: 1,
                                fontFamily: 'Montserrat',
                                fontWeight: 500
                            }}>{profile.preferred_username}</Typography>
                            <Typography variant="body2" textAlign='center' sx={{
                                fontFamily: 'Montserrat',
                                fontSize: 12
                            }}>{profile.displayBrief}</Typography>
                        </ThemeProvider>
                        {profile ? <Socials profile={profile}/> : null}
                    </Box>
                    <CssTextField sx={{
                        backgroundColor: "#f5ede8",
                        flex: 1,
                        height: 25,
                        borderRadius: 2
                    }}
                                  autoCapitalize='none'
                                  id="filled-basic"
                                  label="Search workouts"
                                  variant="outlined"
                                  value={searchQuery} onChange={value => onChangeSearch(value.toLowerCase())}/>

                </Box>
                <Box sx={{
                    height: isBigScreen ? 800 : 400,
                    overflow: 'scroll',
                    borderRadius: 8,
                }}>
                    {workouts.length > 0 ?
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: isBigScreen ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                            gridGap: 8,
                            overflow: !isBigScreen ? 'scroll' : null,
                        }}>
                            {filteredWorkouts.map((item, index) => {
                                return (
                                    <Box key={index} onClick={() => previewWorkout(item)}>
                                        <WorkoutCard workout={item}/>
                                    </Box>
                                );
                            })}
                        </Box> :
                        <Box sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                        }}>
                            <EmptyState/>
                            <Typography variant="body1" textAlign='center' sx={{
                                fontFamily: 'Montserrat',
                                fontSize: 12,
                                fontWeight: 700,
                                marginTop: 5
                            }}>{`${username} has no workouts`}</Typography>
                        </Box>}
                </Box>
                <Link href='/' sx={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FittrIconBig/>
                </Link>
                {currentWorkout && !shouldPlayWorkout ?
                    <PreviewWorkout
                        workout={currentWorkout}
                        play={() => togglePlayWorkout(true)}
                        close={closePreview}/> : null}
                {shouldPlayWorkout ? getWorkoutPlayComponent() : null}
                <Snackbar
                    autoHideDuration={2000}
                    open={showSnackBar}
                    onClose={handleClose}
                    message={snackbarMessage}>
                    <Alert severity="success" sx={{width: '100%'}}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        )
    }
}

export default CreatorProfile;
