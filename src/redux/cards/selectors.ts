import { Selector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { ICard } from './types';
import { RootState } from '../store';

export const selectCards = (state: RootState): ICard[] => state.cards.cards;

export const selectCardName = (
  cardId: number,
): Selector<RootState, string> => createSelector(
  selectCards, (cards: ICard[]) => {
    const c = cards.find((card) => card.id === cardId)!;
    return c.name;
  },
);

export const selectCardDesc = (
  cardId: number,
): Selector<RootState, string> => createSelector(
  selectCards, (cards: ICard[]) => {
    const c = cards.find((card) => card.id === cardId)!;
    return c.description;
  },
);

export const selectCardAuthor = (
  cardId: number,
): Selector<RootState, string> => createSelector(
  selectCards, (cards: ICard[]) => {
    const c = cards.find((card) => card.id === cardId)!;
    return c.author;
  },
);

export const selectCardsByColumnId = (
  id: number,
): Selector<RootState, ICard[]> => createSelector(
  selectCards, (cards: ICard[]) => {
    const c = cards.filter((card) => card.column === id);
    return c;
  },
);
