import productRepository from "@/repositories/product-repository";
import storeRepositoy from "@/repositories/store-repository";
import userRepository from "@/repositories/user-repositoy";
import fs from "fs";
import https from "https";
import axios from "axios";

export default async function paymentPix(id: number, userId: number, quantiti: number, url: string) {
  try {  
    const shoop = await storeRepositoy.findFirsName(url);
    
    const user = await userRepository.findFirstUserToken(userId, url);
    
    const product = await productRepository.findManyProductId(id);

    const read = fs.readFileSync(process.env.HOMOLOGACAO_ROUT);
    const box = {
      sandbox: false,
	    client_id: process.env.CLIENT_ID,
	    client_secret: process.env.CLIENT_SECRET,
      pix_cert: './homologacao-432132-dudu.p12'
    };

    const httpsAgent = new https.Agent({
      pfx: read,
      passphrase: "", 
    });

    const getToken = await axios(
      {        
        url: process.env.URL_TOKEN_GENET,
        method: "post",
        headers: {
            Authorization: "Basic "+ Buffer.from(box.client_id+":"+box.client_secret).toString("base64") ,
            "Content-Type": "application/json",
          },
        httpsAgent: httpsAgent,
        data: JSON.stringify({ grant_type: "client_credentials" })
      });
    const token = getToken.data.access_token;
    
    const urlCob = process.env.URL_COB;  
    const config = {
      httpsAgent: httpsAgent,
      headers: { 
      Authorization: "Bearer "+token ,
      "Content-Type": "application/json",
      }
    };
      const dataCob = {
        calendario: {
          expiracao: 3600
        },
        valor: {
          original: `${((quantiti * product.price)/100).toFixed(2)}`
        },
        chave: "eduardvitor7@gmail.com",
        solicitacaoPagador: `Obrigado por comprar conosco ${product.name} `
      };    
    const cob = await axios.post(urlCob,dataCob,config);
    
        
    return cob.data.location;  
} catch (error) {
    console.log(error ,"erro")
  }    
}