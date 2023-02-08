import { notmatch, notFoundError } from "@/error";
import productRepository from "@/repositories/product-repository";
import ProductRepository from "@/repositories/product-repository";
import userRepository from "@/repositories/user-repositoy";
import { Categori, PayMent, Product } from "@prisma/client";

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

async function findManyCategory(shoop: string) {
  const product = await ProductRepository.findManyCategory(shoop);
  return product;
}

async function creatCart(ProductId: number, userId: number, quantiti: number) {
  for(let i=0; i < quantiti; i++) {
    await ProductRepository.creatCart(userId, ProductId);
  }
  return; 
}

async function creatUrlImage(ProductId: number, urlImage: [string]) {
  for(let i=0; i < urlImage.length; i++) {
    await ProductRepository.creatUrlImage(ProductId, urlImage[i]);
  }
  return; 
}

async function creatProduct(obj: Omit<Product, "id"> ) {
  return ProductRepository.creatProduct(obj);
}

async function creatCategory(obj: Omit<Categori, "id"> ) {
  const categori = await productRepository.findCategoryName(obj);
  
  if ( categori ) throw notFoundError();
  
  return ProductRepository.creatCategory(obj);
}

async function deleteCart(ProductId: number, userId: number) {
  const cart = await ProductRepository.findFirstCart(userId, ProductId);  

  if(!cart) throw notmatch();

  await ProductRepository.deleteCart(cart.id);
  return; 
}

async function deleteProductStore(ProductId: number, nameStore: string) {
  const cart = await ProductRepository.findFirstProductIdStore(ProductId, nameStore);  

  if( cart.length === 0 ) throw notmatch();
  
  await ProductRepository.deleteProductShop(ProductId);
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
  listProductName,
  listProductId,
  listProduct,
  findManyProductCardPayd,
  findManyCategory,
  findManyProductCardUserId,
  findProductId,
  findFirstPubli,
  creatProduct,
  creatCart,
  creatUrlImage,
  creatCategory,
  deleteCart,
  deleteProductStore,
};

export default productService;
