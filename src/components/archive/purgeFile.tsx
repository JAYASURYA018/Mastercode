import React, { Component } from "react";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { t } from "i18next";
import { Input } from "@progress/kendo-react-inputs";

import PurgeFileWelcomePage from "./purgeFileWelcomePage";
import _ from "underscore";

import {
  GridPageChangeEvent,
  GridSortChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { orderBy } from "@progress/kendo-data-query";
import ApiService from "../../services/api-manager";
import ApiConstants from "../../api-constants";
import toastrmsg from "../../services/toaster-manager";
import { Ipurgefile } from "../../interface/archive/IPurgeFileConfigurationGrid";
import PurgeSettingsWelcomePage from "./purgesettingsWelcome";
import { Interface } from "readline";

interface Istate {
  selected?: number;
  IsDialogopen?: boolean;
  Isdialogopen?: boolean;
  productsdata?: any;
  Addnew: boolean;
  searchFilter?: string;
  allDataObject: {
    PurgeFileName: string;
    purgeFolderDescription: string;
  };
  totalCount?: number;
  onSearch?: (event: any) => void;
  error?: boolean;
  visible?: boolean;
  skip?: number;
  take?: number;
  GridData?: any;
  sort?: any;
  purgefileTotal?: number;
  isDeleteContactStrategy: boolean;
  pageable?: any;
  pageNumber?: number;
  sampleData?: any;
  editContractData?: any;
  welcomePage: boolean;
  table: boolean;
  btnName: boolean;
  list?: any;
}

interface Iprops {
  selected: any;
}

const defaultNs: any = { ns: ["camp", "common", "aetools"] };

class PurgeFile extends Component<Iprops, Istate> {
  state: Istate = {
    IsDialogopen: false,
    Isdialogopen: false,
    selected: 0,
    searchFilter: "",
    sort: [{ field: "ProductID", dir: "asc" }],
    isDeleteContactStrategy: false,
    skip: 0,
    take: 10,
    Addnew: false,
    btnName: true,
    pageNumber: 1,
    allDataObject: {
      PurgeFileName: "",
      purgeFolderDescription: "",
    },
    pageable: {
      buttonCount: 5,
      info: true,
      type: "numeric",
      pageSizes: true,
      previousNext: true,
    },
    sampleData: [],
    editContractData: null,
    welcomePage: true,
    table: false,
  };
  public sourceGridData?: any;

  async componentDidMount() {
    if (this.state.selected === 0) {
      await this.loadTableDetails();
    } else {
      await this.LoadSettingsTable();
    }
  }

  loadTableDetails = async () => {
    await ApiService.getAll(ApiConstants.purgefilepostapi)
      .then((response) => {
        debugger;
        console.log("response", response);
        if (response) {
          this.sourceGridData = response;

          console.log("sourceGridData", this.sourceGridData);
          this.setState({
            GridData: response.slice(
              this.state.skip,
              this.state.skip + this.state.take
            ),
          });
          this.setState({
            list: this.state.GridData,
          });
        }
      })
      .catch((error) => {
        toastrmsg.toastMessage(t("camp.crt.internalerror", defaultNs), "error");
        console.log(error);
      });
  };

  LoadSettingsTable = async () => {
    await ApiService.getAll(ApiConstants.purgeFileSettings)
      .then((response) => {
        debugger;
        console.log("response", response);
        if (response) {
          this.sourceGridData = response;
          console.log("sourceGridData", this.sourceGridData);
          this.setState({
            GridData: response.slice(
              this.state.skip,
              this.state.skip + this.state.take
            ),
          });
        }
      })
      .catch((error) => {
        toastrmsg.toastMessage(t("camp.crt.internalerror", defaultNs), "error");
        console.log(error);
      });
  };

  handleInputChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState((prevState: Istate) => {
      return {
        allDataObject: {
          ...prevState.allDataObject,

          [name]: value,
        },
      };
    });
    console.log("jayasurya update", this.state.allDataObject);
  };

  SaveData = async (data) => {
    await ApiService.post(ApiConstants.purgefilepost, data)
      .then((response) => {
        this.setState(() => {
          this.loadTableDetails();
        });
      })
      .catch((error) => {
        toastrmsg.toastMessage(t("camp.crt.internalerror", defaultNs), "error");
      });
  };

  pageChange = (event: GridPageChangeEvent) => {
    let data: Array<Ipurgefile> = this.filterByValue(
      this.sourceGridData,
      this.state.searchFilter
    );
    this.setState({
      skip: event.page.skip,
      take: event.page.take,
      GridData: orderBy(data, this.state.sort).slice(
        event.page.skip,

        event.page.skip + event.page.take
      ),

      purgefileTotal: data.length,
    });
  };

  PurgeDialog = () => {
    this.setState({
      IsDialogopen: true,
      editContractData: null,
    });
  };

  onOpenPopupAddNew = () => {
    this.setState({
      IsDialogopen: true,
      editContractData: null,
      btnName: true,
    });
  };

  onclosePopup = () => {
    this.setState({ IsDialogopen: false });
  };

  sortChange = (e: GridSortChangeEvent) => {
    this.setState({
      sort: e.sort,

      GridData: orderBy(
        this.filterByValue(this.sourceGridData, this.state.searchFilter),
        e.sort
      ).slice(this.state.skip, this.state.skip + this.state.take),
    });
  };

  onSearch = (e: any) => {
    let data = this.filterByValue(this.sourceGridData, e.target.value);
    this.setState({
      searchFilter: e.target.value,
      GridData: data.slice(this.state.skip, this.state.skip + this.state.take),
      purgefileTotal: data.length,
    });
  };

  filterByValue = (array: any, value: any) => {
    if (this.state.selected === 0) {
      return _.filter(array, function (o: any) {
        return (
          o.purgeFolderDescription
            .toLowerCase()
            ?.indexOf(value.toLowerCase()) !== -1
        );
      });
    } else if (this.state.selected === 1) {
      return _.filter(array, function (o: any) {
        return (
          o.purgeFileSettingsName
            .toLowerCase()
            ?.indexOf(value.toLowerCase()) !== -1
        );
      });
    }
  };

  handleSelect = (e: TabStripSelectEventArguments) => {
    this.setState({
      selected: e.selected,
      Addnew: !this.state.Addnew,
    });
  };

  onEdit = (id) => {
    let editData = this.state.sampleData.find((record) => record.id == id);
    this.PurgeDialog();
    debugger;
    this.setState({
      editContractData: editData,
    });
    this.setState({
      btnName: false,
    });
  };

  onUpdate = (id, data) => {
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
    this.setState({ welcomePage: false, IsDialogopen: false, table: true });
    console.log(this.state.table);
  };

  PostData = async (data) => {
    await ApiService.post(ApiConstants.purgeFileSettingsPost, data)
      .then((response) => {
        this.setState({}, () => {
          this.LoadSettingsTable();
        });
      })
      .catch((error) => {
        toastrmsg.toastMessage(t("camp.crt.internalerror", defaultNs), "error");
      });
  };

  PurgeSettingsOnEdit = (id) => {
    let editData = this.state.sampleData.find((record) => record.id == id);
    this.PurgeDialog();
    debugger;
    this.setState({
      editContractData: editData,
    });
    this.setState({
      btnName: false,
    });
  };
  ShowGridTable = () => {
    this.setState({ welcomePage: false, Isdialogopen: false, table: true });
    console.log(this.state.table);
  };

  SettingsDialog = () => {
    this.setState({
      Isdialogopen: true,
      editContractData: null,
    });
  };

  OncloseSettingspopup = () => {
    this.setState({ Isdialogopen: false });
  };

  render() {
    return (
      <>
        <div className="d-flex PurgeFileConfiguration ">
          <div className="tabletabs">
            <div className="Tabstrip">
              <TabStrip
                selected={this.state.selected}
                onSelect={this.handleSelect}
                className="purgetabs"
              >
                <TabStripTab title="Purge Files">
                  <div>
                    <p>
                      <PurgeFileWelcomePage
                        GridData={this.state.GridData}
                        sortValue={this.state.sort}
                        onOpenPopup={this.PurgeDialog}
                        btnName={this.state.btnName}
                        onPageChange={this.pageChange}
                        isDeleteContactStrategy={
                          this.state.isDeleteContactStrategy
                        }
                        skip={this.state.skip}
                        handleInputChange={this.handleInputChange}
                        take={this.state.take}
                        pageable={this.state.pageable}
                        onSortChange={this.sortChange}
                        totalCount={this.state.purgefileTotal}
                        onclosePopup={this.onclosePopup}
                        onSearch={this.onSearch}
                        searchFilter={this.state.searchFilter}
                        IsDialogopen={this.state.IsDialogopen}
                        SaveData={this.SaveData}
                        onUpdate={this.onUpdate}
                        onEdit={this.onEdit}
                        sampleData={this.state.sampleData}
                        editContractData={this.state.editContractData}
                        showTable={this.showTable}
                        welcomePage={this.state.welcomePage}
                        table={this.state.table}
                        loadTableDetails={this.loadTableDetails}
                        allDataObject={this.state.allDataObject}
                        sourceGridData={this.sourceGridData}
                      />
                    </p>
                  </div>
                </TabStripTab>

                <TabStripTab title="Purge File Settings">
                  <div>
                    <p>
                      <PurgeSettingsWelcomePage
                        GridData={this.state.GridData}
                        sortValue={this.state.sort}
                        onOpenPopup={this.SettingsDialog}
                        btnName={this.state.btnName}
                        onPageChange={this.pageChange}
                        skip={this.state.skip}
                        take={this.state.take}
                        pageable={this.state.pageable}
                        onSortChange={this.sortChange}
                        totalCount={this.state.purgefileTotal}
                        onclosePopup={this.OncloseSettingspopup}
                        onSearch={this.onSearch}
                        searchFilter={this.state.searchFilter}
                        Isdialogopen={this.state.Isdialogopen}
                        saveData={this.PostData}
                        onUpdate={this.onUpdate}
                        PurgeSettingsOnEdit={this.PurgeSettingsOnEdit}
                        sampleData={this.state.sampleData}
                        editContractData={this.state.editContractData}
                        showTable={this.ShowGridTable}
                        welcomePage={this.state.welcomePage}
                        table={this.state.table}
                        LoadSettingsTable={this.LoadSettingsTable}
                        sourceGridData={this.sourceGridData}
                      />
                    </p>
                  </div>
                </TabStripTab>
              </TabStrip>
            </div>
          </div>

          {this.sourceGridData && this.sourceGridData.length ? (
            <div>
              <>
                <div className="tileview"></div>

                <div className="headerright">
                  <div className="Tileviewupdated">
                    <i className="icon-tool-grid grid-icon"></i>
                  </div>

                  <i className="icon-tool-list list-icon"></i>

                  <img src="/images/divider.svg" className="firstdeviderimg" />

                  <div>
                    <span>
                      <Input
                        placeholder={t("common.grid.search.label", defaultNs)}
                        id="ContactStrategy-Data-Filter"
                        name="ContactStrategy-Data-Filter"
                        value={this.state.searchFilter}
                        onChange={(e) => this.onSearch(e)}
                        aria-label={t("common.grid.search.label", defaultNs)}
                        className="SearchBar"
                      />
                    </span>

                    <span className="searchicontable">
                      <i className="icon-tool-search"></i>
                    </span>
                    {this.state.Addnew ? (
                      <button
                        className="k-buttonk-primaryAdd-new"
                        id="Cancel-ContactStrategy"
                        name="Cancel-ContactStrategy"
                        onClick={this.SettingsDialog}
                        aria-label="Cancel-ContactStrategy"
                      >
                        {t("archive.purgefile.AddNew", defaultNs)}
                      </button>
                    ) : (
                      <button
                        className="k-buttonk-primaryAdd-new"
                        id="Cancel-ContactStrategy"
                        name="Cancel-ContactStrategy"
                        onClick={this.PurgeDialog}
                        aria-label="Cancel-ContactStrategy"
                      >
                        {t("archive.purgefile.AddNew", defaultNs)}
                      </button>
                    )}

                    <img
                      src="/images/divider.svg"
                      className="seconddeviderimg"
                    />

                    <a
                      href=""
                      id="Contact-Strategy-Help-Text"
                      title="Purge-File-Help-Text"
                      className="help-btn1"
                      aria-label="ContactStrategyHelpText"
                    >
                      Help
                    </a>
                  </div>
                </div>
              </>
            </div>
          ) : (
            <div className="dividerHelp">
              <img src="/images/divider.svg" className="seconddeviderimg" />

              <a
                href=""
                id="Contact-Strategy-Help-Text"
                title="Purge-File-Help-Text"
                className="help-btn1"
                aria-label="ContactStrategyHelpText"
              >
                Help
              </a>
            </div>
          )}

          {/* <GridToolbar>
            <div className="row">
              <div className="col-md-6"></div>

              <div className="col-md-6 text-right search-input">
                <i className="icon-tool-search"></i>

                <Input
                  placeholder={t("common.grid.search.label", defaultNs)}
                  id="ContactStrategy-Data-Filter"
                  name="ContactStrategy-Data-Filter"
                  aria-label={t("common.grid.search.label", defaultNs)}
                  value={this.state.searchFilter}
                  onChange={(e) => this.onSearch(e)}
                  className="search-filter"
                />

                <span className="border-left pl-16">
                  <a
                    href=""
                    id="Contact-Strategy-Help-Text"
                    title="Contact-Strategy-Help-Text"
                    className="help-btn"
                    aria-label="ContactStrategyHelpText"
                  >
                    Help
                  </a>
                </span>
              </div>
            </div>
          </GridToolbar> */}
        </div>
      </>
    );
  }
}

export default PurgeFile;
