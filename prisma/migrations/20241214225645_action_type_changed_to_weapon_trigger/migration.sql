/*
  Warnings:

  - You are about to drop the column `type` on the `WeaponAction` table. All the data in the column will be lost.
  - Added the required column `trigger` to the `WeaponAction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActionTrigger" AS ENUM ('Imidiate', 'Reaction', 'Turn End', 'Next Turn');

-- AlterTable
ALTER TABLE "WeaponAction" DROP COLUMN "type",
ADD COLUMN     "trigger" "ActionTrigger" NOT NULL;

-- DropEnum
DROP TYPE "ActionType";
