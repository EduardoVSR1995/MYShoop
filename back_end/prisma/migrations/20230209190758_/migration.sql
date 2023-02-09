/*
  Warnings:

  - You are about to drop the column `AffiliatedId` on the `SalesAffiliated` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SalesAffiliated" DROP CONSTRAINT "SalesAffiliated_AffiliatedId_fkey";

-- AlterTable
ALTER TABLE "SalesAffiliated" DROP COLUMN "AffiliatedId";

-- AddForeignKey
ALTER TABLE "SalesAffiliated" ADD CONSTRAINT "SalesAffiliated_code_fkey" FOREIGN KEY ("code") REFERENCES "Affiliated"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
