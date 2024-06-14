const baseURL = import.meta.env.VITE_SERVER_URL;

export function convertToJson(res) {

  const jsonResponse =  res.json();

  if (res.ok) {

    return jsonResponse
      
  } else {

  throw { name: 'servicesError', message: error };
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
      return await fetch(baseURL + "checkout/", options).then(convertToJson);


}
