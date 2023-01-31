import { prisma } from "@/config";

async function findManyProduct(shoop: string) {
  return prisma.store.findMany({
    where: {
      nameStore: shoop
    },
    select: {
      id: false,
      Product: {
        select: {
          StoreId: false, 
          id: true,
          name: true,
          description: true,
          packingSize: true,
          price: true,
          CategoriId: true, 
          UrlImage: {
            select: { 
              urlImage: true
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
    select: {
      StoreId: false, 
      id: true,
      name: true,
      description: true,
      packingSize: true,
      price: true,
      CategoriId: true
    },
  });
}

async function findManyProductId(id: number) {
  return prisma.product.findMany({
    where: {
      id
    },
    select: {
      StoreId: false, 
      id: true,
      name: true,
      description: true,
      packingSize: true,
      price: true,
      CategoriId: true,
      UrlImage: true
    },
  });
}

async function findManyProductCardUserId(UserId: number, nameStore: string) {
  return prisma.store.findMany({
    where: {
      nameStore
    },
    select: {
      StoreUser: {
        where: {
          UserId
        },
        select: {
          User: {
            include: {
              Cart: true
            }
          }
        }
      }
    }
  });
}

async function findFirstPubli(nameStore: string) {
  return prisma.store.findUnique({
    where: {
      nameStore
    },
    include: {
      Publi: {
        include: {
          Product: {
            select: {
              name: true,
              description: true,
              UrlImage: true
            }
          }
        }
      },
    }
  });
}

async function creatCart(userId: number, ProductId: number ) {
  return prisma.cart.create({
    data: {
      userId,
      ProductId
    }
  });
}

const productRepository = {
  creatCart,
  findFirstPubli,
  findManyProductCardUserId,
  findManyProductName,
  findManyProduct,
  findManyProductId
};

export default productRepository;

