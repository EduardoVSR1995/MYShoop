import { prisma } from "@/config";

export async function shoops() {
  const list = await prisma.store.findMany({
    select: {
      nameStore: true
    },
  });
  return list;
}

