import { createSlice } from "@reduxjs/toolkit";

const initialContactInfoState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  contactInfo: {
    info: "",
    infoTypes: []
  }
};

export const callTypes = {
  list: "list",
  action: "action"
};

export const contactInfoSlice = createSlice({
  name: "contactInfo",
  initialState: initialContactInfoState,
  reducers: {
    startCall: (state, action) => {
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getList
    listFetched: (state, action) => {
      const { totalCount, entity, entities } = action.payload;
      state.listLoading = false;
      state.personName = entity.personName;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    //getInfoTypes
    infoTypesFetched: (state, action) => {
      state.actionsLoading = false;
      state.infoTypes = action.payload.entity.infoTypes;
    },
    //getContactInfo
    contactInfoFetched: (state, action) => {
      state.actionsLoading = false;
      state.contactInfo = action.payload.entity;
    },
    //saveContactInfo
    contactInfoSaved: (state, action) => {
      state.actionsLoading = false;
    },
    //deleteContactInfo
    contactInfoDeleted: (state, action) => {
      state.actionsLoading = false;
    }
  }
});