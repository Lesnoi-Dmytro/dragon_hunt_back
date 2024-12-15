import BattleModel from '@/types/battles/battleModel';
import { BattleResponse } from '@/types/battles/battleResponse';
import { BattleType } from '@prisma/client';

export default function mapBattleResponse(battle: BattleModel): BattleResponse {
  return {
    id: battle.id,
    name: battle.name,
    type: battle.type,
    level: battle.level,
    energy:
      battle.type === BattleType.EQUIPMENT ||
      battle.type === BattleType.RESOURCES
        ? 3
        : 5,
    opponents: battle.opponents.map((opponent) => ({
      id: opponent.enemy.id,
      name: opponent.enemy.entity.entityInfo.name,
      imageId: opponent.enemy.entity.entityInfo.imageId,
    })),
  };
}
