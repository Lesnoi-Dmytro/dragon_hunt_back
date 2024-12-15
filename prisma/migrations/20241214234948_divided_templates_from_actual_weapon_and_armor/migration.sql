/*
  Warnings:

  - You are about to drop the column `character` on the `Armor` table. All the data in the column will be lost.
  - You are about to drop the column `defense` on the `Armor` table. All the data in the column will be lost.
  - You are about to drop the column `defenseGrows` on the `Armor` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Armor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Armor` table. All the data in the column will be lost.
  - You are about to drop the column `quality` on the `Armor` table. All the data in the column will be lost.
  - You are about to drop the column `speed` on the `Armor` table. All the data in the column will be lost.
  - You are about to drop the column `actionId` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `attackGrows` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `attackRange` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `character` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `speed` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Weapon` table. All the data in the column will be lost.
  - Added the required column `level` to the `Weapon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Armor" DROP CONSTRAINT "Armor_imageId_fkey";

-- DropForeignKey
ALTER TABLE "SpecialActions" DROP CONSTRAINT "SpecialActions_weaponId_fkey";

-- DropForeignKey
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_actionId_fkey";

-- DropForeignKey
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_imageId_fkey";

-- AlterTable
ALTER TABLE "Armor" DROP COLUMN "character",
DROP COLUMN "defense",
DROP COLUMN "defenseGrows",
DROP COLUMN "imageId",
DROP COLUMN "name",
DROP COLUMN "quality",
DROP COLUMN "speed";

-- AlterTable
ALTER TABLE "Weapon" DROP COLUMN "actionId",
DROP COLUMN "attackGrows",
DROP COLUMN "attackRange",
DROP COLUMN "character",
DROP COLUMN "imageId",
DROP COLUMN "name",
DROP COLUMN "speed",
DROP COLUMN "type",
ADD COLUMN     "level" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "WeaponTemplate" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "WeaponType" NOT NULL,
    "character" "CharacterClass" NOT NULL,
    "attack" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "attackRange" INTEGER NOT NULL,
    "attackGrows" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "WeaponTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArmorTemplate" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "character" "CharacterClass" NOT NULL,
    "defense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL,
    "defenseGrows" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "ArmorTemplate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeaponTemplate" ADD CONSTRAINT "WeaponTemplate_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "WeaponAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponTemplate" ADD CONSTRAINT "WeaponTemplate_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArmorTemplate" ADD CONSTRAINT "ArmorTemplate_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialActions" ADD CONSTRAINT "SpecialActions_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "WeaponTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
