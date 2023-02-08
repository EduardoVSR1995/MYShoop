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

export async function posCreatProduct( token, obj) {
  const response = await conect("/product/create", 
    { 
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(obj)
    });
  return response;
}

export async function postAfiliat( obj, token ) {
  console.log(obj);
  const response = await conect("/user/afiliat", 
    { 
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ token }`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(obj)
    });
  return response;
}
