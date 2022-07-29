import React, { Component } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import {

  Input,
  TextArea,
} from "@progress/kendo-react-inputs";
import { t } from "i18next";
import data from "./HistoricalPopup.json";
import { Dispatch, SetStateAction } from "react";
import "./HistoricalReport.scss";
import { Button } from "@progress/kendo-react-buttons";
import { RadioButton } from "@progress/kendo-react-inputs";

const defaultNs: any = { ns: ["camp", "common", "history"] };

interface Iprops {
  isEditContactStrategy: boolean;
  onSave: any;
  onCancel: any;
  reportingAction: any;
  isHistoricalName: any;
  currentclick:string;
}

interface popupdata {
  isEditContactStrategy: any;
  id: string;
  name: string;
  onSaveData:any
}

interface Istate {
  newReportName: string;
  description: string;
}

class ItemPop extends Component<Iprops, Istate> {
  state: Istate = {
    newReportName: this.props.reportingAction.newReportName,
    description: this.props.reportingAction.description,
  };

  constructor(props: Iprops) {
    super(props);
  }

  render() {
    console.log("isHistoricalName");
    return (
      <div>
        <Dialog
          className={
            this.props.isEditContactStrategy
              ? "dialogpop dialogpop create-contactStrategy edit-cs"
              : "dialogpop create-contactStrategy"
          }
          width={600}
          height={340}
        >
          <p className="heading">
            <div className="d-flex justify-content-between ">
              <div>
              
                <img src='./images/addpop.png'/>
                <span className="HistoricalInput">{this.props.isHistoricalName}</span>
              </div>
              <div></div>
              <div>
                <Button
                  className="canclebtn k-button k-primary  "
                  id="Cancel-ContactStrategy"
                  name="Cancel-ContactStrategy"
                  aria-label="Cancel-ContactStrategy"
                  title={t("camp.copycampaign.btn.cancel", defaultNs)}
                  onClick={() => {
                    this.props.onCancel();
                  }}
                >
                  {t("camp.copycampaign.btn.cancel", defaultNs)}
                </Button>

                <Button
                className={ this.state.newReportName === "" || this.state.description === "" ? "k-button k-create" :"k-button k-primary"}
                 id="Save-ContactStrategy"
                 name="save-ContactStrategy"
                 aria-label="Save-ContactStrategy"
                 title={t("history.popup.savebutton", defaultNs)}
                disabled={
                    this.state.newReportName === "" ||
                    this.state.description === ""
                  }
                  onClick={() =>
                    this.props.onSave(
                      this.state.description,
                      this.state.newReportName
                    )
                  }
                >
                  {t("history.popup.savebutton", defaultNs)}{" "}
                </Button>
              </div>
            </div>
          </p>

          <div className="mainStepperOne">
            <label className="schedulerName">New Report Name</label>
            <br />
            <input
              type="text"
              id="NewReportName"
              placeholder="Type in Scheduler Name..."
              className="SchedulerInput"
              value={this.state.newReportName}
              onChange={(e) => {
                this.setState({ newReportName: e.target.value });
              }}
            />
            <br />

            <label className="distextarea">Description</label>
            <br />
              <TextArea
         
            id="desc"
            value={this.state.description}
            placeholder="Type in Report Description..."
            className="descriptionInput"
            onChange={(e) => {
              this.setState({ description: e.value });
            }}
           
    
        
          />
        
          </div>
        </Dialog>
      </div>
    );
  }
}

export default ItemPop;
