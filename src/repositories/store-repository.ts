import { prisma } from "@/config";

async function findFirstStoreUserId(userId: number) {
  return prisma.session.findFirst({
    where: {
        userId: userId
    }
  });
}

async function findFirsSessionIdOuner(id: number) {
  return prisma.user.findFirst({
    where: {
        id
    },
    include:{
      Store: true
        },
      },    
    )
};

const storeRepositoy = { 
  findFirsSessionIdOuner,
  findFirstStoreUserId
};

export default storeRepositoy;
