import React, { useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/reports/ReportsAction";
import Swal from "sweetalert2";
import { 
  Card, 
  CardBody, 
  CardHeader,
  CardHeaderToolbar,
  ModalProgressBar
} from "../../../../../_metronic/_partials/controls";
import { ReportsFilter } from "./reports-filter/ReportsFilter";
import { ReportsTable } from "./reports-table/ReportsTable";
import { useReportsUIContext } from "./ReportsUIContext";

export function ReportsCard() {
  // Reports UI Context
  const reportsUIContext = useReportsUIContext();
  const reportsUIProps = useMemo(() => {
    return {
      queryParams: reportsUIContext.queryParams
    };
  }, [reportsUIContext]);
    
  // People Redux state
  const dispatch = useDispatch();
  const { actionsLoading } = useSelector(
    (state) => ({
      actionsLoading: state.reports.actionsLoading
    }),
    shallowEqual
  );

  // Yeni Bir Rapor Oluşturur
  const createNewReport = () => {
    dispatch(actions.createNewReport()).then(result => onResult(result));
  }
    
  const onResult = ({ isSuccess, type, message }) => {
    Swal.fire({
      icon: type,
      title: message,
      timer: 2500,
      showConfirmButton: false
    });
  
    if (isSuccess) {
      setTimeout(() => {
        dispatch(actions.getReports(reportsUIProps.queryParams));
      }, 2500);
    }
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title="Rapor Listesi">
        <CardHeaderToolbar>            
          <button
            type="button"
            className="btn btn-primary"
            onClick={createNewReport}
          >
            Yeni Rapor
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ReportsFilter />
        <ReportsTable />
      </CardBody>
    </Card>
  );
}