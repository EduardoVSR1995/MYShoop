/*
  Warnings:

  - You are about to drop the column `cep` on the `Addres` table. All the data in the column will be lost.
  - Added the required column `city` to the `Addres` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Addres" DROP COLUMN "cep",
ADD COLUMN     "city" TEXT NOT NULL;
