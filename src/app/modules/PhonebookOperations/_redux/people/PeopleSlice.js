import { createSlice } from "@reduxjs/toolkit";

const initialPeopleState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  person: {
    name: "",
    surname: "",
    firm: ""
  }
};

export const callTypes = {
  list: "list",
  action: "action"
};

export const peopleSlice = createSlice({
  name: "people",
  initialState: initialPeopleState,
  reducers: {
    startCall: (state, action) => {
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // findPeople
    peopleFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    //getPerson
    personFetched: (state, action) => {
      state.actionsLoading = false;
      state.person = action.payload.entity;
    },
    //savePerson
    personSaved: (state, action) => {
      state.actionsLoading = false;
    },
    //deletePeople
    peopleDeleted: (state, action) => {
      state.actionsLoading = false;
    }
  }
});