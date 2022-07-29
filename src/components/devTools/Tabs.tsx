import React, { Component } from "react";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

export class Tabs extends Component<{}, any> {
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
        <TabStrip selected={this.state.selected} onSelect={this.handleSelect}>
          <TabStripTab title="Campaign">
            <div>
              Campaign
              <p></p>
            </div>
          </TabStripTab>
          <TabStripTab title="Shared List">
            <div>
              <i className="k-icon k-i-warning"></i>
              <p>There is no shared list for this engagement group.</p>
              <p></p>
            </div>
          </TabStripTab>
        </TabStrip>
      </>
    );
  }
}
