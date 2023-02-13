/*
  Warnings:

  - Added the required column `AddresId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "AddresId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_AddresId_fkey" FOREIGN KEY ("AddresId") REFERENCES "Addres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
