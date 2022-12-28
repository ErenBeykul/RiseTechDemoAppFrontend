import React from "react";
import { PeopleCard } from "./PeopleCard";
import { PeopleUIProvider } from "./PeopleUIContext";

export function PeoplePage({ history }) {
  const peopleUIEvents = {
    openNewPersonPage: () => {
      history.push("/kisiler/ekle");
    },
    openEditPersonPage: (id) => {
      history.push(`/kisiler/duzenle/${id}`);
    },
  };
  
  return (
    <PeopleUIProvider peopleUIEvents={peopleUIEvents}>
      <PeopleCard />
    </PeopleUIProvider>
 );
}