import axios from "./axios.custiomize";
import type { ProductType } from "../pages/admin/Products/ProductListPage";
export const getProductDBApi = () => {
  const URL_API = "/api/productDB";

  return axios.get(URL_API);
};

export const createProductDBApi = (values: any, file?: File) => {
  const formData = new FormData();

  if (file) {
    formData.append("image", file);
  }

  formData.append("categoryId", values.categoryId);
  formData.append("name", values.productName);
  formData.append("description", values.description || "");
  formData.append("size", values.size || "");
  formData.append("color", values.color || "");
  formData.append("price", String(values.price || 0));
  formData.append("stock", String(values.stock || 0));

  return axios.post<ProductType[]>("/api/productDB", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const editProductDBApi = (id: number, values: any, file?: File) => {
  const formData = new FormData();
  if (file) {
    formData.append("image", file);
  }

  formData.append("productName", values.productName);
  formData.append("description", values.description || "");
  formData.append("size", values.size || "");
  formData.append("color", values.color || "");
  formData.append("price", String(values.price || 0));
  formData.append("stock", String(values.stock || 0));

  return axios.put<ProductType[]>(`/api/productDB/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProductDBApi = (id: number) => {
  return axios.delete(`/api/productDB/${id}`);
};
