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
  console.log('\nCurrent seed id:', SEED_ID);
  console.log('Checking last db seed id...');

  const lastSeedId =
    (
      await prisma.dBSeed.aggregate({
        _max: {
          id: true,
        },
      })
    )._max.id || 0;

  console.log('Last db seed id:', lastSeedId);

  if (lastSeedId === SEED_ID) {
    console.log('DB is up to date');
    return;
  } else {
    console.log('\nStarting seeding...\n');
  }

  await addapt(prisma, lastSeedId);
  await seedImages(prisma, lastSeedId);
  await seedWeaponActions(prisma, lastSeedId);
  await seedWeapon(prisma, lastSeedId);
  await seedArmor(prisma, lastSeedId);
  await seedEnemies(prisma, lastSeedId);
  await seedBattles(prisma, lastSeedId);

  await prisma.dBSeed.create({
    data: {
      id: SEED_ID,
    },
  });

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
