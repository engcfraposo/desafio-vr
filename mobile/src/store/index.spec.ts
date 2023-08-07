import { store } from '.';

const mockStorage = {} as any;

const mockAsyncStorage = {
  setItem: (key: string, value: string) => {
    mockStorage[key] = value;
    return Promise.resolve();
  },
  getItem: (key: string) => Promise.resolve(mockStorage[key]),
  removeItem: (key: string) => {
    delete mockStorage[key];
    return Promise.resolve();
  },
};

jest.mock('redux-persist/lib/storage', () => ({
  __esModule: true,
  default: mockAsyncStorage,
}));

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});


describe('store', () => {

  test('should have correct initial state for each slice', () => {

    const state = store.getState();

    expect(state.cards).toEqual({
      cards: [],
      fetch: "pending",
      loading: false,
      post: "pending"
    });
  })
});
