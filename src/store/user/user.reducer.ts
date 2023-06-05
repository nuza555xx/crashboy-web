import { AnyAction, Reducer } from 'redux';
import { ProfileState, UserState } from './user.interface';
import { PROFILE } from './user.constant';
import { RootState } from '../store';

const initialState: UserState = {
    profile: {
        id: '',
        displayName: '',
        email: '',
    },
};

const userReducer: Reducer<UserState> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case PROFILE:
            return {
                profile: {
                    ...state.profile,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export default userReducer;
