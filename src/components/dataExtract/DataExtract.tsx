import { Button } from "@progress/kendo-react-buttons";
import AddDataExtract from "./AddDataExtract";
import { Translation } from "react-i18next";

import "./_dataExtract.scss";
import { GridToolbar } from "@progress/kendo-react-grid";
import GridTable from "./GridTable";
import React, { Component } from "react";

const defaultNs = { ns: ["extractor"] };

interface Istate {
  isEditContactStrategy?: boolean;
  isDataExtract?: boolean;
  isWelcomePage?: boolean;
  isShowTable?: boolean;
  sampleData?: Array<any>;
  editContractData: any;
}

class DataExtract extends Component<Istate> {
  state: Istate = {
    isEditContactStrategy: false,
    isDataExtract: false,
    isWelcomePage: true,
    isShowTable: false,
    sampleData: [],
    editContractData: null,
  };

  openAddEditContactStrategy = () => {
    this.setState({ isDataExtract: true, editContractData: null });
  };

  closeAddEditContactStrategy = () => {
    this.setState({ isDataExtract: false });
  };

  showTable = () => {
    this.setState({
      isWelcomePage: false,
      isDataExtract: false,
      IsShowTable: true,
    });
  };

  saveData = (data) => {
    this.setState({
      sampleData: [...this.state.sampleData, data],
      isWelcomePage: false,
      isDataExtract: false,
      isShowTable: true,
    });
  };

  onDelete = (dataExtractName: any) => {
    const newTableData = this.state.sampleData.filter((m) => {
      return m.dataExtractName !== dataExtractName;
    });
    this.setState({ sampleData: newTableData });
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
      isDataExtract: false,
    });
  };

  onEdit = (id) => {
    let editContractData = this.state.sampleData.find(
      (record) => record.id == id
    );

    debugger;
    this.setState({
      isDataExtract: true,
      editContractData: editContractData,
    });
  };

  render() {
    return (
      <div>
        <Translation ns={["extractor"]}>
          {(t) => (
            <>
              <div
                className="row page-heading d-flex justify-content-between"
                style={{ height: "42px", marginBottom: "5px" }}
              >
                <div className="col-md-3" style={{ paddingLeft: "27px" }}>
                  <h4 className="d-flex align align-self-center">
                    <div className="d-inline-block pt-1 pr-2 ">
                      {/* <i className="icon-contact-strategy"></i> */}
                      <img
                        src="./images/archive.svg"
                        className="archivedataextract"
                      />
                    </div>
                    {t("er.ExtractorReports", defaultNs)}
                  </h4>
                </div>

                <div className="col-md-9">
                  <Button className="dataExtractExit">
                    {t("er.btn.exit", defaultNs)}
                  </Button>
                </div>
              </div>

              {this.state.isWelcomePage && (
                <>
                  <div className="dataextractmainpage">
                    <GridToolbar>
                      <div
                        className="row"
                        style={{
                          marginLeft: "13px",
                          display: "flex",
                          borderBottom: "1px solid #f2f2f2",
                          width: "100%",
                          height: "40px",
                        }}
                      >
                        <div style={{ flex: "1" }}></div>

                        <span style={{ flex: "0 5%" }}>
                          <a
                            href=""
                            id="Contact-Strategy-Help-Text"
                            title="="
                            className="help-btn dataHelp border-left pl-16"
                            aria-label="ContactStrategyHelpText"
                          >
                            {t("er.btn.help", defaultNs)}
                          </a>
                        </span>
                      </div>
                    </GridToolbar>

                    <div className="dataExtractData">
                      <h4 className="welcometext">Welcome to Data Extract </h4>

                      <p className="loremText">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer commodo lacus ac laoreet.
                      </p>

                      <p className="maurisText">
                        Mauris nulla purus, interdum ac sapien sit amet,
                        scelerisque accumsan neque. Nulla magna.
                      </p>

                      <button
                        onClick={this.openAddEditContactStrategy}
                        className=" dataExtractButton"
                      >
                        + Add Data Extract
                      </button>

                      <div className="watchbox">
                        <p className="watchvideo"> Watch Video</p>

                        <div className="divid"></div>

                        <p className="read_artical">Read Article</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {this.state.isDataExtract && (
                <AddDataExtract
                  isEditContactStrategy={this.state.isEditContactStrategy}
                  closeAddEditContactStrategy={this.closeAddEditContactStrategy}
                  showTable={this.showTable}
                  saveData={this.saveData}
                  onEdit={this.onEdit}
                  editContractData={this.state.editContractData}
                  onUpdate={this.onUpdate}
                />
              )}

              {this.state.isShowTable ? (
                <GridTable
                  sampleData={this.state.sampleData}
                  openAddEditContactStrategy={this.openAddEditContactStrategy}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                />
              ) : (
                ""
              )}
            </>
          )}
        </Translation>
      </div>
    );
  }
}

export default DataExtract;
