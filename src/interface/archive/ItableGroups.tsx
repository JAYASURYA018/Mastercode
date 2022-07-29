export interface tablegroups {
  id: number;
  // id: number,
  inEdit?: boolean;
  tableName: string;
  isPurge: boolean;
  isArchive: boolean;
  retentionPeriodInDays: number;
  description: string;
  isSystemTable: boolean;
  archiveDBRetentionPeriodInDays: number;
  isArchiveDBPurge: boolean;
}
