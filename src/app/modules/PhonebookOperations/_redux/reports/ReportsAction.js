import * as requestFromServer from "./ReportsCrud";
import { callTypes, reportsSlice } from "./ReportsSlice";

const {actions} = reportsSlice;

export const getReports = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getReports(queryParams)
    .then(response => {
      dispatch(actions.reportsFetched(response.data));
    })
    .catch(error => {
      
    });
};

export const getReport = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getReport(id)
    .then(response => {
      dispatch(actions.reportFetched());
      return { 
        report: response.data,
        filename: response.headers["content-disposition"].split('filename="')[1].split(";")[0].replace('.xlsx"', '')
      }
    })
    .catch(error => {
      
    });       
};

export const createNewReport = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createNewReport()
    .then(response => {
      dispatch(actions.reportCreated());
      return response.data;
    })
    .catch(error => {
      
    });       
};