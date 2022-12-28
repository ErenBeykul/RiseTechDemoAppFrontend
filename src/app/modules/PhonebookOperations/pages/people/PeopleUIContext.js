import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./PeopleUIHelpers";

const PeopleUIContext = createContext();

export function usePeopleUIContext() {
  return useContext(PeopleUIContext);
}

export const PeopleUIConsumer = PeopleUIContext.Consumer;

export function PeopleUIProvider({ peopleUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);
  
  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    openNewPersonPage: peopleUIEvents.openNewPersonPage,
    openEditPersonPage: peopleUIEvents.openEditPersonPage
  };

  return (
    <PeopleUIContext.Provider value={value}>
      {children}
    </PeopleUIContext.Provider>
  );
}