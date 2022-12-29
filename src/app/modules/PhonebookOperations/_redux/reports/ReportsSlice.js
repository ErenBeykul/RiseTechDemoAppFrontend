import { createSlice } from "@reduxjs/toolkit";

const initialReportsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0
};

export const callTypes = {
  list: "list",
  action: "action"
};

export const reportsSlice = createSlice({
  name: "reports",
  initialState: initialReportsState,
  reducers: {
    startCall: (state, action) => {
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // findReports
    reportsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    //downloadReport
    reportFetched: (state) => {
      state.actionsLoading = false;
    },
    //createNewReport
    reportCreated: (state) => {
      state.actionsLoading = false;
    }
  }
});