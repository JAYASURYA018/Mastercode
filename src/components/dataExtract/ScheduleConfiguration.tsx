import React, { Component } from "react";
import { Input, Switch } from "@progress/kendo-react-inputs";
// import { number } from "prop-types";
import {
  RadioButton,
  RadioButtonChangeEvent,
} from "@progress/kendo-react-inputs";

import { Checkbox } from "@progress/kendo-react-inputs";

import "./_dataExtract.scss";
import { TimePicker } from "@progress/kendo-react-dateinputs/dist/npm/timepicker/TimePicker";
import { t } from "i18next";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { DateRangePicker } from "@progress/kendo-react-dateinputs";
import { SlideCtrl } from "../common/sliderCtrl";
import { useDispatch, useSelector } from "react-redux";

const defaultNs = { ns: ["camp", "callstrategy", "common", "bo", "sysconfig"] };

interface Iprops {
  selectedRuntypeValues: number;
  lastOutCome: any;
  isCheck: any;
  selectedOutcomes: number;
  handleInputChange: (event: any) => void;
  editScheduleData: any;
  allInputData: any;
  sliderState: number;
  handleInputFileChange: (event: any) => void;
  onRadioRunTypeChange: any;
  handleChangeOutcomes: any;
  onRunDaysSelectAll: any;
  onRunDaySelect: any;
  onSliderChange: any;
  campToggelData: any;
  onFileExtensionChange: any;
  fileExtensions: any;
}

class ScheduleConfiguration extends Component<Iprops> {
  extensions = ["CSV", "PDF", "DOC"];

