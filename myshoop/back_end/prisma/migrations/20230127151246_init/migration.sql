-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "nameStore" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "urlImage" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Affiliated" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "cellPhone" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Affiliated_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UrlImage" (
    "id" SERIAL NOT NULL,
    "ProductId" INTEGER NOT NULL,
    "urlImage" TEXT NOT NULL,

    CONSTRAINT "UrlImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "packingSize" TEXT[],
    "StoreId" INTEGER NOT NULL,
    "CategoriId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categori" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bougth" (
    "id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "ProductId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bougth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addres" (
    "cep" INTEGER NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "street" INTEGER NOT NULL,
    "postOfficeCode" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Addres_street_key" ON "Addres"("street");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affiliated" ADD CONSTRAINT "Affiliated_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UrlImage" ADD CONSTRAINT "UrlImage_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_CategoriId_fkey" FOREIGN KEY ("CategoriId") REFERENCES "Categori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_StoreId_fkey" FOREIGN KEY ("StoreId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bougth" ADD CONSTRAINT "Bougth_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bougth" ADD CONSTRAINT "Bougth_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addres" ADD CONSTRAINT "Addres_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
