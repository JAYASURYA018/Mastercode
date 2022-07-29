import React, { Component } from "react";
import { Slider, NumericTextBox } from "@progress/kendo-react-inputs";

interface Iprops extends Istate {
  onReturnValue?: any;
  isSliderRequired?: any;
  id?: string;
  name?: string;
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean;
  gridData?: any;
}

interface Istate {
  value?: any;
  min?: any;
  max?: any;
  width?: any;
  isSliderRequired?: any;
  className?: any;
  enableSpinner?: boolean;
  step?: any;
  onChangeValue?: any;
}

export class SlideCtrl extends Component<Iprops, Istate> {
  state: Istate = { step: 0 };
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.state.enableSpinner = false;
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    return {
      value: nextProps.value,
      min: nextProps.min,
      max: nextProps.max,
      width: nextProps.width,
      className: nextProps.className,
      onChangeValue: nextProps.onChangeValue,
      isSliderRequired: nextProps.isSliderRequired,
      step: nextProps.step,
    };
  }

  onChange = (event: any) => {
    if (this.state?.step >= 1) {
      event.value = Math.round(event.value);
    } else {
      event.value = Math.round(event.value * 2) / 2;
    }
    this.setState({
      value: event.value,
    });
    this.state.onChangeValue(event, this.props.id, this.props);
  };

  onFocusNumericTextBox = () => {
    this.setState({ enableSpinner: true });
  };

  onFocusOutNumericTextBox = () => {
    this.setState({ enableSpinner: false });
  };

  render() {
    let className = this.state.isSliderRequired
      ? "slider-ctr-wrapper " + this.state.className + " sliderEnable"
      : "slider-ctr-wrapper " + this.state.className;
    return (
      <div className={className}>
        {this.state.isSliderRequired && (
          <div className="slider-view">
            <Slider
              buttons={false}
              min={this.state.min}
              max={this.state.max}
              disabled={this.props.disabled}
              step={this.props.step}
              id={this.props.id}
              name={this.props.name}
              value={this.state.value}
              onChange={this.onChange}
              ariaLabelledBy={this.props.ariaLabel}
            />
          </div>
        )}
        <div className="slider-input-ctrl">
          <div
            className="input-group inline-group numeric-slider"
            onFocus={this.onFocusNumericTextBox}
            onBlur={this.onFocusOutNumericTextBox}
          >
            <NumericTextBox
              min={this.state.min}
              spinners={this.state.enableSpinner}
              value={this.state.value}
              max={this.state.max}
              width={this.state.width}
              step={this.props.step}
              defaultValue={this.state.min}
              onChange={(event) => this.onChange(event)}
              id={this.props.id}
              disabled={this.props.disabled}
              name={this.props.name}
              placeholder={this.props.placeholder}
              ariaLabelledBy={this.props.ariaLabel}
            />
          </div>
        </div>
      </div>
    );
  }
}
