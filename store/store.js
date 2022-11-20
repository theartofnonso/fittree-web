import {configureStore} from '@reduxjs/toolkit';

import creatorProfileReducer from '../src/features/unauth/creatorProfileSlice';
import authUserReducer from '../src/features/auth/authUserSlice.js';
import unAuthWorkoutsReducer from '../src/features/unauth/unAuthWorkoutsSlice';
import authWorkoutsReducer from '../src/features/auth/authWorkoutsSlice';

export default configureStore({
    reducer: {
        creatorProfile: creatorProfileReducer,
        authUser: authUserReducer,
        unAuthWorkouts: unAuthWorkoutsReducer,
        authWorkouts: authWorkoutsReducer,
    },
});
