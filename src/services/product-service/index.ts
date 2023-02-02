import ProductRepository from "@/repositories/product-repository";

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

const productService = {
  findProductId,
  creatCart,
  findFirstPubli,
  listProductId,
  findManyProductCardUserId,
  listProductName,
  listProduct,
};

export default productService;
