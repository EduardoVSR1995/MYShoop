import { conect } from "./api";

export async function postCart(id, quantiti, token) {
  const response = await conect("/product/cart", 
    { method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ id: id, quantiti: quantiti }) });
  return response;
}

export async function postCreatShoop(obj) {
  const response = (await fetch(process.env.REACT_APP_API_BASE_URL+"/user/creat", 
    { 
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(obj) })).json();
  return response;
}
