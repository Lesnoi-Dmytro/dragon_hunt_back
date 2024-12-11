import { PrismaClient } from '@prisma/client';
import addapt from './seed/addaptToChanges';
import { seedImages } from './seed/seedImages';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  await addapt(prisma);
  await seedImages(prisma);
  // await seedEnemies(prisma);
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
