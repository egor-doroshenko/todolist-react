import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from './types';

export interface CommentsState {
  comments: IComment[],
}

const initialState: CommentsState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (
      state, action:PayloadAction<{author: string, text: string, card: number}>,
    ) => {
      state.comments = [
        ...state.comments,
        {
          author: action.payload.author,
          text: action.payload.text,
          id: Date.now(),
          card: action.payload.card,
        },
      ];
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        (comm) => comm.id !== action.payload,
      );
    },
    editComment: (state, action: PayloadAction<{id: number, text: string}>) => {
      state.comments.forEach((comm) => {
        if (comm.id === action.payload.id) {
          comm.text = action.payload.text;
        }
      });
    },
  },
});

export const {
  addComment,
  removeComment,
  editComment,
} = commentsSlice.actions;

export const { actions } = commentsSlice;
export const { reducer } = commentsSlice;
