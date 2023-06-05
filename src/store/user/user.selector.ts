import { RootState } from "../store";

export const selectProfile = (state: RootState) => {
    return state.user.profile;
    
};
