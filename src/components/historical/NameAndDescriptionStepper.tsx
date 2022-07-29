import { Input, TextArea } from "@progress/kendo-react-inputs";
import React, { Component } from "react";

interface Iprops {
  isHistoricalName: any;
  schedulerDesp: any;
  schedulerName: any;
  onHandeleChange: any;
  handleSchedulerInputChange: any;
}

class NameAndDescriptionStepper extends Component<Iprops> {
  render() {
    return (
      <div className="mainStepperOne">
        <label className="schedulerName">Scheduler Name</label>
        <br />
        <Input
          type="text"
          name="schedulerName"
          value={this.props.schedulerName || ""}
          className="SchedulerInput"
          placeholder="Type in Scheduler Name..."
          onChange={(e) => {
            this.props.handleSchedulerInputChange(e);
          }}
        />
        <br />
        <label className="description">Description</label>
        <br />
        <TextArea
          className="descriptionInput"
          placeholder="Type in Scheduler Description..."
          name="schedulerDesp"
          value={this.props.schedulerDesp || ""}
          onChange={(e) => {
            this.props.onHandeleChange(e);
          }}
        />
      </div>
    );
  }
}

export default NameAndDescriptionStepper;
