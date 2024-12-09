import { Character } from '@prisma/client';
import { getUserTotalExpNeeded } from './userLevel';

export function getUserTotalExp(characters: Partial<Character>[]) {
  return characters.reduce((acc, cur) => acc + cur.exp, 0);
}

export function getUserExp(toatlExp: number, level: number) {
  return toatlExp - getUserTotalExpNeeded(level - 1);
}
