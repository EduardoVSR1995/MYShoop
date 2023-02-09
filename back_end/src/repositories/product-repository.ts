import { prisma } from "@/config";
import { Categori, Product } from "@prisma/client";

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

async function deleteProductShop(id: number ) {
  const cart = prisma.cart.deleteMany({
    where: {
      ProductId: id
    }
  });

  const publi =  prisma.publi.deleteMany({
    where: {
      productId: id
    }
  });

  const url = prisma.urlImage.deleteMany({
    where: {
      ProductId: id
    }
  });

  const product = prisma.product.delete({
    where: {
      id
    }
  });
  const result = await prisma.$transaction([cart, publi, url, product]);
  console.log(result);
  return ;
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
        include: {
          User: {
            include: {
              PayMent: true
            }
          },
        }
      }
    }
  });
}

async function findFirstProductIdStore(id: number, nameStore: string) {
  const list = await prisma.store.findFirst({
    where: {
      nameStore
    },
    select: {
      Product: {
        where: {
          id
        }
      }
    }
  })
  return list.Product;
}

async function findManyCategory(nameStore: string) {
  const list = await prisma.store.findUnique({
    where: {
      nameStore
    },
    select: {
      Categori: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
  return list.Categori;
}

async function creatProduct(data: Omit<Product, "id">) {
  return prisma.product.create({
    data
  });
}

async function creatCategory(data: Omit<Categori, "id">) {
  return prisma.categori.create({
    data
  });
}

async function creatUrlImage( ProductId: number, urlImage: string) {
  return prisma.urlImage.create({
    data: {
      ProductId,
      urlImage
    }
  });
}

async function findCategoryName(obj: Omit<Categori, "id">) {
  return prisma.categori.findFirst({
    where: {
      name: obj.name,
      StoreId: obj.StoreId
    }
  });
}

async function findSoldProducts(nameStore: string) {
  return prisma.payMent.findMany({
    where: {
      send: true
    },
    select: {
      User: {
        select: {
          name: true,
          email: true,
          StoreUser:{
            where: {
              Store: {
                nameStore             
              }              
            }
          }
        }
      },
      Product: {
        select: {
          name: true,
          description: true,
          price: true,
          UrlImage: true,
        },
      }
    },
  });
}

const productRepository = {
  findManyProductCardUserId,
  findManyProductCardPayd,
  findFirstProductIdStore,
  findManyProductName,
  findManyProductId,
  findManyProduct,
  findManyCategory,
  findSoldProducts,
  findFirstCart,
  findCategoryName,
  findfirstId,
  findFirstPubli,
  deleteCart,
  deleteProductShop,
  creatUrlImage,
  creatProduct,
  creatCategory,
  creatCart,
};

export default productRepository;

