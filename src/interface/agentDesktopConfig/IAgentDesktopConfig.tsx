import { IoperationDetail } from "../common/IoperationDetail";

export interface IAgentDesktopConfiguration extends IoperationDetail
{
	campaignId: string;
	requiredDisposition: boolean;
	dncPeriodType: string;
	dncDurationInDays: number;
	dncEOD: boolean;
	isDNCCustTZEnabled: boolean;
	dncType: string;
}