-- DropIndex
DROP INDEX "Addres_id_key";

-- DropIndex
DROP INDEX "PayMent_id_key";

-- AlterTable
CREATE SEQUENCE "addres_id_seq";
ALTER TABLE "Addres" ALTER COLUMN "id" SET DEFAULT nextval('addres_id_seq'),
ADD CONSTRAINT "Addres_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE "addres_id_seq" OWNED BY "Addres"."id";

-- AlterTable
CREATE SEQUENCE "payment_id_seq";
ALTER TABLE "PayMent" ALTER COLUMN "id" SET DEFAULT nextval('payment_id_seq'),
ADD CONSTRAINT "PayMent_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE "payment_id_seq" OWNED BY "PayMent"."id";
