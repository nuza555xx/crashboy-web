import { Action } from 'redux';
import { SET_PROFILE } from './user.constant';
import { User } from '@crashboy/interfaces';

// Define action interfaces
export interface SetProfileAction extends Action<typeof SET_PROFILE> {
    payload: ProfileState;
}

export type ProfileState = User;
