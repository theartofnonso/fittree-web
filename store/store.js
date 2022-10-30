import {configureStore} from '@reduxjs/toolkit';

import creatorProfileReducer from '../src/features/unauth/CreatorProfileSlice';
import authUserReducer from '../src/features/auth/authUserSlice.js';
import authUserExercisesReducer from '../src/features/auth/authUserExercisesSlice';
import authUserWorkoutsReducer from '../src/features/auth/authUserWorkoutsSlice';

export default configureStore({
    reducer: {
        creatorProfile: creatorProfileReducer,
        authUser: authUserReducer,
        authUserExercises: authUserExercisesReducer,
        authUserWorkouts: authUserWorkoutsReducer,
    },
});
