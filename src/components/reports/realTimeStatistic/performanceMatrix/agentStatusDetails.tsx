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

export interface AgentStatusSummaryInfo {
    Sender: string;
    Receiver: string;
    MessageType: string;
    Data?: (DataEntity)[] | null;
    Time: string;
}
export interface AgentStatusConstantsEntity {
    name: string;
    prop: string;
    iShow: boolean;
}
export interface DataEntity {
    AgentName: string;
    AgentState: string;
    DurationInCurrentState: string;
    IsTethered: string;
    TetheredState: string;
    DurationInTethered: string;
    BlendingState: string;
    TotalCallsHandled: number;
    AverageHandledTime: string;
    AverageTalkTime: string;
    AverageACWTime: string;
    AgentRoutingProfile: string;
    ConnectedQueue: string;
    LoggedInTime: string;
    LoggedOutTime: string;
    TotalLoggedInDuration: string;
    Campaign: string;
    LCMKey: string;
    ContactNumber: string;
}
let data: AgentStatusSummaryInfo = {
    "Sender": "ATIDataService",
    "Receiver": "AEConsole_admin_1647517509666",
    "MessageType": "AgentStatusDetailReport",
    "Data": [{ "AgentName": "Agent1", "AgentState": "Connected", "DurationInCurrentState": "00:00:18", "IsTethered": "Yes", "TetheredState": "Connected", "DurationInTethered": "00:12:50", "BlendingState": "Outbound", "TotalCallsHandled": 1, "AverageHandledTime": "00:00:16", "AverageTalkTime": "00:00:00", "AverageACWTime": "00:00:16", "AgentRoutingProfile": "Basic Routing Profile", "ConnectedQueue": "", "LoggedInTime": "Thu, Mar 17, 2022 11:37:48", "LoggedOutTime": "0", "TotalLoggedInDuration": "00:13:26", "Campaign": "", "LCMKey": "", "ContactNumber": "" }, { "AgentName": "syska", "AgentState": "Connected", "DurationInCurrentState": "00:00:18", "IsTethered": "Yes", "TetheredState": "Connected", "DurationInTethered": "00:12:50", "BlendingState": "Outbound", "TotalCallsHandled": 1, "AverageHandledTime": "00:00:16", "AverageTalkTime": "00:00:00", "AverageACWTime": "00:00:16", "AgentRoutingProfile": "Basic Routing Profile", "ConnectedQueue": "", "LoggedInTime": "Thu, Mar 17, 2022 11:37:48", "LoggedOutTime": "0", "TotalLoggedInDuration": "00:13:26", "Campaign": "", "LCMKey": "", "ContactNumber": "" }, { "AgentName": "Led", "AgentState": "Connected", "DurationInCurrentState": "00:00:18", "IsTethered": "Yes", "TetheredState": "Connected", "DurationInTethered": "00:12:50", "BlendingState": "Outbound", "TotalCallsHandled": 1, "AverageHandledTime": "00:00:16", "AverageTalkTime": "00:00:00", "AverageACWTime": "00:00:16", "AgentRoutingProfile": "Basic Routing Profile", "ConnectedQueue": "", "LoggedInTime": "Thu, Mar 17, 2022 11:37:48", "LoggedOutTime": "0", "TotalLoggedInDuration": "00:13:26", "Campaign": "", "LCMKey": "", "ContactNumber": "" }, { "AgentName": "panasonic", "AgentState": "Connected", "DurationInCurrentState": "00:00:18", "IsTethered": "Yes", "TetheredState": "Connected", "DurationInTethered": "00:12:50", "BlendingState": "Outbound", "TotalCallsHandled": 1, "AverageHandledTime": "00:00:16", "AverageTalkTime": "00:00:00", "AverageACWTime": "00:00:16", "AgentRoutingProfile": "Basic Routing Profile", "ConnectedQueue": "", "LoggedInTime": "Thu, Mar 17, 2022 11:37:48", "LoggedOutTime": "0", "TotalLoggedInDuration": "00:13:26", "Campaign": "", "LCMKey": "", "ContactNumber": "" }, { "AgentName": "Agent1", "AgentState": "Connected", "DurationInCurrentState": "00:00:18", "IsTethered": "Yes", "TetheredState": "Connected", "DurationInTethered": "00:12:50", "BlendingState": "Outbound", "TotalCallsHandled": 1, "AverageHandledTime": "00:00:16", "AverageTalkTime": "00:00:00", "AverageACWTime": "00:00:16", "AgentRoutingProfile": "Basic Routing Profile", "ConnectedQueue": "", "LoggedInTime": "Thu, Mar 17, 2022 11:37:48", "LoggedOutTime": "0", "TotalLoggedInDuration": "00:13:26", "Campaign": "", "LCMKey": "", "ContactNumber": "" }, { "AgentName": "Agent1", "AgentState": "Connected", "DurationInCurrentState": "00:00:18", "IsTethered": "Yes", "TetheredState": "Connected", "DurationInTethered": "00:12:50", "BlendingState": "Outbound", "TotalCallsHandled": 1, "AverageHandledTime": "00:00:16", "AverageTalkTime": "00:00:00", "AverageACWTime": "00:00:16", "AgentRoutingProfile": "Basic Routing Profile", "ConnectedQueue": "", "LoggedInTime": "Thu, Mar 17, 2022 11:37:48", "LoggedOutTime": "0", "TotalLoggedInDuration": "00:13:26", "Campaign": "", "LCMKey": "", "ContactNumber": "" }, { "AgentName": "Agent1", "AgentState": "Connected", "DurationInCurrentState": "00:00:18", "IsTethered": "Yes", "TetheredState": "Connected", "DurationInTethered": "00:12:50", "BlendingState": "Outbound", "TotalCallsHandled": 1, "AverageHandledTime": "00:00:16", "AverageTalkTime": "00:00:00", "AverageACWTime": "00:00:16", "AgentRoutingProfile": "Basic Routing Profile", "ConnectedQueue": "", "LoggedInTime": "Thu, Mar 17, 2022 11:37:48", "LoggedOutTime": "0", "TotalLoggedInDuration": "00:13:26", "Campaign": "", "LCMKey": "", "ContactNumber": "" }, { "AgentName": "Agent1", "AgentState": "Connected", "DurationInCurrentState": "00:00:18", "IsTethered": "Yes", "TetheredState": "Connected", "DurationInTethered": "00:12:50", "BlendingState": "Outbound", "TotalCallsHandled": 1, "AverageHandledTime": "00:00:16", "AverageTalkTime": "00:00:00", "AverageACWTime": "00:00:16", "AgentRoutingProfile": "Basic Routing Profile", "ConnectedQueue": "", "LoggedInTime": "Thu, Mar 17, 2022 11:37:48", "LoggedOutTime": "0", "TotalLoggedInDuration": "00:13:26", "Campaign": "", "LCMKey": "", "ContactNumber": "" }, { "AgentName": "Agent1", "AgentState": "Connected", "DurationInCurrentState": "00:00:18", "IsTethered": "Yes", "TetheredState": "Connected", "DurationInTethered": "00:12:50", "BlendingState": "Outbound", "TotalCallsHandled": 1, "AverageHandledTime": "00:00:16", "AverageTalkTime": "00:00:00", "AverageACWTime": "00:00:16", "AgentRoutingProfile": "Basic Routing Profile", "ConnectedQueue": "", "LoggedInTime": "Thu, Mar 17, 2022 11:37:48", "LoggedOutTime": "0", "TotalLoggedInDuration": "00:13:26", "Campaign": "", "LCMKey": "", "ContactNumber": "" }, { "AgentName": "Agent1", "AgentState": "Connected", "DurationInCurrentState": "00:00:18", "IsTethered": "Yes", "TetheredState": "Connected", "DurationInTethered": "00:12:50", "BlendingState": "Outbound", "TotalCallsHandled": 1, "AverageHandledTime": "00:00:16", "AverageTalkTime": "00:00:00", "AverageACWTime": "00:00:16", "AgentRoutingProfile": "Basic Routing Profile", "ConnectedQueue": "", "LoggedInTime": "Thu, Mar 17, 2022 11:37:48", "LoggedOutTime": "0", "TotalLoggedInDuration": "00:13:26", "Campaign": "", "LCMKey": "", "ContactNumber": "" }],
    "Time": "03/17/2022 11:51:14.683"
}


