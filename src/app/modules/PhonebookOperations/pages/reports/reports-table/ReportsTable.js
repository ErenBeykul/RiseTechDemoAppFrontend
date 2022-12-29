import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationProvider }  from "react-bootstrap-table2-paginator";
import * as actions from "../../../_redux/reports/ReportsAction";
import * as uiHelpers from "../ReportsUIHelpers";
import { 
  getHandlerTableChange,  
  NoRecordsFoundMessage, 
  PleaseWaitMessage, 
  sortCaret
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useReportsUIContext } from "../ReportsUIContext";
import { saveAs } from 'file-saver';

export function ReportsTable() {
  // Reports UI Context
  const reportsUIContext = useReportsUIContext();
  const reportsUIProps = useMemo(() => {
    return {
      queryParams: reportsUIContext.queryParams,
      setQueryParams: reportsUIContext.setQueryParams
    };
  }, [reportsUIContext]);

  // Getting curret state of Reports list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.reports }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  
  // Reports Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getReports(reportsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportsUIProps.queryParams, dispatch]);

  // Belli Bir Raporu İndirir
  const downloadReport = (id) => {
    dispatch(actions.getReport(id)).then(({ report, filename }) => saveAs(report, filename));
  }

  // Table columns
  const columns = [
    {
      dataField: "date",
      text: "Tarih",
      sort: true,
      sortCaret: sortCaret
    },
    {
      dataField: "status",
      text: "Durum",
      formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "action",
      text: "İşlemler",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        downloadReport: downloadReport,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-0"
    }
  ];

  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: reportsUIProps.queryParams.pageSize,
    page: reportsUIProps.queryParams.pageNumber
  };
  
  return (
    <PaginationProvider pagination={paginationFactory(paginationOptions)}>
      {({ paginationProps, paginationTableProps }) => {
        return (
          <Pagination
            isLoading={listLoading}
            paginationProps={paginationProps}
          >
            <BootstrapTable
              wrapperClasses="table-responsive"
              classes="table table-head-custom table-vertical-center overflow-hidden"
              bootstrap4
              bordered={false}
              remote
              keyField="id"
              data={entities ? entities : [] }
              columns={columns}
              defaultSorted={uiHelpers.defaultSorted}
              onTableChange={getHandlerTableChange(
                reportsUIProps.setQueryParams
              )}
              {...paginationTableProps}
            >
              <PleaseWaitMessage entities={entities} />
              <NoRecordsFoundMessage entities={entities} />
            </BootstrapTable>
          </Pagination>
        );    
      }}
    </PaginationProvider>  
  );
}