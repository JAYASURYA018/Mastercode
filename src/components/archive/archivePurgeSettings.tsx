import React, { Component } from "react";
import { t } from "i18next";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { TimePicker } from "@progress/kendo-react-dateinputs";
import {
  RadioGroup,
  Input,
  Slider,
  RadioButton,
} from "@progress/kendo-react-inputs";
import { SlideCtrl } from "../common/sliderCtrl";
import { DateTimePicker } from "@progress/kendo-react-dateinputs";
import { time } from "console";

const defaultNs = { ns: ["aetools"] };

interface Iprops {
  handleAllDataChange: (event: any) => void;
  timechange: (e: any) => void;
  onDayChange: (e: any) => void;
  endTimeChange: (e: any) => void;
  allDataObject: {
    archiveType: string;
    runType: string;
    dataBase: string;
    ipAddress: string;
    userId: string;
    password: string;
    sharedDrive: string;
    s3Url: string;
    awsAccessKey: string;
    awsSecretKey: string;
    kmsKey: string;
    dayOfWeek: string;
    isEndOfMonth: boolean;
    isPurge: boolean;
    isArchive: boolean;
    startTime: any;
    endTime: any;
    dateOfMonth: any;
    modifiedDate: any;
    createdDate: any;
    port: string;
    shareDriveName: string;
    shareDrivePassword: string;
    shareDriveUserName: string;
    utcOffset: any;
    lcmDbName: string;
    lcmReportDbName: string;
    startDate: any;
    endDate: any;
    isAirFlowDeploy: boolean;
    amazonRegionEndPoint: string;
    amazonKMSEncrypt: string;
    amazonServerSideEncryptionMethod: string;
    authenticationDBType: any;
    excludedDays: string;
  };
}

interface Istate {
  daily: boolean;
  weekly: boolean;
  monthly: boolean;
  endOfTheMonth: boolean;
  state: number;
  slider: boolean;
  dayChangeDropdown?: any;
  startTime?: any;
  scheduleTime?: any;
  Date: boolean;
  class: String;
  class1: String;
}

export default class archivePurgeSettings extends Component<Iprops> {
  state: Istate = {
    daily: false,
    weekly: false,
    monthly: false,
    endOfTheMonth: false,
    state: 1,
    slider: false,
    dayChangeDropdown: "",
    startTime: new Date(),
    scheduleTime: 0,
    Date: false,
    class: undefined,
    class1: undefined,
  };

  daylist: Array<String> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // date = this.state.scheduleTime;

  // result = this.date.toISOString();

  // onDayChange = (event: any) => {
  //   const days = event.value;
  //   this.setState({ dayChangeDropdown: days });
  //   console.log("dayChangeDropdown", this.state.dayChangeDropdown);
  // };

  // timechange = (e: any) => {
  //   const newTime = e.value;
  //   const value = e.value;

  //   const name = e.target.name;
  //   console.log("value", value);
  //   console.log("name", name);
  //   // const dummy = [event.target.name]: event.target.value,

  //   // this.setState((prevState: Istate) => {
  //   //   return {
  //   //     scheduleTime: {
  //   //       ...prevState,
  //   //       [name]: value,
  //   //     },
  //   //   };
  //   // });

  //   this.setState({
  //     scheduleTime: value,
  //   });
  //   console.log("scheduleTime", this.state.scheduleTime);
  // };

  handlePurgeChange = (event: any) => {
    if (event.value === "daily") {
      this.setState({
        daily: true,
        weekly: false,
        monthly: false,
        class: "daily",
      });
    } else if (event.value === "weekly") {
      this.setState({
        weekly: true,
        daily: false,
        monthly: false,
        class: "weekly",
      });
    } else if (event.value === "monthly") {
      this.setState({
        monthly: true,
        weekly: true,
        daily: false,
        Date: false,
        endOfTheMonth: false,
        class: "monthly",
      });
    }
  };
  handlePurgeRadioChange = (event: any) => {
    if (event.value === "endOfTheMonth") {
      this.setState({
        monthly: true,
        Date: false,
        slider: false,
        endOfTheMonth: true,
        class1: "endOfTheMonth",
      });
    } else if (event.value === "Date") {
      this.setState({
        monthly: true,
        endOfTheMonth: true,
        slider: true,
        Date: true,
        class1: "Date",
      });
    }
  };
  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-12">
            <label
              id={"schedule-lableRadiobuttonsMain"}
              aria-labelledby={t("archive.runType", defaultNs)}
              className="pt-20 w-100"
            >
              {t("archive.runType", defaultNs)}
            </label>
            {/* <RadioGroup
              data={[
                { value: 1 },
                { value: 2 ,className: "weekly"},
                {
                  value: 3,
                  className: "monthly",
                },
              ]}
              layout="horizontal"
              className="twoway"
              onChange={this.handlePurgeChange}
            /> */}
          </div>
          <div className="buttonsradio">
            <div
              className={this.state.class === "daily" ? "third" : "thirdbefore"}
            >
              <RadioButton
                name="group1"
                value="daily"
                // checked={selectedValue === "second"}
                label={t("archive.daily", defaultNs)}
                onChange={this.handlePurgeChange}
                // onChange={handleChange}
                style={{ marginLeft: "17px" }}
              />
            </div>

            <div
              className={
                this.state.class === "weekly"
                  ? "radiobuttonafter"
                  : "thirdbefore"
              }
            >
              <RadioButton
                name="group1"
                value="weekly"
                // checked={selectedValue === "second"}
                label={t("archive.weekly", defaultNs)}
                onChange={this.handlePurgeChange}
                // onChange={handleChange}
              />
            </div>

