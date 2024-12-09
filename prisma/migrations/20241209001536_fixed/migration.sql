/*
  Warnings:

  - You are about to drop the column `buttlePoints` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "buttlePoints",
ADD COLUMN     "battlePoints" INTEGER NOT NULL DEFAULT 100;
