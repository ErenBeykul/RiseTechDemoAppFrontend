export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "10", page: 10 },
  { text: "25", page: 25 },
  { text: "50", page: 50 },
  { text: "100", page: 100 }
];
export const initialFilter = {
  filter: {
    name: "",
    surname: "",
    firm: ""
  },
  sortOrder: "asc", // asc||desc
  sortField: "name",
  pageNumber: 1,
  pageSize: 10
};