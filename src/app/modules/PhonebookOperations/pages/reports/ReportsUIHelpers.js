export const ReportStatusCssClasses = { 0: "danger", 1: "success" };
export const ReportStatusTitles = { 0: "Hazırlanıyor", 1: "Tamamlandı" };
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "10", page: 10 },
  { text: "25", page: 25 },
  { text: "50", page: 50 },
  { text: "100", page: 100 }
];
export const initialFilter = {
  filter: {
    date: "",
    lastDate: "",
  },
  sortOrder: "desc", // asc||desc
  sortField: "date",
  pageNumber: 1,
  pageSize: 10
};