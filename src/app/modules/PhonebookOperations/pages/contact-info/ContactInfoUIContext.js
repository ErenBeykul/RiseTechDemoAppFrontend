import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ContactInfoUIHelpers";

const ContactInfoUIContext = createContext();

export function useContactInfoUIContext() {
  return useContext(ContactInfoUIContext);
}

export const ContactInfoUIConsumer = ContactInfoUIContext.Consumer;

export function ContactInfoUIProvider({ personId, contactInfoUIEvents, children }) {  
  initialFilter.filter.personId = personId; // Şahıs Id Atanıyor
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
    openPersonListPage: contactInfoUIEvents.openPersonListPage,
    openNewContactInfoPage: contactInfoUIEvents.openNewContactInfoPage,
    openEditContactInfoPage: contactInfoUIEvents.openEditContactInfoPage
  };

  return (
    <ContactInfoUIContext.Provider value={value}>
      {children}
    </ContactInfoUIContext.Provider>
  );
}