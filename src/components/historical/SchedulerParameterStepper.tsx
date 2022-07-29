import { DropDownList } from "@progress/kendo-react-dropdowns";
import React, { Component } from "react";

import { TimePicker } from "@progress/kendo-react-dateinputs";
import { TextArea } from "@progress/kendo-react-inputs";

import { Checkbox, CheckboxChangeEvent } from "@progress/kendo-react-inputs";

import allDays from "./AllDays.json";

interface Istate {
  schedulerDropdown?: any;
  isCheck?: any;
}

interface Iprops {}

class SchedulerParametersStepper extends Component<Iprops, Istate> {
  state: Istate = {
    schedulerDropdown: null,
    isCheck: JSON.parse(JSON.stringify(allDays)),
  };
  sizes = ["Every Day", "Once a Week", "Once a Month", "On Selected Days"];

  onSchedulerDropdownChange = (e: any) => {
    //debugger;
    this.setState({ schedulerDropdown: e.value });
  };

  onRunDaySelect = (id: string, e: CheckboxChangeEvent) => {
    debugger;
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

  render() {
    return (
      <div className="schedulerStepperTwo">
        <div className="mainReport">Send Report</div>
        <DropDownList
          data={this.sizes}
          className="schedulerDropdown"
          value={this.state.schedulerDropdown}
          onChange={this.onSchedulerDropdownChange}
        />
        {this.state.schedulerDropdown === "Every Day" && (
          <>
            <div style={{ marginTop: "25px" }}>
              <span className="staterReport">Start Report at</span>
              <TimePicker
                id="purge-startTime"
                name="purge-startTime"
                aria-label="Start Time"
                className="timer"
                format="hh:mm a"
                defaultValue={new Date()}
                defaultShow={false}
              />
              <span style={{ marginLeft: "20px" }} className="reportTime">
                Report Time
              </span>
              <TimePicker
                id="purge-startTime"
                name="purge-startTime"
                aria-label="Start Time"
                className="timer"
                format="hh:mm a"
                defaultValue={new Date()}
                defaultShow={false}
              />
              <div></div>

              <label className="description">Send Report to</label>
              <label className="seperateEmail">Separate Emails by Comma</label>
              <br />
              <TextArea
                className="descriptionInput"
                placeholder="Type in Email Adderss..."
              />
            </div>
          </>
        )}
        {this.state.schedulerDropdown === "Once a Week" && (
          <>
            <span>
              <span className="schedulerOn">On</span>
              <DropDownList
                //   label="Select Frequency..."
                // style={{ width: "400px" }}
                data={this.sizes}
                defaultValue={this.sizes[0]}
                //   defaultValue="Select Frequency..."
                className="schedulerDropdown"
                //   value={this.state.schedulerDropdown}
                // // value={allInputSampleSate}
                //   onChange={this.onSchedulerDropdownChange}
              />

              <div style={{ marginTop: "20px" }}>
                <label className="reportTime">Report Time</label>
                <TimePicker
                  id="purge-startTime"
                  name="purge-startTime"
                  aria-label="Start Time"
                  className="SchedulerWeektimer"
                  format="hh:mm a"
                  defaultValue={new Date()}
                  defaultShow={false}
                />
                <div>
                  <div></div>
                  <label className="description">Send Report to</label>
                  <label className="seperateEmail">
                    Separate Emails by Comma
                  </label>
                  <br />
                  <TextArea
                    className="descriptionInput"
                    placeholder="Type in Email Adderss..."
                    //   valid={valid}
                    //   type=""
                    //   id={id}
                    //   disabled={disabled}
                    //   maxlength={max}
                    //   rows={4}
                    //   ariaDescribedBy={`${hindId} ${errorId}`}
                    //   {...others}
                  />
                </div>
              </div>
            </span>
          </>
        )}
        {this.state.schedulerDropdown === "Once a Month" && (
          <>
            <div style={{ marginTop: "25px" }}>
              <span className="staterReport">Start Report at</span>

              <TimePicker
                id="purge-startTime"
                name="purge-startTime"
                aria-label="Start Time"
                className="timer"
                format="hh:mm a"
                defaultValue={new Date()}
                defaultShow={false}
              />
              <br />
              <label className="description">Send Report to</label>
              <label className="seperateEmail">Separate Emails by Comma</label>
              <br />
              <TextArea
                className="descriptionInput"
                placeholder="Type in Email Adderss..."
                //   valid={valid}
                //   type=""
                //   id={id}
                //   disabled={disabled}
                //   maxlength={max}
                //   rows={4}
                //   ariaDescribedBy={`${hindId} ${errorId}`}
                //   {...others}
              />
            </div>
          </>
        )}
        {this.state.schedulerDropdown === "On Selected Days" && (
          <>
            <div className="selectedDays">
              {this.state.isCheck.map((item, index) => {
                return (
                  <span key={`a${index}`}>
                    <Checkbox
                      label={item.check}
                      className="slectedCheckbox"
                      checked={item.isSelected}
                      onChange={(e) => {
                        this.onRunDaySelect(item.id, e);
                      }}
                    />
                  </span>
                );
              })}

              <div style={{ marginTop: "25px" }}>
                <span className="staterReport">Start Report at</span>

                <TimePicker
                  id="purge-startTime"
                  name="purge-startTime"
                  aria-label="Start Time"
                  className="timer"
                  format="hh:mm a"
                  defaultValue={new Date()}
                  defaultShow={false}
                />

                <span style={{ marginLeft: "20px" }} className="reportTime">
                  Report Time
                </span>
                <TimePicker
                  id="purge-startTime"
                  name="purge-startTime"
                  aria-label="Start Time"
                  className="timer"
                  format="hh:mm a"
                  defaultValue={new Date()}
                  defaultShow={false}
                />
                <div></div>
                <label className="description">Send Report to</label>
                <label className="seperateEmail">
                  Separate Emails by Comma
                </label>
                <br />
                <TextArea
                  className="descriptionInput"
                  placeholder="Type in Email Adderss..."
                  //   valid={valid}
                  //   type=""
                  //   id={id}
                  //   disabled={disabled}
                  //   maxlength={max}
                  //   rows={4}
                  //   ariaDescribedBy={`${hindId} ${errorId}`}
                  //   {...others}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default SchedulerParametersStepper;
