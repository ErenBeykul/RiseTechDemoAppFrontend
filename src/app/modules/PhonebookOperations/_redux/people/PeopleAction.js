import * as requestFromServer from "./PeopleCrud";
import { callTypes, peopleSlice } from "./PeopleSlice";

const {actions} = peopleSlice;

export const getPeople = queryParams => dispatch => {
  return requestFromServer
    .getPeople(queryParams)
    .then(response => {
      dispatch(actions.peopleFetched(response.data));
    })
    .catch(error => {
      
    });
};

export const getPerson = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  if (!id) {
    return requestFromServer
    .getNewPerson()
    .then(response => {
      dispatch(actions.personFetched(response.data));
    })
    .catch(error => {
      
    });
  }

  return requestFromServer
    .getPerson(id)
    .then(response => {
      dispatch(actions.personFetched(response.data));
    })
    .catch(error => {
      
    });
};

export const savePerson = person => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .savePerson(person)
    .then(response => {
      dispatch(actions.personSaved(response.data));
      return response.data;
    })
    .catch(error => {
      
    });       
};

export const deletePeople = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePeople(ids)
    .then(response => {
      dispatch(actions.peopleDeleted(response.data));
      return response.data;
    })
    .catch(error => {
      
    });
};