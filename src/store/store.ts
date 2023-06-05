import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.reducer';
import { UserState } from './user/user.interface';

// Define RootState type
export interface RootState {
    user: UserState;
}

// Combine all reducers
const rootReducer = combineReducers({
    user: userReducer,
});

// Create the store
const store = configureStore({
    reducer: rootReducer,
});

export default store;
