/* eslint-disable */
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API, Auth, graphqlOperation} from "aws-amplify";
import * as queries from "../../graphql/queries";
import workoutsConstants from "../../utils/workout/workoutsConstants";
import {isUserAuthenticated} from "../../utils/aws-utils/awsHelperFunctions";

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

    let isAuthenticated = await isUserAuthenticated()

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
            authMode: isAuthenticated ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM"
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
