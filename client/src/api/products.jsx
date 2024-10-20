import axios from "axios";

export async function fetchProducts() {
  return await axios.get("/api/product/products").then((res) => res.data);
}

export async function fetchProduct(id) {
  return await axios.get(`/api/product/products/${id}`).then((res) => res.data);
}

export async function addProduct(values) {
  return await axios
    .post("/api/product/products", values)
    .then((res) => res.data);
}

export async function deleteProduct(id) {
  return await axios.delete(`/api/product/products/${id}`).then((res) => res.data);
}

export async function updateProduct(values) {
  return await axios.put(`/api/product/products/${values.id}`, values).then((res) => res.data);
}
