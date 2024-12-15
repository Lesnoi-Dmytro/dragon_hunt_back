export interface BattleResponse {
  id: number;
  name: string;
  type: string;
  level: number;
  energy: number;
  opponents: {
    id: number;
    name: string;
    imageId: number;
  }[];
}
