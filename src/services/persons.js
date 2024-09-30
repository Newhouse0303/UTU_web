import axios from "axios";

const url_for_build = "/api/persons";
const url_for_dev = "http://localhost:3001/persons"; // with "npm run server"
const baseUrl = url_for_dev;

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deleteEntry = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  deleteEntry: deleteEntry,
};
