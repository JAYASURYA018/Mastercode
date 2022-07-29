import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { IoperationDetail } from "./IOperationalDetails";

export interface ICampaign {
  id: string;
  name: string;
  isSelected: boolean;
}

export interface IStepperProps {
  campaignData: ICampaign[];
  setCampaignData: Dispatch<SetStateAction<ICampaign[]>>;
  // searchData: string;
  // setSearchData: Dispatch<SetStateAction<string>>;
  handleInputChange: (event: any) => void;
  onTimeZoneChange: (event: any) => void;
  allInputData: any;
}
