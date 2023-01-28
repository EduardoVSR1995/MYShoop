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

async function listProductId(id: number) {
  const products = await ProductRepository.findManyProductId(id);
  return products;
}

const productService = {
  listProductId,
  listProductName,
  listProduct,
};

export default productService;
