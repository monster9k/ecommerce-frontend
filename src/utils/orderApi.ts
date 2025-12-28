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

export const getAllOrdersAdminApi = (search: string = "") => {
  // Nếu có search, gắn vào query param
  const url = search
    ? `/api/admin/orders?search=${encodeURIComponent(search)}`
    : `/api/admin/orders`;

  return axios.get(url);
};

// [ADMIN] Cập nhật đơn hàng
export const updateOrderAdminApi = (
  id: number,
  data: { status?: string; isPaid?: boolean }
) => {
  return axios.put(`/api/admin/orders/${id}`, data);
};

// [ADMIN] Xóa đơn hàng
export const deleteOrderAdminApi = (id: number) => {
  return axios.delete(`/api/admin/orders/${id}`);
};

export { getOrderDBApi, getMyOrdersApi };
