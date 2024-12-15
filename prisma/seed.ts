import { PrismaClient } from '@prisma/client';
import addapt from 'prisma/seed/addaptToChanges';
import seedImages from 'prisma/seed/seedImages';
import seedWeaponActions from 'prisma/seed/seedWeaponActions';
import seedWeapon from 'prisma/seed/seedWeapon';
import seedArmor from 'prisma/seed/seedArmor';
import seedEnemies from 'prisma/seed/seedEnemies';
import seedBattles from 'prisma/seed/seedBattles';

const prisma = new PrismaClient();

export const SEED_ID = 1;

async function main() {
  console.log('Starting seeding...\n');

  await addapt(prisma);
  await seedImages(prisma);
  await seedWeaponActions(prisma);
  await seedWeapon(prisma);
  await seedArmor(prisma);
  await seedEnemies(prisma);
  await seedBattles(prisma);

  console.log('Seed succesfully completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
