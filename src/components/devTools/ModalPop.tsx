import React, { Component } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Input } from "@progress/kendo-react-inputs";
import "../../scss/_modal.scss";

export class ModalPop extends Component<{}, any> {
  state = {
    visible: false,
  };
  UploadType = ["Text", "CSV", "Excel", "Json"];

  toggleDialog = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };
  render() {
    return (
      <div>
        <button className="k-button" onClick={this.toggleDialog}>
          Open Dialog
        </button>
        {this.state.visible && (
          <Dialog className="dialogpop">
            <p className="heading">
              <i className="k-icon k-i-calendar"></i>
              <Input placeholder="Engagement Group Name" />
              <button type="button" className="k-button"></button>
              {/* <span onClick={this.toggleDialog} className="align-right">
                X
              </span> */}
            </p>
            <div className="dialog-content">
              <label className="title">Expression Settings</label>
              <div className="row">
                <div className="col-10 ">
                  <label>Expression Function</label>
                  <DropDownList data={this.UploadType} className="w-100" />
                </div>
              </div>
              <label className=" mt-4">Parameter 1</label>
              <div className="row">
                <div className="col-10 ">
                  <Input placeholder="Add Parameter 1…" className="w-100" />
                </div>
                <div className="col-2">
                  <i className="k-icon k-i-plus-outline k-icon-48"></i>
                </div>
              </div>
              <div className="row mt-4 mb-4">
                <div className="col-10 ">
                  <label>Parameter 2</label>
                  <Input placeholder="Add Parameter 2…" className="w-100" />
                </div>
              </div>
            </div>
            <DialogActionsBar>
              <div className="col-12 mb-4">
                <div className="col-6 offset-3">
                  <button
                    className="k-button k-primary mr-2"
                    onClick={this.toggleDialog}
                  >
                    Cancel
                  </button>
                  <button
                    className="k-button k-secondary"
                    onClick={this.toggleDialog}
                  >
                    Add Expression
                  </button>
                </div>
              </div>
            </DialogActionsBar>
          </Dialog>
        )}
      </div>
    );
  }
}

export default ModalPop;
