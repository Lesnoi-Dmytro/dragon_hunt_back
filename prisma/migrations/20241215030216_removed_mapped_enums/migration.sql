/*
  Warnings:

  - The values [Action,Attack,Defend,Careful Step,Special Action] on the enum `Action` will be removed. If these variants are still used in the database, this will fail.
  - The values [Enemy,Ally,Field] on the enum `ActionTarget` will be removed. If these variants are still used in the database, this will fail.
  - The values [Imidiate,Reaction,Turn End,Next Turn] on the enum `ActionTrigger` will be removed. If these variants are still used in the database, this will fail.
  - The values [Equipment,Resources] on the enum `BattleType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Warrior,Mage,Rogue] on the enum `CharacterClass` will be removed. If these variants are still used in the database, this will fail.
  - The values [Melee,Ranged] on the enum `WeaponType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Action_new" AS ENUM ('DASH', 'ATTACK', 'DEFEND', 'CAREFULL_STEP', 'SPECIAL_ACTION');
ALTER TABLE "CombatEntity" ALTER COLUMN "action" TYPE "Action_new" USING ("action"::text::"Action_new");
ALTER TYPE "Action" RENAME TO "Action_old";
ALTER TYPE "Action_new" RENAME TO "Action";
DROP TYPE "Action_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ActionTarget_new" AS ENUM ('ENEMY', 'ALLY', 'FIELD');
ALTER TABLE "WeaponAction" ALTER COLUMN "target" TYPE "ActionTarget_new" USING ("target"::text::"ActionTarget_new");
ALTER TYPE "ActionTarget" RENAME TO "ActionTarget_old";
ALTER TYPE "ActionTarget_new" RENAME TO "ActionTarget";
DROP TYPE "ActionTarget_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ActionTrigger_new" AS ENUM ('IMIDIATE', 'REACTION', 'TURN_END', 'NEXT_TURN');
ALTER TABLE "WeaponAction" ALTER COLUMN "trigger" TYPE "ActionTrigger_new" USING ("trigger"::text::"ActionTrigger_new");
ALTER TYPE "ActionTrigger" RENAME TO "ActionTrigger_old";
ALTER TYPE "ActionTrigger_new" RENAME TO "ActionTrigger";
DROP TYPE "ActionTrigger_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "BattleType_new" AS ENUM ('EQUIPMENT', 'RESOURCES');
ALTER TABLE "Battle" ALTER COLUMN "type" TYPE "BattleType_new" USING ("type"::text::"BattleType_new");
ALTER TYPE "BattleType" RENAME TO "BattleType_old";
ALTER TYPE "BattleType_new" RENAME TO "BattleType";
DROP TYPE "BattleType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "CharacterClass_new" AS ENUM ('WARRIOR', 'MAGE', 'ROGUE');
ALTER TABLE "Character" ALTER COLUMN "class" TYPE "CharacterClass_new" USING ("class"::text::"CharacterClass_new");
ALTER TABLE "WeaponTemplate" ALTER COLUMN "character" TYPE "CharacterClass_new" USING ("character"::text::"CharacterClass_new");
ALTER TABLE "ArmorTemplate" ALTER COLUMN "character" TYPE "CharacterClass_new" USING ("character"::text::"CharacterClass_new");
ALTER TYPE "CharacterClass" RENAME TO "CharacterClass_old";
ALTER TYPE "CharacterClass_new" RENAME TO "CharacterClass";
DROP TYPE "CharacterClass_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WeaponType_new" AS ENUM ('MELEE', 'RANGED');
ALTER TABLE "WeaponTemplate" ALTER COLUMN "type" TYPE "WeaponType_new" USING ("type"::text::"WeaponType_new");
ALTER TYPE "WeaponType" RENAME TO "WeaponType_old";
ALTER TYPE "WeaponType_new" RENAME TO "WeaponType";
DROP TYPE "WeaponType_old";
COMMIT;
