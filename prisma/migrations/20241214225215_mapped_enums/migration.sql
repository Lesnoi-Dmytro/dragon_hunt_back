/*
  Warnings:

  - The values [DASH,ATTACK,DEFEND,DISENGAGE,PREPARE] on the enum `Action` will be removed. If these variants are still used in the database, this will fail.
  - The values [ENEMY,ALLY,FIELD] on the enum `ActionTarget` will be removed. If these variants are still used in the database, this will fail.
  - The values [IMIDIATE,REACTION,BUFF,DEBUFF,FIELD,TURN_END,NEXT_TURN] on the enum `ActionType` will be removed. If these variants are still used in the database, this will fail.
  - The values [EQUIPMENT,RESOURCES] on the enum `BattleType` will be removed. If these variants are still used in the database, this will fail.
  - The values [WARRIOR,MAGE,ROGUE] on the enum `CharacterClass` will be removed. If these variants are still used in the database, this will fail.
  - The values [RANGED,MELEE] on the enum `WeaponType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Action_new" AS ENUM ('Action', 'Attack', 'Defend', 'Careful Step', 'Special Action');
ALTER TABLE "CombatEntity" ALTER COLUMN "action" TYPE "Action_new" USING ("action"::text::"Action_new");
ALTER TYPE "Action" RENAME TO "Action_old";
ALTER TYPE "Action_new" RENAME TO "Action";
DROP TYPE "Action_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ActionTarget_new" AS ENUM ('Enemy', 'Ally', 'Field');
ALTER TABLE "WeaponAction" ALTER COLUMN "target" TYPE "ActionTarget_new" USING ("target"::text::"ActionTarget_new");
ALTER TYPE "ActionTarget" RENAME TO "ActionTarget_old";
ALTER TYPE "ActionTarget_new" RENAME TO "ActionTarget";
DROP TYPE "ActionTarget_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ActionType_new" AS ENUM ('Imidiate', 'Reaction', 'Buff', 'Debuff', 'Heal', 'Field', 'Turn End', 'Next Turn');
ALTER TABLE "WeaponAction" ALTER COLUMN "type" TYPE "ActionType_new" USING ("type"::text::"ActionType_new");
ALTER TYPE "ActionType" RENAME TO "ActionType_old";
ALTER TYPE "ActionType_new" RENAME TO "ActionType";
DROP TYPE "ActionType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "BattleType_new" AS ENUM ('Equipment', 'Resources');
ALTER TABLE "Battle" ALTER COLUMN "type" TYPE "BattleType_new" USING ("type"::text::"BattleType_new");
ALTER TYPE "BattleType" RENAME TO "BattleType_old";
ALTER TYPE "BattleType_new" RENAME TO "BattleType";
DROP TYPE "BattleType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "CharacterClass_new" AS ENUM ('Warrior', 'Mage', 'Rogue');
ALTER TABLE "Character" ALTER COLUMN "class" TYPE "CharacterClass_new" USING ("class"::text::"CharacterClass_new");
ALTER TABLE "Weapon" ALTER COLUMN "character" TYPE "CharacterClass_new" USING ("character"::text::"CharacterClass_new");
ALTER TABLE "Armor" ALTER COLUMN "character" TYPE "CharacterClass_new" USING ("character"::text::"CharacterClass_new");
ALTER TYPE "CharacterClass" RENAME TO "CharacterClass_old";
ALTER TYPE "CharacterClass_new" RENAME TO "CharacterClass";
DROP TYPE "CharacterClass_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WeaponType_new" AS ENUM ('Melee', 'Ranged');
ALTER TABLE "Weapon" ALTER COLUMN "type" TYPE "WeaponType_new" USING ("type"::text::"WeaponType_new");
ALTER TYPE "WeaponType" RENAME TO "WeaponType_old";
ALTER TYPE "WeaponType_new" RENAME TO "WeaponType";
DROP TYPE "WeaponType_old";
COMMIT;
