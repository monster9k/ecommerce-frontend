import axios from "./axios.custiomize";
import qs from "qs";
import type { ProductType } from "../pages/admin/Products/ProductListPage";
export const getProductDBApi = () => {
  const URL_API = "/api/productDB";

  return axios.get(URL_API);
};

export const createProductDBApi = (values: any, files?: File[]) => {
  const formData = new FormData();

  files?.forEach((f) => formData.append("image", f));

  formData.append("categoryId", values.categoryId);
  formData.append("productName", values.productName);
  formData.append("description", values.description || "");
  formData.append("variants", JSON.stringify(values.variants));

  values.styles?.forEach((id: number) => formData.append("styles", String(id)));

  return axios.post("/api/productDB", formData);
};

export const editProductDBApi = (id: number, values: any, files?: File[]) => {
  const formData = new FormData();

  files?.slice(0, 3).forEach((file) => {
    formData.append("image", file);
  });

  formData.append("productName", values.productName);
  formData.append("description", values.description || "");
  formData.append("size", values.size || "");
  formData.append("color", values.color || "");
  formData.append("price", String(values.price));
  formData.append("stock", String(values.stock));

  values.styles?.forEach((styleId: number) => {
    formData.append("styles", String(styleId));
  });

  return axios.put<ProductType[]>(`/api/productDB/${id}`, formData);
};

export const deleteProductDBApi = (id: number) => {
  return axios.delete(`/api/productDB/${id}`);
};

// shopPage product
export const getProducts = (params: any) => {
  const URL_API = "/api/product";

  return axios.get(URL_API, {
    params: params, // 1. Phải đặt biến params vào key 'params'

    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const getProductById = (id: number) => {
  const URL_API = `/api/product/${id}`;

  return axios.get(URL_API);
};

export const getRelatedProducts = (categoryId: number, styles: string[]) => {
  const params = {
    categoryId: categoryId,
    styles: styles,
    limit: 5,
    page: 1,
  };

  return getProducts(params);
};
