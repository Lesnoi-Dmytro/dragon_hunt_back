-- AlterTable
ALTER TABLE "WeaponAction" ADD COLUMN     "cooldown" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "spread" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "SpecialActions" (
    "combatEntityId" INTEGER NOT NULL,
    "weaponId" INTEGER NOT NULL,
    "turn" INTEGER NOT NULL,

    CONSTRAINT "SpecialActions_pkey" PRIMARY KEY ("combatEntityId","weaponId")
);

-- AddForeignKey
ALTER TABLE "SpecialActions" ADD CONSTRAINT "SpecialActions_combatEntityId_fkey" FOREIGN KEY ("combatEntityId") REFERENCES "CombatEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialActions" ADD CONSTRAINT "SpecialActions_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
