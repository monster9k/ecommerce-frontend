import axios from "./axios.custiomize";

export const createOrderApi = (data: any) => {
  // data sẽ bao gồm: { fullName, phone, address, totalPrice, paymentMethod }
  const URL_API = "/api/order/create";
  return axios.post(URL_API, data);
};

const getOrderDBApi = () => {
  const URL_API = "/api/all-oders";

  return axios.get(URL_API);
};

// API Lấy danh sách đơn hàng (MỚI)
const getMyOrdersApi = () => {
  const URL_API = "/api/orders";
  return axios.get(URL_API);
};

export { getOrderDBApi, getMyOrdersApi };
