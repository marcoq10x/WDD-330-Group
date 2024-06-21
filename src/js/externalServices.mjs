import { getLocalStorage } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

export async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export async function getProductsByCategory(category = "tents") {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const res = await fetch(baseURL + "checkout/", options).then(convertToJson);
  return res;
}

export async function loginRequest(email, password) {
  const options = { 
    method: "POST",
    headers: { "Content-Type": "application/json"
     },
    body: JSON.stringify({ email, password })
    };
    
  const res = await fetch(baseURL + "login/", options).then(convertToJson);
  return res;
}

export async function getOrders() {
  const token = getLocalStorage("so-token");
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(baseURL + "orders/", options).then(convertToJson);
  return res;
}