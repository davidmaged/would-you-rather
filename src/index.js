import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { loadState, saveState } from "./localStorage";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import { PersistGate } from "redux-persist/integration/react";
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// const persistConfig = {
//   key: "root",
//   storage,
//   stateReconciler: autoMergeLevel2,
// };

// const persistedReducer = persistReducer(persistConfig, reducer);
// const store = createStore(persistedReducer, middleware);
const persistedState = loadState();
const store = createStore(reducer, persistedState, middleware);
// const persistor = persistStore(store);

store.subscribe(() => {
  saveState({
    ...store.getState(),
    // authedUser: store.getState().authedUser,
    // questions: store.getState().questions,
    // users: store.getState().users,
  });
});

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);
