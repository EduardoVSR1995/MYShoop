/*
  Warnings:

  - You are about to drop the `_StoreToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StoreToUser" DROP CONSTRAINT "_StoreToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_StoreToUser" DROP CONSTRAINT "_StoreToUser_B_fkey";

-- DropTable
DROP TABLE "_StoreToUser";

-- CreateTable
CREATE TABLE "StoreUser" (
    "UserId" INTEGER NOT NULL,
    "StoreId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoreUser_pkey" PRIMARY KEY ("UserId","StoreId")
);

-- AddForeignKey
ALTER TABLE "StoreUser" ADD CONSTRAINT "StoreUser_StoreId_fkey" FOREIGN KEY ("StoreId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreUser" ADD CONSTRAINT "StoreUser_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
