/*
  Warnings:

  - Added the required column `StoreId` to the `Publi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Publi" ADD COLUMN     "StoreId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Publi" ADD CONSTRAINT "Publi_StoreId_fkey" FOREIGN KEY ("StoreId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
