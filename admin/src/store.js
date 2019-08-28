import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  storage
}

const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);


export default function configureStore() {
  const store = createStore(
      persistedReducer,
      compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );

  const persistor = persistStore(store);
  persistor.purge();

  return { store, persistor };
}