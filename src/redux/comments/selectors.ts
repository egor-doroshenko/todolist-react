import { createSelector, Selector } from '@reduxjs/toolkit';
import { IComment } from './types';
import { RootState } from '../store';

export const selectComments = (
  state: RootState,
): IComment[] => state.comments.comments;

export const selectCommentsByCardId = (
  id: number,
): Selector<RootState, IComment[]> => createSelector(
  selectComments, (comments: IComment[]) => {
    const c = comments.filter((comm) => comm.card === id);
    return c;
  },
);
