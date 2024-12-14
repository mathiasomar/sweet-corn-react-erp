import axios from "axios";

export async function fetchCategories() {
  return await axios.get("/api/category/categories").then((res) => res.data);
}

export async function fetchCategory(id) {
  return await axios
    .get(`/api/category/category/${id}`)
    .then((res) => res.data);
}

export async function addCategory(values) {
  return await axios
    .post("/api/category/categories", values)
    .then((res) => res.data);
}

export async function deleteCategory(id) {
  return await axios
    .delete(`/api/category/category/${id}`)
    .then((res) => res.data);
}

export async function updateCategory(values) {
  return await axios
    .put(`/api/category/category/${values.id}`, values)
    .then((res) => res.data);
}
