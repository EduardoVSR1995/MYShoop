import { prisma } from "@/config";

async function findManyProduct(shoop: string) {
  return prisma.store.findMany({
    where:{
      nameStore: shoop
    },
    select:{
      id:false,
      Product:{
        select:{
        StoreId: false, 
        id: true,
        name: true,
        description: true,
        packingSize: true,
        price: true,
        CategoriId: true, 
        UrlImage:{
          select:{
            urlImage:true
            },
          },
        },
      },
    },
  });
}

async function findManyProductName(name: string) {
  return prisma.product.findMany({
    where: {
      name: {
        startsWith: name
      },
    },
    select:{
      StoreId: false, 
      id: true,
      name: true,
      description: true,
      packingSize: true,
      price: true,
      CategoriId: true
    },
  });
};

async function findManyProductId(id: number) {
  return prisma.product.findMany({
    where: {
      id
    },
    select:{
      StoreId: false, 
      id: true,
      name: true,
      description: true,
      packingSize: true,
      price: true,
      CategoriId: true
    },
  });
};

const productRepository = {
  findManyProductName,
  findManyProduct,
  findManyProductId
};

export default productRepository;
