import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationProvider }  from "react-bootstrap-table2-paginator";
import * as actions from "../../../_redux/people/PeopleAction";
import * as uiHelpers from "../PeopleUIHelpers";
import { 
  getSelectRow, 
  getHandlerTableChange,  
  NoRecordsFoundMessage, 
  PleaseWaitMessage, 
  sortCaret
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { usePeopleUIContext } from "../PeopleUIContext";

export function PeopleTable({ deletePeople }) {
  // People UI Context
  const peopleUIContext = usePeopleUIContext();
  const peopleUIProps = useMemo(() => {
    return {
      ids: peopleUIContext.ids,
      setIds: peopleUIContext.setIds,
      queryParams: peopleUIContext.queryParams,
      setQueryParams: peopleUIContext.setQueryParams,
      openContactInfoPage: peopleUIContext.openContactInfoPage,
      openEditPersonPage: peopleUIContext.openEditPersonPage
    };
  }, [peopleUIContext]);

  // Getting curret state of People list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.people }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  
  // People Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    // clear selections list
    peopleUIProps.setIds([]);
    // ...
    dispatch(actions.getPeople(peopleUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peopleUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "name",
      text: "Adı",
      sort: true,
      sortCaret: sortCaret
    },
    {
      dataField: "surname",
      text: "Soyadı",
      sort: true,
      sortCaret: sortCaret
    },
    {
      dataField: "firm",
      text: "Firma",
      sort: true,
      sortCaret: sortCaret
    },
    {
      dataField: "action",
      text: "İşlemler",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openContactInfoPage: peopleUIProps.openContactInfoPage,
        openEditPersonPage: peopleUIProps.openEditPersonPage,
        deletePeople
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-9",
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
    sizePerPage: peopleUIProps.queryParams.pageSize,
    page: peopleUIProps.queryParams.pageNumber
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
                peopleUIProps.setQueryParams
              )}
              selectRow={getSelectRow({
                entities,
                ids: peopleUIProps.ids,
                setIds: peopleUIProps.setIds,
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