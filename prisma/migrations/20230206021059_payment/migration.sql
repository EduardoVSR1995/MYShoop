/*
  Warnings:

  - Added the required column `AddresId` to the `PayMent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PayMent" ADD COLUMN     "AddresId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PayMent" ADD CONSTRAINT "PayMent_AddresId_fkey" FOREIGN KEY ("AddresId") REFERENCES "Addres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
