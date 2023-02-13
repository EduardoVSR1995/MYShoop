import { conect } from "./api";

export async function signUp(name, urlImage, email, password) {
  const response = await conect("/user/signup", 
    { method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password, name: name, urlImage: urlImage, }) 
    });
  return response;
}

export async function signin(email, password) {
  const response = await conect("/user/signin", 
    { method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password }) });
  return response;
}

export async function autorize(token) {  
  const response = await conect("/user/autorize",
    { method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
  return response;
}
