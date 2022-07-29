import React, { Component } from "react";
import { t } from "i18next";
import "./HistoricalReport.scss";
import GridPaging from "../common/gridPagination";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import {
  Grid,
  GridColumn,
  GridPageChangeEvent,
  GridSortChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
import HistoricalGridTable from "./HistoricalGridTable";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { TimePicker } from "@progress/kendo-react-dateinputs";
import { Popup } from "@progress/kendo-react-popup";
import { ListView } from "@progress/kendo-react-listview";
import { IcallStrategiesMember } from "../../interface/contactStrategy/IcontactStrategy";
import DeleteConfirmationPopup from "../common/deleteConfirmationPopup";
import { IhistoricalGrid } from "../../interface/historical/IhistoricalGrid";
import { IhistoricalSampleData } from "../../interface/historical/IhistoricalSampleData";
import { orderBy } from "@progress/kendo-data-query";
import _ from "underscore";

const defaultNs = { ns: ["camp", "common", "callstrategy", "history"] };
const sizes = ["History", "Real Time Report"];
interface Iprops {
  isHistoricalName: any;
  historicalSampleData: any;
  historicalpopup: any;
  handlePageChange?: any;
  onAddNewChange: any;
  onGridChange: any;
}

interface Istate {
  gridData?: Array<IhistoricalSampleData>;
  selected: number;
  istableheader: boolean;
  isHeightboolen: boolean;
  show: boolean;
  isDeleteContactStrategy?: boolean;
  historicalReportTotal?: number;
  skip?: number;
  take?: number;
  sort?: any;
  pageable?: any;
  pageNumber?: number;
  searchFilter?: string;
  // onSearch(e)
}

class HistoricalReportTabs extends Component<Iprops, Istate> {
  public sourceGridData?: Array<IhistoricalSampleData>;

  anchor: any = React.createRef();
  state: Istate = {
    show: false,
    selected: -1,
    istableheader: false,
    isHeightboolen: false,
    isDeleteContactStrategy: false,
    sort: [{ field: "isHistoricalName", dir: "asc" }],
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
  };

  async componentDidMount() {
    await this.loadTableDetails();
    // this.temp();
    // historicaldata.map((item) => this.setState({ filed: item }));
  }

  loadTableDetails = () => {
    if (this.props.historicalSampleData) {
      this.sourceGridData = this.props.historicalSampleData;
      console.log("sourceGridData", this.sourceGridData);
      this.setState({
        gridData: this.props.historicalSampleData.slice(
          this.state.skip,
          this.state.take
        ),
        historicalReportTotal: this.props.historicalSampleData.length,
      });
      console.log("this.state.skip", this.state.skip, this.state.take);
    }
  };

  pageChange = (event: GridPageChangeEvent) => {
    let historicalSampleData: Array<IhistoricalSampleData> = this.filterByValue(
      this.sourceGridData,
      (this.state.searchFilter = "")
    );
    console.log(historicalSampleData);
    console.log(this.state.sort, "sort");
    console.log(event.page.skip, "skip");
    console.log(event.page.take, "take");
    this.setState({
      skip: event.page.skip,
      take: event.page.take,
      gridData: orderBy(historicalSampleData, this.state.sort).slice(
        event.page.skip,
        event.page.skip + event.page.take
      ),
      historicalReportTotal: historicalSampleData.length,
    });
  };

  sortChange = (e: GridSortChangeEvent) => {
    this.setState({
      sort: e.sort,
      gridData: orderBy(
        this.filterByValue(this.sourceGridData, this.state.searchFilter),
        e.sort
      ).slice(this.state.skip, this.state.skip + this.state.take),
    });
  };

  onSearch = (e: any) => {
    let data = this.filterByValue(this.sourceGridData, e.target.value);
    console.log("data", data);

    this.setState({
      searchFilter: e.target.value,

      gridData: data.slice(this.state.skip, this.state.skip + this.state.take),
      historicalReportTotal: data.length,
    });
  };

  filterByValue = (array: any, value: any) => {
    return _.filter(array, function (o: any) {
      return (
        o.isHistoricalName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        o.newReportName.toString().indexOf(value.toString()) !== -1

        // o.recordsAffected.toLowerCase()?.indexOf(value.toLowerCase()) !== -1 ||

        // o.tablesAffected.toString()?.indexOf(value.toString()) !== -1
      );
    });
  };

  handleSelect = (e: TabStripSelectEventArguments) => {
    this.setState({ selected: e.selected });
    this.setState({ istableheader: true });
    this.setState({ isHeightboolen: true });
  };

  handleSelectrow;

  openDeleteContactStrategyDialog = (dataItem?: IcallStrategiesMember) => {
    this.selectedContactStrategy = dataItem;
    this.setState({
      isDeleteContactStrategy: !this.state.isDeleteContactStrategy,
    });
  };
  selectedContactStrategy: IcallStrategiesMember;
  deleteschedulereport: () => void;
  render() {
    console.log("historicalSampleData", this.props.historicalSampleData);

    return (
      <div className="historicalCallOutcomeTabsPage">
        <header className=" row page-heading d-flex justify-content-between ">
          <div className="d-flex justify-content-between gridtool">
            <div style={{ marginLeft: "30px" }}>
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
                  <span style={{ color: "#FD7B38", margin: "5px" }}>•</span>
                  <span>{this.props.historicalSampleData.length}</span>
                </span>
                <span>
                  {" "}
                  <i
                    className="arrow down"
                    onClick={() => {
                      this.setState({ show: !this.state.show });
                    }}
                    ref={this.anchor}
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
              </span>
            </div>

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
              style={{ marginTop: "20px" }}
            >
              <ListView
                data={["Historical Report", "Real Time Report"]}
                item={(props) => (
                  <div
                    onClick={() => {
                      console.log("logged");
                      this.anchor.current.click();
                    }}
                    className="popup-item"
                    style={{
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      width: "200px",
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
            <div></div>
            <div className="historyHelpButton">
              <img src="./images/list.png" style={{ paddingRight: "8px" }} />
              <img src="./images/tabs.png" />
              <span className="border-left pl-16 ml-16"></span>
              <button
                type="button"
                className="k-button k-primary"
                onClick={() => this.props.onAddNewChange()}
              >
                {t("history.mainpage.add", defaultNs)}
              </button>
              <span className="border-left pl-16 ml-16"></span>
              <a
                href=""
                id="Contact-Strategy-Help-Text"
                title=""
                className="help-btn"
                aria-label="ContactStrategyHelpText"
              >
                {t("history.help.addpopup", defaultNs)}
              </a>
            </div>
          </div>
        </header>

        <div className="gridtablecolum">
          <>
            <GridToolbar>
              <div
                className="d-flex justify-content-between gridtool"
                style={{ borderBottom: "1px solid #f2f2f2" }}
              >
                <div></div>
                <div></div>
                <div>
                  <img
                    src="./images/tool-search.png"
                    className="historicalsearchbar"
                  />
                  <input
                    type="text"
                    value={this.state.searchFilter}
                    onChange={(e) => this.onSearch(e)}
                    placeholder={t("common.grid.search.label", defaultNs)}
                    className="historicalsearch"
                  />
                </div>
              </div>
            </GridToolbar>

            <Grid
              data={this.state.gridData}
              skip={this.state.skip}
              take={this.state.take}
              pageSize={this.state.take}
              pageable={this.state.pageable}
              total={this.state.historicalReportTotal}
              sortable={{ allowUnsort: false }}
              sort={this.state.sort}
              onPageChange={this.pageChange}
              onSortChange={this.sortChange}
              pager={GridPaging}
              onRowClick={() => this.props.onGridChange()}
              style={{ height: "98%", marginTop: "10px", cursor: "pointer" }}
            >
              <GridColumn
                field=""
                title=""
                width="35%"
                cell={(cellProps) => (
                  <div>
                    {" "}
                    <img
                      src="./images/Historical-report.png"
                      className="tabsicon"
                    />
                  </div>
                )}
              />
              <GridColumn
                field="isHistoricalName"
                title="Report Type"
                width="auto"
              />
              <GridColumn
                field="newReportName"
                title="Report Name"
                width="auto"
              />
              <GridColumn
                field="Generated"
                title="Status"
                width="auto"
                cell={(cellProps) => (
                  <div className="generatebtn">Generated</div>
                )}
              />
              <GridColumn field="date" title="Generated Date" width="auto" />
              <GridColumn
                field="-"
                title="Report Schedules"
                width="auto"
                cell={(cellProps) => <div className="dash">-</div>}
              />
              <GridColumn
                field="Actions"
                title="Actions"
                cell={(cellProps) => (
                  <td>
                    <button
                      id={
                        `Schedule -CopyContactStrategyDialog` +
                        cellProps.dataIndex
                      }
                      name={
                        `Schedule -CopyContactStrategyDialog` +
                        cellProps.dataIndex
                      }
                    >
                      <img src="./images/clock.png" />
                    </button>
                    <button
                      id={
                        `Upload-CopyContactStrategyDialog` + cellProps.dataIndex
                      }
                      name={
                        `Upload-CopyContactStrategyDialog` + cellProps.dataIndex
                      }
                    >
                      <img
                        src="./images/send.png"
                        title={t("historical.gridtable.Export", defaultNs)}
                      />
                    </button>
                    <button
                      id={
                        `Delete-CopyContactStrategyDialog` + cellProps.dataIndex
                      }
                      name={
                        `Delete-CopyContactStrategyDialog` + cellProps.dataIndex
                      }
                      onClick={() => {
                        this.openDeleteContactStrategyDialog(
                          cellProps.dataItem
                        );
                      }}
                    >
                      <img
                        src="./images/delete.png"
                        title={t("historical.gridtable.delete", defaultNs)}
                      />
                    </button>
                  </td>
                )}
              />
            </Grid>

            {this.state.isDeleteContactStrategy && (
              <DeleteConfirmationPopup
                titleContent={t("common.delete.selection", defaultNs)}
                contentName={this.selectedContactStrategy.isHistoricalName}
                popUpCloseClick={this.openDeleteContactStrategyDialog}
                description={t("historical.action.delete.confirm", defaultNs)}
                iconClass={""}
                handleDeleteClick={this.deleteschedulereport}
              />
            )}
          </>
        </div>
      </div>
    );
  }
}

export default HistoricalReportTabs;
