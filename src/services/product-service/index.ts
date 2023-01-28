import { notFoundError } from "@/error";
import ProductRepository from "@/repositories/product-repository";

async function listProduct(shoop: string) {
  const products = await ProductRepository.findManyProduct(shoop);

  return products[0].Product ;
}

async function listProductName(name: string) {
  const products = await ProductRepository.findManyProductName(name);
  return products;
}
const productService = {
  listProductName,
  listProduct,
};

export default productService;
