import { Dialog } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
import { Stepper } from "@progress/kendo-react-layout";
import { t } from "i18next";
import React, { Component } from "react";
import _ from "underscore";
import toastrmsg from "../../services/toaster-manager";
import NameAndDescriptionStepper from "./NameAndDescriptionStepper";
import SchedulerParametersStepper from "./SchedulerParameterStepper";

const defaultNs: any = { ns: ["camp", "common", "history"] };

export interface IstepperValue {
  isValid: boolean | undefined;
  label: string;
  text: string;
}

interface Iprops {
  isEditContactStrategy: boolean;
  onOpenScheduleReportPopup: any;
  isHistoricalName: any;
}

interface Istate {
  value: number;
  steps: any;
  // schedulerData: {
  //   schedulerName: string;
  //   schedulerDes: string;
  // };
  schedulerName: string;
  schedulerDesp: string;
  // finalData?:any
}

class SchedueReportData extends Component<Iprops, Istate> {
  stepperDefaultValue: Array<IstepperValue> = [
    {
      label: t("history.nam&description", defaultNs),
      // label: "Name & Description",
      isValid: undefined,
      text: "1",
    },
    {
      label: t("history.schedulerParameters", defaultNs),
      isValid: undefined,
      text: "2",
    },
  ];

  state: Istate = {
    value: 0,
    steps: this.stepperDefaultValue,
    // schedulerData: {
    //   schedulerName: "",
    //   schedulerDes: null,
    // },
    schedulerName: "",
    schedulerDesp: null,
    // finalData:{}
  };

  // const lastStepIndex = steps.length - 1;
  // const isLastStep = lastStepIndex === value;
  // const isPreviousStepsValid = steps.slice(0, value).findIndex(currentStep => currentStep.isValid === false) === -1;

  lastStepIndex = this.state.steps.length - 1;
  isLastStep = this.lastStepIndex === this.state.value;
  isPreviousStepsValid =
    this.state.steps
      .slice(0, this.state.value)
      .findIndex((currentStep) => currentStep.isValid === false) === -1;

  handleSchedulerInputChange = (e: any) => {
    debugger;
    this.setState({ schedulerName: e.target.value });
  };

  onHandeleChange = (e) => {
    debugger;
    // e.persist();
    this.setState({ schedulerDesp: e.value });
  };

  onStepSubmit = (event) => {
    if (this.state.value == 0) {
      if (this.state.schedulerDesp != "" && this.state.schedulerName != "") {
        // setStep(1);

        this.setState({ value: 1 });
      } else {
        toastrmsg.toastMessage(t("fields cannot be empty"), "error");
      }
    } else if (this.state.value == 1) {
      this.setState({ value: 2 });
    }
  };

  onPrevClick = () => {
    // this.setState((prevState) => {
    //   return {
    //     value: prevState.value - 1,
    //   };
    // });

    if (this.state.value == 3) {
      let currentSteps = this.state.steps;

      this.setState({
        steps: currentSteps,
      });
      // setSteps(currentSteps);
      // preValidationForm[value]();
    }

    this.setState(() => {
      return {
        value: Math.max(this.state.value - 1, 0),
      };
    });
  };

  render() {
    const nameAndDescription = (
      <NameAndDescriptionStepper
        isHistoricalName={this.props.isHistoricalName}
        schedulerName={this.state.schedulerName}
        schedulerDesp={this.state.schedulerDesp}
        onHandeleChange={this.onHandeleChange}
        handleSchedulerInputChange={this.handleSchedulerInputChange}
      />
    );

    const schedulerParameters = <SchedulerParametersStepper />;
    const stepPages = [nameAndDescription, schedulerParameters];
    return (
      <>
        <Dialog
          className={
            this.props.isEditContactStrategy
              ? "dialogpop dialogpop create-contactStrategy edit-cs"
              : "dialogpop create-contactStrategy scheduleReportPopup"
          }
          width={620}
          height={470}
        >
          <p className="heading">
            <i className="icon-contact-strategy-operator"></i>
            {this.props.isEditContactStrategy ? (
              <label>dffdd</label>
            ) : (
              // "dyfughj"
              // <Input
              //   type="text"
              //   maxLength={20}
              //   required={true}
              //   // name="dataExtractName"
              //   value={this.props.isHistoricalName}
              //   className="mayDataExtractInput"
              //   placeholder="Agent Disposition (Campaign wise)"
              // />
              <span className="HistoricalInput">
                {this.props.isHistoricalName}
              </span>
            )}
            <span className="right">
              <button
                className="k-button k-primary"
                id="Cancel-ContactStrategy"
                name="Cancel-ContactStrategy"
                aria-label="Cancel-ContactStrategy"
                title={t("camp.copycampaign.btn.cancel", defaultNs)}
                onClick={() => this.props.onOpenScheduleReportPopup()}
              >
                {t("camp.copycampaign.btn.cancel", defaultNs)}
              </button>

              <button
                id="Create-ContactStrategy"
                name="Create-ContactStrategy"
                aria-label="Create-ContactStrategy"
                title={t("historical.schedulaer.schedulerdata", defaultNs)}
                className={true ? "k-button k-primary" : "k-button k-create"}
              >
                {t("historical.schedulaer.schedulerdata", defaultNs)}
              </button>
            </span>
          </p>
          <div className="example-config stepper-wrapper">
            <div className="main-stepper">
              <span style={{ float: "right", marginTop: "17px" }}>
                <span className="border-left pl-16" style={{ flex: "0" }}>
                  <a
                    href=""
                    id="Contact-Strategy-Help-Text"
                    title="="
                    className="help-btn"
                    aria-label="ContactStrategyHelpText"
                  >
                    {t("history.help.addpopup", defaultNs)}
                  </a>
                </span>
              </span>
              <Stepper
                value={this.state.value}
                //  onChange={handleChange}
                items={this.state.steps}
                className="history-data"
              />
            </div>

            <div className="">{stepPages[this.state.value]}</div>
            <div
              className="col-md-12 text-center mb-3 mt-3 "
              style={{
                position: "absolute",
                bottom: "7px",
              }}
            >
              {this.state.value !== 0 ? (
                <button
                  className="k-button k-prev mr-4"
                  style={{
                    marginRight: "16px",
                  }}
                  onClick={this.onPrevClick}
                >
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </button>
              ) : undefined}
              {!this.isLastStep ? (
                <button
                  className="k-button k-next"
                  disabled={
                    this.isLastStep ? !this.isPreviousStepsValid : false
                  }
                  onClick={this.onStepSubmit}
                >
                  <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </button>
              ) : undefined}
            </div>
          </div>
        </Dialog>
      </>
    );
  }
}

export default SchedueReportData;
