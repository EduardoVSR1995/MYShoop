/*
  Warnings:

  - Added the required column `value` to the `SalesAffiliated` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalesAffiliated" ADD COLUMN     "value" INTEGER NOT NULL;
