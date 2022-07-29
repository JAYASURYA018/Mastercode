import React, { Component } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Input, RadioButtonChangeEvent } from "@progress/kendo-react-inputs";
import { t } from "i18next";
import data from "./HistoricalPopup.json";
import { Dispatch, SetStateAction } from "react";
import "./HistoricalReport.scss";
import { Button } from "@progress/kendo-react-buttons";
import { RadioButton } from "@progress/kendo-react-inputs";

const defaultNs: any = { ns: ["camp", "common", "history"] };

interface Iprops {
  isEditContactStrategy: boolean;
  isHistoricalPopUp?: boolean;
  selectedValue: any;
  showTable: any;
  isCallOutComess: boolean;
  isHistoricalName: any;
  handleChange: any;
  handlePageChange: any;
  historicalpopup: any;
}

interface popupdata {
  isEditContactStrategy: any;
  id: string;
  name: string;
}

interface Istate {
  detailsdata: any;
  Isdisable: boolean;
  selectedValue: any;
  showTable: any;
  isCallOutComess: boolean;
  createBtn: boolean;
}

class HistoricalAddPopup extends Component<Iprops, Istate> {
  state: Istate = {
    detailsdata: JSON.parse(JSON.stringify(data)),
    Isdisable: true,
    selectedValue: "",
    isCallOutComess: false,
    createBtn: false,
    showTable: undefined,
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <>
          <Dialog
            className={
              this.props.isEditContactStrategy
                ? "dialogpop dialogpop create-contactStrategy edit-cs"
                : "dialogpop create-contactStrategy"
            }
            width={680}
            height={480}
          >
            <p className="heading">
              <img src="./images/addpop.png" />
              <span>{t("history.pageHeader.header", defaultNs)} </span>
              <span style={{ color: "#FD7B38" }}>•</span>
              <span> {this.state.detailsdata.length}</span>
              <span className="historicalbtn-right">
                <button
                  className="canclebtn k-button k-primary  "
                  id="Cancel-ContactStrategy"
                  name="Cancel-ContactStrategy"
                  aria-label="Cancel-ContactStrategy"
                  title={t("camp.copycampaign.btn.cancel", defaultNs)}
                  onClick={() => this.props.historicalpopup()}
                >
                  {t("camp.copycampaign.btn.cancel", defaultNs)}
                </button>
                <Button
                  title={t(
                    "history.historicallist.buttoncreatenew.text",
                    defaultNs
                  )}
                  className={
                    this.state.createBtn
                      ? "k-button k-primary"
                      : "k-button k-create"
                  }
                  onClick={() => this.props.handlePageChange()}
                >
                  {t("history.historicallist.buttoncreatenew.text", defaultNs)}{" "}
                </Button>
              </span>
            </p>
            <div className="container">
              <div className="row d-flex justify-content-end">
                <div className="popuphelp border-left ">
                  <a
                    href=""
                    id="Contact-Strategy-Help-Text"
                    title=""
                    className="help-btn"
                  >
                    {t("history.help.addpopup", defaultNs)}
                  </a>
                </div>
              </div>
              <div className="row d-flex justify-content-start">
                <span className="report">
                  {" "}
                  {t("history.addnewpage.reportsadded", defaultNs)}
                </span>
              </div>
            </div>
            <div className="popupmain">
              {this.state.detailsdata.map(
                (item: { id: React.Key; name: string }) => {
                  return (
                    <div className="customermain" key={item.id}>
                      <span>
                        <RadioButton
                          name={item.name}
                          onChange={(event: any) => {
                            this.props.handleChange(event);
                            this.setState({ createBtn: true });
                          }}
                          value={item.name}
                          label={item.name}
                          title={t(
                            "history.filter.tab.campaign.select.label",
                            defaultNs
                          )}
                        />
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </Dialog>
        </>
      </div>
    );
  }
}

export default HistoricalAddPopup;
