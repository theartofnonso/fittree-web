/* eslint-disable */
import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {API, graphqlOperation, Storage} from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import {uploadAndDeleteS3} from "../../utils/aws-utils/awsHelperFunctions";
import awsConstants from "../../utils/aws-utils/awsConstants";

export const workoutsSliceEnums = {
    SLICE: "authWorkouts",
    STATUS_PENDING: "PENDING",
    STATUS_FULFILLED: "FULFILLED",
    STATUS_REJECTED: "REJECTED",
    STATUS_IDLE: "IDLE",
};

const workoutsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = workoutsAdapter.getInitialState({
    status: workoutsSliceEnums.STATUS_IDLE,
});

const authWorkoutsSlice = createSlice({
    name: workoutsSliceEnums.SLICE,
    initialState,
    reducers: {
        workoutsAdded: (state, action) => {
            workoutsAdapter.setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(listWorkouts.fulfilled, (state, action) => {
                state.status = workoutsSliceEnums.STATUS_FULFILLED;
                workoutsAdapter.setAll(state, action.payload);
            })
            .addCase(listWorkouts.rejected, (state, action) => {
                workoutsAdapter.setAll(state, []);
            })
            .addCase(createWorkout.fulfilled, (state, action) => {
                state.status = workoutsSliceEnums.STATUS_FULFILLED;
                workoutsAdapter.addOne(state, action.payload);
            })
            .addCase(updateWorkout.fulfilled, (state, action) => {
                state.status = workoutsSliceEnums.STATUS_FULFILLED;
                workoutsAdapter.upsertOne(state, action.payload);
            })
            .addCase(deleteWorkout.fulfilled, (state, action) => {
                state.status = workoutsSliceEnums.STATUS_FULFILLED;
                workoutsAdapter.removeOne(state, action.payload.id);
            });
    },
});

/**
 * Get workouts from DynamoDB
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const listWorkouts = createAsyncThunk("authWorkouts/getAll", async (payload, {rejectWithValue}) => {
    try {
        const workouts = await API.graphql(graphqlOperation(queries.listWorkouts));
        return workouts.data.listWorkouts.items;
    } catch (err) {
        return rejectWithValue([]);
    }

});

/**
 * Persist a workout to DynamoDB
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const createWorkout = createAsyncThunk("authWorkouts/create", async (payload, {rejectWithValue}) => {

    try {
        /**
         * Persist the new Workout
         */
        const response = await API.graphql(
            graphqlOperation(mutations.createWorkout, {
                input: {
                    ...payload,
                },
            }),
        );

        return response.data.createWorkout;
    } catch (err) {
        return rejectWithValue(err.error);
    }

});

/**
 * Update a workout to DataStore
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const updateWorkout = createAsyncThunk("authWorkouts/update", async (payload, {rejectWithValue}) => {

    try {
        const response = await API.graphql(
            graphqlOperation(mutations.updateWorkout, {
                input: {
                    ...payload,
                },
            }),
        );
        return response.data.updateWorkout;
    } catch (err) {
        return rejectWithValue(err.error);
    }

});

/**
 * Delete and persist workout to DynamoDB
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const deleteWorkout = createAsyncThunk("authWorkouts/delete", async (payload, {rejectWithValue}) => {

    const {id, thumbnailUrl} = payload;

    try {
        /**
         * Delete the Workout
         */
        await API.graphql(
            graphqlOperation(mutations.deleteWorkout, {
                input: {id},
            }),
        )

        /**
         * Delete the workout thumbnail
         */
        await uploadAndDeleteS3(null, awsConstants.awsStorage.folders.THUMBNAILS, thumbnailUrl, "jpg")

        return payload;

    } catch (err) {
        return rejectWithValue(err.error);
    }

});

/**
 * Batch delete workouts and their corresponding thumbnails
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const batchDeleteWorkouts = createAsyncThunk("authWorkouts/deleteAll", async (payload, {rejectWithValue}) => {

    const {workouts} = payload;

    const workoutMutations = workouts.map((workout, index) => {
        return `mutation${index}: deleteWorkout(input: {id: "${workout.id}"}) { id }`;
    });

    try {
        await API.graphql(graphqlOperation(`mutation batchMutation {${workoutMutations}}`));
        workouts.forEach(workout => {
            const thumbnail = workout.thumbnailUrl.split("/")[3];
            const key = "Thumbnails/" + thumbnail;
            Storage.remove(key);
        })

    } catch (err) {
        // Do nothing for now
    }

});

export const {
    selectAll: selectAllWorkouts,
    selectById: selectWorkoutById,
    selectIds: selectWorkoutIds,
} = workoutsAdapter.getSelectors(state => state.authWorkouts);

export const {workoutsAdded} = authWorkoutsSlice.actions;

export default authWorkoutsSlice.reducer;
