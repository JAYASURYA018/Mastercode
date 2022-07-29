import { IoperationDetail } from "../common/IoperationDetail";

export interface IivrTemplate extends IoperationDetail {
	templateId: number;
	templateName: string;
	description: string;
	campaignGroup: string;
	campaignId: string;
	providerId: string;
	promptType: boolean;
	promptTypeValue: string;
	recorded_FileName: string;
	ttS_text: string;
	ttS_Language: string;
	ttS_VoiceTalent: string;
	isTransfer: boolean;
	transferType: boolean;
	transferMethod: boolean;
	transferMethodValue: string;
	transfer_DTMF_Digit: string;
	transfer_DTMF_MaxRetries: string;
	transfer_DestinationType: boolean;
	transfer_Destination: string;
	transfer_Recorded_FileName: string;
	transfer_TTS_Text: string;
	cpA_Detection: boolean;
	amdTreatment: string;
	amD_VM_Message: string;
	amD_Transfer_Destination_Type: boolean;
	amD_Transfer_Destination: string;
	outboundcallerId: string;
	isActive: boolean;
	businessFields: string;
	contactFlowID: string;
	queueName: string;
	is_TransferNumber: boolean;
	repeatPrompt: string;
	repeat_Recorded_FileName: string;
	contactFlowList: Array<IcontactFlow>;
	aniList: Array<Iani>;
	aniNumber: string;
	isANIEnable: boolean;
	isContactflowEnable: boolean;
	contactFlowName: string;
	workFlow: string;
	twilioTransferDestinationType: number;
}

export interface IcontactFlow {
	name: string;
	contactflowID: string;
}

export interface Iani {
	name: string;
	aniid: string;
}

export interface Icountry extends Iqueue  {
	description: string;
}

export interface IvoiceTalent {
	id: number;
	voice: string;
	voiceText: string;
}

export interface Iqueue {
	id: number;
	name: string;
}

export interface IcPaas {
	id: string;
	name: string;
	type: string;
}

export interface IactiveTemplateParam {
	campaignId: string;
	templateId: number;
	isModeActive: boolean;
}