import { prisma } from "@/config";

async function findFirstStoreUserId(userId: number) {
  return prisma.session.findFirst({
    where: {
        userId: userId
    }
  });
}
const storeRepositoy = { 
    findFirstStoreUserId
};

export default storeRepositoy;
