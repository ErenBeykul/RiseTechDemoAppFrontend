import axios from "axios";

export const PERSON_URL = "/Person";

// Rehberdeki Belli Bir Kişi Listesini Elde Eder
export function getPeople(queryParams) {
  return axios.post(`${PERSON_URL}/GetPeople`, queryParams);
}

// Yeni Bir Kişi Elde Eder
export function getNewPerson() {
  return axios.get(PERSON_URL);
}

// Rehberdeki Yeni Bir Kişi Elde Eder
export function getPerson(id) {
  return axios.get(`${PERSON_URL}/${id}`);
}

// Rehbere Belli Bir Kişiyi Kaydeder
export function savePerson(person) {
  return axios.post(PERSON_URL, person);
}

// Rehberdeki Belli Bir Kişi Listesini Siler
export function deletePeople(ids) {
  return axios.post(`${PERSON_URL}/Delete`, ids);
}