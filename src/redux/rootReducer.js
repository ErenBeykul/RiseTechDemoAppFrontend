import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { peopleSlice } from "../app/modules/PhonebookOperations/_redux/people/PeopleSlice";
import { contactInfoSlice } from "../app/modules/PhonebookOperations/_redux/contact-info/ContactInfoSlice";
import { reportsSlice } from "../app/modules/PhonebookOperations/_redux/reports/ReportsSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  people: peopleSlice.reducer,
  contactInfo: contactInfoSlice.reducer,
  reports: reportsSlice.reducer
});