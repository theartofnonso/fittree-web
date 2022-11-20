/* eslint-disable */
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API, graphqlOperation} from "aws-amplify";
import * as queries from "../../graphql/queries";
import workoutsConstants from "../../utils/workout/workoutsConstants";

const initialState = {
    profile: null,
    status: workoutsConstants.profileStatus.LOADING,
};

const creatorProfileSlice = createSlice({
    name: 'creatorProfile',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCreatorProfile.fulfilled, (state, action) => {
                state.status = workoutsConstants.profileStatus.READY
                state.profile = action.payload;
                // Get their live workout only
                state.liveWorkouts = action.payload ? action.payload.workouts.items
                    .filter(item => item.isLive)
                    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)) : []
                // Get all their exercises (it will be needed to load workout)
                state.exercises = action.payload ? action.payload.exercises.items : []
            })
            .addCase(fetchCreatorProfile.rejected, (state, action) => {
                state.status = workoutsConstants.profileStatus.FAILED
                state.profile = null
            });
    },
});

/**
 * Get the unauth's data
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const fetchCreatorProfile = createAsyncThunk("creatorProfile/get", async (payload, {rejectWithValue}) => {
    const {username} = payload;

    try {
        const response = await API.graphql({
                ...graphqlOperation(queries.listCreators, {
                        filter: {
                            preferred_username: {
                                eq: username.trim(),
                            },
                        },
                    },
                ),
                // authMode: 'AWS_IAM'
            }
        )
        const creators = response.data.listCreators.items
        return creators.length > 0 ? creators[0] : null
    } catch (err) {
        return rejectWithValue({
            profile: null,
            status: workoutsConstants.profileStatus.FAILED
        });
    }

});

export const selectCreator = state => state.creatorProfile.profile;

export const selectCreatorStatus = state => state.creatorProfile.status;

export const selectWorkout = state => state.creatorProfile.currentWorkout;

export const selectWorkouts = state => state.creatorProfile.liveWorkouts;

export const selectExercises = state => state.creatorProfile.exercises;

export const {workoutAdded} = creatorProfileSlice.actions;

export default creatorProfileSlice.reducer;
