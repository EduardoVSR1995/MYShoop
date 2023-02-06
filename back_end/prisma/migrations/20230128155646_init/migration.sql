-- CreateTable
CREATE TABLE "Publi" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "ProductId" INTEGER NOT NULL,

    CONSTRAINT "Publi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Publi" ADD CONSTRAINT "Publi_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
