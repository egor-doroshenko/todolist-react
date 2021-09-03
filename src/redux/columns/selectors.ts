import { IColumn } from './types';
import { RootState } from '../store';

export const selectColumns = (
  state: RootState,
): IColumn[] => state.columns.columns;
