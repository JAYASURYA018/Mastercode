import { IoperationDetail } from "../common/IoperationDetail";

export interface VerifyFormCondition {
  searchType: string;
  reassignAgent: AgentData;
  businessParameters: Array<BusinessParams>;
}

export interface AgentData extends CommonFields {
  agentID: string;
  callStartDate: string;
  callEndDate: string;
  freshContact: boolean;
}

export interface CommonFields {
  writeConditions: boolean;
  writeConditionsText: string;
  enableCSSBuilderConditionText: boolean;
  buildConditions: boolean;
  buildConditionType: boolean;
  fieldConditionsList: Array<FieldCondition>;
  basicFieldConditionsList: Array<BasicFieldCondition>;
}

export interface FieldCondition {
  openBracket: string | null;
  field: string | null;
  fieldTypeId: number | null;
  fieldSqlExpression: string | null;
  compare: string | null;
  value: string | null;
  logical: string | null;
  closeBracket: string | null;
  listCondtion: Array<string> | null;
}

export interface BasicFieldCondition {
  openBracket: string | null;
  fieldConditionList: Array<FieldCondition>;
  closeBracket: string | null;
  logical: string | null;
}

export interface BusinessParams extends IoperationDetail {
  campaignId: string | null;
  fieldName: string;
  dataType: string;
  format: string | null;
  businessField: string | null;
  sqlExpression: string;
  isMandatory: boolean;
  isEMailMapped: boolean;
  isSMSMapped: boolean;
  isDNCEnabled: boolean;
  isTemplateMapped: boolean;
  businessTypeId: number;
  isEditable: boolean;
  isViewable: boolean;
  sequenceID: number;
  isMax: boolean;
  isIVRMapped: boolean;
  characterLength: string | null;
  customerMasterValue: string | null;
  businessFieldValue: string | null;
}

export interface AgentAssignment extends IoperationDetail {
  campaignId: string;
  isData: boolean;
  contactIdCollection: string;
  selectedCondition: number;
  selectedContactListCondition: number;
  callStartTime: string;
  callEndTime: string;
  callType?: number;
  operationId?: string;
  contacts?: string;
  globalSelect: boolean;
  conditionstr: string;
  agentId: string;
  agentupdatetime: boolean;
  undoBusinessFieldUpdatedByAgent?: boolean;
  reassignObjModel: AgentData | object;
}
