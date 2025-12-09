import axios from "./axios.custiomize";

const getOrderDBApi = () => {
  const URL_API = "/api/all-oders";

  return axios.get(URL_API);
};

export { getOrderDBApi };
