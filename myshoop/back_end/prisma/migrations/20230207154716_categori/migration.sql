/*
  Warnings:

  - Added the required column `StoreId` to the `Categori` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categori" ADD COLUMN     "StoreId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Categori" ADD CONSTRAINT "Categori_StoreId_fkey" FOREIGN KEY ("StoreId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
