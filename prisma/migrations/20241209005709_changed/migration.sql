/*
  Warnings:

  - You are about to drop the column `level` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `fullRegen` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "level";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fullRegen",
DROP COLUMN "level",
ADD COLUMN     "recoverAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
