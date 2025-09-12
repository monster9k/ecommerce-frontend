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

export { createUserApi, loginUserApi, getUserApi };
