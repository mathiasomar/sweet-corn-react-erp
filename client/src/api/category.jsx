import axios from "axios";

export async function fetchCategories() {
  return await axios.get("/api/category/categories").then((res) => res.data);
}

export async function addCategory(values) {
  return await axios
    .post("/api/category/categories", values)
    .then((res) => res.data);
}
