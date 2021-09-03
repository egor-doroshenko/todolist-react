import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from './types';

export interface CardsState {
  cards: ICard[],
}

const initialState: CardsState = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (
      state, action: PayloadAction<{
        name: string, author: string, column: number
      }>,
    ) => {
      state.cards = [
        ...state.cards,
        {
          name: action.payload.name,
          id: Date.now(),
          author: action.payload.author,
          column: action.payload.column,
          description: 'This card has no description yet!',
        },

      ];
    },
    removeCard: (state, action: PayloadAction<number>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    editCard: (state, action: PayloadAction<{id: number, name: string}>) => {
      state.cards.forEach((card) => {
        if (card.id === action.payload.id) {
          card.name = action.payload.name;
        }
      });
    },
    editDescription: (
      state, action: PayloadAction<{id: number, desc: string}>,
    ) => {
      state.cards.forEach((card) => {
        if (card.id === action.payload.id) {
          card.description = action.payload.desc;
        }
      });
    },
    removeDescription: (state, action: PayloadAction<number>) => {
      state.cards.forEach((card) => {
        if (card.id === action.payload) {
          card.description = 'This card has no description yet!';
        }
      });
    },
  },
});

export const {
  addCard,
  removeCard,
  editCard,
  editDescription,
  removeDescription,
} = cardsSlice.actions;

export const { actions } = cardsSlice;
export const { reducer } = cardsSlice;
