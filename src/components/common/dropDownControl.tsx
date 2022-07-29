import * as React from "react";
const isPresent = (value:any) => value !== null && value !== undefined;

export default function DropDownControl(DropDownComponent:any) {
    return class extends React.Component<any,any> {
        component:any;
        events:any = {
            onBlur: (event:any) => this.triggerEvent("onBlur", event),
            onFocus: (event:any) => this.triggerEvent("onFocus", event),
            onChange: (event: any) => this.triggerEvent("onChange", event),
            onPageChange: (event: any) => this.triggerEvent("onPageChange", event),
            onFilterChange: (event: any) => this.triggerEvent("onFilterChange", event),
        };

        get value() {
            if (this.component) {
                const value = this.component.value;
                return isPresent(value) ? value[this.props.valueField] : value;
            }
        }

        render() {
            return (
                <DropDownComponent
                    {...this.props}
                    value={this.itemFromValue(this.props?.value)}
                    defaultValue={this.itemFromValue(this.props?.defaultValue)}
                    ref={(component:any) => (this.component = component)}
                    {...this.events}
                />
            );
        }

        triggerEvent(eventType:any, event:any) {
            if (this.props[eventType]) {
                this.props[eventType].call(undefined, {
                    ...event,
                    value: this.value,
                    target: this,
                });
            }
        }

        itemFromValue(value:any) {
            const { data = [], valueField } = this.props;
            return isPresent(value)
                ? data.find((item:any) => item[valueField] === value)
                : value;
        }
    };
}