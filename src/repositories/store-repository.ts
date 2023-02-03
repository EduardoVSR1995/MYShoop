import { prisma } from "@/config";

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

const storeRepositoy = { 
  findFirsName,
  findFirsSessionIdOuner,
  findFirstStoreUserId
};

export default storeRepositoy;

