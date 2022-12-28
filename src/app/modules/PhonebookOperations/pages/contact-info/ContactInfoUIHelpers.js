export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "10", page: 10 },
  { text: "25", page: 25 },
  { text: "50", page: 50 },
  { text: "100", page: 100 }
];
export const FilterOptions = [
  { value: null, label: "Tümü" }
];
export const initialFilter = {
  filter: {
    infoType: null,
    info: ""
  },
  sortOrder: "asc", // asc||desc
  sortField: "infoType",
  pageNumber: 1,
  pageSize: 10
};