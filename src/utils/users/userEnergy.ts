import { EnergyInfo } from 'src/types/users/MyInfo';

export const ENERGY_RECOVERY_TIME =
  Number(process.env.ENERGY_RECOVERY_TIME) || 1000 * 60 * 5;

export const MAX_ENERGY = 5;

export function getUserEnergy(energy: number, recoverAt: Date): EnergyInfo {
  const recovered = Math.min(
    MAX_ENERGY - energy,
    (new Date().getTime() - recoverAt.getTime()) / ENERGY_RECOVERY_TIME,
  );
  const updatedEnergy = energy + recovered;

  let updatedRecoverAt = recoverAt;
  if (updatedEnergy !== MAX_ENERGY) {
    updatedRecoverAt = new Date(
      new Date(recoverAt).getTime() + recovered * ENERGY_RECOVERY_TIME,
    );
  }

  return {
    energy: updatedEnergy,
    recoverAt: updatedRecoverAt,
  };
}

export function generateRecoverDate() {
  return new Date(new Date().getTime() + ENERGY_RECOVERY_TIME);
}
