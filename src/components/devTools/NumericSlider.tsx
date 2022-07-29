import React, { Component } from "react";
import {
  Input,
  Slider,
} from "@progress/kendo-react-inputs";

export class NumericSlider extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      clicks: 0,
      show: true,
    };
  }

  IncrementItem = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  };
  DecreaseItem = () => {
    this.setState({ clicks: this.state.clicks - 1 });
  };
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  };
  render() {
    return (
      <div className="col-10 p-0">
        <div className="col-8">
          <Slider buttons={false} min={1} max={10} step={1} defaultValue={7} />
        </div>
        <div className="col-3">
          <div className="input-group inline-group numeric-slider">
            <div className="input-group-prepend">
              <button
                className="k-button k-primary"
                onClick={this.DecreaseItem}
              >
                <i className="k-icon k-i-minus"></i>
              </button>
            </div>
            <Input min="0" name="quantity"  value="1" type="number" />
            <div className="input-group-append">
              <button
                className="k-button k-primary"
                onClick={this.IncrementItem}
              >
                <i className="k-icon k-i-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
