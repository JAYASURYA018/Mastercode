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

export interface CallDetailsInfoProps {

}
export interface CallDetailsInfo {
    Sender: string;
    Receiver: string;
    MessageType: string;
    Data?: (DataEntity)[] | null;
    Time: string;
}
export interface DataEntity {
    Campaign: string;
    CampaignGroup: string;
    Type: string;
    CallID: string;
    RemoteStatus: string;
    RecordDialedTime: string;
    RecordConnectedTime?: null;
    RecordEndTime?: null;
    ConversationDuration: string;
    ConnectedAgent: string;
    CallState: string;
    LCMKey: string;
    ContactNumber: string;
    IsCallDropped: boolean;
}

export interface CallDetailsEntity {
    name: string;
    prop: string;
    isShow: boolean;
}

let data: CallDetailsInfo = {
    "Sender": "ATIDataService",
    "Receiver": "AEConsole_admin_1647517509666",
    "MessageType": "LineReport",
    "Data": [{ "Campaign": "SamplePreviewCampaign", "CampaignGroup": "BasicQueue", "Type": "Voice", "CallID": "7cdb857a-fda3-4c43-851c-8d3b9957d00d", "RemoteStatus": "initiate", "RecordDialedTime": "Thu, Mar 17, 2022 11:48:06", "RecordConnectedTime": null, "RecordEndTime": null, "ConversationDuration": "0", "ConnectedAgent": "", "CallState": "initiate", "LCMKey": "253|1|4|0|0|44|1", "ContactNumber": "16693090090", "IsCallDropped": false }],
    "Time": "03/17/2022 11:48:06.881"
}

