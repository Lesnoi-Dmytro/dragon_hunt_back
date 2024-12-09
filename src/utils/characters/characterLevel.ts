export function getCharacterExpNeeded(level: number) {
  return Math.ceil(75 * level ** 2 + level * 50 - 25);
}
