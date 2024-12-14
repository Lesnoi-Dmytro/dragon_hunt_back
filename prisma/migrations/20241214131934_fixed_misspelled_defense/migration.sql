/*
  Warnings:

  - You are about to drop the column `defence` on the `Armor` table. All the data in the column will be lost.
  - You are about to drop the column `defenceGrows` on the `Armor` table. All the data in the column will be lost.
  - You are about to drop the column `defence` on the `CombatEnemy` table. All the data in the column will be lost.
  - You are about to drop the column `defence` on the `Entity` table. All the data in the column will be lost.
  - Added the required column `defense` to the `Armor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defenseGrows` to the `Armor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defense` to the `CombatEnemy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defense` to the `Entity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Armor" DROP COLUMN "defence",
DROP COLUMN "defenceGrows",
ADD COLUMN     "defense" INTEGER NOT NULL,
ADD COLUMN     "defenseGrows" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CombatEnemy" DROP COLUMN "defence",
ADD COLUMN     "defense" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Entity" DROP COLUMN "defence",
ADD COLUMN     "defense" INTEGER NOT NULL;
