import React, { Component } from "react";
import { Button } from "@progress/kendo-react-buttons";
import "./scheduleReportsStyles.scss";
import { Translation } from "react-i18next";
import DeleteConfirmationPopup from "../common/deleteConfirmationPopup";
import products from "./products.json";
import {
  GridPageChangeEvent,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import _, { any } from "underscore";
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { IscheduleReports } from "../../interface/scheduleReports/IscheduleReports";
import ScheduleReportsGrid from "./scheduleGrid";
import ScheduleReportsPopup from "./scheduleReportsPopup";
import { t } from "i18next";
import ApiConstants from "../../api-constants";
import ApiService from "../../services/api-manager";
import toastrmsg from "../../services/toaster-manager";

const defaultNs = { ns: ["aetools", "sr", "common", "camp", "realtime"] };

interface Iprops {}

interface Istate {
  showTable: any;
  toggleDialog: void;
  visible: boolean;
  table: boolean;
  welcomePage: boolean;
  productsdata: any;
  search: boolean;
  btnName: boolean;
  isWelcomePage?: boolean;
  skip?: number;
  take?: number;
  sort?: any;
  page?: any;
  visit: boolean;
  onOpenPopup: any;
  searchFilter?: string;
  onSearch?: (event: any) => void;
  selected?: number;
  IsDialogopen?: boolean;
  totalCount?: number;
  error?: boolean;
  scheduleReportTotal?: number;
  pageable?: any;
  pageNumber?: number;
  gridData?: Array<IscheduleReports>;
  hello1: boolean;
  sampleData?: any;
  editContractData?: any;
}

class scheduleReports extends React.Component<Istate, Iprops> {
  state: Istate = {
    visible: false,
    table: false,
    sort: [{ field: "ProductID", dir: "asc" }],
    welcomePage: true,
    productsdata: products,
    isWelcomePage: true,
    search: false,
    skip: 0,
    visit: false,
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
    btnName: true,
    showTable: undefined,
    toggleDialog: undefined,
    onOpenPopup: undefined,
    hello1: false,
    sampleData: [],
    editContractData: null,
  };
  public sourceGridData?: Array<IscheduleReports>;

  componentDidMount() {
    this.loadTableDetails();
  }

  loadTableDetails = async () => {
    await ApiService.getAll(ApiConstants.schedulereportgetapi)
      .then((response) => {
        if (response) {
          this.sourceGridData = response;
          let gridData = response.slice(
            this.state.skip,
            this.state.skip + this.state.take
          );
          this.setState({
            gridData: gridData,
          });
        }
      })
      .catch((error) => {
        toastrmsg.toastMessage(t("camp.crt.internalerror", defaultNs), "error");
        console.log(error);
      });
  };

  PageChange = (event: GridPageChangeEvent) => {
    let data: Array<IscheduleReports> = this.filterByValue(
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
      scheduleReportTotal: data.length,
    });
  };

  onOpenPopup = () => {
    this.setState({
      visible: !this.state.visible,
      editContractData: null,
      btnName: true,
    });
  };

  onOpenPopupNew = () => {
    this.setState({
      visible: !this.state.visible,
      editContractData: null,
      btnName: false,
    });
  };

  onclosePopup = () => {
    this.setState({ visible: false });
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
    if (e.target.value) {
      let data: any = this.filterByValue(this.sourceGridData, e.target.value);
      this.setState({
        searchFilter: e.target.value,
        gridData: data.slice(
          this.state.skip,
          this.state.skip + this.state.take
        ),
        scheduleReportTotal: data.length,
      });
    }
    if (e.target.value === "") {
      this.loadTableDetails();
      this.setState({
        searchFilter: "",
      });
    }
  };

  filterByValue = (array: any, value: any) => {
    return _.filter(array, function (o: any) {
      return (
        o.schedulereportname.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    });
  };

  onEdit = (id: any) => {
    let editData = this.state.sampleData.find((record) => record.id == id);
    this.onOpenPopup();
    debugger;
    this.setState({
      editContractData: editData,
      btnName: false,
    });
    console.log("this is edit", editData);
  };

  saveData = (data: any) => {
    console.log("save", data);
    console.log("hello", this.state.sampleData);
    this.setState({
      sampleData: [...this.state.sampleData, data],
      welcomePage: false,
      table: true,
    });
    console.log(this.state.sampleData, "sampleData");
  };

  onDelete = (id: any) => {
    const newTableData = this.state.sampleData.filter((m) => {
      return m.id !== id;
    });
    this.setState({ sampleData: newTableData });
  };

  onUpdate = (id: any, data: any) => {
    let sampleData = this.state.sampleData.map((m) => {
      if (m.id == id) {
        return {
          ...m,
          ...data,
        };
      } else {
        return m;
      }
    });

    this.setState({
      sampleData,
    });
    this.onclosePopup();
  };

  showTable = () => {
    this.setState({
      welcomePage: false,
      visible: false,
      table: true,
    });
  };

  toggleDialog = () => {
    this.setState({ visible: !this.state.visible });
  };

  changeHandler = () => {
    this.setState({ visit: !this.state.visit });
  };

  render() {
    return (
      <div className="scheduleReportsMainContainer">
        <>
          <Translation ns={["aetools", "common", "camp", "sr", "realtime"]}>
            {(t) => (
              <div>
                <div className="scheduleMainBar">
                  <div>
                    <img
                      className="scheduleIcon"
                      src="/images/schedule 1.svg"
                    />
                    <span className="scheduleReportHeading">
                      {t("sr.ScheduleReports", defaultNs)}
                    </span>
                  </div>
                  <div>
                    <Button className="addNewButton" onClick={this.onOpenPopup}>
                      {" "}
                      {t("css.cssgrouplist.buttonaddnew", defaultNs)}{" "}
                      <img className="" src="/images/chevron.svg" />
                    </Button>
                  </div>
                </div>
                <div className="mainbar">
                  <div className="topBar">
                    <img src="/images/list.svg" />
                    <img src="/images/grid.svg" />
                    <img className="searchIcon" src="/images/search.svg" />
                    <input
                      className="searchBox"
                      value={this.state.searchFilter}
                      onChange={(e) => this.onSearch(e)}
                      type="text"
                      placeholder={t(
                        "realtime.filter.tab.cssGroup.search.placeholder",
                        defaultNs
                      )}
                    />
                    <img src="./images/divider.svg" />
                    <span id="Contact-Strategy-Help-Text" className="help-btn">
                      {t("common.help", defaultNs)}
                    </span>
                  </div>
                </div>

                <div className="scheduleBodyContainer">
                  {this.state.welcomePage && (
                    <div className="welcomepage">
                      <h4 className="welcometext">
                        {t("sr.welcome.page", defaultNs)}
                      </h4>
                      <p className="lorem_text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer commodo lacus ac laoreet.
                      </p>
                      <p className="mauris_text">
                        Mauris nulla purus, interdum ac sapien sit amet,
                        scelerisque accumsan neque. Nulla magna.
                      </p>

                      <div>
                        <Button
                          className="ScheduleReportAddNew"
                          onClick={this.onOpenPopup}
                        >
                          {t("sr.welcome.button", defaultNs)}
                        </Button>
                      </div>

                      <div className="watchbox">
                        <p className="watchvideo">Watch Video</p>
                        <div className="divid"></div>
                        <p className="read_artical">Read Article</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Translation>
          {this.state.visible && (
            <ScheduleReportsPopup
              onOpenPopup={this.onOpenPopup}
              isEditContactStrategy={false}
              showTable={this.showTable}
              btnName={this.state.btnName}
              onclosePopup={this.onclosePopup}
              sampleData={this.state.sampleData}
              saveData={this.saveData}
              onUpdate={this.onUpdate}
              editContractData={this.state.editContractData}
            />
          )}

          {this.state.table && (
            <ScheduleReportsGrid
              loadTableDetails={this.loadTableDetails}
              onEdit={this.onEdit}
              sampleData={this.state.sampleData}
              gridData={this.state.gridData}
              sortValue={this.state.sort}
              onSearch={this.onSearch}
              searchFilter={this.state.searchFilter}
              totalCount={this.state.scheduleReportTotal}
              onSortChange={this.sortChange}
              pageable={this.state.pageable}
              take={this.state.take}
              skip={this.state.skip}
              onOpenPopup={this.onOpenPopup}
              toggleDialog={this.toggleDialog}
              onPageChange={this.PageChange}
            />
          )}
        </>
      </div>
    );
  }
}
export default scheduleReports;
