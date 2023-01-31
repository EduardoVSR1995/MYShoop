/*
  Warnings:

  - You are about to drop the column `StoreId` on the `Publi` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Publi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Publi" DROP CONSTRAINT "Publi_StoreId_fkey";

-- AlterTable
ALTER TABLE "Publi" DROP COLUMN "StoreId",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Publi" ADD CONSTRAINT "Publi_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