const AgentStatusDetails = (props: AgentStatusSummaryProps) => {
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
    const [isAgentStatusSelectAll, setIsAgentStatusSelectAll] = useState(true);
    const [agentStatusList, setAgentStatusList] = useState<AgentStatusConstantsEntity[]>([]);
    const _export = React.useRef<ExcelExport | null>(null);
    let AgentStatusConstants: AgentStatusConstantsEntity[] = [
        {
            name: 'Agent Name',
            prop: 'AgentName',
            iShow: true
        },
        {
            name: 'Routing Profile',
            prop: 'AgentRoutingProfile',
            iShow: true
        },
        {
            name: 'AE Agent State',
            prop: 'AgentState',
            iShow: true
        },
        {
            name: 'Amazon Agent State',
            prop: 'TetheredState',
            iShow: true
        },
        {
            name: 'Is Tethered?',
            prop: 'IsTethered',
            iShow: true
        },
        {
            name: 'Blending State',
            prop: 'BlendingState',
            iShow: true
        },
        {
            name: 'Call from Queue',
            prop: 'ConnectedQueue',
            iShow: true
        },
        {
            name: 'Call from Campaign',
            prop: 'Campaign',
            iShow: true
        },
        {
            name: 'LCMKey',
            prop: 'LCMKey',
            iShow: true
        },
        {
            name: 'Contact Number',
            prop: 'ContactNumber',
            iShow: true
        },
        {
            name: 'Duration in Current State',
            prop: 'DurationInCurrentState',
            iShow: true
        },
        {
            name: 'Duration in Tethered',
            prop: 'DurationInTethered',
            iShow: true
        },
        {
            name: 'Average Handle Time',
            prop: 'AverageHandledTime',
            iShow: true
        },
        {
            name: 'Average Talk Time',
            prop: 'AverageTalkTime',
            iShow: true
        },
        {
            name: 'Average ACW Time',
            prop: 'AverageACWTime',
            iShow: true
        },
        {
            name: 'Total Calls Handled',
            prop: 'TotalCallsHandled',
            iShow: true
        },
        {
            name: 'Logged in Time',
            prop: 'LoggedInTime',
            iShow: true
        },
        {
            name: 'Total Logged in Duration',
            prop: 'TotalLoggedInDuration',
            iShow: true
        }
    ]
    let copyAgentStatusList: AgentStatusConstantsEntity[] = AgentStatusConstants;

    useEffect(() => {
        setAgentStatusList(AgentStatusConstants)

    }, []);


    useEffect(() => {
        copyAgentStatusList = [...agentStatusList];
        setIsAgentStatusSelectAll(agentStatusList.length > 0 ? (agentStatusList.filter((item) => item.iShow === true).length === agentStatusList.length ? true : false) : false)
    }, [agentStatusList]);

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

    // let campaignGridData;
    const columnWidth = "200px";

    const pageable: any = {
        buttonCount: 5,
        info: true,
        type: "numeric",
        pageSizes: true,
        previousNext: true,
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
        return _.filter(array, function (o: any) { return (o.AgentName).toLowerCase().indexOf(value.toLowerCase()) !== -1 })
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
    const handleCheckBoxOnChange = (e: any, dataItem: AgentStatusConstantsEntity | null, fromAllSelect: boolean) => {

        copyAgentStatusList.forEach((item) => {
            if (fromAllSelect) {
                item.iShow = e.target.value;
                setIsAgentStatusSelectAll(e.target.value)
            }
            else {
                if (item.prop === dataItem?.prop) {
                    item.iShow = e.target.value;
                }

                setIsAgentStatusSelectAll(copyAgentStatusList.filter((copyAgentStatusListData) => copyAgentStatusListData.iShow === true).length === agentStatusList.length ? true : false)
            }
        })
        setAgentStatusList(copyAgentStatusList);
    }

    const getColorSymbol = (status: string) => {
        switch (status) {
            case 'Available':
                return "#B8EDC6";             

            case 'Connected':
                return "#CFEEFF";
               
            case 'Ended':
                return "#FF61D0";
               
            case 'Offline':
                return "#E2EAF1";
               
            case 'On Hold':
                return "#FFD8AA";
               
            case 'Missed':
                return "#FFDEDE";
               
            case 'ACW':
                return "#6B93FF";
              
            default:
                return "#B8EDC6";
        }

    }

    return (
        <Translation ns={['statelaw', 'common', 'camp']}>
            {
                (t) => <>


                    {true &&
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
                                className="text-center"
                            >
                                <GridToolbar>
                                    <div className="row">
                                        <div className="col-md-6 text-left pt-2"><label>Agent Status Details</label>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="search-input pl-0 text-right">
                                                <i className="icon-tool-search"></i>
                                                <Input placeholder={t('common.grid.search.label', commonNs)}
                                                    aria-labelledby="campaign-summary" id="campaign-summary"
                                                    aria-describedby="campaign-summary" name="campaign-summary"
                                                    value={searchCampaign} onChange={(e: any) => { setSearchCampaign(e.target.value) }} className="w-25" />
                                                <OverlayTrigger
                                                    rootClose={true}
                                                    onExit={(event) => { setIsColumnSelectionShow(false) }}
                                                    show={isColumnSelectionShow}
                                                    trigger="click" placement="left" overlay={
                                                        <Popover id={`popover-basic`} className="profile-action-popup">
                                                            <Popover.Content>
                                                                <Checkbox disabled={false} id={"Agent-Status-SelectAll"} checked={isAgentStatusSelectAll} value={isAgentStatusSelectAll}
                                                                    onChange={(event: any) => { setIsAgentStatusSelectAll(event.target.value); handleCheckBoxOnChange(event, null, true); }}
                                                                    aria-label={"Agent-Status-SelectAll"} name={"Agent-Status-SelectAll"} />
                                                                <label className="pl-2">{"Select All"}</label>
                                                                <br />
                                                                {agentStatusList.map((item, index) => {
                                                                    return (
                                                                        <>
                                                                            <Checkbox disabled={false} checked={item.iShow} value={item.iShow} id={"Agent-Status-Select" + index}
                                                                                aria-label={"Agent-Status-Select" + index} name={"Agent-Status-Select" + index} onChange={(event) => { handleCheckBoxOnChange(event, item, false) }} />
                                                                            <label className="pl-2">{item.name}</label>
                                                                            <br />
                                                                        </>
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
                                {agentStatusList.filter((arrayItem) => arrayItem.iShow).map((item, index) => {
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
                                {agentStatusList.map((item, index) => {
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
                                {agentStatusList.filter((arrayItem) => arrayItem.iShow).length === 0 &&
                                    <Column key="extracol" className='d-none'
                                        width={columnWidth}
                                        field={""}
                                        title={""}
                                    />
                                }
                            </Grid>
                        </ExcelExport>
                    }
                </>
            }
        </Translation>
    )
}

export default withTranslation(['statelaw', 'common', 'camp'])(AgentStatusDetails)
