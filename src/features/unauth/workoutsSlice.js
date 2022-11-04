/* eslint-disable */
import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

export const workoutsSliceEnums = {
    SLICE: "workouts",
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

const workoutsSlice = createSlice({
    name: workoutsSliceEnums.SLICE,
    initialState,
    reducers: {
        workoutsAdded: (state, action) => {
            workoutsAdapter.setAll(state, action.payload);
        },
    },
});

export const {
    selectAll: selectAllWorkouts,
    selectById: selectWorkoutById,
    selectIds: selectWorkoutIds,
} = workoutsAdapter.getSelectors(state => state.workouts);

export const {workoutsAdded} = workoutsSlice.actions;

export default workoutsSlice.reducer;
