export const jwtConstants = {
  secret: process.env.AUTH_SECRET,
};

export const ENERGY_RECOVERY_TIME =
  Number(process.env.ENERGY_RECOVERY_TIME) || 1000 * 60 * 5;

export const MAX_ENERGY = 15;

export const X_SIZE = 16;
export const Y_SIZE = 10;
