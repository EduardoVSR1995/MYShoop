import productRepository from "@/repositories/product-repository";
import storeRepositoy from "@/repositories/store-repository";
import userRepository from "@/repositories/user-repositoy";
import fs from "fs";
import https from "https";
import axios from "axios";
import payMentRepository from "@/repositories/payment-repository";
import { notmatch, invalidDataError } from "@/error";
import { Addres } from "@prisma/client";

export async function paymentPix(
  fret: number, 
  ProductId: number, 
  userId: number, 
  quantiti: number, 
  url: string,
  addres: Omit<Addres, "id">
  ) {
  const shoop = await storeRepositoy.findFirsName(url);

  const owner = await userRepository.findUserOwner(url);
  
  const user = await userRepository.findFirstTableUserMail(userId, shoop.id);

  if (!user) throw notmatch();
  
  const product = await productRepository.findManyProductId(ProductId);

  if (!product) throw notmatch();
  
  const payMent = await payment(
    quantiti, 
    product.price, 
    fret, 
    user.User.name, 
    userId, 
    ProductId,
    owner.StoreUser[0].User.email
  );
  const imgQrcod = payMent.imgQrcod;
  
  delete payMent.imgQrcod;

  if( quantiti > 1 ) {    
    const fre = ( fret/quantiti)%1 === 0 ? fret/quantiti : Math.trunc(fret/quantiti);

    for (let i = 0; i < quantiti; i++) {
      const payMent2 = await payment(
        1, 
        product.price, 
        fre,
        user.User.name, 
        userId, 
        ProductId,
        owner.StoreUser[0].User.email
      );
      delete payMent2.imgQrcod;
      
      const location = await userRepository.creatAddres(addres);

      await payMentRepository.creatPayMent({ ...payMent2, AddresId: location.id }); 
    }
    return { ...payMent, imgQrcod: imgQrcod }; 
  }
  const location = await userRepository.creatAddres(addres);

  const payd = await payMentRepository.creatPayMent({ ...payMent, AddresId:location.id }); 

  if( !payd ) throw invalidDataError([]);

  return { ...payMent, imgQrcod: imgQrcod };  
}

const pixService = {
  paymentPix
};

export default pixService;

async function payment(
  quantiti: number, 
  price: number, 
  fret: number,
  buyerName: string, 
  userId: number, 
  ProductId: number,
  email: string
) {
  try {  
    const read = fs.readFileSync(process.env.HOMOLOGACAO_ROUT);
   
    const httpsAgent = new https.Agent({
      pfx: read,
      passphrase: "", 
    });
  
    const getToken = await axios(
      {        
        url: process.env.URL_GENET+"oauth/token",
        method: "POST",
        headers: {
          Authorization: "Basic "+ Buffer.from((process.env.CLIENT_ID+":"+process.env.CLIENT_SECRET)).toString("base64"),
          "Content-Type": "application/json",
        },
        httpsAgent: httpsAgent,
        data: JSON.stringify({ grant_type: "client_credentials" })
      });
    if( !getToken ) throw invalidDataError([]);
    
    const token = getToken.data.access_token;
    
    const urlCob = process.env.URL_GENET+"v2/cob";  
    const config = {
      httpsAgent: httpsAgent,
      headers: { 
        Authorization: "Bearer "+token,
        "Content-Type": "application/json",
      }
    };
  
    const valueInt = ((quantiti * price)+fret);
    const dataCob = {
      calendario: {
        expiracao: 3600
      },
      valor: {
        original: `${(valueInt/100).toFixed(2)}`
      },
      chave: email,
      solicitacaoPagador: `Obrigado por comprar conosco ${buyerName} `
    };    
    const cob = await axios.post(urlCob, dataCob, config);
    
    const image = await axios.get(process.env.URL_GENET+`v2/loc/${cob.data.loc.id}/qrcode`, config);
    
    const payMent = {
      payd: false,
      txid: cob.data.txid, 
      valor: price, 
      fret: fret, 
      UserId: userId, 
      ProductId: ProductId,
      location: image.data.imagemQrcode
    };

    return { ...payMent, imgQrcod: image.data.imagemQrcode };
  } catch (error) {
    throw invalidDataError([]);
  }
}
