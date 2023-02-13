import { prisma } from "@/config";
import { Publi, Store } from "@prisma/client";

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

async function findFirsAdvers(nameStore: string) {
  return prisma.store.findFirst({
    where: {
      nameStore,
    },
    include: {
      Publi: true
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

async function upsertAdvers(id: number, data: Omit<Publi, "id"> ) {
  return prisma.publi.upsert({
    where: {
      id
    },
    create: data
    ,
    update: data
  });
}

const storeRepositoy = { 
  upsertAdvers,
  creatStore,
  findFirsAdvers,
  findFirsName,
  findFirsSessionIdOuner,
  findFirstStoreUserId
};

export default storeRepositoy;

