/*
  Warnings:

  - Added the required column `location` to the `PayMent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PayMent" ADD COLUMN     "location" TEXT NOT NULL;
