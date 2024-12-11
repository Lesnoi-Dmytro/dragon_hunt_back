/*
  Warnings:

  - You are about to drop the column `defense` on the `CombatEntity` table. All the data in the column will be lost.
  - You are about to drop the column `defense` on the `Entity` table. All the data in the column will be lost.
  - Added the required column `defence` to the `CombatEntity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defence` to the `Entity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CombatEntity" DROP COLUMN "defense",
ADD COLUMN     "defence" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Entity" DROP COLUMN "defense",
ADD COLUMN     "defence" INTEGER NOT NULL;
