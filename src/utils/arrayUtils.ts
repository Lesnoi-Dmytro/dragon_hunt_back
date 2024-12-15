export function randomFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * (array.length - 1))];
}

export function removeRandomFromArray<T>(array: T[]): T {
  const index = Math.floor(Math.random() * (array.length - 1));
  const item = array[index];
  array.splice(index, 1);
  return item;
}
