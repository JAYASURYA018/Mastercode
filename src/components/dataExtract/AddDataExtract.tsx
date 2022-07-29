// import React, { memo, useEffect } from "react";
import * as React from "react"; //1
import * as ReactDOM from "react-dom"; //2
import { Button } from "@progress/kendo-react-buttons";
import "./_dataExtract.scss";
import { Dialog } from "@progress/kendo-react-dialogs";
import {
  CheckboxChangeEvent,
  Input,
  RadioButtonChangeEvent,
} from "@progress/kendo-react-inputs";
import { Stepper } from "@progress/kendo-react-layout";

import data from "./CampaignData.json";
import allDays from "./AllDays.json";
import { ICampaign } from "./IAddDataExtract";

import toastrmsg from "../../services/toaster-manager";

// import { IcallStrategiesMember } from "./IAddDataExtract";

import ApiService from "../../services/api-manager";
import ApiConstants from "../../api-constants";

import { t } from "i18next";
import SelectCampaign from "./SelectCampaign";
// import DataSource from "./DataSource";

import { Dispatch, SetStateAction } from "react";
import SourceData from "./SourceData";
import ScheduleConfiguration from "./ScheduleConfiguration";
// import GridTable from "./GridTable";
import OutcomeData from "./OutcomeData.json";

import { v4 as uuidv4 } from "uuid";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  ListBox,
  ListBoxToolbar,
  processListBoxData,
  processListBoxDragAndDrop,
  ListBoxDragEvent,
  ListBoxItemClickEvent,
  ListBoxToolbarClickEvent,
} from "@progress/kendo-react-listbox";
import { Translation } from "react-i18next";

// import AddNewPopUp from "./AddNewPopUp";
const defaultNs: any = { ns: ["camp", "common", "callstrategy", "extractor"] };

export interface IstepperValue {
  isValid: boolean | undefined;
  label: string;
  text: string;
}

const toDo = [
  { name: "AccountNumber", selected: false },
  { name: "ACW Duration", selected: false },
  { name: "ACW End Timestamp", selected: false },
  { name: "ACW Start Timestamp", selected: false },
  { name: "AddressAgent Comments", selected: false },
  { name: "Agent Connection ", selected: false },
  { name: "AttemptsAgent Id", selected: false },
  { name: "Agent Interaction", selected: false },
  { name: "SpreadSheet", selected: false },
];

const inDevelopment = [
  { name: "Available fields", selected: false },
  { name: "DurationAgent Name", selected: false },
  { name: "Aggregate_IDAmzConnect", selected: false },
  { name: " ContactIDAnswered ", selected: false },
  { name: "DateTimeApproved_Date", selected: false },
  { name: "BCodeBeep Detected", selected: false },
];

const SELECTED_FIELD = "selected";

let obj = {
  dataExtractName: "",
  description: "",
  timeZone: null,
  // fileName: "",
};

let editScheduleInputs = {
  timeInterval: "",
  fileName: "",
  timeOfEOD: "",
  dateRange: "",
  timeRangeStart: "",
  timeRangeEnd: "",
};

interface Istate {
  campaignData?: Array<any>;
  selectedValue?: number;
  selectedOutcomes?: number;
  lastOutCome?: any;
  search?: string;
  isCheck?: Array<any>;
  dataSourceDropdown?: any;
  editScheduleData?: any;
  sliderState?: number;
  value: number;
  steps: any;
  isAddContactStrategy?: boolean;
  isWelcomePage?: boolean;
  isShowTable?: boolean;
  sampleData?: Array<any>;
  fileExtensions: any;

  dualListAvailable: any;
  dualListAssociated: any;
  // shipped: any;
  draggedItem: any;

  allInputData?: any;
  // editContractData: any;
}

interface Iprops {
  isEditContactStrategy: boolean;
  closeAddEditContactStrategy: () => void;
  // isShowTable: boolean;
  showTable: () => void;
  // sampleData: Array<any>;
  saveData: any;
  onEdit: any;
  editContractData: any;
  onUpdate: any;
}

class AddDataExtract extends React.Component<Iprops, Istate> {
  stepperDefaultValue: Array<IstepperValue> = [
    {
      // label: t("callStrategy.general", defaultNs),
      label: t("er.nav.label.selectgrps", defaultNs),
      isValid: undefined,
      text: "1",
    },
    {
      label: t("er.nav.label.datasrc", defaultNs),
      isValid: undefined,
      text: "2",
    },
    {
      label: t("er.nav.label.eodconfig", defaultNs),
      isValid: undefined,
      text: "3 ",
    },
  ];

