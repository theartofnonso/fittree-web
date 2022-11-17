import {configureStore} from '@reduxjs/toolkit';

import creatorProfileReducer from '../src/features/unauth/creatorProfileSlice';
import authUserReducer from '../src/features/auth/authUserSlice.js';
import unAuthExercisesReducer from '../src/features/unauth/unAuthExercisesSlice';
import unAuthWorkoutsReducer from '../src/features/unauth/unAuthWorkoutsSlice';
import authExercisesReducer from '../src/features/auth/authExercisesSlice';
import authWorkoutsReducer from '../src/features/auth/authWorkoutsSlice';

export default configureStore({
    reducer: {
        creatorProfile: creatorProfileReducer,
        authUser: authUserReducer,
        unAuthExercises: unAuthExercisesReducer,
        unAuthWorkouts: unAuthWorkoutsReducer,
        authExercises: authExercisesReducer,
        authWorkouts: authWorkoutsReducer,
    },
});
