import { getCharacterExpNeeded } from '../characters/characterLevel';

export function getUserExpNeeded(level: number) {
  return 3 * getCharacterExpNeeded(level);
}
