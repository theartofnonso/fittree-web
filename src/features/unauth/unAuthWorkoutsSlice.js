/* eslint-disable */
import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {API, graphqlOperation} from "aws-amplify";
import * as queries from "../../graphql/queries";
import workoutsConstants from "../../utils/workout/workoutsConstants";
import {isUserAuthenticated} from "../../utils/aws-utils/awsHelperFunctions";

export const workoutsSliceEnums = {
    SLICE: "unAuthWorkouts",
    STATUS_PENDING: "PENDING",
    STATUS_FULFILLED: "FULFILLED",
    STATUS_REJECTED: "REJECTED",
    STATUS_IDLE: "IDLE",
};

const workoutsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = workoutsAdapter.getInitialState({
    status: workoutsConstants.profileStatus.LOADING,
});

const unAuthWorkoutsSlice = createSlice({
    name: workoutsSliceEnums.SLICE,
    initialState,
    reducers: {
        workoutsAdded: (state, action) => {
            const liveWorkouts = action.payload
            workoutsAdapter.setAll(state, liveWorkouts);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCreatorWorkout.fulfilled, (state, action) => {
                state.status = state.status = workoutsConstants.profileStatus.READY
                if (action.payload) {
                    workoutsAdapter.addOne(state, action.payload);
                }
            })
            .addCase(fetchCreatorWorkout.rejected, (state, action) => {
                state.status = workoutsConstants.profileStatus.FAILED
            })
            .addCase(fetchWorkouts.fulfilled, (state, action) => {
                state.status = workoutsSliceEnums.STATUS_FULFILLED;
                workoutsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchWorkouts.rejected, (state, action) => {
                workoutsAdapter.setAll(state, []);
            });
    },
});

/**
 * Get a workout
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const fetchCreatorWorkout = createAsyncThunk("unAuthWorkouts/get", async (payload, {rejectWithValue}) => {

    const {workoutId} = payload

    let isAuthenticated = await isUserAuthenticated()

    try {
        const response = await API.graphql({
            ...graphqlOperation(queries.getWorkout, {
                id: workoutId
            }),
            authMode: isAuthenticated ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM"
        });
        return response.data.getWorkout;
    } catch (err) {
        return rejectWithValue(err.error);
    }

});

/**
 * Get workouts from DynamoDB
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const fetchWorkouts = createAsyncThunk("unAuthWorkouts/getAll", async (payload, {rejectWithValue}) => {

    const {searchQuery} = payload

    let isAuthenticated = await isUserAuthenticated()

    try {
        const response = await API.graphql({
                ...graphqlOperation(queries.searchWorkouts, {
                        limit: 10,
                        filter: {
                            title: {
                                wildcard: searchQuery.trim() + "*",
                            },
                        },
                    },
                ),
                authMode: isAuthenticated ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM"
            }
        )
        return response.data.searchWorkouts.items;
    } catch (err) {
        return rejectWithValue([]);
    }

});

export const {
    selectAll: selectAllWorkouts,
    selectById: selectWorkoutById,
    selectIds: selectWorkoutIds,
} = workoutsAdapter.getSelectors(state => state.unAuthWorkouts);

export const {workoutsAdded} = unAuthWorkoutsSlice.actions;
export const selectGetWorkoutStatus = state => state.unAuthWorkouts.status;

export default unAuthWorkoutsSlice.reducer;
