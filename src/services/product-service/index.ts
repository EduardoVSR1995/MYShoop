import { notFoundError } from "@/error";
import ProductRepository from "@/repositories/product-repository";

async function listProduct(shoop: string) {
  const products = await ProductRepository.findManyProduct(shoop);

  return products[0].Product;
}

async function listProductName(name: string) {
  const products = await ProductRepository.findManyProductName(name);
  return products;
}

async function listProductId(id: number) {
  const products = await ProductRepository.findManyProductId(id);
  return products;
}

async function findManyProductCardUserId(id: number) {
  const products = await ProductRepository.findManyProductCardUserId(id);
  return products;
}

async function findFirstPubli(shoop: string) {
  const product = await ProductRepository.findFirstPubli(shoop);
  return product[0].Publi;
}

const productService = {
  findFirstPubli,
  listProductId,
  findManyProductCardUserId,
  listProductName,
  listProduct,
};

export default productService;
