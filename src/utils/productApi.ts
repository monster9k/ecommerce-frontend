import axios from "./axios.custiomize";

const getProductDBApi = () => {
  const URL_API = "/api/productDB";

  return axios.get(URL_API);
};

export { getProductDBApi };
