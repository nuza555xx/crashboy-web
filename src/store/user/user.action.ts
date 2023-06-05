import { AnyAction, Dispatch } from 'redux';
import { PROFILE } from './user.constant';
import { ProfileState, ProfileAction } from './user.interface';
import { requestAPI } from '@crashboy/utils';
import { Profile } from '@crashboy/interfaces';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';

export const setProfile = (profile: ProfileState): ProfileAction => ({
    type: PROFILE,
    payload: { ...profile },
});

export const fetchProfile = (): ThunkAction<void, RootState, unknown, ProfileAction> => {
    return (dispatch: Dispatch<ProfileAction>) => {
        requestAPI<Profile>({
            method: 'GET',
            url: `https://crashboy.tech/api/user/me`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        })
            .then((response) => {
                dispatch({ type: PROFILE, payload: { ...response } });
            })
            .catch((error) => {
                dispatch({ type: PROFILE, payload: <Profile>{} });
            });
    };
};
