import { Reducer } from 'redux';
import { ProfileState } from './user.interface';
import { SET_PROFILE } from './user.constant';

const initialState: ProfileState = {
    id: '',
    displayName: '',
    email: '',
};

const userReducer: Reducer<ProfileState> = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
