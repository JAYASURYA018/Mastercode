import { IoperationDetail } from "../common/IoperationDetail";
import { SortDescriptor } from "@progress/kendo-data-query";

export interface HolidayGridState {
  gridData?: any;
  error?: boolean;
  skip?: any;
  take?: any;
  pageable?: any;
  pageNumber?: any;
  holidaysDetailIsEnabled?: boolean;
  holidaysDetailData?: any;
  holidayListTotal?: any;
  allHolidayList?: any;
  searchFilter?: any;
  resizeScreen?: boolean;
  isShowCampaignPopover?: boolean;
  setIndexforCampaignPopover?: number;
  isDeleteClicked?: any;
  setHolidayTitle?: any;
  setHolidayDesc?: any;
  deleteData?: any;
  showAddHolidayPopUp: boolean;
  showMappingPopUp: boolean;
  sort: SortDescriptor[];
  isAllHolidaySelected: boolean;
  selectedHolidays: any[];
  holidayDetails: any;
  selectedCampaigns: any;
  editMapping: boolean;
  unMapCampaigns: any;
  deleteHolidayId: string;
  holidayDropdownOpen?: boolean;
  mappingDropdownOpen?: boolean;
  disableUnmap: boolean;
}

export interface PayloadData extends IoperationDetail {
  camapignName: Array<string>;
  holidayId: Array<number>;
}

export interface DeletePayload extends IoperationDetail {
  HolidayId: number;
}

export interface ChipSelect {
  text: string;
  value: number;
  selected: boolean;
}

export interface ITrnaslation {
    ns: Array<string>
}

export interface AddHolidayProps {
  editMode: boolean;
  closeDialog: (data: any) => void;
  holidayDetails: any;
}

export interface CreateHolidayPayload extends IoperationDetail {
    startDate: any,
    endDate: any,
    holidayReason: string,
}

export interface ImapHolidayProps extends IoperationDetail {
  camapignName?: Array<string>;
  holidayId?: Array<number>;
}

export interface MapHolidayProps {
  editMode: boolean;
  closeDialog: (data: any) => void;
  selectedHolidays: any[];
  campaigns: any;
}