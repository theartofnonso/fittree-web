import {configureStore} from '@reduxjs/toolkit';

import creatorProfileReducer from '../src/features/CreatorProfileSlice';
import authUserReducer from '../src/features/authUserSlice.js';
import authUserExercisesReducer from '../src/features/authUserExercisesSlice';
import authUserWorkoutsReducer from '../src/features/authUserWorkoutsSlice';

export default configureStore({
    reducer: {
        creatorProfile: creatorProfileReducer,
        authUser: authUserReducer,
        authUserExercises: authUserExercisesReducer,
        authUserWorkouts: authUserWorkoutsReducer,
    },
});
