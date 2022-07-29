import React, { Component } from "react";
import "./_dataExtract.scss";
import { Checkbox, Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import Timezones from "./TimeZones.json";

interface Iprops {
  campaignData: Array<any>;
  allInputData: any;
  handleInputChange: any;
  onTimeZoneChange: any;
  search: string;
  onCompaignSelect: any;
  onCompaignSelectAll: any;
}

class SelectCampaign extends Component<Iprops, any> {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };
  }

  onSearch = (e: any) => {
    this.setState({ search: e.target.value });
  };

  getRegex = (txt: string) => {
    return new RegExp(`${txt}`, "gi");
  };

  render() {
    return (
      <div className="selectCampaginData">
        <label className="selectCampaginDescription">Description</label>
        <br />

        <Input
          placeholder="Type in Description..."
          className="selectCampDescription"
          name="description"
          value={this.props.allInputData.description || ""}
          onChange={(e) => {
            this.props.handleInputChange(e);
          }}
        />

        <br />

        <p className="selectCampaginTimeZones">TimeZone</p>

        <DropDownList
          style={{ width: "425px" }}
          data={Timezones}
          textField="text"
          dataItemKey="id"
          defaultItem={{ text: "Select TimeZone..." }}
          value={this.props.allInputData.timeZone}
          onChange={(e) => this.props.onTimeZoneChange(e)}
        />

        <div className="Campaigns">CAMPAIGNS</div>

        <div className="campaignsData1">
          <div className="campaignsData">
            <div
              className="campaignsDataCheckText"
              style={{ marginTop: "5px", marginLeft: "19px" }}
            >
              <Checkbox
                className="inputCheckbox"
                checked={
                  this.props.campaignData.filter((i) => i.isSelected).length ===
                  this.props.campaignData.length
                }
                onChange={(e) => {
                  this.props.onCompaignSelectAll(e);
                }}
                label="Select All"
              />
            </div>
            <div style={{ marginTop: "7px", marginLeft: "19px" }}>
              <span className="campaignsDataAvailable">Available Campaign</span>
              <span className="campaignsDataDot">•</span>
              <span className="campaignsDataNum">
                {this.props.campaignData.length}
              </span>
            </div>
            <div style={{ marginTop: "7px", marginLeft: "8px" }}>
              <span className="campaignsDataSelected">Selected Campaign</span>
              <span className="campaignsDataSelectedDot">•</span>
              <span className="campaignsDataNumZero">
                {this.props.campaignData.filter((i) => i.isSelected).length}
              </span>
            </div>

            <div>
              <i className="icon-tool-search search-icon"></i>
              <Input
                placeholder="Search"
                className="campaignsDataInput"
                value={this.state.search}
                onChange={this.onSearch}
                style={{ paddingLeft: "26px" }}
              />
              {/* <img src="./images/search.png" className="searchData" /> */}
            </div>
            {/* <div>
              <img src="./images/search.png" className="searchData" />

              <input
                type="text"
                value={this.state.searchFilter}
                onChange={(e) => this.onSearch(e)}
                // placeholder={t("common.grid.search.label", defaultNs)}
                className="campaignsDataInput"
              />
            </div> */}
          </div>

          <div className="campaignsList">
            {this.props.campaignData
              .filter((a) => a.name.match(this.getRegex(this.state.search)))
              .map((item, index) => (
                <div key={`a${index}`} className="campaignsListBoth">
                  <Checkbox
                    label={item.name}
                    className="campaignsListCheckbox"
                    checked={item.isSelected}
                    onChange={(e) => {
                      this.props.onCompaignSelect(item.id, e);
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SelectCampaign;
