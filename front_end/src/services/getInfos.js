import { conect } from "./api";

export async function cart(token) {
  const response = await conect("/product/cart", 
    { method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  return response;
}

export async function cartPayd(token) {
  const response = await conect("/product/cart/payd", 
    { method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  return response;
}

export async function advertisingGet() {
  const response = await conect("/product/publi", 
    { method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  return response;
}

export async function getOneProduct(id) {
  const response = await conect(`/product/id/${id}`, 
    { method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  return response;
}

export async function getProductPayd(token) {
  const response = await conect("/payment/list", 
    { method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  return response;
}

export async function getProductSold(token) {
  const response = await conect("/user/sold", 
    { 
      method: "GET",
      headers: {
        "Authorization": `Bearer ${ token }`,
        "Content-Type": "application/json"
      }
    });
  return response;
}

export async function getAfiliate(token) {
  const response = await conect("/user/afiliat", 
    { 
      method: "GET",
      headers: {
        "Authorization": `Bearer ${ token }`,
        "Content-Type": "application/json"
      }
    });
  return response;
}
