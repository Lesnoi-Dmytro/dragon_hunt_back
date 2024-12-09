export interface MyInfo extends EnergyInfo {
  level: number;
  gold: number;
  exp: number;
  expNeeded: number;
  unreadMails: number;
}

export interface EnergyInfo {
  energy: number;
  recoverAt: Date;
}
