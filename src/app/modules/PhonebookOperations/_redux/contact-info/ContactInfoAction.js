import * as requestFromServer from "./ContactInfoCrud";
import { callTypes, contactInfoSlice } from "./ContactInfoSlice";

const {actions} = contactInfoSlice;

export const getList = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getList(queryParams)
    .then(response => {
      dispatch(actions.listFetched(response.data));
    })
    .catch(error => {
      
    });
};

export const GetInfoTypes = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));  
  return requestFromServer
    .GetInfoTypes()
    .then(response => {
      dispatch(actions.infoTypesFetched(response.data));
    })
    .catch(error => {
      
    });
};

export const getContactInfo = (id, personId) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  
  if (!id) {
    return requestFromServer
    .GetNewContactInfo(personId)
    .then(response => {
      dispatch(actions.contactInfoFetched(response.data));
    })
    .catch(error => {
      
    });
  }
  
  return requestFromServer
    .getContactInfo(id)
    .then(response => {
      dispatch(actions.contactInfoFetched(response.data));
    })
    .catch(error => {
      
    });
};

export const saveContactInfo = info => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .saveContactInfo(info)
    .then(response => {
      dispatch(actions.contactInfoSaved(response.data));
      return response.data;
    })
    .catch(error => {
      
    });    
};

export const deleteContactInfo = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteContactInfo(ids)
    .then(response => {
      dispatch(actions.contactInfoDeleted(response.data));
      return response.data;
    })
    .catch(error => {
      
    });
};