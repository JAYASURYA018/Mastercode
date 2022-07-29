import { IoperationDetail } from "../common/IoperationDetail";

export interface IBusinessParameters extends IoperationDetail {
    campaignId: string;
    fieldName: string;
    dataType: string;
    format: string;
    businessField: string;
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
    characterLength: string;
    customerMasterValue: string;
    businessFieldValue: string;
    customerMasterP2PStatus: ICustomerMaster;
}

export interface ICustomerMaster {
    id: number;
    name: string;
    p2P: boolean;
    bttc: boolean;
}