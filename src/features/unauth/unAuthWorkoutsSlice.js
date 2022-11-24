/* eslint-disable */
import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

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
    status: workoutsSliceEnums.STATUS_IDLE,
});

const unAuthWorkoutsSlice = createSlice({
    name: workoutsSliceEnums.SLICE,
    initialState,
    reducers: {
        workoutsAdded: (state, action) => {
            const liveWorkouts =  action.payload
            workoutsAdapter.setAll(state, liveWorkouts);
        },
    },
});

export const {
    selectAll: selectAllWorkouts,
    selectById: selectWorkoutById,
    selectIds: selectWorkoutIds,
} = workoutsAdapter.getSelectors(state => state.unAuthWorkouts);

export const {workoutsAdded} = unAuthWorkoutsSlice.actions;

export default unAuthWorkoutsSlice.reducer;
