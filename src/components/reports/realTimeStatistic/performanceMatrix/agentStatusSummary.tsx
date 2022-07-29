import React, { useEffect, useRef, useState } from "react";
import { Translation, withTranslation } from "react-i18next";
import {
    Grid,
    GridColumn as Column,
    GridToolbar
} from "@progress/kendo-react-grid";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from 'highcharts';
import "../../realTimeStatistic/_realTimeStatistics.scss";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { ExcelExport } from '@progress/kendo-react-excel-export';
require("highcharts/modules/exporting.js")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);
export interface AgentStatusSummaryProps {
}
export interface AgentStatusSummaryInfo {
    Sender: string;
    Receiver: string;
    MessageType: string;
    Data?: (DataEntity)[] | null;
    Time: string;
}
export interface DataEntity {
    AgentState: string;
    Inbound: number;
    Outbound: number;
}
export interface nameDataEntity {
    name: string;
    data: any;
}
const AgentStatusSummary = (props: AgentStatusSummaryProps) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const [isChartView, setChartView] = useState(false);
    const [showGrid, setShowGrid] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false)
    const [showExportOptions, setshowExportOptions] = useState(false);
    const [isExportAll, setIsExportAll] = useState(false);
    const _export = React.useRef<ExcelExport | null>(null);
    let data: AgentStatusSummaryInfo = {
        "Sender": "ATIDataService",
        "Receiver": "AEConsole_dinesh_1647342939719",
        "MessageType": "AgentStatusSummaryReport",
        "Data": [{ "AgentState": "LoggedIn", "Inbound": 2, "Outbound": 6 }, { "AgentState": "Idle", "Inbound": 3, "Outbound": 0 }, { "AgentState": "PreviewState", "Inbound": 5, "Outbound": 0 }, { "AgentState": "InCall", "Inbound": 0, "Outbound": 0 }, { "AgentState": "ACW", "Inbound": 0, "Outbound": 0 }, { "AgentState": "NotReady", "Inbound": 0, "Outbound": 0 }, { "AgentState": "Offline", "Inbound": 0, "Outbound": 0 }, { "AgentState": "LoggedOff", "Inbound": 0, "Outbound": 0 }],
        "Time": "03/15/2022 11:17:04.157"
    }
    useEffect(() => {
        console.log(_export.current);
        if (_export.current !== null) {
            console.log("isExportAll  All: ", isExportAll)
            if (isExportAll) {
                _export.current.save();
                setIsExportAll(false)
            }

        }
    }, [isExportAll]);
    // const excelExport = (isFromAll: boolean) => {
    //     if (isFromAll) {
    //         setIsExportAll(true)
    //     }

    //     if (_export.current !== null) {
    //         console.log("isExportAll  visible: ", isExportAll)
    //         _export.current.save();
    //     }
    // };
    const filterInboundData = (inBound) => {
        let newArray = [];
        inBound.map((item) => {
            newArray.push([item.Inbound])
        })
        return newArray
    }
    const filterOutboundData = (outBound) => {
        let newArrayData = [];
        outBound.map((item) => {
            newArrayData.push([item.Outbound])
        })
        return newArrayData
    }
    const viewFullScreen = () => {
        chartComponentRef.current.chart.fullscreen.toggle()
    }
    let chartData: nameDataEntity[] = [
        { name: "Inbound", data: filterInboundData(data.Data) },
        { name: "Outbound", data: filterOutboundData(data.Data) },
    ];
    const options = {
        series: chartData,
        chart: {
            type: 'column',
            height: 310,
            spacingBottom: 0,
            events: {
                beforePrint: function () {
                    this.oldhasUserSize = this.hasUserSize;
                    this.resetParams = [this.chartWidth, this.chartHeight, false];

                    this.setSize(1400, 1000, false);
                    this.exportSVGElements[0].box.hide();
                    this.exportSVGElements[1].hide();
                },
                afterPrint: function () {
                    this.setSize.apply(this, this.resetParams);
                    this.hasUserSize = this.oldhasUserSize;
                    this.exportSVGElements[0].box.show();
                    this.exportSVGElements[1].show();
                },
            }
        },
        subtitle: {
            text: 'Inbound vs. Outbound, % '
        },
        xAxis: {
            categories: ["Logged In", "Idle", "PreviewState", "In Call", "After Call Work", "Not Ready", "Offline", "Logged Off"],
        },
        yAxis: {
            labels: {
                format: '{value}%'
            },
            min: 0,
            max: 100,
            title: {
                enabled: false
            }
        },
        // exporting: {
        //     enabled:false,
        //     allowHTML: true,
        //     // showTable: false,
        //     buttons: {
        //          contextButton: {
        //              menuItems: [
        //     //             'printChart',
        //     //             'downloadPNG',
        //     //             'downloadJPEG',
        //     //             'downloadPDF',
        //     //             'downloadSVG',
        //     //             "viewData",
        //                 {
        //                     text: 'DownloadXLSX',
        //                     onclick() {
        //                         this.downloadXLSX();
        //                     },
        //                 },
        //     //             {
        //     //                 text: 'DownloadCSV',
        //     //                 onclick() {
        //     //                     this.getCSV();
        //     //                 },
        //     //             },
        //              ],
        //              enabled: true,
        //          },
        //      }
        // },
        credits: {
            enabled: false
        },
    }
    return (
        <Translation ns={['statelaw', 'common', 'camp']}>
            {
                (t) => <>
                    <div className="agent">

                        {showGrid &&
                            <ExcelExport data={data.Data} ref={_export}>
                                <Grid
                                    data={data.Data}
                                >
                                    <GridToolbar>
                                        <div className="row">
                                            <div className="col-md-6 text-left">
                                                <label>Agent Status Summary</label>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <i className="icon-tool-grid gridbtn" onClick={() => { setShowGrid(true); setChartView(false); }}></i>
                                                <i className="icon-users-reports chartbtn" onClick={() => { setChartView(true); setShowGrid(false) }}></i>
                                                <span className="v-div"></span>

                                                <svg onClick={() => viewFullScreen()} xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-fullscreen custumeFullScreenBtn" viewBox="0 0 16 16">
                                                    <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
                                                </svg>
                                                {isChartView &&
                                                    <OverlayTrigger
                                                        rootClose={true}
                                                        onExit={(event) => { setShowDropdown(false) }}
                                                        show={showDropdown}
                                                        trigger="click" placement="bottom" overlay={
                                                            <Popover id={`popover-basic`} className="agentPopover">
                                                                <Popover.Content>
                                                                    <button onClick={() => setshowExportOptions(true)}
                                                                    >Export Chart as
                                                                </button><br />
                                                                    {showExportOptions && (
                                                                        <div className="p-2">
                                                                            <button onClick={() => chartComponentRef.current.chart.exportChart({
                                                                                type: 'image/svg+xml'
                                                                            }, null)}>SVG</button>
                                                                            <br />
                                                                            <button onClick={() => chartComponentRef.current.chart.exportChart({
                                                                                type: 'image/png'
                                                                            }, null)}>PNG</button>
                                                                            <br />
                                                                            <button onClick={() => chartComponentRef.current.chart.exportChart({
                                                                                type: 'image/jpeg'
                                                                            }, null)}>JPEG</button>
                                                                            <br />
                                                                            <button onClick={() => chartComponentRef.current.chart.exportChart({
                                                                                type: 'application/pdf'
                                                                            }, null)}>PDF</button>
                                                                            <br />
                                                                        </div>
                                                                    )}
                                                                    <button onClick={() => chartComponentRef.current.chart.print()}>Print Chart
                                                                </button>
                                                                </Popover.Content>
                                                            </Popover>
                                                        }>
                                                        <span className={"icon-tool-more customicon"} onClick={(event) => showDropdown ? setShowDropdown(false) : setShowDropdown(true)}></span>
                                                    </OverlayTrigger>
                                                }
                                                {showGrid &&
                                                    <OverlayTrigger
                                                        rootClose={true}
                                                        onExit={(event) => { setshowExportOptions(false) }}
                                                        show={showExportOptions}
                                                        trigger="click" placement="bottom" overlay={
                                                            <Popover id={`popover-basic`} className="profile-action-popup">
                                                                <Popover.Content>
                                                                    <button
                                                                        title="Export all Data as CSV"
                                                                        className=""
                                                                        onClick={() => { setIsExportAll(true) }}
                                                                    >
                                                                        <label> Export Data as CSV  </label>
                                                                    </button>
                                                                    {/* <button
                                                title="Export visible columns as CSV"
                                                className=""
                                                onClick={() => { setIsExportAll(false); excelExport(false) }}
                                            >
                                                <label>  Export visible columns as CSV  </label>
                                            </button> */}
                                                                </Popover.Content>
                                                            </Popover>
                                                        }>
                                                        <span className={"icon-tool-more customicon"} onClick={(event) => showExportOptions ? setshowExportOptions(false) : setshowExportOptions(true)}></span>
                                                    </OverlayTrigger>
                                                }
                                            </div>
                                        </div>
                                    </GridToolbar>
                                    <Column className='text-center'
                                        field="AgentState"
                                        title="Agent State"
                                    />
                                    <Column className='text-center'
                                        field="Inbound"
                                        title="Inbound"
                                    />
                                    <Column className='text-center'
                                        field="Outbound"
                                        title="Outbound"
                                    />
                                </Grid>
                            </ExcelExport>
                        }
                        {
                            isChartView &&

                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                                ref={chartComponentRef}
                                {...props}
                            />

                        }
                    </div>
                </>
            }
        </Translation >
    )
}

export default withTranslation(['statelaw', 'common', 'camp'])(AgentStatusSummary)
