/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Addres` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `house` to the `Addres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Addres` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Addres_street_key";

-- AlterTable
ALTER TABLE "Addres" ADD COLUMN     "house" INTEGER NOT NULL,
ADD COLUMN     "id" INTEGER NOT NULL,
ALTER COLUMN "street" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "PayMent" (
    "id" INTEGER NOT NULL,
    "payd" BOOLEAN NOT NULL DEFAULT false,
    "txid" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "fret" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PayMent_id_key" ON "PayMent"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Addres_id_key" ON "Addres"("id");

-- AddForeignKey
ALTER TABLE "PayMent" ADD CONSTRAINT "PayMent_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
