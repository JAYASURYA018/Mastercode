import React, { useEffect, useState } from "react";
import { Translation, withTranslation } from "react-i18next";
import {
    Grid,
    GridColumn as Column,
    GridSortChangeEvent, GridToolbar
} from "@progress/kendo-react-grid";
import { Checkbox, Input } from "@progress/kendo-react-inputs";
import GridPaging from "../../../common/gridPagination";
import { orderBy } from '@progress/kendo-data-query';
import _ from "underscore";
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { OverlayTrigger, Popover } from "react-bootstrap";

export interface AgentStatusSummaryProps {

}
export interface CampaignSummaryInfo {
    Sender: string;
    Receiver: string;
    MessageType: string;
    Data?: (DataEntity)[] | null;
    Time: string;
}
export interface CampaignSummaryConstantsEntity {
    name: string;
    prop: string;
    iShow: boolean;
}
export interface DataEntity {
    Campaign: string;
    CampaignGroup: string;
    TotalRecordsAvailable: number;
    TotalCallsDialed: number;
    TotalCallsAnswered: number;
    ConfiguredAbandonedRate: string;
    CurrentAbandonedRate: string;
    TotalLoggedInAgents: number;
    TotalAvailableAgents: number;
    TotalCallsInProgress: number;
    CurrentThrottlingPace: number;
    AverageHandleTime: string;
    MinimumCallsPerAgent: number;
    MaximumCallsPerAgent: number;
    InitialSeedValue: number;
    InitialSeedInteraction: number;
    GainFactor: number;
    LossFactor: number;
    CampaignStatus: string;
    PredictedResult: string;
    PredictedForOpenRecords: number;
    CompletionPercentage: number;
}
let data: CampaignSummaryInfo = {
    "Sender": "ATIDataService", "Receiver": "AEConsole_dinesh_1647418944195", "MessageType": "CampaignOverviewReport", "Data": [{ "Campaign": "SamplePredictiveCampaign", "CampaignGroup": "Queue1", "TotalRecordsAvailable": 0, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "1.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 1, "MaximumCallsPerAgent": 1, "InitialSeedValue": 3, "InitialSeedInteraction": 1, "GainFactor": 1.0, "LossFactor": 1.0, "CampaignStatus": "STOPPED", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 100 }, { "Campaign": "NewTestCampaign", "CampaignGroup": "BasicQueue", "TotalRecordsAvailable": 0, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "2.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "00:00:00", "MinimumCallsPerAgent": 1, "MaximumCallsPerAgent": 2, "InitialSeedValue": 3, "InitialSeedInteraction": 1, "GainFactor": 1.5, "LossFactor": 1.0, "CampaignStatus": "ELAPSED", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 89 }, { "Campaign": "SampleProgressiveIVRCampaign", "CampaignGroup": "Queue1", "TotalRecordsAvailable": 0, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "0.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 0, "MaximumCallsPerAgent": 0, "InitialSeedValue": 3, "InitialSeedInteraction": 0, "GainFactor": 0.5, "LossFactor": 1.5, "CampaignStatus": "STOPPED", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 0 }, { "Campaign": "SampleEmailCampaign", "CampaignGroup": "Sample Email Campaign Group", "TotalRecordsAvailable": 0, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "0.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 0, "MaximumCallsPerAgent": 0, "InitialSeedValue": 3, "InitialSeedInteraction": 0, "GainFactor": 0.5, "LossFactor": 1.5, "CampaignStatus": "EXECUTING", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 0 }, { "Campaign": "SampleSMSCampaign", "CampaignGroup": "Sample SMS Campaign Group", "TotalRecordsAvailable": 0, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "0.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 0, "MaximumCallsPerAgent": 0, "InitialSeedValue": 3, "InitialSeedInteraction": 0, "GainFactor": 0.5, "LossFactor": 1.5, "CampaignStatus": "EXECUTING", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 0 }, { "Campaign": "SamplePreviewCampaign", "CampaignGroup": "Sample Preview Campaign Group", "TotalRecordsAvailable": 0, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "0.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 0, "MaximumCallsPerAgent": 0, "InitialSeedValue": 3, "InitialSeedInteraction": 0, "GainFactor": 0.5, "LossFactor": 1.5, "CampaignStatus": "EXECUTING", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 0 }, { "Campaign": "SamplePreviewCampaign-ACQ", "CampaignGroup": "Queue1", "TotalRecordsAvailable": 0, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "0.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 1, "MaximumCallsPerAgent": 0, "InitialSeedValue": 3, "InitialSeedInteraction": 1, "GainFactor": 0.5, "LossFactor": 1.5, "CampaignStatus": "STOPPED", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 0 }, { "Campaign": "Predictivecampaign", "CampaignGroup": "Queue1", "TotalRecordsAvailable": 2, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "2.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 1, "MaximumCallsPerAgent": 2, "InitialSeedValue": 3, "InitialSeedInteraction": 1, "GainFactor": 1.5, "LossFactor": 1.0, "CampaignStatus": "ELAPSED", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 73 }, { "Campaign": "TestCampaignAiQ", "CampaignGroup": "Queue1", "TotalRecordsAvailable": 2, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "2.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 1, "MaximumCallsPerAgent": 2, "InitialSeedValue": 3, "InitialSeedInteraction": 1, "GainFactor": 1.5, "LossFactor": 1.0, "CampaignStatus": "ELAPSED", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 94 }, { "Campaign": "AiqTestInactive", "CampaignGroup": "Queue1", "TotalRecordsAvailable": 6, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "2.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 1, "MaximumCallsPerAgent": 2, "InitialSeedValue": 3, "InitialSeedInteraction": 1, "GainFactor": 1.5, "LossFactor": 1.0, "CampaignStatus": "ELAPSED", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 0 }, { "Campaign": "testtargetachievedAgent", "CampaignGroup": "Queue1", "TotalRecordsAvailable": 22, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "2.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 1, "MaximumCallsPerAgent": 2, "InitialSeedValue": 3, "InitialSeedInteraction": 1, "GainFactor": 1.5, "LossFactor": 1.0, "CampaignStatus": "ELAPSED", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 54 }, { "Campaign": "Business Campaign", "CampaignGroup": "Queue1", "TotalRecordsAvailable": 13, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "2.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 1, "MaximumCallsPerAgent": 2, "InitialSeedValue": 3, "InitialSeedInteraction": 1, "GainFactor": 1.5, "LossFactor": 1.0, "CampaignStatus": "ELAPSED", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 50 }, { "Campaign": "Advertising Campaign", "CampaignGroup": "BasicQueue", "TotalRecordsAvailable": 46, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "2.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 1, "MaximumCallsPerAgent": 2, "InitialSeedValue": 3, "InitialSeedInteraction": 1, "GainFactor": 1.5, "LossFactor": 1.0, "CampaignStatus": "ELAPSED", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 54 }, { "Campaign": "Predcamp1", "CampaignGroup": "BasicQueue", "TotalRecordsAvailable": 21, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "2.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 1, "MaximumCallsPerAgent": 1, "InitialSeedValue": 3, "InitialSeedInteraction": 1, "GainFactor": 1.5, "LossFactor": 1.0, "CampaignStatus": "ELAPSED", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 50 }, { "Campaign": "creditCardCampaign", "CampaignGroup": "Queue1", "TotalRecordsAvailable": 27, "TotalCallsDialed": 0, "TotalCallsAnswered": 0, "ConfiguredAbandonedRate": "2.0", "CurrentAbandonedRate": "0.0", "TotalLoggedInAgents": 0, "TotalAvailableAgents": 0, "TotalCallsInProgress": 0, "CurrentThrottlingPace": 0, "AverageHandleTime": "", "MinimumCallsPerAgent": 1, "MaximumCallsPerAgent": 2, "InitialSeedValue": 3, "InitialSeedInteraction": 1, "GainFactor": 1.5, "LossFactor": 1.0, "CampaignStatus": "ELAPSED", "PredictedResult": "", "PredictedForOpenRecords": 0, "CompletionPercentage": 52 }], "Time": "03/16/2022 08:25:29.634"
}

