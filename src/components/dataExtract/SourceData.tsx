// import React, { Component } from "react";
import * as React from "react"; //1
import * as ReactDOM from "react-dom"; //2

import "./_dataExtract.scss";
import {
  ListBox,
  ListBoxToolbar,
  ListBoxItemClickEvent,
  ListBoxToolbarClickEvent,
} from "@progress/kendo-react-listbox";
import { DropDownList } from "@progress/kendo-react-dropdowns";

const toolbarTools = [
  "transferTo",
  "transferFrom",
  "transferAllTo",
  "transferAllFrom",
];

const toolbarTools2 = ["moveUp", "moveDown"];

interface Iprops {
  dualListAvailable: any;
  dualListAssociated: any;
  draggedItem: any;
  dataSourceDropdown: any;
  onDataSourceChange: (data: any) => void;
  handleItemClick: any;
  handleToolBarClick: any;
  handleDragStart: any;
  handleDrop: any;
  SELECTED_FIELD: any;
}

class SourceData extends React.Component<Iprops> {
  dataSourceDrop = ["Call Activity", "test 1", "test 2"];

  render() {
    // console.log(this.sizes[0]);
    return (
      <div className="selectCampaginData">
        <label className="selectCampaginDescription">Data Source</label>
        <br />

        <DropDownList
          style={{ width: "400px" }}
          data={this.dataSourceDrop}
          defaultItem={this.dataSourceDrop[0]}
          value={this.props.dataSourceDropdown}
          onChange={(e) => {
            this.props.onDataSourceChange(e);
          }}
        />

        <div className="container dualListData" style={{ marginTop: "45px" }}>
          <div className="row">
            <div style={{ width: "45%" }}>
              <span className="availableFields">Available Fields</span>
              <span style={{ color: "red", margin: "5px" }}>•</span>
              <span className="availableFields">
                {this.props.dualListAvailable.length}
              </span>
              <ListBox
                style={{ height: "220px", width: "100%", marginTop: "10px" }}
                data={this.props.dualListAvailable}
                textField="name"
                selectedField={this.props.SELECTED_FIELD}
                onItemClick={(e: ListBoxItemClickEvent) =>
                  this.props.handleItemClick(
                    e,
                    "dualListAvailable",
                    "dualListAssociated"
                  )
                }
                onDragStart={this.props.handleDragStart}
                onDrop={this.props.handleDrop}
                // @ts-ignore: for specific use
                name="dualListAvailable"
                toolbar={() => {
                  return (
                    <ListBoxToolbar
                      tools={toolbarTools}
                      data={this.props.dualListAvailable}
                      dataConnected={this.props.dualListAssociated}
                      onToolClick={(e: ListBoxToolbarClickEvent) =>
                        this.props.handleToolBarClick(
                          e,
                          "dualListAvailable",
                          "dualListAssociated"
                        )
                      }
                    />
                  );
                }}
              />
            </div>

            <div style={{ width: "45%" }}>
              <span className="availableFields">Associated Fields</span>
              <span style={{ color: "red", margin: "5px" }}>•</span>
              <span className="availableFields">
                {this.props.dualListAssociated.length}
              </span>
              <ListBox
                style={{ height: "220px", width: "100%", marginTop: "10px" }}
                data={this.props.dualListAssociated}
                textField="name"
                selectedField={this.props.SELECTED_FIELD}
                onItemClick={(e: ListBoxItemClickEvent) =>
                  this.props.handleItemClick(
                    e,
                    "dualListAssociated",
                    "dualListAvailable",
                    "shipped"
                  )
                }
                onDragStart={this.props.handleDragStart}
                onDrop={this.props.handleDrop}
                // @ts-ignore: for specific use
                name="dualListAssociated"
                toolbar={() => {
                  return (
                    <ListBoxToolbar
                      tools={toolbarTools2}
                      data={this.props.dualListAssociated}
                      // dataConnected={this.props.shipped}
                      onToolClick={(e: ListBoxToolbarClickEvent) =>
                        this.props.handleToolBarClick(
                          e,
                          "inDevelopment",
                          "shipped"
                        )
                      }
                    />
                  );
                }}
              />
            </div>

            <div className="text">Hold Shift Key to Multi Select</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SourceData;
