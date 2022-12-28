import React from "react";
import { PeopleCard } from "./PeopleCard";
import { PeopleUIProvider } from "./PeopleUIContext";

export function PeoplePage({ history }) {
  const peopleUIEvents = {
    openNewPersonPage: () => {
      history.push("/kisiler/ekle");
    },
    openContactInfoPage: (id) => {
      history.push(`/iletisim-bilgileri/${id}`);
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