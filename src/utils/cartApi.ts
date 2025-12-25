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

export const updateCartItemApi = (cartItemId: number, quantity: number) => {
  return axios.put(`/api/cart/update/${cartItemId}`, { quantity });
};

export const removeCartItemApi = (cartItemId: number) => {
  return axios.delete(`/api/cart/delete/${cartItemId}`);
};
