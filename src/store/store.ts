import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.reducer';
import { ProfileState } from './user/user.interface';

// Define RootState type
export interface RootState {
    profile: ProfileState;
}

// Combine all reducers
const rootReducer = combineReducers({
    profile: userReducer,
});

// Create the store
const store = configureStore({
    reducer: rootReducer,
});

export default store;
