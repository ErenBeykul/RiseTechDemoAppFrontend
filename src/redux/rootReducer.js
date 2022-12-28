import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { peopleSlice } from "../app/modules/PhonebookOperations/_redux/people/PeopleSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  people: peopleSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
