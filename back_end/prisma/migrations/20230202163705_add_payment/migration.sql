/*
  Warnings:

  - Added the required column `ProductId` to the `PayMent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PayMent" ADD COLUMN     "ProductId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PayMent" ADD CONSTRAINT "PayMent_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
