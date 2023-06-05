import { Action } from 'redux';
import { PROFILE } from './user.constant';
import { Profile } from '@crashboy/interfaces';

export interface ProfileAction extends Action<typeof PROFILE> {
    payload: ProfileState;
}

export type ProfileState = Profile;

export type UserState = {
    profile: ProfileState;
};
