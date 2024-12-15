/*
  Warnings:

  - You are about to drop the column `trigger` on the `WeaponAction` table. All the data in the column will be lost.
  - Added the required column `range` to the `WeaponAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `WeaponAction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('IMIDIATE', 'REACTION', 'BUFF', 'DEBUFF', 'FIELD', 'TURN_END', 'NEXT_TURN');

-- AlterTable
ALTER TABLE "WeaponAction" DROP COLUMN "trigger",
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "range" INTEGER NOT NULL,
ADD COLUMN     "type" "ActionType" NOT NULL;

-- DropEnum
DROP TYPE "ActionTrigger";
