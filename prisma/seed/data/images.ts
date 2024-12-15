import { Image, Prisma } from '@prisma/client';
import SeedData from 'prisma/seed/types/seedData';

export const characterImages = new Map<
  string,
  SeedData<Prisma.ImageCreateInput>
>([
  [
    'warrior',
    {
      data: {
        id: 1,
        image: '1S9vEa8xkLEIVTcG0upt7dx2LwToZtYo3',
      },
      seedId: 1,
    },
  ],
  [
    'mage',
    {
      data: {
        id: 2,
        image: '1vkxmkzTP-0QjHu9GILTz-T65wD4AfZya',
      },
      seedId: 1,
    },
  ],
  [
    'rogue',
    {
      data: {
        id: 3,
        image: '1p3sdatYK56ZIDU56nH_MiCI3dSg2ElP0',
      },
      seedId: 1,
    },
  ],
]);

export const weaponImages = new Map<string, SeedData<Prisma.ImageCreateInput>>([
  [
    'sword',
    {
      data: {
        id: 2001,
        image: '12MMRKPKwNsGwPFFyFtDnYAu-FDJwqKBi',
      },
      seedId: 1,
    },
  ],
  [
    'staff',
    {
      data: {
        id: 2002,
        image: '1PHdtaJL223lIq-6qIxxi0hVavjMnwtLA',
      },
      seedId: 1,
    },
  ],
  [
    'bow',
    {
      data: {
        id: 2003,
        image: '1JsEaVV7lScP45BntVR5daXTpWzTvJXCB',
      },
      seedId: 1,
    },
  ],
]);

export const armorImages = new Map<string, SeedData<Prisma.ImageCreateInput>>([
  [
    'armor',
    {
      data: {
        id: 4001,
        image: '1_iB5_jXD0tadrWtoFqc4twTTwOfbtVTb',
      },
      seedId: 1,
    },
  ],
]);

export const enemyImages = new Map<string, SeedData<Image>>([
  [
    'anaconda',
    {
      data: {
        id: 6001,
        image: '1ocGs1nurHKNCnWHHpd1qbKT-WFIB2xJQ',
      },
      seedId: 1,
    },
  ],
  [
    'jumping_spider',
    {
      data: {
        id: 6002,
        image: '1QI9MDTK-T2S-5xbZOjQRb6yb-60CkGtP',
      },
      seedId: 1,
    },
  ],
  [
    'black_widow',
    {
      data: {
        id: 6003,
        image: '1qu8ldwN5Nw4IGpsI878rXpiM7GQV-LDD',
      },
      seedId: 1,
    },
  ],
  [
    'bandit',
    {
      data: {
        id: 6004,
        image: '1ytynIaxwn3vVuM8vhUPT15rHKdMXEkaG',
      },
      seedId: 1,
    },
  ],
  [
    'bow_bandit',
    {
      data: {
        id: 6005,
        image: '17i1fq-fi5EwL9qy1xTsFTFmdOBOjPugT',
      },
      seedId: 1,
    },
  ],
  [
    'bandit_leader',
    {
      data: {
        id: 6006,
        image: '1sbRQ_DjHQ84xIVIAvbk7NjYt8mFhZB7_',
      },
      seedId: 1,
    },
  ],
  [
    'rebel_knight',
    {
      data: {
        id: 6007,
        image: '1thHT-mh4p6sHdeSWaXO6FIY3X1VgBtJB',
      },
      seedId: 1,
    },
  ],
  [
    'rebel_general',
    {
      data: {
        id: 6008,
        image: '178pVKzOrDBav1kVi9LH4n-hYogypOIOt',
      },
      seedId: 1,
    },
  ],
]);
