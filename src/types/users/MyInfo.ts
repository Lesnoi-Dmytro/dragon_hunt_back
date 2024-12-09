export interface MyInfo extends EnergyInfoResponse {
  level: number;
  gold: number;
  exp: number;
  expNeeded: number;
  unreadMails: number;
}

export interface EnergyInfoResponse {
  energy: number;
  recoverAt: Date;
}

export interface EnergyInfo extends EnergyInfoResponse {
  recoverStart: Date;
}
