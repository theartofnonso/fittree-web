/* eslint-disable */
import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {API, graphqlOperation, Storage} from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import {uploadAndDeleteS3} from "../../utils/aws-utils/awsHelperFunctions";
import awsConstants from "../../utils/aws-utils/awsConstants";

export const exercisesSliceEnums = {
    SLICE: "authExercises",
    STATUS_PENDING: "PENDING",
    STATUS_FULFILLED: "FULFILLED",
    STATUS_REJECTED: "REJECTED",
    STATUS_IDLE: "IDLE",
};

const exercisesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = exercisesAdapter.getInitialState({
    status: exercisesSliceEnums.STATUS_IDLE,
});

const authExercisesSlice = createSlice({
    name: exercisesSliceEnums.SLICE,
    initialState,
    reducers: {
        exercisesAdded: (state, action) => {
            exercisesAdapter.setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(listExercises.fulfilled, (state, action) => {
                state.status = exercisesSliceEnums.STATUS_FULFILLED;
                exercisesAdapter.setAll(state, action.payload);
            })
            .addCase(listExercises.rejected, (state, action) => {
                exercisesAdapter.setAll(state, []);
            })
            .addCase(createExercise.fulfilled, (state, action) => {
                state.status = exercisesSliceEnums.STATUS_FULFILLED;
                exercisesAdapter.addOne(state, action.payload);
            })
            .addCase(updateExercise.fulfilled, (state, action) => {
                state.status = exercisesSliceEnums.STATUS_FULFILLED;
                exercisesAdapter.upsertOne(state, action.payload);
            })
            .addCase(deleteExercise.fulfilled, (state, action) => {
                state.status = exercisesSliceEnums.STATUS_FULFILLED;
                exercisesAdapter.removeOne(state, action.payload.id);
            });
    },
});

/**
 * Fetch exercises from DyanmoDB
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const listExercises = createAsyncThunk("authExercises/getAll", async (payload, {rejectWithValue}) => {
    try {
        const response = await API.graphql(graphqlOperation(queries.listExercises));
        return response.data.listExercises.items;
    } catch (err) {
        return rejectWithValue([]);
    }
});

/**
 * Persist a fit to DataStore
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const createExercise = createAsyncThunk("authExercises/create", async (payload, {rejectWithValue}) => {

    try {
        /**
         * Persist the new Exercise
         */
        const response = await API.graphql(
            graphqlOperation(mutations.createExercise, {
                input: {
                    ...payload,
                },
            }),
        );

        return response.data.createExercise;
    } catch (err) {
        return rejectWithValue(err.error);
    }

});

/**
 * Update a fit to DataStore
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const updateExercise = createAsyncThunk("authExercises/update", async (payload, {rejectWithValue}) => {

    try {
        const response = await API.graphql(
            graphqlOperation(mutations.updateExercise, {
                input: {
                    ...payload,
                },
            }),
        );
        return response.data.updateExercise;
    } catch (err) {
        return rejectWithValue(err.error);
    }
});

/**
 * Delete and persist a fit to DataStore
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const deleteExercise = createAsyncThunk("authExercises/delete", async (payload, {rejectWithValue}) => {


    try {
        /**
         * Delete the exercise
         */
        const {id, videoUrls} = payload;

        await API.graphql(
            graphqlOperation(mutations.deleteExercise, {
                input: {id},
            }),
        );

        /**
         * Delete the exercise videos
         */
        for (const url of videoUrls) {
            await uploadAndDeleteS3(null, awsConstants.awsStorage.folders.VIDEOS, url, "mp4")
        }

        return payload;

    } catch (err) {
        return rejectWithValue(err.error);
    }

});

/**
 * Batch delete exercises and their corresponding videos
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const batchDeleteExercises = createAsyncThunk("authExercises/deleteAll", async (payload, {rejectWithValue}) => {

    const {exercises} = payload;

    const exerciseMutations = exercises.map((exercise, index) => {
        return `mutation${index}: deleteExercise(input: {id: "${exercise.id}"}) { id }`;
    });

    try {
        await API.graphql(graphqlOperation(`mutation batchMutation {${exerciseMutations}}`));
        exercises.forEach(exercise => {
            exercise.videoUrls.forEach(url => {
                const file = url.split("/")[3];
                const key = "Videos/" + file;
                Storage.remove(key);
            });
        })

    } catch (err) {
        // Do nothing for now
    }

});

export const {
    selectAll: selectAllExercises,
    selectById: selectExerciseById,
    selectIds: selectExerciseIds,
} = exercisesAdapter.getSelectors(state => state.authExercises);

export const {exercisesAdded} = authExercisesSlice.actions;

export default authExercisesSlice.reducer;
