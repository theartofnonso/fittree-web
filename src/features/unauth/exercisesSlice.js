/* eslint-disable */
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { API, graphqlOperation, Storage } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";

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
        if (action.payload) {
          state.status = exercisesSliceEnums.STATUS_FULFILLED;
          exercisesAdapter.removeOne(state, action.payload);
        }
      });
  },
});

/**
 * Fetch exercises from DyanmoDB
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const listExercises = createAsyncThunk("exercises/getAll", async (payload, { rejectWithValue }) => {
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
export const createExercise = createAsyncThunk("exercises/create", async (payload, { rejectWithValue }) => {

  try {
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
export const updateExercise = createAsyncThunk("exercises/update", async (payload, { rejectWithValue }) => {

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
export const deleteExercise = createAsyncThunk("exercises/delete", async (payload, { rejectWithValue }) => {


  try {

    /**
     * Delete Fit only if it doesn't belong to a workout
     */

    const { id } = payload;

      await API.graphql(
        graphqlOperation(mutations.deleteExercise, {
          input: { id },
        }),
      );

      /**
       * Delete videos
       */
      payload.videoUrls.forEach(url => {
        const file = url.split("/")[3];
        const key = "Videos/" + file;
        Storage.remove(key);
      });

      return id;
  } catch (err) {
    return rejectWithValue(err.error);
  }

});

/**
 * Batch delete exercises and their corresponding videos
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const batchDeleteExercises = createAsyncThunk("exercises/deleteAll", async (payload, { rejectWithValue }) => {

  const { exercises } = payload;

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
  selectIds: selectFitIds,
} = exercisesAdapter.getSelectors(state => state.exercises);

export const { exercisesAdded } = exercisesSlice.actions;

export default exercisesSlice.reducer;