import { IoperationDetail } from "../common/IoperationDetail";

export interface IcallStrategyOutComeInformation {
  dialPlanName?: string;
  modeNumber?: number;
  callOutcomes?: string;
  callOutcomeDescription?: string;
  rescheduleAfterDays?: number;
  rescheduleAfterHours?: number;
  rescheduleAfterMinutes?: number;
  outcomeMaxRetries?: number;
  adjustPriority?: number;
  leadScore?: number;
  branchToMode?: number;
  closeContacts?: boolean;
  configurable?: number;
  retainPCB?: boolean;
  removeMode?: boolean;
}

export interface IcallStrategyModeInformation {
  modeNumber?: number;
  startTime?: Date;
  endTime?: Date;
  weightage?: number;
  channelType?: number;
  modeMaxRetry?: number;
  outComeInfoList?: Array<IcallStrategyOutComeInformation>;
  restrictEmail?: boolean;
  strategyType?: number;
  isNumber?: boolean;
  isPEWC?: boolean;
  modeName?: string;
  modeDescription?: string;
  sequenceOrder?: string;
  isWindowRetry?: boolean;
  windowAttempts?: number;
  windowDuration?: number;
  deleted?: boolean;
  callBackCarryRetries?: boolean;
}

export interface IcallStrategiesMember extends IoperationDetail {
  isHistoricalName: string;
  dialPlanName: string;
  description: string;
  restictedMultiEmailSMS: any;
  strategyType: number;
  modeCount: number;
  callStrategyModeInformation: Array<IcallStrategyModeInformation>;
}

export interface IcopyContactStrategy extends IoperationDetail {
  sourceContactStrategy?: string;
  dialPlanName?: string;
  description?: string;
}

export interface ItelephonyOutcomeMember {
  businessOutcome: number;
  channelType: number;
  channelDescription: string;
  configurable: number;
  dailyRetry: boolean;
  defalutMaxRetry: number;
  defaultOffSet: number;
  defaultCloseContact: boolean;
  deleted: number;
  description: string;
  globalRetry: boolean;
  modeRetry: boolean;
  outcomeGroup: string;
  outcomeId: string;
  outcomeRetry: boolean;
  outcomeType: string;
  rpcType: string;
  retainPCB: boolean;
  windowRetry: boolean;
}

export interface IcallStrategyDelete extends IoperationDetail {
  dialPlanName: string;
}
