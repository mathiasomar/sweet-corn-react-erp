import axios from "axios";

export async function fetchUnits() {
  return await axios.get("/api/unit/units").then((res) => res.data);
}

export async function fetchUnit(id) {
  return await axios.get(`/api/unit/unit/${id}`).then((res) => res.data);
}

export async function addUnit(values) {
  return await axios.post("/api/unit/units", values).then((res) => res.data);
}

export async function deleteUnit(id) {
  return await axios.delete(`/api/unit/unit/${id}`).then((res) => res.data);
}

export async function updateUnit(values) {
  return await axios
    .put(`/api/unit/unit/${values.id}`, values)
    .then((res) => res.data);
}
