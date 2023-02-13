/*
  Warnings:

  - You are about to drop the column `ProductId` on the `Publi` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameStore]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `StoreId` to the `Publi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Publi" DROP CONSTRAINT "Publi_ProductId_fkey";

-- AlterTable
ALTER TABLE "Publi" DROP COLUMN "ProductId",
ADD COLUMN     "StoreId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Store_nameStore_key" ON "Store"("nameStore");

-- AddForeignKey
ALTER TABLE "Publi" ADD CONSTRAINT "Publi_StoreId_fkey" FOREIGN KEY ("StoreId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
