/*
  Warnings:

  - Added the required column `level` to the `Battle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Battle" ADD COLUMN     "level" INTEGER NOT NULL;
