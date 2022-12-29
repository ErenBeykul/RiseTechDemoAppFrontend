import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const reducer = persistReducer(
  { storage, key: "v726-demo1-auth", whitelist: ["authToken"] },
  (state = {}) => {
    return state;
  }
);