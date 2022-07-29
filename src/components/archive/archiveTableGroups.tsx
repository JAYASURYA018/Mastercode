import React, { Component } from "react";

import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { t } from "i18next";
import ArchiveCoreGrid from "./archiveCoreGrid";
import ArchiveReportingGrid from "./archiveReportingGrid";

import ApiService from "../../services/api-manager";
import ApiConstants from "../../api-constants";

import _ from "underscore";
import { tablegroups } from "../../interface/archive/ItableGroups";
import {
  GridItemChangeEvent,
  GridPageChangeEvent,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { orderBy } from "@progress/kendo-data-query";
import toastrmsg from "../../services/toaster-manager";

const defaultNs: any = { ns: ["aetools", "common"] };
interface Istate {
  searchFilter: string;
  selected: number;
  gridData: any;
  skip: number;
  take: number;
  tableName: string;
  isPurge: boolean;
  isArchive: boolean;
  retentionPeriodInDays: number;
  description: string;
  isSystemTable: boolean;
  archiveDBRetentionPeriodInDays: number;
  isArchiveDBPurge: boolean;
  tableGroupsTotal?: number;
  sort: any;
  pageable?: any;
  originalItem?: any;
}
export default class ArchiveTableGroups extends Component<any, Istate> {
  editField = "inEdit";
  state: Istate = {
    selected: 0,
    tableName: "",
    isPurge: false,
    isArchive: false,
    retentionPeriodInDays: 0,
    description: "",
    isSystemTable: false,
    archiveDBRetentionPeriodInDays: 0,
    isArchiveDBPurge: false,
    gridData: undefined,
    skip: 0,
    take: 10,
    sort: [{ field: "tableName", dir: "asc" }],
    searchFilter: "",
    tableGroupsTotal: 0,
    pageable: {
      buttonCount: 5,
      info: true,
      type: "numeric",
      pageSizes: true,
      previousNext: true,
    },
  };
  enterEdit = (dataItem?: any) => {
    console.log("edit", dataItem);

    let newData = this.state.gridData.map((item) =>
      item.id === dataItem.id
        ? { ...item, inEdit: true }
        : { ...item, inEdit: false }
    );
    this.setState({
      gridData: newData,
      originalItem: dataItem,
    });
  };
  updatecode = (dataItem) => {
    let newData = this.state.gridData.map((item) =>
      item.id === dataItem.id ? { ...item, inEdit: false } : item
    );

    this.setState({
      gridData: newData,
    });
    const reqBody = {
      tableId: dataItem.id,
      daysRetain: dataItem.retentionPeriodInDays,
      isPurge: dataItem.isPurge,
      isArchive: dataItem.isArchive,
      archiveDBDaysRetain: dataItem.archiveDBRetentionPeriodInDays,
      isArchiveDBPurge: dataItem.isArchiveDBPurge,
    };
    ApiService.put(ApiConstants.tablegroupupdateapi, reqBody)
      .then((data) => {
        console.log(data);
        // if(this.state.selected===0){
        //   ApiService.getAll(ApiConstants.coretableapi + "?userId=" + "1")
        //   .then((response) => {
        //     if (response) {
        //       this.sourceGridData = response;
        //     }
        //   })
        // }else if(this.state.selected===1){
        //   ApiService.getAll(ApiConstants.repotingapi + "?userId=" + "1")
        //   .then((response) => {
        //     if (response) {
        //       this.sourceGridData = response;
        //     }
        //   })
        // }

        // this.Coretableapi();
        toastrmsg.toastMessage("success", "success");
      })
      .catch((error) => {
        toastrmsg.toastMessage(
          t("callstrategy.message.error.updateweightage", defaultNs),
          "error"
        );
      });
  };
  handleSelect = (e: TabStripSelectEventArguments) => {
    this.setState({ selected: e.selected });
  };
  public sourceGridData?: Array<tablegroups>;

  async componentDidMount() {}

  Coretableapi = async () => {
    await ApiService.getAll(ApiConstants.coretableapi + "?userId=" + "1")
      .then((response) => {
        if (response) {
          this.sourceGridData = response;
          console.log("sourcedata", this.sourceGridData);
          this.setState({
            gridData: response.slice(this.state.skip, this.state.take),
            tableGroupsTotal: response.length,
          });
        }
      })
      .catch((error) => {});
  };
  ReportingApi = async () => {
    await ApiService.getAll(ApiConstants.repotingapi + "?userId=" + "1")
      .then((response) => {
        if (response) {
          this.sourceGridData = response;
          console.log("sourcedata", this.sourceGridData);
          this.setState({
            gridData: response.slice(this.state.skip, this.state.take),
            tableGroupsTotal: response.length,
          });
        }
      })
      .catch((error) => {});
  };

  updateStateForSwitch = (event?: any, field?: any, props?: any) => {
    props.dataItem[field] = event.value;
    this.state.gridData = this.state.gridData.map((item: any) => {
      return item.id == props.dataItem.id ? props.dataItem : item;
    });
    this.setState({
      gridData: this.state.gridData,
    });
  };
  updateStateForSliderGrid = (event?: any, field?: string, props?: any) => {
    props.gridData.dataItem[field] = event.value;
    this.state.gridData.retentionPeriodInDays = this.state.gridData.map(
      (item: any) => {
        return item.id == props.gridData.dataItem.id
          ? props.gridData.dataItem
          : item;
      }
    );
    this.setState({ gridData: this.state.gridData });
  };
  pageChange = (event: GridPageChangeEvent) => {
    let data: Array<tablegroups> = this.filterByValue(
      this.sourceGridData,
      this.state.searchFilter
    );
    this.setState({
      skip: event.page.skip,
      take: event.page.take,
      gridData: orderBy(data, this.state.sort).slice(
        event.page.skip,
        event.page.skip + event.page.take
      ),
      tableGroupsTotal: data.length,
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

  onSearch = (e) => {
    if (e.target.value) {
      let data = this.filterByValue(this.sourceGridData, e.target.value);
      this.setState({
        searchFilter: e.value,
        gridData: data.slice(
          this.state.skip,
          this.state.skip + this.state.take
        ),
        tableGroupsTotal: data.length,
      });
    }
    if (e.target.value === "") {
      if (this.sourceGridData.length > 11) {
        this.ReportingApi();
      } else {
        this.Coretableapi();
      }

      this.setState({
        searchFilter: "",
      });
    }
  };

  filterByValue = (array: any, value: any) => {
    return _.filter(array, function (o: any) {
      return (
        o.tableName.toLowerCase()?.indexOf(value.toLowerCase()) !== -1 ||
        o.description.toString().indexOf(value.toString()) !== -1 ||
        o.isArchive.toString().indexOf(value.toString()) !== -1
      );
    });
  };
  telephonyOutcomeItemChange = (event: GridItemChangeEvent) => {
    const field = event.field || "";
    const newData = this.state.gridData.map((item: any) =>
      item.id === event.dataItem.id ? { ...item, [field]: event.value } : item
    );
    this.state.gridData = newData;
    this.setState({ gridData: this.state.gridData });
  };
  telephonyOutcomeRowClick = (cellProps?: any) => {
    let data: Array<any> = _.clone(
      this.state.gridData.map((item: any) =>
        item.id === cellProps.dataItem.id
          ? { ...item, inEdit: true }
          : { ...item, inEdit: false }
      )
    );
    this.state.gridData = data;
    this.setState({
      gridData: this.state.gridData,
    });
  };
  cancel = (dataItem) => {
    let originalItem = this.sourceGridData.find((p) => p.id === dataItem.id);
    // console.log("origin",this.state.originalItem);

    let newData = this.state.gridData.map((item) =>
      item.id === dataItem.id
        ? { ...this.state.originalItem, inEdit: false }
        : item
    );
    this.setState({
      gridData: newData,
    });

    // console.log("newdata", newData);
    // this.setState({ gridData: newData });
    // dataItem.inEdit = false;
  };

  render() {
    return (
      <div className="">
        <div className=" tabletabsGroups">
          <div className="d-flex maintablewidth">
            <TabStrip
              selected={this.state.selected}
              onSelect={this.handleSelect}
              className="secondtabs"
            >
              <TabStripTab title="Core Table">
                <ArchiveCoreGrid
                  gridData={this.state.gridData}
                  sortValue={this.state.sort}
                  onPageChange={this.pageChange}
                  skip={this.state.skip}
                  take={this.state.take}
                  pageable={this.state.pageable}
                  onSortChange={this.sortChange}
                  totalCount={this.state.tableGroupsTotal}
                  onSearch={this.onSearch}
                  searchFilter={this.state.searchFilter}
                  updateStateForSliderGrid={this.updateStateForSliderGrid}
                  updateStateForSwitch={this.updateStateForSwitch}
                  telephonyOutcomeRowClick={this.telephonyOutcomeRowClick}
                  telephonyOutcomeItemChange={this.telephonyOutcomeItemChange}
                  enterEdit={this.enterEdit}
                  cancel={this.cancel}
                  updatecode={this.updatecode}
                  Coretableapi={this.Coretableapi}
                  CoretableSourceGridData={this.Coretableapi}
                />
              </TabStripTab>
              <TabStripTab title={t("archive.reportingTables", defaultNs)}>
                <ArchiveReportingGrid
                  gridData={this.state.gridData}
                  sortValue={this.state.sort}
                  onPageChange={this.pageChange}
                  skip={this.state.skip}
                  take={this.state.take}
                  pageable={this.state.pageable}
                  onSortChange={this.sortChange}
                  totalCount={this.state.tableGroupsTotal}
                  onSearch={this.onSearch}
                  searchFilter={this.state.searchFilter}
                  updateStateForSliderGrid={this.updateStateForSliderGrid}
                  telephonyOutcomeRowClick={this.telephonyOutcomeRowClick}
                  telephonyOutcomeItemChange={this.telephonyOutcomeItemChange}
                  enterEdit={this.enterEdit}
                  cancel={this.cancel}
                  updatecode={this.updatecode}
                  ReportingApi={this.ReportingApi}
                  reportingTableSourceGridData={this.ReportingApi}
                  updateStateForSwitch={this.updateStateForSwitch}
                />
              </TabStripTab>
            </TabStrip>
            <div className="searchHeader">
              <span style={{ position: "relative", top: "7px" }}>
                <i className="icon-tool-list listIcon pr-3"></i>
                <i className="icon-tool-grid gridIcon pr-2"></i>
              </span>
              <span className="border-right pr-16 mr-16"></span>

              <img src="./images/search.svg" className="searchbar" />

              <input
                type="text"
                value={this.state.searchFilter}
                onChange={(e) => this.onSearch(e)}
                placeholder={t("common.grid.search.label", defaultNs)}
                className="searchbarToolbar"
              />
              <span className="border-right pr-16  mr-16"></span>
              <span
                title={t("common.help", defaultNs)}
                aria-label={t("common.help", defaultNs)}
                className="help-text-archive"
              >
                Help
              </span>
            </div>
          </div>
        </div>
        <div className="coreTableContainer"></div>
      </div>
    );
  }
}