const CampaignSummary = (props: AgentStatusSummaryProps) => {

    const commonNs = { ns: ['statelaw', 'common'] };
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(10);
    const [searchCampaign, setSearchCampaign] = useState("");
    const [campaignData, setCampaignData] = useState<DataEntity[]>(data.Data);
    const gridHeight: any = window.innerHeight - 180;
    const [sort, setSort] = useState<any>([{ field: "state", dir: "asc" }]);
    const [isColumnSelectionShow, setIsColumnSelectionShow] = useState(false);
    const [isExportAll, setIsExportAll] = useState(false);
    const [isShowExportOptions, setIsShowExportOptions] = useState(false);
    const [isCampaignSelectAll, setIsCampaignSelectAll] = useState(true);
    const [campaignConstantsList, setCampaignConstantsList] = useState<CampaignSummaryConstantsEntity[]>([]);
    const _export = React.useRef<ExcelExport | null>(null);
    let campaignsummaryConatants: CampaignSummaryConstantsEntity[] = [
        {
            name: 'Campaign',
            prop: 'Campaign',
            iShow: true
        },
        {
            name: 'Campaign Group',
            prop: 'CampaignGroup',
            iShow: true
        },
        {
            name: 'Campaign Status',
            prop: 'CampaignStatus',
            iShow: true
        },
        {
            name: 'Total Records Available',
            prop: 'TotalRecordsAvailable',
            iShow: true
        },
        {
            name: 'Total Calls Dialed',
            prop: 'TotalCallsDialed',
            iShow: true
        },
        {
            name: 'Total Calls Answered',
            prop: 'TotalCallsAnswered',
            iShow: true
        },
        {
            name: 'Configured Abandoned Rate',
            prop: 'ConfiguredAbandonedRate',
            iShow: true
        },
        {
            name: 'Current Abandoned Rate',
            prop: 'CurrentAbandonedRate',
            iShow: true
        },
        {
            name: 'Total Logged in Agents',
            prop: 'TotalLoggedInAgents',
            iShow: true
        },
        {
            name: 'Total Available Agents',
            prop: 'TotalAvailableAgents',
            iShow: true
        },
        {
            name: 'Total Calls in Progress',
            prop: 'TotalCallsInProgress',
            iShow: true
        },
        {
            name: 'Current Throttling Pace',
            prop: 'CurrentThrottlingPace',
            iShow: true
        },
        {
            name: 'Average Handle Time',
            prop: 'AverageHandleTime',
            iShow: true
        },
        {
            name: 'Minimum Calls Per Agent',
            prop: 'MinimumCallsPerAgent',
            iShow: true
        },
        {
            name: 'maximum Calls Per Agent',
            prop: 'MaximumCallsPerAgent',
            iShow: true
        },
        {
            name: 'Initial Seed Value',
            prop: 'InitialSeedValue',
            iShow: true
        },
        {
            name: 'Initial Seed Interaction',
            prop: 'InitialSeedInteraction',
            iShow: true
        },
        {
            name: 'Gain Factor',
            prop: 'GainFactor',
            iShow: true
        },
        {
            name: 'Loss Factor',
            prop: 'LossFactor',
            iShow: true
        }
    ]
    // let campaignGridData;
    let copyHolidayList: CampaignSummaryConstantsEntity[] = campaignsummaryConatants;
    const columnWidth = "200px";
    const pageable: any = {
        buttonCount: 5,
        info: true,
        type: "numeric",
        pageSizes: true,
        previousNext: true,
    };

    useEffect(() => {
        setCampaignConstantsList(campaignsummaryConatants)
    }, []);

    useEffect(() => {
        copyHolidayList = [...campaignConstantsList];
        setIsCampaignSelectAll(campaignConstantsList.length > 0 ? (campaignConstantsList.filter((item) => item.iShow === true).length === campaignConstantsList.length ? true : false) : false)
    }, [campaignConstantsList]);

    useEffect(() => {
        if (_export.current !== null) {
            if (isExportAll) {
                _export.current.save();
                setIsExportAll(false)
            }
        }
    }, [isExportAll]);

    const excelExport = (isFromAll: boolean) => {
        if (isFromAll) {
            setIsExportAll(true)
        }
        if (_export.current !== null) {
            _export.current.save();
        }
    };

    useEffect(() => {
        let filterData = filterByValue(data.Data, searchCampaign);
        if (searchCampaign !== "") {
            setCampaignData(filterData)
        }
        else {
            setCampaignData(filterData.slice(skip, skip + take))
        }
    }, [searchCampaign]);

    const filterByValue = (array: any, value: any) => {
        return _.filter(array, function (o: any) { return (o.Campaign).toLowerCase().indexOf(value.toLowerCase()) !== -1 })
    }
    const pageChange = (event: any) => {
        setSkip(event.page.skip)
        setTake(event.page.take)
        setCampaignData(orderBy(data.Data, sort).slice(event.page.skip, event.page.skip + event.page.take))
    };
    const sortChange = (e: GridSortChangeEvent) => {
        setSort(e.sort);
        setCampaignData(orderBy(data.Data, e.sort).slice(skip, skip + take))
    };

    const handleCheckBoxOnChange = (e: any, dataItem: CampaignSummaryConstantsEntity | null, fromAllSelect: boolean) => {
        copyHolidayList.forEach((item) => {
            if (fromAllSelect) {
                item.iShow = e.target.value;
                setIsCampaignSelectAll(e.target.value)
            }
            else {
                if (item.prop === dataItem?.prop) {
                    item.iShow = e.target.value;
                }
                setIsCampaignSelectAll(copyHolidayList.filter((copyHolidayListData) => copyHolidayListData.iShow === true).length === campaignConstantsList.length ? true : false)
            }
        })
        setCampaignConstantsList(copyHolidayList);
    }


    const getColorSymbol = (status: string) => {
        switch (status) {
            case 'STOPPED':
                return "#FFDEDE";              

            case 'ELAPSED':
                return "#E2EAF1";
               
            case 'STOPPED':
                return "#FFDEDE";
               
            case 'EXECUTING':
                return "#B8EDC6";
               
            case 'CREATED':
                return "#CFEEFF";
               
            case 'TIME SUSPENDED':
                return "#FFD8AA";
               
            default:
                return "#B8EDC6";
        }

    }



    return (
        <Translation ns={['statelaw', 'common', 'camp']}>
            {
                (t) => <>

                    <ExcelExport data={campaignData} ref={_export}>
                        <Grid
                            data={campaignData}
                            take={take}
                            pageSize={take}
                            pageable={pageable}
                            pager={GridPaging}
                            total={data.Data.length}
                            style={{ height: gridHeight }}
                            skip={skip}
                            sort={sort}
                            sortable={true}
                            onSortChange={sortChange}
                            onPageChange={(e) => pageChange(e)}
                            // ref={(g) => { campaignGridData = g; }}
                            className="statelaw-grid text-center"
                        >
                            <GridToolbar>
                                <div className="row">
                                    <div className="col-md-6 text-left">
                                        <label>Campaign Summary</label>
                                    </div>
                                    <div className="col-md-6 text-left">
                                        <div className="search-input pl-0 text-right">
                                            <i className="icon-tool-search"></i>
                                            <Input placeholder={t('common.grid.search.label', commonNs)}
                                                aria-labelledby="campaign-summary" id="campaign-summary"
                                                aria-describedby="campaign-summary" name="campaign-summary"
                                                value={searchCampaign} onChange={(e: any) => { setSearchCampaign(e.target.value) }} className="w-25" />
                                            <span className="v-div"></span>
                                            <OverlayTrigger
                                                rootClose={true}
                                                onExit={(event) => { setIsColumnSelectionShow(false) }}
                                                show={isColumnSelectionShow}
                                                trigger="click" placement="left" overlay={
                                                    <Popover id={`popover-basic`} className="profile-action-popup">
                                                        <Popover.Content>
                                                            <Checkbox disabled={false} id={"holiday-SelectAll2"} checked={isCampaignSelectAll} value={isCampaignSelectAll}
                                                                onChange={(event: any) => { setIsCampaignSelectAll(event.target.value); handleCheckBoxOnChange(event, null, true); }}
                                                                aria-label={"holiday-SelectAll2"} name={"holiday-SelectAll2"} />
                                                            <label className="pl-2">{"Select All"}</label>
                                                            <br />
                                                            {campaignConstantsList.map((item, index) => {
                                                                return (
                                                                    <div key={index + item.prop}>
                                                                        <Checkbox disabled={false} checked={item.iShow} value={item.iShow} id={"holiday-Select2" + index}
                                                                            aria-label={"holiday-Select2" + index} name={"holiday-Select2" + index} onChange={(event) => { handleCheckBoxOnChange(event, item, false) }} />
                                                                        <label className="pl-2">{item.name}</label>
                                                                        <br />
                                                                    </div>
                                                                )
                                                            })}
                                                        </Popover.Content>
                                                    </Popover>
                                                }>
                                                <span className={false ? "icon-pop-up-close" : "icon-tool-more"} onClick={(event) => isColumnSelectionShow ? setIsColumnSelectionShow(false) : setIsColumnSelectionShow(true)}></span>
                                            </OverlayTrigger>
                                            <span className={"border-left ml-3 pl-3 mt-7 d-inline-block"}>
                                                <OverlayTrigger
                                                    rootClose={true}
                                                    onExit={(event) => { setIsShowExportOptions(false) }}
                                                    show={isShowExportOptions}
                                                    trigger="click" placement="bottom" overlay={
                                                        <Popover id={`popover-basic`} className="profile-action-popup">
                                                            <Popover.Content>
                                                                <button
                                                                    title="Export all Data as CSV"
                                                                    className=""
                                                                    onClick={() => { setIsExportAll(true) }}
                                                                >
                                                                    <label> Export all Data as CSV  </label>
                                                                </button>
                                                                <button
                                                                    title="Export visible columns as CSV"
                                                                    className=""
                                                                    onClick={() => { setIsExportAll(false); excelExport(false) }}
                                                                >
                                                                    <label>  Export visible columns as CSV  </label>
                                                                </button>
                                                            </Popover.Content>
                                                        </Popover>
                                                    }>
                                                    <span className={"icon-top-humb"} onClick={(event) => isShowExportOptions ? setIsShowExportOptions(false) : setIsShowExportOptions(true)}></span>
                                                </OverlayTrigger>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </GridToolbar>
                            {campaignConstantsList.filter((arrayItem) => arrayItem.iShow).map((item, index) => {
                                return (
                                    !isExportAll &&
                                    <Column className='text-center' key={index + item.name + "key"}
                                        width={columnWidth}
                                        // field={item.prop}
                                        title={item.name}
                                        cell={(cellProps) => {
                                            return (
                                                <td className="text-center">
                                                    {index === 2 ?
                                                        <>
                                                            <p className="m-0"> <p className="circleSymbolForGrid m-0 p-0" style={{ backgroundColor: getColorSymbol(cellProps.dataItem[item.prop]) }}></p>{cellProps.dataItem[item.prop] === "" ? "-" : cellProps.dataItem[item.prop]}</p>
                                                        </>
                                                        :
                                                        <p className="m-0 pl-3">{cellProps.dataItem[item.prop] === "" ? "-" : cellProps.dataItem[item.prop]}</p>
                                                    }
                                                </td>
                                            )
                                        }}
                                    />
                                )
                            })
                            }
                            {campaignConstantsList.map((item, index) => {
                                return (
                                    isExportAll &&
                                    <Column className={'text-center'} key={index + item.name + "key"}
                                        width={columnWidth}
                                        field={item.prop}
                                        title={item.name}
                                    />
                                )
                            })
                            }
                            {campaignConstantsList.filter((arrayItem) => arrayItem.iShow).length === 0 &&
                                <Column key="extracol" className='d-none'
                                    width={columnWidth}
                                    field={""}
                                    title={"Mahesh"}
                                />
                            }
                        </Grid>
                    </ExcelExport>
                </>
            }
        </Translation>
    )
}

export default withTranslation(['statelaw', 'common', 'camp'])(CampaignSummary)
