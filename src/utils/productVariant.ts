import axios from "./axios.custiomize";

export const deleteVariant = (id: number) => {
  return axios.delete(`/api/product-variant/${id}`);
};
