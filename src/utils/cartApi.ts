import axios from "./axios.custiomize";

export const addToCartApi = (productVariantId: number, quantity: number) => {
  const data = {
    productVariantId,
    quantity,
  };
  return axios.post("/api/cart/add", data);
};

export const getCartApi = () => {
  return axios.get("/api/cart");
};
