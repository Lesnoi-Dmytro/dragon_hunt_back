-- CreateEnum
CREATE TYPE "CharacterClass" AS ENUM ('WARRIOR', 'MAGE', 'ROGUE');

-- CreateEnum
CREATE TYPE "WeaponType" AS ENUM ('RANGED', 'MELEE');

-- CreateEnum
CREATE TYPE "ActionTrigger" AS ENUM ('IMIDIATE', 'REACTION', 'TURN_END', 'NEXT_TURN');

-- CreateEnum
CREATE TYPE "BattleType" AS ENUM ('EQUIPMENT', 'RESOURCES');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('DASH', 'ATTACK', 'DEFEND', 'DISENGAGE', 'PREPARE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "gold" INTEGER NOT NULL DEFAULT 100,
    "energy" INTEGER NOT NULL DEFAULT 5,
    "recoverStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "battlePoints" INTEGER NOT NULL DEFAULT 100,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "combatRating" INTEGER NOT NULL DEFAULT 300,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntityInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageId" INTEGER NOT NULL,
    "entityId" INTEGER,

    CONSTRAINT "EntityInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "hp" INTEGER NOT NULL,
    "defence" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "class" "CharacterClass" NOT NULL,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "entityId" INTEGER,
    "weaponId" INTEGER NOT NULL,
    "armorId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "WeaponType" NOT NULL,
    "character" "CharacterClass" NOT NULL,
    "attack" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "attackRange" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL,
    "attackGrows" INTEGER NOT NULL,
    "actionId" INTEGER,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponAction" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "trigger" "ActionTrigger" NOT NULL,

    CONSTRAINT "WeaponAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armor" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "character" "CharacterClass" NOT NULL,
    "defence" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL,
    "defenceGrows" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "Armor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enemy" (
    "id" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "gold" INTEGER NOT NULL,
    "exp" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "entityId" INTEGER NOT NULL,

    CONSTRAINT "Enemy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Battle" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "BattleType" NOT NULL,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattleOpponent" (
    "battleId" INTEGER NOT NULL,
    "enemyId" INTEGER NOT NULL,

    CONSTRAINT "BattleOpponent_pkey" PRIMARY KEY ("battleId","enemyId")
);

-- CreateTable
CREATE TABLE "Combat" (
    "id" SERIAL NOT NULL,
    "round" INTEGER NOT NULL,
    "lastTurn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Combat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatEntity" (
    "id" SERIAL NOT NULL,
    "currentHp" INTEGER NOT NULL,
    "movement" INTEGER NOT NULL,
    "action" "Action",
    "reaction" BOOLEAN NOT NULL DEFAULT false,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "characterId" INTEGER,
    "enemyId" INTEGER,
    "combatId" INTEGER NOT NULL,

    CONSTRAINT "CombatEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatEnemy" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "defence" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "gold" INTEGER NOT NULL,
    "exp" INTEGER NOT NULL,
    "entityInfoId" INTEGER NOT NULL,

    CONSTRAINT "CombatEnemy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EntityInfo_entityId_key" ON "EntityInfo"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Character_entityId_key" ON "Character"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Enemy_entityId_key" ON "Enemy"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "CombatEntity_characterId_key" ON "CombatEntity"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "CombatEntity_enemyId_key" ON "CombatEntity"("enemyId");

-- AddForeignKey
ALTER TABLE "EntityInfo" ADD CONSTRAINT "EntityInfo_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntityInfo" ADD CONSTRAINT "EntityInfo_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_armorId_fkey" FOREIGN KEY ("armorId") REFERENCES "Armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "WeaponAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Armor" ADD CONSTRAINT "Armor_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enemy" ADD CONSTRAINT "Enemy_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleOpponent" ADD CONSTRAINT "BattleOpponent_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleOpponent" ADD CONSTRAINT "BattleOpponent_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatEntity" ADD CONSTRAINT "CombatEntity_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatEntity" ADD CONSTRAINT "CombatEntity_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "CombatEnemy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatEntity" ADD CONSTRAINT "CombatEntity_combatId_fkey" FOREIGN KEY ("combatId") REFERENCES "Combat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatEnemy" ADD CONSTRAINT "CombatEnemy_entityInfoId_fkey" FOREIGN KEY ("entityInfoId") REFERENCES "EntityInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
