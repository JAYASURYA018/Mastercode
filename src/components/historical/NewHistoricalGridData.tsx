import { orderBy } from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn,
  GridPageChangeEvent,
  GridSortChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { t } from "i18next";
import { title } from "process";
import React, { Component } from "react";
import _ from "underscore";
import { IhistoricalGrid } from "../../interface/historical/IhistoricalGrid";
import GridPaging from "../common/gridPagination";
import HistoricalColumnPopup from "./HistoricalColumnPopup";
import historicaldata from "./HistoricalGridtable.json";

const defaultNs = { ns: ["camp", "common", "callstrategy", "history"] };

import cloneDeep from "lodash/cloneDeep";
import ReportFilter from "../reportFilter/reportFilter";

interface Istate {
  gridData?: Array<IhistoricalGrid>;
  originalGridData?: Array<IhistoricalGrid>;
  skip?: number;
  take?: number;
  sort?: any;
  pageable?: any;
  pageNumber?: number;
  searchFilter?: string;
  historicalfilter: boolean;
  isColumnPopup: boolean;
  hello: boolean;
  campaignData: Array<any>;
  singleCompaign: any;
  isSelected: any;
  historicalReportTotal?: number;
  tempdata: any;
  filedss: any;
  isFiltershown: boolean;
  dummydata: any;
  temcheck: any;
  _filterColumn: any;
}

interface Iprops {}
class NewHistoricalGridData extends Component<Iprops, Istate> {
  public sourceGridData?: Array<any>;

  state: Istate = {
    sort: [{ field: "CampaignGroup", dir: "asc" }],
    skip: 0,
    take: 10,
    pageNumber: 1,
    searchFilter: "",
    tempdata: [],
    filedss: [],
    dummydata: "",
    temcheck: 0,
    pageable: {
      buttonCount: 5,
      info: true,
      type: "numeric",
      pageSizes: true,
      previousNext: true,
    },
    historicalfilter: false,
    isColumnPopup: false,
    isFiltershown: false,
    hello: false,
    campaignData: historicaldata,
    singleCompaign: historicaldata[0],
    isSelected: historicaldata.length > 0 ? Object.keys(historicaldata[0]) : [],
    _filterColumn:
      historicaldata.length > 0 ? Object.keys(historicaldata[0]) : [],
  };

  async componentDidMount() {
    await this.loadTableDetails();
  }

  loadTableDetails = () => {
    if (historicaldata) {
      this.sourceGridData = historicaldata;
      console.log("sourceGridData", this.sourceGridData);
      this.setState({
        gridData: historicaldata.slice(this.state.skip, this.state.take),
        historicalReportTotal: historicaldata.length,
      });
      console.log("this.state.skip", this.state.skip, this.state.take);
    }
  };

  pageChange = (event: GridPageChangeEvent) => {
    let historicaldata: Array<IhistoricalGrid> = this.filterByValue(
      this.sourceGridData,
      (this.state.searchFilter = "")
    );
    console.log(historicaldata);
    console.log(this.state.sort, "sort");
    console.log(event.page.skip, "skip");
    console.log(event.page.take, "take");
    this.setState({
      skip: event.page.skip,
      take: event.page.take,
      gridData: orderBy(historicaldata, this.state.sort).slice(
        event.page.skip,
        event.page.skip + event.page.take
      ),
      historicalReportTotal: historicaldata.length,
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
        o.CampaignGroup.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        o.CampaignID.toString().indexOf(value.toString()) !== -1
      );
    });
  };

  handleFilterChange = () => {
    this.setState({
      historicalfilter: !this.state.historicalfilter,
      isFiltershown: true,
    });
  };

  onCompaignSelectAll = (e: any) => {
    debugger;
    let checkedList = [];
    if (e.target.value) {
      Object.keys(this.state.singleCompaign).forEach((key) => {
        checkedList.push(key);
      });
    }

    this.setState({
      _filterColumn: checkedList,
    });
  };

  FilterObjsInArr = (arr, selection) => {
    const FilteredArray = [];
    arr.map((obj) => {
      const filteredObj = {};
      for (let key in obj) {
        if (selection.includes(key)) {
          filteredObj[key] = obj[key];
        }
      }
      FilteredArray.push(filteredObj);
    });
    return FilteredArray;
  };

  onCompaignSelect = (checked: any, data: any) => {
    let checkedList = JSON.parse(JSON.stringify(this.state._filterColumn));
    if (checked) {
      if (!checkedList.includes(data)) {
        debugger;
        checkedList.push(data);
      }
    } else {
      if (checkedList.indexOf(data) >= 0) {
        checkedList.splice(checkedList.indexOf(data), 1);
      }
    }

    console.log("checkedList", checkedList);
    this.setState({
      _filterColumn: checkedList,
    });
  };

  onApplyFilter = () => {
    debugger;
    console.log(this.state._filterColumn);
    console.log(this.state.isSelected);

    this.setState((prevState) => {
      return {
        isSelected: [...prevState._filterColumn],
        isColumnPopup: false,
      };
    });
  };

  handlerpopup = () => {
    this.setState({ isColumnPopup: !this.state.isColumnPopup });
  };

  render() {
    const { isSelected, _filterColumn } = this.state;
    console.log(isSelected, "isslect");

    return (
      <>
        <div className="" style={{ display: "flex" }}>
          <div
            className={
              this.state.historicalfilter ? "histwidth1" : " histwidth"
            }
          >
            <GridToolbar>
              <div
                className="d-flex justify-content-between gridtool"
                style={{ borderBottom: "1px solid #f2f2f2" }}
              >
                <div style={{ marginTop: "8px", cursor: "pointer" }}>
                  <i className="icon-tool-list list-icon  list"></i>
                  <i className="icon-tool-grid grid-icon "></i>
                </div>
                <div>
                  <img
                    src="./images/columns.png"
                    style={{ cursor: "pointer" }}
                    onClick={this.handlerpopup}
                  />
                  <span className="border-right pr-16 mr-3 "></span>
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
                  <span className="border-right pr-16 mr-3 "></span>
                  {this.state.historicalfilter ? (
                    <img
                      src="./images/chevron-left.png"
                      // className="icon-tool-forward toolbar"

                      title={t("historical.gridtable.CloseFilters", defaultNs)}
                      onClick={this.handleFilterChange}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <img
                      src="./images/filter.png "
                      className="mr-3"
                      title={t("historical.gridtable.filter", defaultNs)}
                      onClick={() => this.handleFilterChange()}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </div>
              </div>
            </GridToolbar>

            <Grid
              style={{ height: "645px" }}
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
            >
              {isSelected && isSelected.length ? (
                isSelected.map((item, i) => (
                  <GridColumn
                    field={item}
                    key={i}
                    width="150px"
                    className="allColumnsData"
                  />
                ))
              ) : (
                <GridColumn field={""} width="0px" />
              )}
            </Grid>
          </div>

          <div className={` ${this.state.isFiltershown ? "emptyspace" : ""}`}>
            {this.state.isFiltershown ? (
              <div>
                <ReportFilter
                  defaultStateOfBtn={function (): void {}}
                  mainBtnShow={(show) => {}}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {this.state.isColumnPopup && (
          <HistoricalColumnPopup
            onCompaignSelectAll={this.onCompaignSelectAll}
            onCompaignSelect={this.onCompaignSelect}
            _filterColumn={this.state._filterColumn}
            singleCompaign={this.state.singleCompaign}
            onApplyFilter={this.onApplyFilter}
            handlerpopup={this.handlerpopup}
          />
        )}
      </>
    );
  }
}

export default NewHistoricalGridData;
