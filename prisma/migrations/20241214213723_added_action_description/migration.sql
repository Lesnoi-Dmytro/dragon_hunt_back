/*
  Warnings:

  - Made the column `actionId` on table `Weapon` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `WeaponAction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_actionId_fkey";

-- AlterTable
ALTER TABLE "Weapon" ALTER COLUMN "actionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "WeaponAction" ADD COLUMN     "description" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "WeaponAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
