/*
  Warnings:

  - Added the required column `StoreId` to the `Affiliated` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Affiliated" ADD COLUMN     "StoreId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Affiliated" ADD CONSTRAINT "Affiliated_StoreId_fkey" FOREIGN KEY ("StoreId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
