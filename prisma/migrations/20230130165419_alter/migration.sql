/*
  Warnings:

  - The primary key for the `StoreUser` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "StoreUser" DROP CONSTRAINT "StoreUser_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "StoreUser_pkey" PRIMARY KEY ("id");
