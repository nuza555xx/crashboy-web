import { SET_PROFILE } from './user.constant';
import { ProfileState, SetProfileAction } from './user.interface';

// Define action creators
export const setProfile = (profile: ProfileState): SetProfileAction => ({
    type: SET_PROFILE,
    payload: { ...profile },
});
