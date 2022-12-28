import React from "react";
import { ContactInfoCard } from "./ContactInfoCard";
import { ContactInfoUIProvider } from "./ContactInfoUIContext";

export function ContactInfoPage({
  history, 
  match: {
    params: { personId }
  }
}) {
  const contactInfoUIEvents = {
    openPersonListPage: () => {
      history.push("/kisiler");
    },
    openNewContactInfoPage: () => {
      history.push(`/iletisim-bilgileri/ekle/${personId}`);
    },
    openEditContactInfoPage: (id) => {
      history.push(`/iletisim-bilgileri/duzenle/${id}/${personId}`);
    },
  };
  
  return (
    <ContactInfoUIProvider personId={personId} contactInfoUIEvents={contactInfoUIEvents}>
      <ContactInfoCard />
    </ContactInfoUIProvider>
 );
}