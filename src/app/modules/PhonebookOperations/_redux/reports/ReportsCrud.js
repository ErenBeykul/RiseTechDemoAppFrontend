import axios from "axios";

export const REPORT_URL = "/Report";

// Rehberdeki Belli Bir Rapor Listesini Elde Eder
export function getReports(queryParams) {
  return axios.post(`${REPORT_URL}/GetReports`, queryParams);
}

// Belli Bir Raporu Elde Eder
export function getReport(id) {
  return axios.get(`${REPORT_URL}/${id}`, { responseType: "blob" });
}

// Yeni Bir Rapor Oluşturur
export function createNewReport() {
  return axios.post(REPORT_URL);
}