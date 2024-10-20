import axios from "axios";

export async function fetchPurchases() {
    return await axios.get("/api/purchase/purchases").then((res) => res.data);
  }
  
  export async function fetchPurchase(id) {
    return await axios.get(`/api/purchase/purchases/${id}`).then((res) => res.data);
  }

  export async function addPurchase(values) {
    return await axios
      .post("/api/purchase/purchases", values)
      .then((res) => res.data);
  }
  
  export async function deletePurchase(id) {
    return await axios.delete(`/api/purchase/purchases/${id}`).then((res) => res.data);
  }