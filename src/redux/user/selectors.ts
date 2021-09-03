import { RootState } from '../store';

export const selectUsername = (state: RootState): string => state.user.username;
