/*
  Warnings:

  - You are about to drop the column `recoverAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "recoverAt",
ADD COLUMN     "recoverStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Battlefield" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Battlefield_pkey" PRIMARY KEY ("id")
);
