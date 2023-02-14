export const shopName = "/"+window.location.pathname.split("/")[1];

export async function store() {
  const store = await (await fetch("/api/store", { method: "GET" })).json();
  return store;
}

export async function conect( url, body ) {   
  return await (await fetch("/api/"+shopName+url, body)).json();
}
