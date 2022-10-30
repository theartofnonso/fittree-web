/* eslint-disable */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import workoutsConstants from "../../utils/workout/workoutsConstants";

export const userSliceEnums = {
  SLICE: "authUser",
  STATUS_PENDING: "PENDING",
  STATUS_FULFILLED: "FULFILLED",
  STATUS_REJECTED: "REJECTED",
  STATUS_IDLE: "IDLE",
  CACHED_USER: "CACHED_USER",
};

const initialState = {
  profile: null,
  status: workoutsConstants.profileStatus.LOADING,
};

const authUserSlice = createSlice({
  name: userSliceEnums.SLICE,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = workoutsConstants.profileStatus.READY
        state.profile = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = userSliceEnums.STATUS_FULFILLED;
        state.profile = action.payload;
      });
  },
});

/**
 * Get the user's data
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const fetchUser = createAsyncThunk("authUser/get", async (payload, { rejectWithValue }) => {
  const { username } = payload;

  try {
    const response = await API.graphql(graphqlOperation(queries.listCreators, {
          filter: {
            username: {
              eq: username,
            },
          },
        },
      ),
    );
    const creators = response.data.listCreators.items;
    return creators.length > 0 ? creators[0] : null;
  } catch (err) {
    return rejectWithValue(null);
  }
});

/**
 * Update user profile
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const updateUser = createAsyncThunk("authUser/update", async (payload, { rejectWithValue }) => {
  try {
    const response = await API.graphql(
      graphqlOperation(mutations.updateCreator, {
        input: {
          ...payload,
        },
      }),
    );
    return response.data.updateCreator;
  } catch (err) {
    return rejectWithValue(err);
  }
});

/**
 * Delete user profile
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const deleteUser = createAsyncThunk("authUser/delete", async (payload, { rejectWithValue }) => {
  try {

    const { id } = payload;

    await API.graphql(
      graphqlOperation(mutations.deleteCreator, {
        input: { id },
      }),
    );

  } catch (err) {
    console.log(err)
    // Do nothing for now
  }
});

export const selectAuthUser = state => state.authUser.profile;

export const selectAuthUserStatus = state => state.authUser.status;

export const { userAdded } = authUserSlice.actions;

export default authUserSlice.reducer;
