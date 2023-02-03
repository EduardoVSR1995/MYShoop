import { prisma } from "@/config";
import { User } from "@prisma/client";

async function findFirstTableUserMail(StoreId: number, UserId: number ) {
  return prisma.storeUser.findFirst({
    where: {
      StoreId,
      UserId
    },
    select: {
      User: true
    }  
  });
}

async function findFirstUserMail(email: string, StoreId: number) {
  return prisma.user.findFirst({
    where: {
      email
    },
    include: {
      StoreUser: {
        where: {
          StoreId
        }
      }
    }
  });
}

async function creatStorUser( data: {StoreId: number, UserId: number} ) {
  return await prisma.storeUser.create({
    data
  });
}

async function creatUser( data: Omit<User, "id">, StoreId: number ) {
  const user = await prisma.user.create({
    data
  });
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

const userRepository = {
  findFirstUserToken,
  findUserOwner,
  creatStorUser,
  findFirstTableUserMail,
  findFirstUserMail,
  creatSessionUser,
  creatUser
};

export default userRepository;

