import axios from "./axios.custiomize";

const createUserApi = (username: string, email: string, password: string) => {
  const URL_API = "/api/register";
  const data = {
    username,
    email,
    password,
  };
  return axios.post(URL_API, data);
};

const loginUserApi = (email: string, password: string) => {
  const URL_API = "/api/login";
  const data = {
    email,
    password,
  };
  return axios.post(URL_API, data);
};

const getUserApi = () => {
  const URL_API = "/api/getAllUser";

  return axios.get(URL_API);
};

const editUserApi = (id: number, username: string, email: string) => {
  const URL_API = `/api/edit-user/${id}`;
  const data = {
    username,
    email,
  };
  return axios.put(URL_API, data);
};

const deleteUserApi = (id: Number) => {
  const URL_API = `/api/delete-user/${id}`;
  return axios.delete(URL_API);
};

export { createUserApi, loginUserApi, getUserApi, editUserApi, deleteUserApi };
