import axios from "axios";

export async function fetchUsers() {
  return await axios.get("/api/user/users").then((res) => res.data);
}

export async function addUser(values) {
  return await axios
    .post("/api/user/users", values)
    .then((res) => res.data);
}

export async function deleteUser(id) {
    return await axios.delete(`/api/user/users/${id}`)
    .then((res) => res.data)
}
