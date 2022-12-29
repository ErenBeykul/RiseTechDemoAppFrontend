import React from "react";
import { ReportsCard } from "./ReportsCard";
import { ReportsUIProvider } from "./ReportsUIContext";

export function ReportsPage() {
  return (
    <ReportsUIProvider>
      <ReportsCard />
    </ReportsUIProvider>
 );
}