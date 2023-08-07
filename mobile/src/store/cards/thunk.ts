import { createAsyncThunk } from '@reduxjs/toolkit';
import { Card } from '../../common/zod';
import { fetchCard, postCard } from '../../common/adapters/cards';

export const fetchCardThunk = createAsyncThunk(
  'card/fetchCards',
  async (): Promise<Card[]> => await fetchCard(),
);

export const postCardThunk = createAsyncThunk(
  'card/postCard',
  async (card: Card): Promise<Card> => await postCard(card),
);
