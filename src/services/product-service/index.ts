import { notFoundError } from "@/error";
import ProductRepository from "@/repositories/product-repository";

async function listProduct() {

  const products = await ProductRepository.findManyProduct();
  return products;
}

const productService = {
  listProduct,
};

export default productService;
