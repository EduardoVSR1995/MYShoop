/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Affiliated` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "SalesAffiliated" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "AffiliatedId" INTEGER NOT NULL,

    CONSTRAINT "SalesAffiliated_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Affiliated_code_key" ON "Affiliated"("code");

-- AddForeignKey
ALTER TABLE "SalesAffiliated" ADD CONSTRAINT "SalesAffiliated_AffiliatedId_fkey" FOREIGN KEY ("AffiliatedId") REFERENCES "Affiliated"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
