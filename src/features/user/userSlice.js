/* eslint-disable */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";

export const userSliceEnums = {
  SLICE: "user",
  STATUS_PENDING: "PENDING",
  STATUS_FULFILLED: "FULFILLED",
  STATUS_REJECTED: "REJECTED",
  STATUS_IDLE: "IDLE",
  CACHED_USER: "CACHED_USER",
};

const initialState = {
  user: null,
  status: userSliceEnums.STATUS_IDLE,
};

const userSlice = createSlice({
  name: userSliceEnums.SLICE,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = userSliceEnums.STATUS_FULFILLED;
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = userSliceEnums.STATUS_FULFILLED;
        state.user = action.payload;
      });
  },
});

/**
 * Get the user's data
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const fetchUser = createAsyncThunk("user/get", async (payload, { rejectWithValue }) => {
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
export const updateUser = createAsyncThunk("user/update", async (payload, { rejectWithValue }) => {
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
export const deleteUser = createAsyncThunk("user/delete", async (payload, { rejectWithValue }) => {
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

export const selectUser = state => state.user.user;

export const selectUserAuth = state => state.user.auth;

export const selectUserStatus = state => state.user.status;

export const { userAdded } = userSlice.actions;

export default userSlice.reducer;
