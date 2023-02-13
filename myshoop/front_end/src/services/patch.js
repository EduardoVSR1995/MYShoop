import { conect } from "./api";

export async function updateProductPayCode(token, code) {
  const response = await conect("/payment/code", 
    { 
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${ token }`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(code)
    });
  return response;
} 
 
