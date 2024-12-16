/*
  Warnings:

  - You are about to drop the column `entityInfoId` on the `CombatEnemy` table. All the data in the column will be lost.
  - Added the required column `enemyId` to the `CombatEnemy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CombatEnemy" DROP CONSTRAINT "CombatEnemy_entityInfoId_fkey";

-- AlterTable
ALTER TABLE "CombatEnemy" DROP COLUMN "entityInfoId",
ADD COLUMN     "enemyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CombatEnemy" ADD CONSTRAINT "CombatEnemy_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