  render() {
    return (
      <>
        <div className="scheduleConfig">
          <div className="runType">Run Type</div>

          <div className="schedule">
            <div
              className={
                this.props.selectedRuntypeValues === 1
                  ? "regularIntervals1"
                  : "regularIntervals"
              }
            >
              <RadioButton
                name="Regular Intervals"
                value={1}
                checked={this.props.selectedRuntypeValues === 1}
                label="Regular Intervals"
                onChange={this.props.onRadioRunTypeChange}

                // className="firstlabel"
                // style = {{checked ? "" : ""}}
              />
            </div>

            <div
              className={
                this.props.selectedRuntypeValues == 2
                  ? "regularIntervals1"
                  : "regularIntervals"
              }
            >
              <RadioButton
                name="Scheduled Time"
                value={2}
                checked={this.props.selectedRuntypeValues === 2}
                label="Scheduled Time"
                onChange={this.props.onRadioRunTypeChange}
              />
            </div>

            <div
              className={
                this.props.selectedRuntypeValues == 3
                  ? "regularIntervals1"
                  : "regularIntervals"
              }
            >
              <RadioButton
                name="On Demand"
                value={3}
                checked={this.props.selectedRuntypeValues == 3}
                label="On Demand"
                onChange={this.props.onRadioRunTypeChange}
              />
            </div>
          </div>

          {this.props.selectedRuntypeValues === 1 && (
            <div>
              <div className="runDays">Run Days</div>

              <div>
                <Checkbox
                  label="All"
                  checked={
                    this.props.isCheck.filter((i) => i.isSelected).length ==
                    this.props.isCheck.length
                  }
                  onChange={(e) => {
                    this.props.onRunDaysSelectAll(e);
                  }}
                  className="RunDaysCheckbox"
                />

                {this.props.isCheck.map((item, index) => {
                  return (
                    <span key={`a${index}`}>
                      <Checkbox
                        label={item.check}
                        className="RunDaysCheckbox"
                        checked={item.isSelected}
                        onChange={(e) => {
                          this.props.onRunDaySelect(item.id, e);
                        }}
                      />
                    </span>
                  );
                })}
              </div>

              <div className="Time">
                <div className="TimeInterval">Time Interval in Mins</div>
                <SlideCtrl
                  isSliderRequired={true}
                  min={1}
                  max={60}
                  onChangeValue={(e) => {
                    this.props.onSliderChange(e);
                  }}
                  value={this.props.sliderState}
                  className="slider"
                />
              </div>
            </div>
          )}

          {this.props.selectedRuntypeValues === 2 && (
            <div>
              <div className="runDays">Run Days</div>

              <div>
                <Checkbox
                  label={"All"}
                  onChange={(e) => {
                    this.props.onRunDaysSelectAll(e);
                  }}
                  checked={
                    this.props.isCheck.filter((i) => i.isSelected).length ==
                    this.props.isCheck.length
                  }
                  className="RunDaysCheckbox"
                />

                {this.props.isCheck.map((item) => {
                  return (
                    <>
                      <Checkbox
                        label={item.check}
                        className="RunDaysCheckbox"
                        checked={item.isSelected}
                        // onChange={(id,e) => this.props.onRunDaySelect(item.id,e)}
                        onChange={(e) => {
                          this.props.onRunDaySelect(item.id, e);
                        }}
                      />
                    </>
                  );
                })}
              </div>

              <div className="timeForEOD">Time for EOD</div>

              <div className="row" style={{ width: "821px", marginTop: "5px" }}>
                <div className="col-md-4">
                  {/* <div className="timeRangepicker"> */}
                  <TimePicker
                    id="purge-startTime"
                    name="purge-startTime"
                    aria-label="Start Time"
                    className="timer"
                    format="hh:mm a"
                    defaultValue={new Date()}
                  />
                  {/* </div> */}
                </div>
              </div>
            </div>
          )}

          {this.props.selectedRuntypeValues === 3 && (
            <div className="rangePickers">
              <div className="DateRangePickers">
                <div style={{ marginBottom: "10px" }}>Date Range</div>
                <DateRangePicker
                  // disabled={false}
                  className="runtypeDataRange"
                  format={{
                    year: "numeric",
                    date: "medium",
                    month: "short",
                  }}
                  defaultValue={{ start: new Date(), end: new Date() }}
                />
              </div>
              <div className="TimeRangePickers">
                <div style={{ marginBottom: "10px" }}>Time Range</div>
                <TimePicker
                  id="purge-endTime"
                  name="purge-endTime"
                  aria-label="End Time"
                  className="timer"
                  format="hh:mm a"
                  defaultValue={new Date()}
                />
                <TimePicker
                  id="purge-endTime"
                  name="purge-endTime"
                  aria-label="End Time"
                  className="timer"
                  format="hh:mm a"
                  defaultValue={new Date()}
                />
              </div>
            </div>
          )}

          <div className="fileName">File Name</div>

          <Input
            type="text"
            className="fileNameInput"
            // maxLength={20}
            // required={true}
            name="fileName"
            value={this.props.editScheduleData.fileName || ""}
            // onChange={(e) => this.props.handleInputFileChange(e)}
            onChange={(e) => {
              debugger;
              this.props.handleInputFileChange(e);
            }}
          />

          <div className="fileExtension">File Extension</div>

          <DropDownList
            style={{ width: "425px" }}
            data={this.extensions}
            defaultItem={this.extensions[0]}
            value={this.props.fileExtensions}
            // value={allInputSampleSate}
            onChange={(e) => {
              this.props.onFileExtensionChange(e);
            }}
          />

          <div className="attempts">Attempts</div>

          <div style={{ display: "inline-flex" }}>
            <div
              className={
                this.props.selectedOutcomes === 1
                  ? "regularIntervals1"
                  : "regularIntervals"
              }
            >
              <RadioButton
                name="outcomes"
                value={1}
                checked={this.props.selectedOutcomes == 1}
                label="All Outcomes"
                onChange={this.props.handleChangeOutcomes}
                // style={{}}
                className="outcomesdata"
              />
            </div>

            <div
              className={
                this.props.selectedOutcomes === 2
                  ? "regularIntervals1"
                  : "regularIntervals"
              }
            >
              <RadioButton
                name="outcomes"
                value={2}
                checked={this.props.selectedOutcomes == 2}
                label="Last Outcome Only"
                onChange={this.props.handleChangeOutcomes}
                className="lastOutcomesdata"
              />
            </div>
          </div>

          {this.props.selectedOutcomes == 2 && (
            <>
              <div className="data1">
                {this.props.lastOutCome.map((m) => {
                  return (
                    <div className="campAndToggle">
                      <div className="campData">{m.name}</div>
                      <div className="toggle">
                        <td>
                          <Switch onLabel={"YES"} offLabel={"NO"} />
                        </td>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default ScheduleConfiguration;
