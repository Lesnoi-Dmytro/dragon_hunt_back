/*
  Warnings:

  - The primary key for the `SpecialActions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `weaponId` on the `SpecialActions` table. All the data in the column will be lost.
  - Changed the type of `type` on the `WeaponTemplate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AttackType" AS ENUM ('MELEE', 'RANGED');

-- DropForeignKey
ALTER TABLE "SpecialActions" DROP CONSTRAINT "SpecialActions_weaponId_fkey";

-- AlterTable
ALTER TABLE "Combat" ALTER COLUMN "round" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Enemy" ADD COLUMN     "type" "AttackType" NOT NULL DEFAULT 'MELEE';

-- AlterTable
ALTER TABLE "SpecialActions" DROP CONSTRAINT "SpecialActions_pkey",
DROP COLUMN "weaponId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SpecialActions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "WeaponTemplate" DROP COLUMN "type",
ADD COLUMN     "type" "AttackType" NOT NULL;

-- DropEnum
DROP TYPE "WeaponType";
