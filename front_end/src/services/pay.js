import { conect } from "./api";

export async function paydPix(
  token,
  id,
  quantiti,
  phone,
  street,
  city,
  house,
  cep,
  code
) {
  const response = await conect("/payment/pix", 
    { method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        id,
        phone,
        quantiti,
        street,
        city,
        house,
        cep,
        code
      }),
    });
  return response;
}
