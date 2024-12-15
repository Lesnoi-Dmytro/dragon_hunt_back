-- DropForeignKey
ALTER TABLE "Armor" DROP CONSTRAINT "Armor_templateId_fkey";

-- DropForeignKey
ALTER TABLE "BattleOpponent" DROP CONSTRAINT "BattleOpponent_battleId_fkey";

-- DropForeignKey
ALTER TABLE "BattleOpponent" DROP CONSTRAINT "BattleOpponent_enemyId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_userId_fkey";

-- DropForeignKey
ALTER TABLE "CombatEntity" DROP CONSTRAINT "CombatEntity_combatId_fkey";

-- DropForeignKey
ALTER TABLE "EntityInfo" DROP CONSTRAINT "EntityInfo_entityId_fkey";

-- DropForeignKey
ALTER TABLE "SpecialActions" DROP CONSTRAINT "SpecialActions_combatEntityId_fkey";

-- DropForeignKey
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_templateId_fkey";

-- AddForeignKey
ALTER TABLE "EntityInfo" ADD CONSTRAINT "EntityInfo_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "WeaponTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Armor" ADD CONSTRAINT "Armor_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ArmorTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleOpponent" ADD CONSTRAINT "BattleOpponent_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleOpponent" ADD CONSTRAINT "BattleOpponent_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatEntity" ADD CONSTRAINT "CombatEntity_combatId_fkey" FOREIGN KEY ("combatId") REFERENCES "Combat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialActions" ADD CONSTRAINT "SpecialActions_combatEntityId_fkey" FOREIGN KEY ("combatEntityId") REFERENCES "CombatEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
