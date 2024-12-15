/*
  Warnings:

  - Added the required column `target` to the `WeaponAction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActionTarget" AS ENUM ('ENEMY', 'ALLY', 'FIELD');

-- AlterTable
ALTER TABLE "WeaponAction" ADD COLUMN     "target" "ActionTarget" NOT NULL,
ALTER COLUMN "cooldown" SET DEFAULT 0;
