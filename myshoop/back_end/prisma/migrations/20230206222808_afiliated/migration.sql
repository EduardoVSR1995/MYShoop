/*
  Warnings:

  - You are about to drop the column `userId` on the `Affiliated` table. All the data in the column will be lost.
  - Added the required column `email` to the `Affiliated` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Affiliated" DROP CONSTRAINT "Affiliated_userId_fkey";

-- AlterTable
ALTER TABLE "Affiliated" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;
