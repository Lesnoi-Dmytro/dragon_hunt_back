export default interface BattleModel {
  id: number;
  name: string;
  type: string;
  level: number;
  opponents: {
    enemy: {
      id: number;
      entity: {
        entityInfo: {
          name: string;
          imageId: number;
        };
      };
    };
  }[];
}
