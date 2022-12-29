/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { downloadReport }
) => (
  <button
    type="button"
    className="btn btn-sm btn-primary"
    onClick={() => downloadReport(row.id)}
  >
    İndir
  </button>
);