/*
  Warnings:

  - You are about to drop the column `enemies` on the `Battle` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `Enemy` table. All the data in the column will be lost.
  - You are about to drop the column `entityInfoId` on the `Entity` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `EntityInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[entityInfoId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[entityInfoId]` on the table `Enemy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[entityId]` on the table `EntityInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entityInfoId` to the `Enemy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `EntityInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_entityId_fkey";

-- DropForeignKey
ALTER TABLE "Enemy" DROP CONSTRAINT "Enemy_entityId_fkey";

-- DropForeignKey
ALTER TABLE "Entity" DROP CONSTRAINT "Entity_entityInfoId_fkey";

-- DropIndex
DROP INDEX "Character_entityId_key";

-- DropIndex
DROP INDEX "Enemy_entityId_key";

-- DropIndex
DROP INDEX "Entity_entityInfoId_key";

-- AlterTable
ALTER TABLE "Battle" DROP COLUMN "enemies";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "entityId",
ADD COLUMN     "entityInfoId" INTEGER;

-- AlterTable
ALTER TABLE "Enemy" DROP COLUMN "entityId",
ADD COLUMN     "entityInfoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Entity" DROP COLUMN "entityInfoId";

-- AlterTable
ALTER TABLE "EntityInfo" DROP COLUMN "image",
ADD COLUMN     "entityId" INTEGER,
ADD COLUMN     "imageId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattleOpponent" (
    "battleId" INTEGER NOT NULL,
    "enemyId" INTEGER NOT NULL,

    CONSTRAINT "BattleOpponent_pkey" PRIMARY KEY ("battleId","enemyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_entityInfoId_key" ON "Character"("entityInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Enemy_entityInfoId_key" ON "Enemy"("entityInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "EntityInfo_entityId_key" ON "EntityInfo"("entityId");

-- AddForeignKey
ALTER TABLE "EntityInfo" ADD CONSTRAINT "EntityInfo_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntityInfo" ADD CONSTRAINT "EntityInfo_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_entityInfoId_fkey" FOREIGN KEY ("entityInfoId") REFERENCES "EntityInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enemy" ADD CONSTRAINT "Enemy_entityInfoId_fkey" FOREIGN KEY ("entityInfoId") REFERENCES "EntityInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleOpponent" ADD CONSTRAINT "BattleOpponent_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleOpponent" ADD CONSTRAINT "BattleOpponent_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
