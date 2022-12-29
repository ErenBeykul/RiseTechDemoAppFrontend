import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ReportsUIHelpers";

const ReportsUIContext = createContext();

export function useReportsUIContext() {
  return useContext(ReportsUIContext);
}

export const ReportsUIConsumer = ReportsUIContext.Consumer;

export function ReportsUIProvider({ children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
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
    setQueryParams
  };

  return (
    <ReportsUIContext.Provider value={value}>
      {children}
    </ReportsUIContext.Provider>
  );
}