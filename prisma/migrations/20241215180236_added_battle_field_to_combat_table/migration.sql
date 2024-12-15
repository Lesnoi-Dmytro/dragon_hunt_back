-- AlterTable
ALTER TABLE "Combat" ADD COLUMN     "battleId" INTEGER;

-- AddForeignKey
ALTER TABLE "Combat" ADD CONSTRAINT "Combat_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
