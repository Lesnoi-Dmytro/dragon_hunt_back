/*
  Warnings:

  - You are about to drop the column `size` on the `Combat` table. All the data in the column will be lost.
  - Added the required column `xSize` to the `Combat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ySize` to the `Combat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CombatEntity" DROP CONSTRAINT "CombatEntity_characterId_fkey";

-- AlterTable
ALTER TABLE "Combat" DROP COLUMN "size",
ADD COLUMN     "xSize" INTEGER NOT NULL,
ADD COLUMN     "ySize" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CombatEntity" ADD CONSTRAINT "CombatEntity_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
