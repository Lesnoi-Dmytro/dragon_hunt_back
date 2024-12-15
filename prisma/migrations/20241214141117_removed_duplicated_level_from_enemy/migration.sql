/*
  Warnings:

  - You are about to drop the column `level` on the `Enemy` table. All the data in the column will be lost.
  - Added the required column `size` to the `Combat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Combat" ADD COLUMN     "size" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Enemy" DROP COLUMN "level";
