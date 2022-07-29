import React, { Component } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import {
  Input,
  RadioButtonChangeEvent,
  RadioGroup,
} from "@progress/kendo-react-inputs";
import { t } from "i18next";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { TimePicker } from "@progress/kendo-react-dateinputs";
import { v4 } from "uuid";

const defaultNs = {
  ns: [
    "camp",
    "campcategory",
    "common",
    "callstrategy",
    "aetools",
    "ccpa",
    "sr",
  ],
};

interface Iprops {
  showTable?: () => void;
  isEditContactStrategy: boolean;
  btnName: boolean;
  onclosePopup: any;
  onOpenPopup: any;
  sampleData: any;
  saveData: any;
  onUpdate: any;
  editContractData: any;
}

interface Istate {
  Monthly: boolean;
  options?: Array<string>;
  week: boolean;
  selectedValue: string;
  specific: boolean;
  isDisable: boolean;
  daily: boolean;
  Inputs: any;
}

let obj = {
  schedulereportname: "",
  Description: "",
  Frequency: "",
  ReportStartTime: "",
  ReportTime: "",
  Activate: "",
  Email: "",
};

class ScheduleReportsPopup extends React.Component<Iprops, Istate> {
  state: Istate = {
    Monthly: true,
    isDisable: false,
    week: false,
    selectedValue: "",
    specific: false,
    daily: false,
    options: [
      "Collection Team",
      "Select Report Start Time...",
      "12:00 am",
      "12:20 am",
    ],
    Inputs: obj,
  };

  componentDidMount(): void {
    if (this.props.editContractData) {
      this.setState({
        selectedValue: "",
        Inputs: {
          reportId: this.props.editContractData.reportId,
          description: this.props.editContractData.description,
          frequency: this.props.editContractData.frequency,
          reportStartTime: this.props.editContractData.reportStartTime,
          reportTime: this.props.editContractData.reportTime,
          Activate: this.props.editContractData.Activate,
          email: this.props.editContractData.email,
        },
      });
    }
  }

  handleInputChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState: Istate) => {
      return {
        Inputs: {
          ...prevState.Inputs,
          [name]: value,
        },
      };
    });

    console.log(this.state.Inputs);
  };

  changeHandle = (event: any) => {
    if (event.value === "Monthly") {
      this.setState({
        Monthly: true,
        week: false,
        specific: false,
        daily: false,
        selectedValue: event.value,
      }),
        (e: RadioButtonChangeEvent) => {
          this.setState({ selectedValue: e.value });
        };
    } else if (event.value === "Weekly") {
      this.setState({
        Monthly: false,
        week: true,
        specific: false,
        daily: false,
        selectedValue: event.value,
      });
    } else if (event.value === "Specific Days") {
      this.setState({
        Monthly: false,
        week: false,
        specific: true,
        daily: false,
        selectedValue: event.value,
      });
    } else if (event.value === "Daily") {
      this.setState({
        Monthly: false,
        week: false,
        specific: false,
        daily: true,
        selectedValue: event.value,
      });
    }
  };

  ChangeHandle = (event: any) => {
    if (event.value === "Monthly") {
      this.setState({
        Monthly: true,
        week: false,
        specific: false,
        daily: false,
        selectedValue: event.value,
      });
    } else if (event.value === "Weekly") {
      this.setState({
        Monthly: false,
        week: true,
        specific: false,
        daily: false,
        selectedValue: event.value,
      });
    } else if (event.value === "Specific Days") {
      this.setState({
        Monthly: false,
        week: false,
        specific: true,
        daily: false,
        selectedValue: event.value,
      });
    } else if (event.value === "Daily") {
      this.setState({
        Monthly: false,
        week: false,
        specific: false,
        daily: true,
        selectedValue: event.value,
      });
    }

    const name = event.target.name;
    const value = event.target.value;
    this.setState((prevState: Istate) => {
      return {
        Inputs: {
          ...prevState.Inputs,
          [name]: value,
        },
      };
    });
  };

  handleChange = (e: RadioButtonChangeEvent) => {
    this.setState({ selectedValue: e.value });
  };

  handlePageChange = () => {
    let finalData = {
      ...this.state.Inputs,
      selectedValue: this.state.selectedValue,
    };
    if (this.props.editContractData) {
      this.props.onUpdate(this.props.editContractData.id, finalData);
    } else {
      this.props.saveData({ ...finalData, id: v4() });
      this.props.onclosePopup();
    }
    console.log(finalData);
  };

  HandleChangeCreate = (e: any) => {
    if (e.target.value.length > 4) {
      this.setState({ isDisable: true });
    } else this.setState({ isDisable: false });
  };

  render() {
    return (
      <div>
        <Dialog
          className={
            this.props.isEditContactStrategy
              ? "dialogpop dialogpop create-contactStrategy edit-cs"
              : "dialogpop create-contactStrategy"
          }
          width={600}
          height={582}
        >
          <p className="heading">
            <img className="popupIcon" src="/images/schedule 1.svg" />
            {this.props.isEditContactStrategy ? (
              <label>CollectionTeam</label>
            ) : (
              <Input
                type="text"
                maxLength={20}
                required
                id="schedulereportname"
                name="schedulereportname"
                value={this.state.Inputs["schedulereportname"] || ""}
                placeholder={t("New Schedule Report Name", defaultNs)}
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
                onClick={this.props.onOpenPopup}
              >
                {t("camp.copycampaign.btn.cancel", defaultNs)}
              </button>

              <button
                id="Create-ContactStrategy"
                name="Create-ContactStrategy"
                aria-label="Create-ContactStrategy"
                onClick={this.handlePageChange}
                title={
                  "Create" === "Create" ? "Create" : t("common.save", defaultNs)
                }
                className={
                  this.state.isDisable
                    ? "k-button k-primary"
                    : "k-button k-create"
                }
              >
                {this.props.btnName ? "Create" : "Update"}
              </button>
            </span>
          </p>

          <div className="bodycontainer">
            <div className="popupbody">
              <label className="description">
                {t("sr.Description", defaultNs)}
              </label>
              <div>
                <Input
                  name="Description"
                  value={this.state.Inputs.Description || ""}
                  className="inputDescription"
                  type="text"
                  placeholder="Type in Description..."
                  onChange={this.handleInputChange}
                />
              </div>

              <label className="inputs">{t("sr.Report", defaultNs)}</label>
              <div>
                <DropDownList
                  className="scheduleDropDownList"
                  value={this.state.Inputs.ReportName || "Select Report... "}
                  name="ReportName"
                  data={this.state.options}
                  onChange={this.handleInputChange}
                />
              </div>

              <label className="inputs">{t("sr.Frequency", defaultNs)}</label>
              <RadioGroup
                name="Frequency"
                onChange={this.ChangeHandle}
                data={[
                  {
                    label: t("sr.Monthly", defaultNs),
                    name: "group1",
                    value: "Monthly",
                    checked: this.state.selectedValue === "Monthly",
                  },
                  {
                    label: t("sr.Weekly", defaultNs),
                    name: "group1",
                    value: "Weekly",
                    checked: this.state.selectedValue === "Weekly",
                  },
                  {
                    label: t("sr.SpecificDays", defaultNs),
                    name: "group1",
                    value: "Specific Days",
                    checked: this.state.selectedValue === "Specific Dayss",
                  },
                  {
                    label: t("sr.Daily", defaultNs),
                    name: "group1",
                    value: "Daily",
                    checked: this.state.selectedValue === "Daily",
                  },
                ]}
                layout="horizontal"
                defaultValue="Monthly"
              />

              {this.state.Monthly && (
                <div>
                  <label className="inputs">
                    {" "}
                    {t("sr.Report_Time", defaultNs)}
                  </label>

                  <div>
                    <TimePicker
                      id="ReportTime"
                      name="ReportTime"
                      onChange={this.handleInputChange}
                      value={this.state.Inputs.ReportTime || ""}
                      aria-label="Start Time"
                      className="timePicker"
                      format="hh:mm a"
                      defaultValue={new Date()}
                      placeholder="Select Report Time..."
                    />
                  </div>

                  <label className="inputs">{t("sr.Email", defaultNs)} </label>
                  <div>
                    <Input
                      className="inputDescription"
                      type="email"
                      placeholder="Type in Email..."
                      onChange={this.HandleChangeCreate}
                    />
                  </div>
                  <br />

                  <div className="para">
                    <p>
                      Info : Report is sent on the first calendar day of every
                      month.
                      <br />
                      Report data is from the first calendar day to the last
                      calendar day of the
                      <br />
                      immediate preceding month
                    </p>
                  </div>
                </div>
              )}

              {this.state.week && (
                <div>
                  <label className="inputs">
                    {t("sr.Frequency", defaultNs)}
                  </label>
                  <div>
                    <RadioGroup
                      name="Frequencys"
                      onChange={this.ChangeHandle}
                      data={[
                        {
                          label: t("sr.Mon", defaultNs),
                          value: "monday",
                          name: "monday",
                        },
                        {
                          label: t("sr.Tue", defaultNs),
                          value: "tuesday",
                          name: "tuesday",
                        },
                        {
                          label: t("sr.Wed", defaultNs),
                          value: "wednesday",
                          name: "wednesday",
                        },
                        {
                          label: t("sr.Thu", defaultNs),
                          value: "thursday",
                          name: "thursday",
                        },
                        {
                          label: t("sr.Fri", defaultNs),
                          value: "friday",
                          name: "friday",
                        },
                        {
                          label: t("sr.Sat", defaultNs),
                          value: "saturday",
                          name: "saturday",
                        },
                        {
                          label: t("sr.Sun", defaultNs),
                          value: "sunday",
                          name: "sunday",
                        },
                      ]}
                      layout="horizontal"
                      defaultValue="monday"
                    />
                  </div>
                  <label className="inputs">
                    {t("sr.Report_Time", defaultNs)}
                  </label>
                  <div>
                    <TimePicker
                      id="ReportTime"
                      name="ReportTime"
                      aria-label="Start Time"
                      className="timePicker"
                      format="hh:mm a"
                      onChange={this.handleInputChange}
                      placeholder="Select Report Time..."
                      value={this.state.Inputs.ReportTime || ""}
                      defaultValue={new Date()}
                    />
                  </div>

                  <label className="inputs">{t("sr.Email", defaultNs)}</label>
                  <div>
                    <Input
                      className="inputDescription"
                      type="email"
                      placeholder="Type in Email..."
                      onChange={this.HandleChangeCreate}
                    />
                  </div>
                  <br />
                  <div className="para">
                    <p>
                      Info : Report is sent on the first calendar day of every
                      month.
                      <br />
                      Report data is from the first calendar day to the last
                      calendar day of the
                      <br />
                      immediate preceding month
                    </p>
                  </div>
                </div>
              )}

              {this.state.specific && (
                <div>
                  <label className="inputs">
                    {t("sr.Report_StartTime", defaultNs)}
                  </label>
                  <div>
                    <TimePicker
                      id="ReportStartTime"
                      name="ReportStartTime"
                      value={this.state.Inputs.ReportStartTime || ""}
                      aria-label="Start Time"
                      className="timePicker"
                      format="hh:mm a"
                      placeholder="Select Report Start Time..."
                      onChange={this.handleInputChange}
                      defaultValue={new Date()}
                    />
                  </div>

                  <label className="inputs">
                    {t("sr.Report_Time", defaultNs)}
                  </label>
                  <div>
                    <TimePicker
                      id="ReportTime"
                      placeholder="Select Report Time..."
                      name="ReportTime"
                      value={this.state.Inputs.ReportTime || ""}
                      onChange={this.handleInputChange}
                      aria-label="Start Time"
                      className="timePicker"
                      format="hh:mm a"
                      defaultValue={new Date()}
                    />
                  </div>

                  <label className="inputs">{t("sr.Email", defaultNs)}</label>
                  <div>
                    <Input
                      name="Email"
                      className="inputDescription"
                      type="email"
                      placeholder="Type in Email..."
                      onChange={this.HandleChangeCreate}
                    />
                  </div>
                  <br />
                  <div className="para">
                    <p>
                      Info : Report is sent on the first calendar day of every
                      month.
                      <br />
                      Report data is from the first calendar day to the last
                      calendar day of the
                      <br />
                      immediate preceding month
                    </p>
                  </div>
                </div>
              )}

              {this.state.daily && (
                <div>
                  <label className="inputs">
                    {t("sr.Report_StartTime", defaultNs)}
                  </label>
                  <div>
                    <TimePicker
                      id="ReportStartTime"
                      name="ReportStartTime"
                      aria-label="Start Time"
                      onChange={this.handleInputChange}
                      value={this.state.Inputs.ReportStartTime || ""}
                      className="timePicker"
                      format="hh:mm a"
                      placeholder="Select Report Start Time..."
                      defaultValue={new Date()}
                    />
                  </div>

                  <label className="inputs">
                    {t("sr.Report_Time", defaultNs)}
                  </label>

                  <div>
                    <TimePicker
                      id="ReportTime"
                      placeholder="Select Report Time..."
                      name="ReportTime"
                      value={this.state.Inputs.ReportTime || ""}
                      onChange={this.handleInputChange}
                      aria-label="Start Time"
                      className="timePicker"
                      format="hh:mm a"
                      defaultValue={new Date()}
                    />
                  </div>

                  <label className="inputs">{t("sr.Email", defaultNs)}</label>
                  <div>
                    <Input
                      className="inputDescription"
                      type="email"
                      placeholder="Type in Email..."
                      onChange={this.HandleChangeCreate}
                    />
                  </div>
                  <br />
                  <div className="para">
                    <p>
                      Info : Report is sent on the first calendar day of every
                      month.
                      <br />
                      Report data is from the first calendar day to the last
                      calendar day of the
                      <br />
                      immediate preceding month
                    </p>
                  </div>
                </div>
              )}

              <br />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default ScheduleReportsPopup;
