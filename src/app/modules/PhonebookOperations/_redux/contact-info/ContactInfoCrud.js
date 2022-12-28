import axios from "axios";

export const CONTACT_INFO_URL = "/ContactInfo";

// Rehberdeki Belli Bir İletişim Bilgisi Listesini Elde Eder
export function getList(queryParams) {
  return axios.post(`${CONTACT_INFO_URL}/GetList`, queryParams);
}

// Rehberdeki Bilgi Türü Listesini Elde Eder
export function GetInfoTypes() {
  return axios.get(CONTACT_INFO_URL);
}

// Yeni Bir İletişim Bilgisi Elde Eder
export function GetNewContactInfo(personId) {
  return axios.get(`${CONTACT_INFO_URL}/GetNewContactInfo/${personId}`);
}

// Rehberdeki Belli Bir İletişim Bilgisini Elde Eder
export function getContactInfo(id) {
  return axios.get(`${CONTACT_INFO_URL}/${id}`);
}

// Rehberdeki Belli Bir İletişim Bilgisini Kaydeder
export function saveContactInfo(info) {
  return axios.post(CONTACT_INFO_URL, info);
}

// Rehberdeki Belli Bir İletişim Bilgisi Listesini Siler
export function deleteContactInfo(ids) {
  return axios.post(`${CONTACT_INFO_URL}/Delete`, ids);
}