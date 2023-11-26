import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { useMemo } from "react";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeWithDevTools = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const persistConfig = { key: 'builtt', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer)


export function useStore(initialState : any) {
  const store = useMemo(() => makeStore(initialState), [initialState])
  return store.store;
}

function makeStore(initialState = {}) {
  let store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);
  return { store, persistor };
}

export default () => {
  let store = createStore(
    persistedReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
  );
  let persistor = persistStore(store)
  return { store, persistor }
}
