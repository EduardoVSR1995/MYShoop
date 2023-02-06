export const shopName = "/"+window.location.pathname.split("/")[1];

export async function store() {
  const store = await (await fetch(process.env.REACT_APP_API_BASE_URL+"/store", { method: "GET" })).json();
  return store;
}

export async function conect( url, body ) {   
  return await (await fetch(process.env.REACT_APP_API_BASE_URL+shopName+url, body)).json();
}
