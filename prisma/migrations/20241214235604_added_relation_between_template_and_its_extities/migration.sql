/*
  Warnings:

  - Added the required column `defense` to the `Armor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Armor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quality` to the `Armor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `templateId` to the `Armor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `templateId` to the `Weapon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Armor" ADD COLUMN     "defense" INTEGER NOT NULL,
ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "quality" INTEGER NOT NULL,
ADD COLUMN     "templateId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Weapon" ADD COLUMN     "templateId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "WeaponTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Armor" ADD CONSTRAINT "Armor_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ArmorTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
