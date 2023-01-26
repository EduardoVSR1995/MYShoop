import { prisma } from "@/config";

async function findManyProduct() {
  return prisma.product.findMany();
}

const productRepository = {
    findManyProduct,
};

export default productRepository;
