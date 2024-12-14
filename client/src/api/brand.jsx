import axios from "axios";

export async function fetchBrands() {
  return await axios.get("/api/brand/brands").then((res) => res.data);
}

export async function fetchBrand(id) {
  return await axios.get(`/api/brand/brand/${id}`).then((res) => res.data);
}

export async function addBrand(values) {
  return await axios.post("/api/brand/brands", values).then((res) => res.data);
}

export async function deleteBrand(id) {
  return await axios.delete(`/api/brand/brand/${id}`).then((res) => res.data);
}

export async function updateBrand(values) {
  return await axios
    .put(`/api/brand/brand/${values.id}`, values)
    .then((res) => res.data);
}
