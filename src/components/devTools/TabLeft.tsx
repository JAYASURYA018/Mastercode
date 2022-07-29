import React, { Component } from "react";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

export class TabLeft extends Component<{}, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      selected: 0,
    };
  }
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
    return (
      <>
        <TabStrip
          selected={this.state.selected}
          onSelect={this.handleSelect}
          tabPosition="left"
        >
          <TabStripTab title="Reports & Filters">
            <div>Reports & Filters contents</div>
          </TabStripTab>
          <TabStripTab title="Report Results">
            <div>
              <p>Report Results contents here</p>
            </div>
          </TabStripTab>
          <TabStripTab title="Disabled Tab" disabled={true} />
        </TabStrip>
      </>
    );
  }
}
