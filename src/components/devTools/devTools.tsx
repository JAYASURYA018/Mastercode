import React, { Component } from "react";
import {
  Input,
  RadioGroup,
  Checkbox,
  Switch,
  TextArea,
  Slider,
} from "@progress/kendo-react-inputs";
import { Ripple } from "@progress/kendo-react-ripple";
import {
  DateRangePicker,
  DateTimePicker,
} from "@progress/kendo-react-dateinputs";
import { NumericSlider } from "./NumericSlider";
import { Tabs } from "./Tabs";
import { TabLeft } from "./TabLeft";
import { DropDownList, ComboBox } from "@progress/kendo-react-dropdowns";
import { GridControl } from "./Grid";
import Wizard from "./wizard";
import { ModalPop } from "./ModalPop";

export class DevTools extends Component<{}, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      selected: 0,
    };
  }
  UploadType = ["Text", "CSV", "Excel", "Json"];
  handleSelect = (e: any) => {
    this.setState({ selected: e.selected });
  };
  filterElements = (element: any) => {
    if (element.tagName === "STRONG") {
      return true;
    }
    return false;
  };

  render() {
    const usernameValidationMessage =
      "Your username should contain only letters!";
    return (
      <div className="componentSection glyph fs1">
        <div className="components">
          <label className="title">Input</label>
          <Input
            name="username"
            style={{ width: "100%" }}
            pattern={"[A-Za-z]+"}
            required={true}
            placeholder="Enter Username"
            validationMessage={usernameValidationMessage}
          />
          <span className="error">Please Enter UserName</span>
          <br />
          <br />
          <br />
          <label className="title">Disabled mode</label>
          <span className="icon-custom "></span>
          <span className="icon-custom "></span>
          <span className="icon-agent"></span>
          <Input
            name="disabled mode"
            style={{ width: "100%" }}
            pattern={"[A-Za-z]+"}
            minLength={2}
            required={true}
            disabled={true}
            placeholder="disabled mode"
            validationMessage={usernameValidationMessage}
          />
        </div>
        <div className="components">
          <label className="title">TextArea</label>
          <TextArea
            className="w-100"
            placeholder="Enter engagement description"
            rows={4}
            minLength={2}
            required={true}
          />
          <span className="error">Please Enter engagement description</span>
          <label className="title pt-3">TextArea Disabled</label>
          <TextArea
            className="w-100"
            placeholder="Enter engagement description"
            rows={4}
            disabled={true}
          />
        </div>
        <div className="components">
          <label className="title">DateRangePicker</label>
          <DateRangePicker format={"MM dd, yyyy"} />
        </div>
        <div className="components">
          <label className="title">DropDownList</label>
          <DropDownList data={this.UploadType} />
        </div>
        <div className="components">
          <label className="title">ComboBox</label>
          <ComboBox data={this.UploadType} />
        </div>

        <div className="components row">
          <label className="title">Switch</label>
          <div className="col-2">
            <Switch
              id="switch1"
              name="switch"
              required={true}
              className="mr-3"
            />
          </div>
          <div className="col-2">
            <Switch
              id="switch1"
              name="switch"
              required={true}
              checked={true}
              className="mr-3"
            />
          </div>
          <div className="col-2">
            <Switch
              id="switch1"
              name="switch"
              required={true}
              disabled={true}
              className="mr-3"
            />
          </div>
          <div className="col-2">
            <Switch
              id="switch1"
              name="switch"
              required={true}
              checked={true}
              disabled={true}
            />
          </div>
        </div>
        <div className="components">
          <label className="title">Checkbox</label>
          <Checkbox label={"Digital "} defaultChecked={true} className="pr-3" />
          <Checkbox label={"Voice"} className="pr-3" />
          <Checkbox label={"Email Disabled"} disabled={true} className="pr-3" />
          <Checkbox
            label={"Email Disabled"}
            disabled={true}
            defaultChecked={true}
          />
        </div>
        <div className="components row">
          <label className="title">RadioGroup</label>
          <RadioGroup
            data={[
              { label: "Voice", value: "female" },
              { label: "Email", value: "male" },
              { label: "Digital Chennal", value: "other" },
              { label: "Call Disabked mode", value: "Call", disabled: true },
            ]}
          />
        </div>
        <div className="components">
          <label className="title">Buttons</label>
          <Ripple>
            <div className="row">
              <div className="col-3">
                <label>Primary</label>
                <br />
                <input
                  type="submit"
                  className="k-button k-primary"
                  value="Save As…"
                />
              </div>
              <div className="col-3">
                <label>Secondary</label>
                <br />
                <button type="submit" className="k-button k-secondary">
                  Cancel
                </button>
              </div>
              <div className="col-3">
                <label>Tertiary</label>
                <br />
                <input
                  type="submit"
                  className="k-button k-tertiary"
                  value="Sign up"
                />
              </div>
              <div className="col-3">
                <label>Disabled</label>
                <br />
                <button
                  type="submit"
                  className="k-button k-disabled"
                  value="Sign up"
                >
                  Sign up
                </button>
              </div>
              <br />
            </div>
          </Ripple>
        </div>
        <div className="components">
          <label className="title">Modal popup</label>
          <div className="">
            <ModalPop />
          </div>
        </div>
        <div className="components">
          <label className="title">NumericSlider</label>
          <div className="row">
            <div className="col-4 NumericSlider">
              <label>Minimum Energy </label>
              <span>1-100</span>
            </div>
            <div className="col-8">
              <Slider
                buttons={false}
                min={1}
                max={10}
                step={1}
                defaultValue={7}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4 NumericSlider">
              <label>Minimum Energy </label>
              <span>1-100</span>
            </div>
            <div className="col-8">
              <NumericSlider />
            </div>
          </div>
        </div>
        <div className="components">
          <label className="title">Tabs</label>
          <Tabs />
          <label className="title mt-2">Tabs left</label>
          <TabLeft />
        </div>

        <div className="components">
          <label className="title">TimeRangepicker</label>
          <div className="timeRangepicker">
            <DateTimePicker format={"12:06 a"} />
            <DateTimePicker format={"03:46 a"} />
          </div>
        </div>
        <div className="components">
          <label className="title">Grid</label>
          <GridControl />
        </div>
        <div className="components">
          <label className="title">Stepper(wizard )</label>
          <Wizard />
        </div>
        <div className="components">
          <label className="title">Popover</label>
        </div>

        <div className="components">
          <label className="title">scheduler</label>
        </div>
        <div className="components">
          <label className="title">timeZone-UI</label>
        </div>
        <div className="components">
          <label className="title">Chart</label>
        </div>
        <div className="components">
          <label className="title">window widget</label>
        </div>
        <div className="components">
          <label className="title">Multiselect</label>
        </div>
      </div>
    );
  }
}
