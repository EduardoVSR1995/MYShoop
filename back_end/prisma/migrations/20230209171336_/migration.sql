/*
  Warnings:

  - Added the required column `StoreId` to the `PayMent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PayMent" ADD COLUMN     "StoreId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PayMent" ADD CONSTRAINT "PayMent_StoreId_fkey" FOREIGN KEY ("StoreId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
