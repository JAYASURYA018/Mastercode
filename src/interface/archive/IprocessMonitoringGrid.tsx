export interface IprocessMonitoringGrid {
  processId?: string;
  type?: string;
  activityStartTime?: string;
  activityEndTime?: string;
  status?: string;
  tablesAffected?: string;
  recordsAffected?: string;
  childdata?: Array<ISubProcessMonitoringGrid>;
}
export interface ISubProcessMonitoringGrid {
  processId: string;
  tableName: string;
  executionStartTime: string;
  executionEndTime: string;
  recordsAffected: string;
  status: string;
}
