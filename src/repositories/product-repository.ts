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

async function findManyProductName(name: string, nameStore: string) {
  return prisma.store.findUnique({
    where: {
      nameStore
    },
    select: {
      Product: {
        where: {
          name: {
            startsWith: name,
            mode: "insensitive" 
          }
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
      }
    }
    
  });
}

async function findManyProductId(id: number) {
  return prisma.product.findUnique({
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

async function findfirstId(id: number) {
  return prisma.product.findUnique({
    where: {
      id
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

async function findFirstCart(userId: number, ProductId: number ) {
  return prisma.cart.findFirst({
    where: {
      userId,
      ProductId
    }
  });
}

async function deleteCart(id: number ) {
  return prisma.cart.delete({
    where: {
      id
    }
  });
}

async function findManyProductCardPayd(UserId: number, nameStore: string) {
  return prisma.store.findUnique({
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
              PayMent: true
            }
          }
        }
      }
    }
  });
}

const productRepository = {
  findManyProductCardPayd,
  deleteCart,
  findFirstCart,
  findfirstId,
  creatCart,
  findFirstPubli,
  findManyProductCardUserId,
  findManyProductName,
  findManyProduct,
  findManyProductId
};

export default productRepository;

