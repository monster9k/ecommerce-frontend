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

export { createUserApi };
