import React, { Component } from "react";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";

import "./_archive.scss";
import PurgeFile from "./purgeFile";

interface Istate {
  selected: number;
}

export default class Purgeconfiguration extends Component<Istate> {
  handleSelect = (e: TabStripSelectEventArguments) => {
    this.setState({ selectedTab: e.selected });
  };

  state: Istate = {
    selected: 1,
  };
  render() {
    return (
      <div>
        <TabStrip
          selected={this.state.selected}
          onSelect={this.handleSelect}
          className="maintabs"
        >
          <TabStripTab title="Settings">
            <div>
              <p>Content 1</p>
            </div>
          </TabStripTab>
          <TabStripTab title="Table Groups">
            <div>content 2</div>
          </TabStripTab>
          <TabStripTab title="Process Monitoring">
            <div>
              <p>Content 3</p>
            </div>
          </TabStripTab>
          <TabStripTab title="Purge Files Configuration">
            <PurgeFile selected={this.state.selected} />
          </TabStripTab>
        </TabStrip>
      </div>
    );
  }
}
