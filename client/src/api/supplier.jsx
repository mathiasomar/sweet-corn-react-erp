import axios from "axios";

export async function fetchSuppliers() {
  return await axios.get("/api/supplier/suppliers").then((res) => res.data);
}

export async function fetchSupplier(id) {
  return await axios.get(`/api/supplier/suppliers/${id}`).then((res) => res.data);
}

export async function addSupplier(values) {
  return await axios
    .post("/api/supplier/suppliers", values)
    .then((res) => res.data);
}

export async function deleteSupplier(id) {
  return await axios.delete(`/api/supplier/suppliers/${id}`).then((res) => res.data);
}

export async function updateSupplier(values) {
  return await axios.put(`/api/supplier/suppliers/${values.id}`, values).then((res) => res.data);
}