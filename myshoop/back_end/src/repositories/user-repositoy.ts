import { prisma } from "@/config";
import { Addres, Affiliated, User } from "@prisma/client";

async function findFirstTableUserMail(StoreId: number, UserId: number ) {
  return prisma.storeUser.findFirst({
    where: {
      StoreId,
      User:{
        id:UserId
      }
    },
    include: {
      User: true
    }  
  });
}

async function findFirstUserMail(email: string, nameStore: string) {
  return prisma.storeUser.findFirst({
    where: {
      User: {
        email
      },
      Store: {
        nameStore
      }
    }
    
  });
}


async function creatStorUser( data: {StoreId: number, UserId: number} ) {
  return await prisma.storeUser.create({
    data
  });
}

async function creatUserAlone( data: Omit<User, "id">) {
  return await prisma.user.create({
    data
  });
}

async function creatUser( data: Omit<User, "id">, StoreId: number ) {
  const user = await creatUserAlone(data);

  await creatStorUser({ StoreId, UserId: user.id });
   
  return creatSessionUser(user.id, user.password);
}

async function creatSessionUser(userId: number, token: string) {
  return prisma.session.create({
    data: {
      userId: userId,
      token: token
    }
  });
}

async function  findFirstUserToken(UserId: number, nameStore: string) {
  return prisma.store.findFirst({
    where: {
      nameStore
    },
    select: {
      StoreUser: {
        where: {
          UserId
        },
        include: {
          User: true
        }
      }
    }
  }  
  );
}

async function  findFirstAfiliat(email: string, nameStore: string) {
  const afiliat = await prisma.store.findFirst({
    where: {
      nameStore
    },
    include: {
      Affiliated: {
        where: {
          email
        },
      },
    }
  }  
  );
  const cont = await prisma.affiliated.aggregate({
    _count:true
  });
  
  return {...afiliat , cont: cont._count};
}

async function findUserOwner(nameStore: string) {
  return prisma.store.findUnique({
    where: {
      nameStore,
    },
    select: {
      StoreUser: {
        include: {
          User: {
            include: {
              Addres: true
            }
          }
        }
      }
    }
  });
}

async function findFirstManyAfiliat(nameStore: string) {
  return prisma.store.findMany({
    where: {
      nameStore,
    },
    select: {
      Affiliated: {
        select: {
          email: true,
          code: true,
          cellPhone: true,
          SalesAffiliated: true,        
        },
      }
    }
  });  
}

async function creatAddres(data: Omit<Addres, "id">) {
  return prisma.addres.create({
    data
  });
}

async function creatAfiliat(data: Omit<Affiliated, "id">) {
  console.log(data);
  return prisma.affiliated.create({
    data: {
      code: data.code,
      cellPhone: data.cellPhone,
      email: data.email,
      StoreId: data.StoreId
    }
  });
}

const userRepository = {
  findFirstManyAfiliat,
  creatUserAlone,
  creatAddres,
  creatAfiliat,
  findFirstAfiliat,
  findFirstUserToken,
  findUserOwner,
  creatStorUser,
  findFirstTableUserMail,
  findFirstUserMail,
  creatSessionUser,
  creatUser
};

export default userRepository;

