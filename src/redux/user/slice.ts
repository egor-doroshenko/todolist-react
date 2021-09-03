import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  username: string
}

const initialState = {
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    AuthoriseUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { AuthoriseUser } = userSlice.actions;

export const { reducer } = userSlice;
export const { actions } = userSlice;
