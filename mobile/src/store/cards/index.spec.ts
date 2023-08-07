import cardReducer, {  CardState, newForm } from '.'; // Import the cardReducer and action creator
import { fetchCardThunk, postCardThunk } from './thunk';

const initialState: CardState ={
  cards: [],
  fetch: "pending",
  loading: false,
  post: "pending"
}
describe('cardSlice reducer', () => {
  it('should return the initial state', () => {
    const state = cardReducer(undefined, { type: 'unknown-action' });
    expect(state).toEqual(initialState);
  });

  it('should handle newForm action', () => {
    const state = cardReducer(initialState, newForm());
    expect(state.post).toBe('pending');
  });

  it('should handle postCardThunk.pending action', () => {
    const state = cardReducer(initialState, postCardThunk.pending);
    expect(state.loading).toBe(true);
    expect(state.post).toBe('pending');
  });

  it('should handle postCardThunk.fulfilled action', () => {
    const state = cardReducer(initialState, postCardThunk.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.post).toBe('fulfilled');
  });

  it('should handle postCardThunk.rejected action', () => {
    const state = cardReducer(initialState, postCardThunk.rejected);
    expect(state.loading).toBe(false);
    expect(state.post).toBe('reject');
  });

  it('should handle fetchCardThunk.pending action', () => {
    const state = cardReducer(initialState, fetchCardThunk.pending);
    expect(state.loading).toBe(true);
    expect(state.fetch).toBe('pending');
  });

  it('should handle fetchCardThunk.fulfilled action', () => {
    const payload = [{ id: 1, name: 'Card 1' }, { id: 2, name: 'Card 2' }];
    const state = cardReducer(initialState, fetchCardThunk.fulfilled(payload));
    expect(state.loading).toBe(false);
    expect(state.cards).toEqual(payload);
    expect(state.fetch).toBe('fulfilled');
  });

  it('should handle fetchCardThunk.rejected action', () => {
    const state = cardReducer(initialState, fetchCardThunk.rejected);
    expect(state.loading).toBe(false);
    expect(state.fetch).toBe('reject');
  });
});
