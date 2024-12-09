import cubicSolve from 'src/utils/cubicSolve';

export function getLevel(totalExp: number, a: number, b: number, c: number) {
  const level =
    1 +
    Math.floor(
      cubicSolve(a, b, c, -totalExp).find(
        (root) => root.i === 0 && root.real > 0,
      )?.real || 1,
    );

  if (totalExp >= getTotalExpNeeded(level, a, b, c)) {
    return level + 1;
  }

  return level;
}

export function getTotalExpNeeded(
  level: number,
  a: number,
  b: number,
  c: number,
) {
  return Math.ceil(a * level ** 3 + b * level ** 2 + c * level);
}
