import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchCardThunk, postCardThunk } from './thunk';

// Mock the API functions
jest.mock('../../common/adapters/cards', () => ({
  fetchCard: jest.fn(() => Promise.resolve(
    [
      {
        id: 'card_id',
        number: '1234 5678 9012 3456',
        name: 'John Doe',
        validDate: '12/25',
      },
      {
        id: 'another_card_id',
        number: '1234 5678 9012 3222',
        name: 'John Doe',
        validDate: '12/25',
      }
    ]
  )),
  postCard: jest.fn((card) => Promise.resolve({ ...card, id: 'one_more_id' })),
}));

const mockStore = configureStore([thunk]);

describe('fetchCardThunk', () => {
  it('should dispatch correct actions on successful fetch', async () => {
    const store = mockStore({});

    // Dispatch the thunk
    await store.dispatch(fetchCardThunk());

    // Check the dispatched actions
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual([
      {
        type: fetchCardThunk.pending.type,
        payload: undefined,
        meta: {
          arg: undefined,
          requestId: expect.any(String),
          requestStatus: "pending",
        }
      },
      {
        meta: {
          arg: undefined,
          requestId: expect.any(String),
          requestStatus: "fulfilled",
        },
        type: fetchCardThunk.fulfilled.type,
        payload: [
          {
            id: 'card_id',
            number: '1234 5678 9012 3456',
            name: 'John Doe',
            validDate: '12/25',
          },
          {
            id: 'another_card_id',
            number: '1234 5678 9012 3222',
            name: 'John Doe',
            validDate: '12/25',
          },
        ],
      },
    ]);
  });
});

describe('postCardThunk', () => {
  it('should dispatch correct actions on successful post', async () => {
    const store = mockStore({});
    const newCard = { name: 'New Card' };

    // Dispatch the thunk
    await store.dispatch(postCardThunk(newCard));

    // Check the dispatched actions
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual([
      {
        type: postCardThunk.pending.type,
        payload: undefined,
        meta: {
          arg: { name: "New Card"},
          requestId: expect.any(String),
          requestStatus: "pending",
        }
      },
      {
        meta: {
          arg: { name: "New Card"},
          requestId: expect.any(String),
          requestStatus: "fulfilled",
        },
        type: postCardThunk.fulfilled.type,
        payload: { ...newCard, id: "one_more_id" }
      },
    ]);
  });
});