const CallDetails = (props: CallDetailsInfoProps) => {

    const commonNs = { ns: ['statelaw', 'common'] };
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(10);
    const [searchCampaign, setSearchCampaign] = useState("");
    const [callDetailsData, setCallDetailsData] = useState<DataEntity[]>(data.Data);
    const gridHeight: any = window.innerHeight - 180;
    const [sort, setSort] = useState<any>([{ field: "state", dir: "asc" }]);
    const [isColumnSelectionShow, setIsColumnSelectionShow] = useState(false);
    const [isExportAll, setIsExportAll] = useState(false);
    const [isShowExportOptions, setIsShowExportOptions] = useState(false);
    const [isCallDetailsSelectAll, setIsCallDetailsSelectAll] = useState(true);
    const [callDetailsConstantsList, setCallDetailsConstantsList] = useState<CallDetailsEntity[]>([]);
    const _export = React.useRef<ExcelExport | null>(null);
    let callDetailsConatants: CallDetailsEntity[] = [
        {
            name: 'Campaign',
            prop: 'Campaign',
            isShow: true
        },
        {
            name: 'Campaign Group',
            prop: 'CampaignGroup',
            isShow: true
        },
        {
            name: 'Call Status',
            prop: 'CallState',
            isShow: true
        },
        {
            name: 'Connected Agent',
            prop: 'ConnectedAgent',
            isShow: true
        },
        {
            name: 'Call Type',
            prop: 'Type',
            isShow: true
        },
        {
            name: 'Call ID',
            prop: 'CallID',
            isShow: true
        },
        {
            name: 'LCMKey',
            prop: 'LCMKey',
            isShow: true
        },
        {
            name: 'ContactNumber',
            prop: 'ContactNumber',
            isShow: true
        },
        {
            name: 'Dialed Time',
            prop: 'RecordDialedTime',
            isShow: true
        },
        {
            name: 'Connected Time',
            prop: 'RecordConnectedTime',
            isShow: true
        },
        {
            name: 'Disconnected Time',
            prop: 'RecordEndTime',
            isShow: true
        },
        {
            name: 'Talk Duration',
            prop: 'Time',
            isShow: true
        }
    ]
    // let calldetailsGridData;
    let copyHolidayList: CallDetailsEntity[] = callDetailsConatants;
    const columnWidth = "200px";
    const pageable: any = {
        buttonCount: 5,
        info: true,
        type: "numeric",
        pageSizes: true,
        previousNext: true,
    };

    useEffect(() => {
        setCallDetailsConstantsList(callDetailsConatants)
    }, []);

    useEffect(() => {
        copyHolidayList = [...callDetailsConstantsList];
        setIsCallDetailsSelectAll(callDetailsConstantsList.length > 0 ? (callDetailsConstantsList.filter((item) => item.isShow === true).length === callDetailsConstantsList.length ? true : false) : false)
    }, [callDetailsConstantsList]);

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
            setCallDetailsData(filterData)
        }
        else {
            setCallDetailsData(filterData.slice(skip, skip + take))
        }
    }, [searchCampaign]);

    const filterByValue = (array: any, value: any) => {
        return _.filter(array, function (o: any) { return (o.Campaign).toLowerCase().indexOf(value.toLowerCase()) !== -1 })
    }
    const pageChange = (event: any) => {
        setSkip(event.page.skip)
        setTake(event.page.take)
        setCallDetailsData(orderBy(data.Data, sort).slice(event.page.skip, event.page.skip + event.page.take))
    };
    const sortChange = (e: GridSortChangeEvent) => {
        setSort(e.sort);
        setCallDetailsData(orderBy(data.Data, e.sort).slice(skip, skip + take))
    };

    const handleCheckBoxOnChange = (e: any, dataItem: CallDetailsEntity | null, fromAllSelect: boolean) => {
        copyHolidayList.forEach((item) => {
            if (fromAllSelect) {
                item.isShow = e.target.value;
                setIsCallDetailsSelectAll(e.target.value)
            }
            else {
                if (item.prop === dataItem?.prop) {
                    item.isShow = e.target.value;
                }
                setIsCallDetailsSelectAll(copyHolidayList.filter((copyHolidayListData) => copyHolidayListData.isShow === true).length === callDetailsConstantsList.length ? true : false)
            }
        })
        setCallDetailsConstantsList(copyHolidayList);
    }




    return (
        <Translation ns={['statelaw', 'common', 'camp']}>
            {
                (t) => <>

                    <ExcelExport data={callDetailsData} ref={_export}>
                        <Grid
                            data={callDetailsData}
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
                            // ref={(g) => { calldetailsGridData = g; }}
                            className="statelaw-grid text-center"
                        >
                            <GridToolbar>
                                <div className="row">
                                    <div className="col-md-6 text-left">
                                        <label>Call Details</label>
                                    </div>
                                    <div className="col-md-6 text-right">
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
                                                            <Checkbox disabled={false} id={"Call-Details-SelectAll"} checked={isCallDetailsSelectAll} value={isCallDetailsSelectAll}
                                                                onChange={(event: any) => { setIsCallDetailsSelectAll(event.target.value); handleCheckBoxOnChange(event, null, true); }}
                                                                aria-label={"Call-Details-SelectAll"} name={"Call-Details-SelectAll"} />
                                                            <label className="pl-2">{"Select All"}</label>
                                                            <br />
                                                            {callDetailsConstantsList.map((item, index) => {
                                                                return (
                                                                    <div key={index + item.prop}>
                                                                        <Checkbox disabled={false} checked={item.isShow} value={item.isShow} id={"Call-Details" + index}
                                                                            aria-label={"Call-Details" + index} name={"Call-Details" + index} onChange={(event) => { handleCheckBoxOnChange(event, item, false) }} />
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
                            {callDetailsConstantsList.filter((arrayItem) => arrayItem.isShow).map((item, index) => {
                                return (
                                    !isExportAll &&
                                    <Column className='text-center' key={index + item.name + "key"}
                                        width={columnWidth}
                                        field={item.prop == "" ? "-" : item.prop}
                                        title={item.name}
                                    />
                                )
                            })
                            }
                            {callDetailsConstantsList.map((item, index) => {
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
                            {callDetailsConstantsList.filter((arrayItem) => arrayItem.isShow).length === 0 &&
                                <Column key="extracol" className='d-none'
                                    width={columnWidth}
                                    field={""}
                                    title={""}
                                />
                            }
                        </Grid>
                    </ExcelExport>
                </>
            }
        </Translation>
    )
}

export default withTranslation(['statelaw', 'common', 'camp'])(CallDetails)
