import { getLevel, getTotalExpNeeded } from '../getLevel';

export function getCharacterLevel(exp: number): number {
  return getLevel(exp, 25, 62.5, 12.5);
}

export function getCharacterExp(totalExp: number, level: number) {
  return totalExp - getCharacterTotalExpNeeded(level - 1);
}

export function getCharacterExpNeeded(level: number) {
  return Math.ceil(75 * level ** 2 + level * 50 - 25);
}

export function getCharacterTotalExpNeeded(level: number) {
  return getTotalExpNeeded(level, 25, 62.5, 12.5);
}
