import axios from "./axios.custiomize";

// user api

const getAccountApi = () => {
  return axios.get("/api/account");
};

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

const editUserApi = (
  id: number,
  username: string,
  email: string,
  phone: string,
  address: string
) => {
  const URL_API = `/api/edit-user/${id}`;
  const data = {
    username,
    email,
    phone,
    address,
  };
  return axios.put(URL_API, data);
};

// ham update cho user cho phep doi anh
const updateUserProfileApi = (id: number, formData: FormData) => {
  const URL_API = `/api/edit-user/${id}`;

  // Axios tự động nhận biết FormData và set header 'Content-Type': 'multipart/form-data'
  // nhưng để chắc chắn, ta có thể config thêm header
  return axios.put(URL_API, formData);
};

const deleteUserApi = (id: Number) => {
  const URL_API = `/api/delete-user/${id}`;
  return axios.delete(URL_API);
};

export {
  getAccountApi,
  createUserApi,
  loginUserApi,
  getUserApi,
  editUserApi,
  updateUserProfileApi,
  deleteUserApi,
};
