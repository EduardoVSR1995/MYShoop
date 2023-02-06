import { notmatch } from "@/error";
import ProductRepository from "@/repositories/product-repository";
import userRepository from "@/repositories/user-repositoy";
import { PayMent } from "@prisma/client";

async function listProduct(shoop: string) {
  const products = await ProductRepository.findManyProduct(shoop);

  return products[0].Product;
}

async function listProductName(name: string, shoopName: string) {
  const products = await ProductRepository.findManyProductName(name, shoopName);
  return products.Product;
}

async function listProductId(id: number) {
  const products = await ProductRepository.findManyProductId(id);
  return products;
}

async function findProductId(id: number) {
  const products = await ProductRepository.findfirstId(id);
  return products;
}

async function findManyProductCardUserId(id: number, nameStore: string ) {
  const products = await ProductRepository.findManyProductCardUserId(id, nameStore);
  
  if(products[0].StoreUser.length === 0 ) return [];
  
  return products[0].StoreUser[0].User.Cart;
}

async function findFirstPubli(shoop: string) {
  const product = await ProductRepository.findFirstPubli(shoop);
  return product.Publi;
}

async function creatCart(ProductId: number, userId: number, quantiti: number) {
  for(let i=0; i < quantiti; i++) {
    await ProductRepository.creatCart(userId, ProductId);
  }
  return; 
}

async function deleteCart(ProductId: number, userId: number) {
  const cart = await ProductRepository.findFirstCart(userId, ProductId);  

  if(!cart) throw notmatch();

  await ProductRepository.deleteCart(cart.id);
  return; 
}

type cardPay ={
  arr: PayMent[],
  phone?: string
}
 
async function findManyProductCardPayd(userId: number, nameStore: string ): Promise<cardPay> {
  const products = await ProductRepository.findManyProductCardPayd(userId, nameStore);

  if( products.StoreUser[0].User.PayMent.length === 0 ) return { arr: [] };
  
  const owner = await userRepository.findUserOwner(nameStore);

  const arr = products.StoreUser[0].User.PayMent;
  const phone = owner.StoreUser[0].User.Addres[0].phone;

  return { arr: arr, phone: phone };
}

const productService = {
  findManyProductCardPayd,
  deleteCart,
  findProductId,
  creatCart,
  findFirstPubli,
  listProductId,
  findManyProductCardUserId,
  listProductName,
  listProduct,
};

export default productService;
