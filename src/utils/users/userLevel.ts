import {
  getCharacterExpNeeded,
  getCharacterTotalExpNeeded,
} from '../characters/characterLevel';
import { getLevel } from 'src/utils/getLevel';

export function getUserLevel(totalExp: number) {
  return getLevel(totalExp, 75, 187.5, 37.5);
}

export function getUserExpNeeded(level: number) {
  return 3 * getCharacterExpNeeded(level);
}

export function getUserTotalExpNeeded(level: number) {
  return 3 * getCharacterTotalExpNeeded(level);
}
