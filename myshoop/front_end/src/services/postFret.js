import { conect } from "./api";

export async function postFret(id, quantiti, sCepDestino) {  
  let response = await conect("/product/fret", 
    { 
      method: "POST",
      body: JSON.stringify({ id: Number(id), quantiti: quantiti, sCepDestino: sCepDestino }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    
  return response;
}
