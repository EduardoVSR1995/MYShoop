export const shopName = "/"+window.location.pathname.split("/")[1];

export async function store() {
  const store = await (await fetch("/api/store", { method: "GET" })).json();
  return store;
}

//export async function store() {
//  const store = await (await fetch("http://localhost:4000/store", { method: "GET" })).json();
//  console.log(store);
//  return store;
//}
  
export async function conect( url, body ) {
  console.log(url);   
  return await (await fetch("/ola/"+shopName+url, body)).json();
}

//export async function conect( url, body ) {   
//  return await (await fetch("http://localhost:4000"+shopName+url, body)).json();
//}
  
