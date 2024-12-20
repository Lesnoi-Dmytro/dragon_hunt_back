import { ENERGY_RECOVERY_TIME, MAX_ENERGY } from 'src/constants';
import { EnergyInfo } from 'src/types/users/MyInfo';

export function getUserEnergy(energy: number, recoverStart: Date): EnergyInfo {
  if (energy === MAX_ENERGY) {
    return {
      energy: MAX_ENERGY,
      recoverAt: recoverStart,
      recoverStart: recoverStart,
    };
  }

  const recovered = Math.floor(
    Math.min(
      MAX_ENERGY - energy,
      (new Date().getTime() - recoverStart.getTime()) / ENERGY_RECOVERY_TIME,
    ),
  );
  if (recovered < 1) {
    return {
      energy,
      recoverAt: calculateRecoverAt(recoverStart),
      recoverStart,
    };
  }

  const updatedEnergy = energy + recovered;
  let updatedRecoverStart = recoverStart;
  if (updatedEnergy !== MAX_ENERGY) {
    updatedRecoverStart = new Date(
      new Date(recoverStart).getTime() + recovered * ENERGY_RECOVERY_TIME,
    );
  }

  return {
    energy: updatedEnergy,
    recoverAt: calculateRecoverAt(updatedRecoverStart),
    recoverStart: updatedRecoverStart,
  };
}

export function calculateRecoverAt(recoverStart: Date): Date {
  return new Date(new Date(recoverStart).getTime() + ENERGY_RECOVERY_TIME);
}
