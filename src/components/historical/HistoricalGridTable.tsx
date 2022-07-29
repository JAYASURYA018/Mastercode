import {
  GridPageChangeEvent,
  GridSortChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { t } from "i18next";
import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import { Input } from "reactstrap";
import "./HistoricalReport.scss";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import GridPaging from "../common/gridPagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import HistoricalReportTabs from "./HistoricalReportTabs";
import { IhistoricalGrid } from "../../interface/historical/IhistoricalGrid";
import _, { filter } from "underscore";
import DropDownList from "@progress/kendo-react-dropdowns/dist/npm/DropDownList/DropDownList";
import { Popup } from "@progress/kendo-react-popup";

import {
  ListView,
  ListViewHeader,
  ListViewFooter,
  ListViewItemProps,
} from "@progress/kendo-react-listview";
import HistoricalAddPopup from "./HistoricalAddPopup";

import ItemPop from "./popupitem";
import SchedueReportData from "./SchedueReportData";
import ReportFilter from "../reportFilter/reportFilter";
import HistoricalColumnPopup from "./HistoricalColumnPopup";
import NewHistoricalGridData from "./NewHistoricalGridData";
// import HistoricalItem from "./HistoricalItem";
interface Iprops {
  istableheader: boolean;
  isHeightboolen: boolean;
  isHistoricalName: any;
  historicalpopup: any;
  handlePageChange: any;
  onAddNewChange: any;
  onGridChange: any;
  handlerchangepage: any;
  isreportable: boolean;
  currentclick: string;
}
interface Istate {
  onItemPopUpcancel: any;
  onItemPopUpSave: any;
  newReportName: string;
  currentclick: string;
  description: string;
  isHistoricalPopUp: boolean;
  show: boolean;
  showpop: boolean;
  showdrop: boolean;
  Historicaltabs: boolean;
  totalCount?: number;
  gridData?: Array<IhistoricalGrid>;
  error?: boolean;
  visible?: boolean;
  skip?: number;
  take?: number;
  sort?: any;
  historicalReportTotal?: number;
  pageable?: any;
  pageNumber?: number;
  searchFilter?: string;
  historicalfilter: boolean;
  isHeightboolen?: boolean;
  isSave: boolean;
  scheduleReportPopup: boolean;
  isEditContactStrategy: boolean;
  isFilterOpen?: boolean;
  historicalSampleData: any;
  hello: boolean;
  isTableGridShown: boolean;
  isFiltershown: boolean;
  isColumnPopup: boolean;
}
const sizes = ["Historical Report", "Real Time Report"];

const defaultNs = { ns: ["camp", "common", "callstrategy", "history"] };

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dateObj = new Date();

let month = months[dateObj.getMonth()];
console.log(month);

let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();

let newdate = month + " " + day + "," + year;
class HistoricalGridTable extends Component<Iprops, Istate> {
  anchor: any = React.createRef();

  state: Istate = {
    newReportName: "",
    description: "",
    isSave: false,
    isHistoricalPopUp: false,
    show: false,
    hello: false,
    isColumnPopup: false,
    isFiltershown: false,
    isTableGridShown: false,
    currentclick: "",
    showpop: false,
    showdrop: false,
    Historicaltabs: true,
    historicalfilter: false,
    isHeightboolen: false,
    sort: [{ field: "CampaignGroup", dir: "asc" }],
    skip: 0,
    take: 10,
    pageNumber: 1,
    searchFilter: "",
    pageable: {
      buttonCount: 5,
      info: true,
      type: "numeric",
      pageSizes: true,
      previousNext: true,
    },
    scheduleReportPopup: false,
    isEditContactStrategy: false,
    historicalSampleData: [],
    onItemPopUpcancel: undefined,
    onItemPopUpSave: undefined,
    isFilterOpen: false,
  };

  onOpenScheduleReportPopup = () => {
    this.setState({ scheduleReportPopup: !this.state.scheduleReportPopup });
  };

  onItemPopUpSave = (desc: string, reportName: string) => {
    debugger;
    console.log(desc, reportName);
    this.setState({ description: desc, newReportName: reportName });

    let finalData = {
      isHistoricalName: this.props.isHistoricalName,
      description: desc,
      newReportName: reportName,
      date: newdate,
    };

    this.onSaveData({ ...finalData });
    console.log(finalData);

    this.onItemPopUpcancel();
    // this.setState({ description: "", newReportName: "" });
  };
  onItemPopUpcancel = () => {
    console.log("lksdjflkdsjfsdklf");
    this.setState({ isHistoricalPopUp: false });
  };

  onSaveData = (data) => {
    this.setState({
      historicalSampleData: [...this.state.historicalSampleData, data],
    });
    if (this.state.currentclick === "Save & Exit") {
      this.props.handlerchangepage();
    }
    console.log(this.state.historicalSampleData);
  };

  opengridtable = () => {
    this.setState({ isTableGridShown: true, isFiltershown: false });
  };
  pageChange: (event: GridPageChangeEvent) => void;
  sortChange: (event: GridSortChangeEvent) => void;
  onSearch: (event: any) => void;
  render() {
    const sizes = ["History", "Real Time Report"];

    return (
      <>
        {this.props.isreportable ? (
          <HistoricalReportTabs
            isHistoricalName={this.props.isHistoricalName}
            historicalSampleData={this.state.historicalSampleData}
            historicalpopup={this.props.historicalpopup}
            onAddNewChange={this.props.onAddNewChange}
            onGridChange={this.props.onGridChange}
          />
        ) : (
          <>
            <div>
              {this.props.istableheader ? (
                ""
              ) : (
                <>
                  <header className=" row historicalpage-heading  ">
                    <div className="d-flex justify-content-between gridtool">
                      <div className="historicalgridpagedrop">
                        <h4
                          className="d-flex align align-self-center"
                          style={{ marginLeft: "5px" }}
                        >
                          <span>
                            <img
                              src="./images/Historical-report.png"
                              className="Historicalicon"
                            />
                            <span
                              style={{
                                fontSize: "16px",
                                fontWeight: 700,
                              }}
                            >
                              {" "}
                              <span className="historicalReportData">
                                {this.props.isHistoricalName}
                              </span>
                            </span>
                            <span>
                              {" "}
                              <i
                                className="arrow down "
                                ref={this.anchor}
                                style={{ cursor: "pointer" }}
                              ></i>
                            </span>
                          </span>

                          <span className="border-right pr-16"></span>
                          <span className="matter">
                            {this.state.newReportName}
                          </span>
                        </h4>
                      </div>

                      <div></div>

                      <div className="hisgridtableheader">
                        <img src="./images/clock.png" />
                        <span
                          style={{ color: "#FD7B38", cursor: "pointer" }}
                          onClick={this.onOpenScheduleReportPopup}
                        >
                          Schedule Report
                        </span>
                        <span className="border-right pr-16 mr-16"></span>

                        <img
                          src="./images/send.png"
                          title={t("historical.gridtable.Export", defaultNs)}
                          className="historicalsendimg"
                        />
                        <img
                          src="./images/delete.png"
                          title={t("historical.gridtable.delete", defaultNs)}
                        />
                        <span className="border-right pl-16 mr-16"></span>
                        <button
                          type="button"
                          className="actionbtn k-button k-primary"
                          onClick={() => {
                            this.setState({ show: !this.state.show });
                          }}
                          ref={this.anchor}
                        >
                          {t("history.historicalcallout.action", defaultNs)}
                          <span className="k-icon k-i-arrow-60-down solid-down"></span>
                        </button>
                        <span className="border-left pl-16  ml-16 "></span>
                        <Popup
                          anchor={this.anchor.current}
                          show={this.state.show}
                          popupClass={"popup-contentc"}
                          anchorAlign={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                          popupAlign={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                        >
                          <ListView
                            data={[
                              "Save",
                              "Save As",
                              "Scheduled Report",
                              "Save & Exit",
                              "Exit",
                            ]}
                            item={(props) => (
                              <div
                                onClick={() => {
                                  console.log("logged");
                                  if (
                                    !["Scheduled Report", "Exit"].includes(
                                      props.dataItem
                                    )
                                  ) {
                                    this.setState({
                                      isHistoricalPopUp:
                                        !this.state.isHistoricalPopUp,
                                      currentclick: props.dataItem,
                                      isSave:
                                        props.dataItem === "Save As"
                                          ? true
                                          : false,
                                    });
                                  } else if (
                                    !["Save & Exit", "Exit"].includes(
                                      props.dataItem
                                    )
                                  ) {
                                    this.onOpenScheduleReportPopup();
                                  } else if (![].includes(props.dataItem)) {
                                    this.props.handlerchangepage();
                                  }
                                  this.anchor.current.click();
                                }}
                                className="popup-item"
                                style={{
                                  paddingLeft: "16px",
                                  paddingRight: "16px",
                                  height: "32px",
                                  display: "flex",
                                  alignItems: "center",

                                  cursor: "pointer",
                                }}
                              >
                                {props.dataItem}
                              </div>
                            )}
                            style={{
                              width: "100%",
                            }}
                          />
                        </Popup>
                        {this.state.isHistoricalPopUp && (
                          <ItemPop
                            onSave={this.onItemPopUpSave}
                            onCancel={this.onItemPopUpcancel}
                            currentclick={this.state.currentclick}
                            isEditContactStrategy={false}
                            reportingAction={
                              this.state.isSave
                                ? {
                                    newReportName: this.state.newReportName,
                                    description: this.state.description,
                                  }
                                : {
                                    newReportName: "",
                                    description: "",
                                  }
                            }
                            isHistoricalName={this.props.isHistoricalName}
                          />
                        )}
                        <img
                          src="./images/crossbtn.png"
                          onClick={() => this.props.handlerchangepage()}
                          title={t("history.historicalreport.exist", defaultNs)}
                          className="crossbtn"
                        />
                      </div>
                    </div>
                  </header>
                </>
              )}
            </div>
            <div
              className={`Gridtable ${
                this.props.isHeightboolen ? "firstheight1" : "firstheight"
              }`}
            >
              <div className="row totalpage">
                <div
                  className={` ${
                    this.state.historicalfilter ? "histwidth1" : " histwidth"
                  }`}
                >
                  {this.state.isTableGridShown ? (
                    <>
                      <NewHistoricalGridData />
                    </>
                  ) : (
                    <div className="row">
                      <div className="col-sm-9">
                        <div className="popupattention">
                          <img src="./images/pop-up-attention.png " />
                          <p className="popuptext">
                            Add filters to generate a report..
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <span className="leftcontainer">
                          <p className="cleartext">Clear Filters</p>
                          <button
                            className="generatereportbtn"
                            onClick={() => this.opengridtable()}
                          >
                            Generate Report
                          </button>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {this.state.scheduleReportPopup && (
                  <SchedueReportData
                    isEditContactStrategy={this.state.isEditContactStrategy}
                    onOpenScheduleReportPopup={this.onOpenScheduleReportPopup}
                    isHistoricalName={this.props.isHistoricalName}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default HistoricalGridTable;
