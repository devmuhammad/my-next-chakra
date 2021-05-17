import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import * as localforage from 'localforage';

const persistConfig = {
  key: 'ulessonTelesales',
  storage: localforage,
  blacklist: [],
  // blacklist: ["home"],
};

const initialState = {};

const middleWare = [thunk];

const middlewareDev = [
  applyMiddleware(...middleWare),
  ...(typeof window && (typeof window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? [(typeof window as any).__REDUX_DEVTOOLS_EXTENSION__()]
    : []),
];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, initialState, composeWithDevTools(...middlewareDev));

export let persistor = persistStore(store);

