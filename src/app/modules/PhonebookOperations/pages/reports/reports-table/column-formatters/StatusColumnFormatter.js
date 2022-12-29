/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { ReportStatusTitles, ReportStatusCssClasses } from "../../ReportsUIHelpers";

export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      ReportStatusCssClasses[row.status]
    } label-inline`}
  >
    {ReportStatusTitles[row.status]}
  </span>
);