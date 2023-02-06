import { prisma } from "@/config";
import { Store } from "@prisma/client";

async function findFirstStoreUserId(userId: number) {
  return prisma.session.findFirst({
    where: {
      userId: userId
    }
  });
}

async function findFirsName(nameStore: string) {
  return prisma.store.findFirst({
    where: {
      nameStore,
    }
  });
}

async function findFirsSessionIdOuner(id: number) {
  return prisma.user.findFirst({
    where: {
      id
    }
  });
}

async function creatStore(data: Omit<Store, "id">) {
  return prisma.store.create({
    data
  });
}

const storeRepositoy = { 
  creatStore,
  findFirsName,
  findFirsSessionIdOuner,
  findFirstStoreUserId
};

export default storeRepositoy;

