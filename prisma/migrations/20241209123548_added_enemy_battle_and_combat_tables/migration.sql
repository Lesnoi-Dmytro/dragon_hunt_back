/*
  Warnings:

  - You are about to drop the column `level` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the `Battlefield` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[entityId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "BattleType" AS ENUM ('ITEMS', 'RESOURCES');

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "level",
ADD COLUMN     "entityId" INTEGER;

-- DropTable
DROP TABLE "Battlefield";

-- CreateTable
CREATE TABLE "EntityInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "EntityInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "hp" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "entityInfoId" INTEGER NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enemy" (
    "id" SERIAL NOT NULL,
    "gold" INTEGER NOT NULL,
    "exp" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "entityId" INTEGER NOT NULL,

    CONSTRAINT "Enemy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Battle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "type" "BattleType" NOT NULL,
    "enemies" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Combat" (
    "id" SERIAL NOT NULL,
    "starterAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "round" INTEGER NOT NULL,
    "lastTurn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Combat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatEntity" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "currentHp" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "tookTurn" BOOLEAN NOT NULL DEFAULT false,
    "entiryInfoId" INTEGER NOT NULL,
    "combatId" INTEGER NOT NULL,

    CONSTRAINT "CombatEntity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entity_entityInfoId_key" ON "Entity"("entityInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Enemy_entityId_key" ON "Enemy"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Character_entityId_key" ON "Character"("entityId");

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_entityInfoId_fkey" FOREIGN KEY ("entityInfoId") REFERENCES "EntityInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enemy" ADD CONSTRAINT "Enemy_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatEntity" ADD CONSTRAINT "CombatEntity_entiryInfoId_fkey" FOREIGN KEY ("entiryInfoId") REFERENCES "EntityInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatEntity" ADD CONSTRAINT "CombatEntity_combatId_fkey" FOREIGN KEY ("combatId") REFERENCES "Combat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