            <div
              className={
                this.state.class === "monthly"
                  ? "radiobuttonafter"
                  : "thirdbefore"
              }
            >
              <RadioButton
                name="group1"
                value="monthly"
                // checked={selectedValue === "third"}
                label={t("archive.monthly", defaultNs)}
                onChange={this.handlePurgeChange}
                // onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {this.state.monthly && (
          <div className="row">
            <div className="col-md-12">
              <label
                id={"schedule-lableRadiobuttonsMonth"}
                aria-labelledby={t("archive.monthlyOption", defaultNs)}
                // className="pt-20 w-100 this.state.monthly ? "onChangeColor" : "normalColor" "
                className="pt-20 w-100"
                // className={`pt-20 w-100 ${
                //   this.state.monthly ? "onChangeColor" : "normalColor"
                // }`}
              >
                {t("archive.monthlyOption", defaultNs)}
              </label>
              <div className="d-flex">
                <div>
                  <div className="buttonsradio">
                    <div
                      className={
                        this.state.class1 === "endOfTheMonth"
                          ? "radiobuttonafter"
                          : "thirdbefore"
                      }
                    >
                      <RadioButton
                        name="group3"
                        value="endOfTheMonth"
                        // checked={selectedValue === "first"}
                        label={t("archive.endOfMonth", defaultNs)}
                        onChange={this.handlePurgeRadioChange}
                        // onChange={handleChange}
                      />
                    </div>
                    <div
                      className={
                        this.state.class1 === "Date"
                          ? "radiobuttonafter"
                          : "thirdbefore"
                      }
                    >
                      <RadioButton
                        name="group3"
                        value="Date"
                        // checked={selectedValue === "second"}
                        label={t("archive.Date", defaultNs)}
                        onChange={this.handlePurgeRadioChange}
                        // onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {this.state.slider && (
                  <div className="dateslider">
                    <SlideCtrl
                      isSliderRequired={true}
                      min={1}
                      max={31}
                      onChangeValue={(e, id, props) => {
                        console.log(e, id, props);
                        this.setState({ state: e.value });
                      }}
                      value={this.state.state}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {this.state.endOfTheMonth && (
          <div className="row">
            <div className="col-md-12">
              <label
                id={"schedule-lableStartTime"}
                aria-labelledby={t("archive.settings.startTime", defaultNs)}
                className="pt-20 w-100"
              >
                {t("archive.settings.startTime", defaultNs)}
              </label>
              <div className="timeRangepicker">
                <TimePicker
                  id="purge-startTime"
                  name="purgestartTime"
                  aria-label="Start Time"
                  className="w-50"
                  format="hh:mm a"
                  defaultValue={new Date()}
                  onChange={(e) => this.props.timechange(e)}
                />

                <label
                  id={"schedule-lableEndTime"}
                  aria-labelledby={t("archive.settings.endTime", defaultNs)}
                  className="pt-20 w-100"
                >
                  {t("archive.settings.endTime", defaultNs)}
                </label>
                <TimePicker
                  id="purge-endTime"
                  name="purgeendTime"
                  aria-label="End Time"
                  className="w-50"
                  format="hh:mm a"
                  defaultValue={new Date()}
                  onChange={(e) => this.props.endTimeChange(e)}
                />
              </div>
            </div>
          </div>
        )}

        {this.state.daily && (
          <div className="row">
            <div className="col-md-12">
              <label
                id={"schedule-lableTimeRange"}
                aria-labelledby={t("archive.timeRange", defaultNs)}
                className="pt-20 w-100"
              >
                {t("archive.timeRange", defaultNs)}
              </label>
              <div className="timeRangepicker">
                <TimePicker
                  id="purge-startTime"
                  name="purgestartTime"
                  aria-label="Start Time"
                  className="w-50"
                  format="hh:mm a"
                  defaultValue={new Date()}
                  onChange={(e) => this.props.timechange(e)}
                />

                <TimePicker
                  id="purge-endTime"
                  name="purgeendTime"
                  aria-label="End Time"
                  className="w-50"
                  format="hh:mm a"
                  defaultValue={new Date()}
                  onChange={(e) => this.props.endTimeChange(e)}
                />
              </div>
            </div>
          </div>
        )}
        {this.state.weekly && (
          <div>
            <div className="row">
              <div className="col-md-12">
                <label
                  id={"schedule-lableTimeRange"}
                  aria-labelledby={t("archive.timeRange", defaultNs)}
                  className="pt-20 w-100"
                >
                  {t("archive.timeRange", defaultNs)}
                </label>
                <div className="timeRangepicker">
                  <TimePicker
                    id="purge-startTime"
                    name="purgestartTime"
                    aria-label="Start Time"
                    className="w-50"
                    format="hh:mm a"
                    defaultValue={new Date()}
                    onChange={(e) => this.props.timechange(e)}
                  />

                  <TimePicker
                    id="purge-endTime"
                    name="purgeendTime"
                    aria-label="End Time"
                    className="w-50"
                    format="hh:mm a"
                    defaultValue={new Date()}
                    onChange={(e) => this.props.endTimeChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label
                  id={"schedule-lableDayDropdown"}
                  aria-labelledby={t("archive.dayOfWeek", defaultNs)}
                  className="pt-26 w-100"
                >
                  {t("archive.dayOfWeek", defaultNs)}
                </label>
                <DropDownList
                  data={this.daylist}
                  name="dropDownList"
                  className="purgeDropdown"
                  defaultValue={"Monday"}
                  // value={this.state.dayChangeDropdown}
                  onChange={(e) => {
                    this.props.onDayChange(e);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
