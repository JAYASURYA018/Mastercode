import React, { Component } from "react";
import "./HistoricalReport.scss";
import HistoricalCallOutcome from "./HistoricalCallOutcome";
import { Button } from "@progress/kendo-react-buttons";
import "./HistoricalReport.scss";
import * as ReactDOM from "react-dom";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Row } from "reactstrap";
import AddHistoricalPopUp from "./HistoricalAddPopup";
import { Input, RadioButtonChangeEvent } from "@progress/kendo-react-inputs";
import { t } from "i18next";
import { Translation } from "react-i18next";
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { GridSortChangeEvent } from "@progress/kendo-react-grid";
import CallOutCome from "./HistoricalCallOutcome";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import HistoricalAddPopup from "./HistoricalAddPopup";
import HistoricalGridTable from "./HistoricalGridTable";
import { Popup } from "@progress/kendo-react-popup";
import { ListView } from "@progress/kendo-react-listview";

const defaultNs = { ns: ["history"] };
const sizes = ["Historical Report", "Real Time Report"];

interface Iprops {
  isreportable: boolean;
  isHistoricalName: any;
}
interface Istate {
  isHistoricalPopUp: boolean;
  welcomePage: boolean;
  table: boolean;
  selectedValue: number;
  isCallOutComess: boolean;
  isHistoricalName: any;
  istableheader: boolean;
  isHeightboolen: boolean;
  show: boolean;
  reportingtable: boolean;
  isreportable: boolean;
  currentclick: string;
}

class Historicalmainpage extends Component<Iprops, Istate> {
  anchor: any = React.createRef();

  state: Istate = {
    isHistoricalPopUp: false,
    welcomePage: true,
    table: false,
    selectedValue: 1,
    isCallOutComess: false,
    isHistoricalName: "",
    istableheader: false,
    isHeightboolen: false,
    show: false,
    reportingtable: false,
    isreportable: false,
    currentclick: "",
  };

  showTable = () => {
    this.setState({
      welcomePage: false,
      isHistoricalPopUp: !this.state.isHistoricalPopUp,
      isCallOutComess: true,
    });
  };

  showGridTable = () => {
    this.setState({
      isreportable: false,
      isHistoricalPopUp: !this.state.isHistoricalPopUp,
      isCallOutComess: true,
    });
  };

  handlerchangepage = () => {
    this.setState({ isreportable: true });
  };

  historicalpopup = () => {
    this.setState({ isHistoricalPopUp: !this.state.isHistoricalPopUp });
  };

  handlePageChange = () => {
    debugger;
    if (this.state.selectedValue && this.state.isHistoricalName) {
      this.showTable();
    } else {
      alert("plz select atleast one");
    }
  };

  handleChange = (e: RadioButtonChangeEvent) => {
    const modeName = e.value;
    this.setState({ isHistoricalName: modeName });
    console.log("isHistoricalNamadddpopup", this.state.isHistoricalName);
    this.setState({ selectedValue: modeName });
    console.log("selectedValue", this.state.selectedValue);
  };

  onAddNewChange = () => {
    if (this.state.selectedValue && this.state.isHistoricalName) {
      this.showGridTable();
    } else {
      alert("plz select atleast one");
    }
  };

  onGridChange = () => {
    console.log("ayesha");
    this.setState({ isreportable: false, isCallOutComess: true });
  };

  render() {
    console.log("gridtablemain", this.state.isHistoricalName);
    return (
      <Translation ns={["history"]}>
        {(t) => (
          <>
            <div>
              {this.state.welcomePage && (
                <>
                  <header className=" row historicalpage-heading  ">
                    {/* <div className="d-flex justify-content-between gridtool">
                      <div style={{ marginLeft: "28px" }}>
                        <div>
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
                                {t("history.pageHeader.header", defaultNs)}
                              </span>
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
                      </div>
                      <div></div>
                      <div>
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
                    </div> */}
                    <div className="d-flex justify-content-between gridtool">
                      <div className="historicalmainpagedrop">
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
                              {t("history.pageHeader.header", defaultNs)}
                            </span>
                          </span>
                          <span>
                            {" "}
                            <i
                              className="arrow down "
                              onClick={() => {
                                this.setState({ show: !this.state.show });
                              }}
                              ref={this.anchor}
                              style={{ cursor: "pointer" }}
                            ></i>
                          </span>
                        </span>
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
                      </div>

                      <div></div>

                      <div className="historicalmainpagedrop">
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
                  <div className="Historicalpage">
                    <h4 className="Historicalwelcometext">
                      {" "}
                      {t("history.welcome.report", defaultNs)}
                    </h4>
                    <p className="historicaltext">
                      Ut enim ad minima veniam, quis nostrum exercitationem
                      ullam corporis suscipit laboriosam, nisi ut aliquid.
                    </p>
                    <p className="Historical_text">
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis praesentium voluptatum deleniti atque.
                    </p>
                    <div>
                      <button
                        onClick={this.historicalpopup}
                        type="button"
                        className=" addDataExtractButton"
                      >
                        {t("history.wecomepage.addreport", defaultNs)}
                      </button>
                    </div>
                    <div className="Historicalwatchbox">
                      <p className="Historicalwatchvideo">
                        {" "}
                        {t("history.welcomepage.watch", defaultNs)}{" "}
                      </p>
                      <div className="Historicaldivid"></div>
                      <p className="Historicalread_artical">
                        {" "}
                        {t("history.welcomepage.readarticle", defaultNs)}{" "}
                      </p>
                    </div>
                  </div>
                </>
              )}
              {this.state.isHistoricalPopUp && (
                <HistoricalAddPopup
                  isEditContactStrategy={false}
                  isHistoricalPopUp={this.state.isHistoricalPopUp}
                  isCallOutComess={this.state.isCallOutComess}
                  selectedValue={this.state.selectedValue}
                  showTable={this.showTable}
                  handleChange={this.handleChange}
                  handlePageChange={this.handlePageChange}
                  isHistoricalName={this.state.isHistoricalName}
                  historicalpopup={this.historicalpopup}
                />
              )}
              {this.state.isCallOutComess && (
                <HistoricalGridTable
                  isHeightboolen={this.state.isHeightboolen}
                  istableheader={this.state.istableheader}
                  isHistoricalName={this.state.isHistoricalName}
                  historicalpopup={this.historicalpopup}
                  handlePageChange={this.handlePageChange}
                  onAddNewChange={this.onAddNewChange}
                  onGridChange={this.onGridChange}
                  handlerchangepage={this.handlerchangepage}
                  isreportable={this.state.isreportable}
                  currentclick={this.state.currentclick}
                />
              )}
            </div>
          </>
        )}
      </Translation>
    );
  }
}

export default Historicalmainpage;
