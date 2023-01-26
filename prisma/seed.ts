import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const cont = await prisma.store.findMany();  
  console.log("OK " , cont)
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
