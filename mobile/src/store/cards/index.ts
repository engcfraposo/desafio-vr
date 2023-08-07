import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCardThunk, postCardThunk } from './thunk';
import { Card } from '../../common/zod';

export interface CardState {
  cards: Card[];
  loading: boolean;
  fetch: 'pending' | 'fulfilled' | 'reject';
  post: 'pending' | 'fulfilled' | 'reject';
}

const initialState: CardState = {
  cards: [],
  loading: false,
  fetch: 'pending',
  post: 'pending',
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    newForm: (state) => {
      state.post = 'pending';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postCardThunk.pending, (state) => {
        state.loading = true;
        state.post = 'pending';
      })
      .addCase(
        postCardThunk.fulfilled,
        (state) => {
          state.loading = false;
          state.post = 'fulfilled';
        },
      )
      .addCase(postCardThunk.rejected, (state) => {
        state.loading = false;
        state.post = 'reject';
      })
      .addCase(fetchCardThunk.pending, (state) => {
        state.loading = true;
        state.fetch = 'pending';
      })
      .addCase(
        fetchCardThunk.fulfilled,
        (state, action: PayloadAction<Card[]>) => {
          state.loading = false;
          state.cards = action.payload;
          state.fetch = 'fulfilled';
        },
      )
      .addCase(fetchCardThunk.rejected, (state) => {
        state.loading = false;
        state.fetch = 'reject';
      });
  },
});
export const { newForm } = cardSlice.actions;
export default cardSlice.reducer;
