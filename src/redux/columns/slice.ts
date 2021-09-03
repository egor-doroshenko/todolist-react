import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from './types';

export interface ColumnsState {
  columns: IColumn[],
}

const initialState: ColumnsState = {
  columns: [
    { title: 'TODO', id: 100 },
    { title: 'In progress', id: 101 },
    { title: 'Testing', id: 102 },
    { title: 'Done', id: 103 }],
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    RenameColumn: (
      state, action: PayloadAction<{id: number, title: string}>,
    ) => {
      state.columns.forEach((column) => {
        if (column.id === action.payload.id) {
          column.title = action.payload.title;
        }
      });
    },
  },
});

export const { RenameColumn } = columnsSlice.actions;

export const { actions } = columnsSlice;
export const { reducer } = columnsSlice;
