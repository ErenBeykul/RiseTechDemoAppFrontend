import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationProvider }  from "react-bootstrap-table2-paginator";
import * as actions from "../../../_redux/contact-info/ContactInfoAction";
import * as uiHelpers from "../ContactInfoUIHelpers";
import { 
  getSelectRow, 
  getHandlerTableChange,  
  NoRecordsFoundMessage, 
  PleaseWaitMessage, 
  sortCaret
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useContactInfoUIContext } from "../ContactInfoUIContext";

export function ContactInfoTable({ deleteContactInfo }) {
  // Contact Info UI Context
  const contactInfoUIContext = useContactInfoUIContext();
  const contactInfoUIProps = useMemo(() => {
    return {
      ids: contactInfoUIContext.ids,
      setIds: contactInfoUIContext.setIds,
      queryParams: contactInfoUIContext.queryParams,
      setQueryParams: contactInfoUIContext.setQueryParams,
      openEditContactInfoPage: contactInfoUIContext.openEditContactInfoPage
    };
  }, [contactInfoUIContext]);

  // Getting curret state of Contact Info list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.contactInfo }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Contact Info Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    // clear selections list
    contactInfoUIProps.setIds([]);
    // ...
    dispatch(actions.getList(contactInfoUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactInfoUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "infoType",
      text: "Bilgi Türü",
      sort: true,
      sortCaret: sortCaret
    },
    {
      dataField: "info",
      text: "Bilgi",
      sort: true,
      sortCaret: sortCaret
    },
    {
      dataField: "action",
      text: "İşlemler",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditContactInfoPage: contactInfoUIProps.openEditContactInfoPage,
        deleteContactInfo
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    }
  ];

  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: contactInfoUIProps.queryParams.pageSize,
    page: contactInfoUIProps.queryParams.pageNumber
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
              data={entities ? entities : []}
              columns={columns}
              defaultSorted={uiHelpers.defaultSorted}
              onTableChange={getHandlerTableChange(
                contactInfoUIProps.setQueryParams
              )}
              selectRow={getSelectRow({
                entities,
                ids: contactInfoUIProps.ids,
                setIds: contactInfoUIProps.setIds,
              })}
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