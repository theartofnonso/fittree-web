/* eslint-disable */
import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

export const exercisesSliceEnums = {
    SLICE: "exercises",
    STATUS_PENDING: "PENDING",
    STATUS_FULFILLED: "FULFILLED",
    STATUS_UNFULFILLED: "UNFULFILLED",
    STATUS_REJECTED: "REJECTED",
    STATUS_IDLE: "IDLE",
};

const exercisesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = exercisesAdapter.getInitialState({
    status: exercisesSliceEnums.STATUS_IDLE,
});

const exercisesSlice = createSlice({
    name: exercisesSliceEnums.SLICE,
    initialState,
    reducers: {
        exercisesAdded: (state, action) => {
            exercisesAdapter.setAll(state, action.payload);
        },
    },
});

export const {
    selectAll: selectAllExercises,
    selectById: selectExerciseById,
    selectIds: selectFitIds,
} = exercisesAdapter.getSelectors(state => state.exercises);

export const {exercisesAdded} = exercisesSlice.actions;

export default exercisesSlice.reducer;
