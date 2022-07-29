import { Dialog } from "@progress/kendo-react-dialogs";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import data from "./HistoricalPopup.json";
import { t } from "i18next";

import { Checkbox } from "@progress/kendo-react-inputs/dist/npm/checkbox/Checkbox";
import { CheckboxChangeEvent } from "@progress/kendo-react-inputs/dist/npm/checkbox/interfaces/CheckboxChangeEvent";
import { any } from "underscore";
const defaultNs: any = { ns: ["camp", "common", "history"] };
interface Istate {
  // hello: boolean;
}

interface Iprops {
  onCompaignSelectAll: any;
  onCompaignSelect: any;
  _filterColumn: any;
  singleCompaign: any;
  onApplyFilter: any;
  handlerpopup: any;
}

class HistoricalColumnPopup extends Component<Iprops, Istate> {
  state: Istate = {};

  render() {
    return (
      <div>
        <div>
          <Dialog
            className={"dialogpop create-contactStrategy"}
            width={500}
            height={540}
          >
            <p className="heading">
              {/* <i className="icon-contact-strategy-operator"></i> */}
              <img
                src="./images/redcolumns.png"
                style={{ marginBottom: "3px" }}
              />
              <span className="Selectedtext">Selected Columns</span>

              <span className="right" style={{ marginTop: "-3px" }}>
                <button
                  style={{ marginRight: "6px" }}
                  className="k-button k-primary"
                  id="Cancel-ContactStrategy"
                  name="Cancel-ContactStrategy"
                  aria-label="Cancel-ContactStrategy"
                  title={t("camp.copycampaign.btn.cancel", defaultNs)}
                  onClick={() => this.props.handlerpopup()}
                >
                  {t("camp.copycampaign.btn.cancel", defaultNs)}
                </button>

                <button
                  id="Create-ContactStrategy"
                  name="Create-ContactStrategy"
                  aria-label="Create-ContactStrategy"
                  title={t("historical.schedulaer.schedulerdata", defaultNs)}
                  className={true ? "k-button k-primary" : "k-button k-create"}
                  onClick={() => this.props.onApplyFilter()}
                >
                  Apply
                </button>
              </span>
            </p>

            <div className="container">
              <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                <div className="selectedColumnsMain">
                  <div className="selectedColumns">
                    <span>SELECTED COLUMNS</span>
                    <span style={{ color: "#FD7B38", margin: "10px" }}>•</span>
                    <span>{this.props._filterColumn.length}</span>
                    <span style={{ margin: "5px" }}>OF</span>
                    <span>{Object.keys(this.props.singleCompaign).length}</span>
                  </div>

                  <div>
                    {/* <Checkbox
                      checked={
                        Object.keys(this.props.singleCompaign).length ==
                        this.props._filterColumn.length
                      }
                      className="selectAllCheckbox"
                      label="Select All"
                      onChange={(e) => this.props.onCompaignSelectAll(e)}
                    /> */}
                    <Checkbox
                      value={
                        this.props._filterColumn.length > 0 &&
                        this.props._filterColumn.length <
                          Object.keys(this.props.singleCompaign).length
                          ? null
                          : ""
                      }
                      checked={
                        Object.keys(this.props.singleCompaign).length ==
                        this.props._filterColumn.length
                      }
                      className="selectAllCheckbox"
                      label="Select All"
                      onChange={(e) => this.props.onCompaignSelectAll(e)}
                    />
                  </div>
                </div>

                <div style={{ position: "relative", right: "84px" }}>
                  <div className="HeaderColumnsMain">
                    <div
                      style={{
                        textAlign: "end",
                        position: "relative",
                        left: "3px",
                      }}
                    >
                      HEADER
                    </div>
                    <div
                      style={{ marginLeft: "20px", marginRight: "0px" }}
                    ></div>

                    <div
                      // className="col-lg 6"
                      style={{
                        textAlign: "start",
                        position: "relative",
                        left: "23px",
                      }}
                    >
                      SAMPLE VALUE
                    </div>
                  </div>

                  <div>
                    <div style={{ height: "360px" }}>
                      {Object.keys(this.props.singleCompaign).map((key) => {
                        return (
                          <div
                            className="row historicalGridData "
                            style={{ marginTop: "3px" }}
                          >
                            <div
                              className="col-lg 3 headerKeys"
                              style={{ textAlign: "end" }}
                            >
                              {key}
                            </div>

                            <div
                              className="col-lg 3 headerValues"
                              style={{
                                textAlign: "start",
                                position: "relative",
                                right: "18px",
                              }}
                            >
                              <Checkbox
                                label={this.props.singleCompaign[key]}
                                checked={this.props._filterColumn.includes(key)}
                                onChange={(e) =>
                                  this.props.onCompaignSelect(
                                    e.target.value,
                                    key
                                  )
                                }
                                className="sampleValuCheckbox"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}
export default HistoricalColumnPopup;