  state: Istate = {
    campaignData: JSON.parse(JSON.stringify(data)),
    value: 0,
    steps: this.stepperDefaultValue,
    allInputData: obj,
    dualListAvailable: toDo,
    dualListAssociated: inDevelopment,
    draggedItem: {},
    selectedValue: 1,
    selectedOutcomes: 1,
    lastOutCome: OutcomeData,
    isCheck: JSON.parse(JSON.stringify(allDays)),
    dataSourceDropdown: null,
    editScheduleData: editScheduleInputs,
    search: "",
    sliderState: 1,
    sampleData: [],
    fileExtensions: null,
  };

  componentDidMount(): void {
    if (this.props.editContractData) {
      this.setState({
        campaignData: this.props.editContractData.campaignData,
        allInputData: {
          dataExtractName: this.props.editContractData.dataExtractName,
          description: this.props.editContractData.description,
          timeZone: this.props.editContractData.timeZone,
        },
        dataSourceDropdown: this.props.editContractData.dataSourceDropdown,
        fileExtensions: this.props.editContractData.fileExtensions,
        dualListAvailable: this.props.editContractData.dualListAvailable,
        dualListAssociated: this.props.editContractData.dualListAssociated,
        editScheduleData: {
          timeInterval: this.props.editContractData.timeInterval,
          fileName: this.props.editContractData.fileName,
          fileExtension: this.props.editContractData.fileExtension,
          timeOfEOD: this.props.editContractData.timeOfEOD,
          dateRange: this.props.editContractData.dateRange,
          timeRangeStart: this.props.editContractData.timeRangeStart,
          timeRangeEnd: this.props.editContractData.timeRangeEnd,
        },
        sliderState: this.props.editContractData.sliderState,
        // selectedValue: this.props.editContractData.selectedValue,
        selectedOutcomes: this.props.editContractData.selectedOutcomes,
        isCheck: this.props.editContractData.isCheck,
        // lastOutCome: this.props.editContractData.lastOutCome,
      });
    }
  }

  handleInputChange = (e: any) => {
    // //console.log(e);
    // debugger;
    const name = e.target.name;
    const value = e.target.value;

    // let _allInputData = this.state.allInputData;

    // _allInputData = {
    //   ..._allInputData,
    //   [e.target.name]: e.target.value,
    // };

    // debugger;
    // this.setState({
    //   allInputData: _allInputData,
    // });

    this.setState((prevState: Istate) => {
      return {
        allInputData: {
          ...prevState.allInputData,
          [name]: value,
        },
      };
    });
  };

  handleInputFileChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => {
      // debugger;
      return {
        editScheduleData: {
          ...prevState.editScheduleData,
          [name]: value,
        },
      };
    });
  };

  onDataSourceChange = (e: any) => {
    this.setState({ dataSourceDropdown: e.value });
  };

  onFileExtensionChange = (e: any) => {
    this.setState({ fileExtensions: e.value });
  };

  onTimeZoneChange = (e: any) => {
    this.setState((prevState: Istate) => {
      return {
        allInputData: {
          ...prevState.allInputData,
          timeZone: e.value,
        },
      };
    });
  };

  lastStepIndex = this.state.steps.length - 1;
  isLastStep = this.lastStepIndex === this.state.value;
  isPreviousStepsValid =
    this.state.steps
      .slice(0, this.state.value)
      .findIndex((currentStep) => currentStep.isValid === false) === -1;

  onStepSubmit = (event) => {
    if (this.state.value == 0) {
      if (
        this.state.allInputData.dataExtractName !== "" &&
        this.state.allInputData.description !== "" &&
        this.state.allInputData.timeZone !== "" &&
        this.state.campaignData.filter((i) => i.isSelected).length
      ) {
        // setStep(1);
        this.setState({ value: 1 });
      } else {
        toastrmsg.toastMessage(
          t("callstrategy.error.mode_Name_empty", defaultNs),
          "error"
        );
      }
    } else if (this.state.value == 1) {
      this.setState({ value: 2 });
    } else {
      if (this.state.editScheduleData.fileName !== "") {
        // setStep(3);
        // this.submitForm();
      } else {
        toastrmsg.toastMessage(
          t("callstrategy.error.mode_Name_empty", defaultNs),
          "error"
        );
      }
    }
  };

  onPrevClick = () => {
    this.setState((prevState) => {
      return {
        value: prevState.value - 1,
      };
    });
  };

  submitForm = () => {
    let finalData = {
      ...this.state.allInputData,
      ...this.state.editScheduleData,
      campaignData: this.state.campaignData,
      selectedRuntypeValues: this.state.selectedValue,
      selectedOutcomes: this.state.selectedOutcomes,
      isCheck: this.state.isCheck,
      dualListAvailable: this.state.dualListAvailable,
      dualListAssociated: this.state.dualListAssociated,
      dataSourceDropdown: this.state.dataSourceDropdown,
      sliderState: this.state.sliderState,
    };
    //debugger;
    //console.log("data", finalData);
    debugger;
    // this.props.showTable();

    if (this.props.editContractData) {
      this.props.onUpdate(this.props.editContractData.id, finalData);
    } else {
      this.props.saveData({ ...finalData, id: v4() });
    }

    console.log(finalData, "finaldata");
  };

  onRadioRunTypeChange = (e: RadioButtonChangeEvent) => {
    // setSelectedValue(e.value);
    this.setState({ selectedValue: e.value });
  };

  handleChangeOutcomes = (e: RadioButtonChangeEvent) => {
    this.setState({ selectedOutcomes: e.value });
  };

  handleItemClick = (event, data, connectedData) => {
    this.setState({
      ...this.state,
      [data]: this.state[data].map((item) => {
        if (item.name === event.dataItem.name) {
          item[SELECTED_FIELD] = !item[SELECTED_FIELD];
        } else if (!event.nativeEvent.ctrlKey) {
          item[SELECTED_FIELD] = false;
        }
        return item;
      }),
      [connectedData]: this.state[connectedData].map((item) => {
        item[SELECTED_FIELD] = false;
        return item;
      }),
    });
  };

  handleToolBarClick = (e, data, connectedData) => {
    let result = processListBoxData(
      this.state[data],
      this.state[connectedData],
      e.toolName,
      SELECTED_FIELD
    );
    this.setState({
      ...this.state,
      [data]: result.listBoxOneData,
      [connectedData]: result.listBoxTwoData,
    });
  };

  handleDragStart = (e: ListBoxDragEvent) => {
    let target: any = e.target;
    e.dataItem.dataCollection = target.props.name || "";
    this.setState({
      draggedItem: e.dataItem,
    });
  };

  handleDrop = (e: ListBoxDragEvent) => {
    let target: any = e.target;
    let dragItemData = this.state.draggedItem.dataCollection;
    let dropItemData = target.props.name;
    let result = processListBoxDragAndDrop(
      this.state[dragItemData],
      this.state[dropItemData],
      this.state.draggedItem,
      e.dataItem,
      "name"
    );
    this.setState({
      ...this.state,
      [dragItemData]: result.listBoxOneData,
      [dropItemData]: result.listBoxTwoData,
    });
  };

  onCompaignSelectAll = (e: CheckboxChangeEvent) => {
    // debugger;
    this.setState((prevState) => {
      return {
        campaignData: [
          ...prevState.campaignData.map((item: any) => {
            item.isSelected = e.value;
            return item;
          }),
        ],
      };
    });
  };

  onRunDaysSelectAll = (e: CheckboxChangeEvent) => {
    // debugger;
    this.setState((prevState) => {
      return {
        isCheck: [
          ...prevState.isCheck.map((item: any) => {
            item.isSelected = e.value;
            return item;
          }),
        ],
      };
    });
  };

  onCompaignSelect = (id: string, e: CheckboxChangeEvent) => {
    // debugger;
    this.setState((prevState) => {
      return {
        campaignData: prevState.campaignData.map((item: any) => {
          if (item.id == id) {
            item.isSelected = e.value;
          }
          return item;
        }),
      };
    });
  };

  onRunDaySelect = (id: string, e: CheckboxChangeEvent) => {
    // debugger;
    this.setState((prevState) => {
      return {
        isCheck: prevState.isCheck.map((item: any) => {
          if (item.id == id) {
            item.isSelected = e.value;
          }
          return item;
        }),
      };
    });
  };

  onSliderChange = (e) => {
    this.setState({ sliderState: e.value });
  };

  campToggelData = () => {
    // return (
    //   <div className="data1">
    //     {this.state.lastOutCome.map((m) => {
    //       return (
    //         <div className="campAndToggle">
    //           <div className="campData">{m.name}</div>
    //           <div className="toggle">
    //             <label className="switch">
    //               <input
    //                 type="checkbox"
    //                 // onChange={(e) => {
    //                 //   this.handleChecked(m.id, e.target.checked);
    //                 // }}
    //                 checked={m.isSelected}
    //               />
    //               <span className="slider"></span>
    //               <span className="yesNo">{m.isSelected ? "YES" : "NO"}</span>
    //             </label>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // );
  };

  render() {
    const selectCampaign = (
      <SelectCampaign
        campaignData={this.state.campaignData}
        handleInputChange={this.handleInputChange}
        onTimeZoneChange={this.onTimeZoneChange}
        allInputData={this.state.allInputData}
        search={this.state.search}
        onCompaignSelect={this.onCompaignSelect}
        onCompaignSelectAll={this.onCompaignSelectAll}
      />
    );

    const dataSource = (
      <SourceData
        dualListAvailable={this.state.dualListAvailable}
        dualListAssociated={this.state.dualListAssociated}
        // shipped={this.state.shipped}
        draggedItem={this.state.draggedItem}
        dataSourceDropdown={this.state.dataSourceDropdown}
        onDataSourceChange={this.onDataSourceChange}
        handleItemClick={this.handleItemClick}
        handleToolBarClick={this.handleToolBarClick}
        handleDragStart={this.handleDragStart}
        handleDrop={this.handleDrop}
        SELECTED_FIELD={SELECTED_FIELD}
      />
    );

    const scheduleConfig = (
      <ScheduleConfiguration
        selectedRuntypeValues={this.state.selectedValue}
        lastOutCome={this.state.lastOutCome}
        isCheck={this.state.isCheck}
        selectedOutcomes={this.state.selectedOutcomes}
        handleInputChange={this.handleInputChange}
        sliderState={this.state.sliderState}
        handleInputFileChange={this.handleInputFileChange}
        onRadioRunTypeChange={this.onRadioRunTypeChange}
        handleChangeOutcomes={this.handleChangeOutcomes}
        onRunDaysSelectAll={this.onRunDaysSelectAll}
        onRunDaySelect={this.onRunDaySelect}
        onSliderChange={this.onSliderChange}
        campToggelData={this.campToggelData}
        fileExtensions={this.state.fileExtensions}
        onFileExtensionChange={this.onFileExtensionChange}
        editScheduleData={this.state.editScheduleData}
        allInputData={this.state.allInputData}
      />
    );

    const stepPages = [selectCampaign, dataSource, scheduleConfig];

    return (
      <>
        <Dialog
          className={
            this.props.isEditContactStrategy
              ? "dialogpop dialogpop create-contactStrategy edit-cs"
              : "dialogpop create-contactStrategy"
          }
          width={810}
          height={670}
        >
          <p className="heading">
            {/* <i className="icon-contact-strategy-operator"></i> */}
            <img src="./images/archive.svg" />
            {this.props.editContractData ? (
              <label>{this.props.editContractData.dataExtractName}</label>
            ) : (
              <Input
                autoFocus={true}
                type="text"
                maxLength={20}
                required={true}
                name="dataExtractName"
                value={this.state.allInputData["dataExtractName"] || ""}
                className="mayDataExtractInput"
                placeholder={t("New Data Extract Name", defaultNs)}
                onChange={this.handleInputChange}
              />
            )}
            <span className="right">
              <button
                className="k-button k-primary"
                id="Cancel-ContactStrategy"
                name="Cancel-ContactStrategy"
                aria-label="Cancel-ContactStrategy"
                title={t("camp.copycampaign.btn.cancel", defaultNs)}
                onClick={() => this.props.closeAddEditContactStrategy()}
              >
                {t("camp.copycampaign.btn.cancel", defaultNs)}
              </button>

              <button
                id="Create-ContactStrategy"
                name="Create-ContactStrategy"
                aria-label="Create-ContactStrategy"
                title={
                  "Create" === "Create" ? "Create" : t("common.save", defaultNs)
                }
                // className={
                //   this.state.value !== 3
                //     ? "k-button k-primary"
                //     : "k-button k-create"
                // }
                className={
                  this.state.value !== 2
                    ? "k-button k-create"
                    : "k-button k-primary"
                }
                onClick={this.state.value === 2 ? this.submitForm : null}
                // disabled={this.state.value !== 3}
              >
                {this.props.editContractData
                  ? "Update"
                  : t("er.btn.create", defaultNs)}
              </button>
            </span>
          </p>

          <div className="example-config stepper-wrapper">
            <Stepper
              value={this.state.value}
              items={this.state.steps}
              className="st-data"
            />

            <div className="stepperData">{stepPages[this.state.value]}</div>
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
              {this.state.steps.length - 1 != this.state.value && (
                <button
                  className="k-button k-next"
                  disabled={
                    this.isLastStep ? !this.isPreviousStepsValid : false
                  }
                  onClick={this.onStepSubmit}
                >
                  <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </button>
              )}
            </div>
          </div>
        </Dialog>
      </>
    );
  }
}

export default AddDataExtract;
