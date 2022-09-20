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
    AlertTitle,
    Avatar,
    Box, Collapse,
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
import {
    generateShareableLink,
    loadCircuitWorkout,
    loadRepsAndSetsWorkout,
    sortWorkouts
} from "../src/utils/workout/workoutsHelperFunctions";
import CreatorProfile404 from "../src/components/views/CreatorProfile404";
import CreatorProfile500 from "../src/components/views/CreatorProfile500";
import CreatorProfileLoading from "../src/components/views/CreatorProfileLoading";
import Socials from "../src/components/views/Socials";
import WorkoutCard from "../src/components/cards/WorkoutCard";
import PreviewWorkout from "../src/components/modals/workout/PreviewWorkout";
import PlayRepsAndSetsWorkout from "../src/components/modals/workout/PlayRepsAndSetsWorkout";
import PlayCircuitWorkout from "../src/components/modals/workout/PlayCircuitWorkout";
import EmptyStateIcon from '../src/components/svg/empty_state.svg'
import ShareIcon from '../src/components/svg/share-box-line.svg'
import FittrIcon from '../src/components/svg/fittr.svg'
import FittrIconSmall from '../src/components/svg/fittr_small.svg'

const CreatorProfile = () => {

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

    const [open, setOpen] = React.useState(true);

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

        if (currentWorkout.type === workoutsConstants.workoutType.CIRCUIT) {
            const rounds = loadCircuitWorkout(currentWorkout);
            return <PlayCircuitWorkout
                workout={currentWorkout}
                rounds={rounds}
                end={() => togglePlayWorkout(false)}/>

        } else {
            const exercises = loadRepsAndSetsWorkout(currentWorkout);
            return <PlayRepsAndSetsWorkout
                workout={currentWorkout}
                exercises={exercises}
                end={() => togglePlayWorkout(false)}/>
        }
    }

    /**
     * copy shareable link
     */
    const copyShareableLink = () => {
        navigator.clipboard.writeText(generateShareableLink(username)).then(() => {
            setSnackbarMessage("Link copied")
            setShowSnackBar(true)
        });
    }

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
            <Container maxWidth="xl">
                <Collapse in={open}>
                    <Alert severity="warning" onClose={() => setOpen(false)}>
                        <AlertTitle>Important</AlertTitle>
                        <Typography variant='body2'>Fittree will <strong>never request financial transactions</strong> of
                            any kind</Typography><br/>
                        <Typography variant='body2'>Fittree will never redirect you to any other page other than
                            the <strong>socials of a Fittree user as well as our ProductHunt page</strong></Typography><br/>
                        <Typography variant='body2'>Fittree will <strong>never request any personal
                            details</strong> from you</Typography>
                    </Alert>
                </Collapse>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginY: 2,
                }}>
                    <Box sx={{
                        justifyContent: "space-between",
                        display: 'flex',
                        flexDirection: "row",
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        cursor: 'pointer'
                    }} onClick={copyShareableLink}>
                        <ShareIcon/>
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
                    <TextField sx={{
                        backgroundColor: "#f5ede8",
                        flex: 1,
                        borderRadius: 2
                    }}
                               autoCapitalize='none'
                               label="Search workouts"
                               variant="outlined"
                               value={searchQuery}
                               onChange={event => onChangeSearch(event.target.value.toLowerCase())}/>

                </Box>
                <Box sx={{
                    height: isBigScreen ? 800 : 400,
                    overflowY: 'scroll',
                }}>
                    {workouts.length > 0 ?
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: isBigScreen ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                            gridGap: 8,
                            overflowY: !isBigScreen ? 'scroll' : null,
                        }}>
                            {filteredWorkouts.map((item, index) => {
                                return (
                                    <Box key={index} onClick={() => previewWorkout(item)} sx={{cursor: 'pointer'}}>
                                        <WorkoutCard workout={item}/>
                                    </Box>
                                );
                            })}
                        </Box> :
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 5
                        }}>
                            <EmptyStateIcon/>
                            <Typography variant="body1" textAlign='center' sx={{
                                fontFamily: 'Montserrat',
                                fontSize: 12,
                                fontWeight: 500,
                                marginTop: 2
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
                    {isBigScreen ? <FittrIcon/> : <FittrIconSmall/>}
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
