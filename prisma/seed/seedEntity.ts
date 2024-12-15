import SeedData from 'prisma/seed/types/seedData';

export default async function seedEntity<Model, CreateInput>(
  name: string,
  entityData: Iterable<[string, SeedData<CreateInput>]>,
  tag: (data: CreateInput) => number | string,
  findExisting: (data: CreateInput) => Promise<Model>,
  create: (data: CreateInput) => Promise<Model>,
  update: (data: CreateInput) => Promise<Model>,
  lastSeedId: number,
) {
  console.log(`Seeding ${name} table...`);

  try {
    for (const dataEntry of entityData) {
      const entryName = dataEntry[0];
      const seedId = dataEntry[1].seedId;
      const data = dataEntry[1].data;
      const dataTag = String(tag(data));

      const existing = await findExisting(data);

      if (!existing) {
        await create(data);
        console.log(`${dataTag} - ${entryName}: ${name} created`);
      } else if (seedId > lastSeedId) {
        await update(data);
        console.log(`${dataTag} - ${entryName}: ${name} updated`);
      } else {
        console.log(`${dataTag} - ${entryName}: ${name} already exists`);
      }
    }

    console.log(`Seeding ${name} table successfully completed.\n`);
  } catch (error) {
    console.error(`Error seeding ${name} table: `, error);
    throw error;
  }
}
