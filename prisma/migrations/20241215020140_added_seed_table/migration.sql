-- AlterTable
ALTER TABLE "User" ALTER COLUMN "energy" SET DEFAULT 15;

-- CreateTable
CREATE TABLE "DBSeed" (
    "id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DBSeed_pkey" PRIMARY KEY ("id")
);
