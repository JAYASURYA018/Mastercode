import React, { Component, useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
import { Checkbox } from "@progress/kendo-react-inputs";

import {
  RadioButton,
  RadioButtonChangeEvent,
} from "@progress/kendo-react-inputs";
import { t } from "i18next";
import { number } from "prop-types";
import { SlideCtrl } from "../common/sliderCtrl";
import { DropDownList } from "@progress/kendo-react-dropdowns";
const defaultNs: any = { ns: ["camp", "common", "aetools"] };
interface Iprops {
  showTable: () => void;
  isEditContactStrategy: boolean;
  btnName: boolean;
  onclosePopup: any;
  handleInputChange: any;
  onUpdate: any;
  onOpenPopup: any;
  SaveData: any;

  editContractData: any;
  sampleData: any;
  loadTableDetails: () => void;
}

let obj = {
  purgeFolderDescription: "",
  purgeFolderPath: "",
};

let object = {};

interface Istate {
  handlePageChange: any;
  noOfDaysRetain: number;
  isSubFolderEnabled: boolean;
  isDisable: boolean;
  defaultPurgeSettings: boolean;
  purgeFolderType: string;
  allpurgeFileInput: any;
  isPurge: boolean;
  validator: any;
}

export default class PurgeFilePopup extends Component<Iprops, Istate> {
  state: Istate = {
    isDisable: false,
    noOfDaysRetain: 1,
    isSubFolderEnabled: false,
    allpurgeFileInput: obj,

    defaultPurgeSettings: false,
    purgeFolderType: "Local",
    validator: undefined,
    isPurge: false,
    handlePageChange: number,
  };
  componentDidMount(): void {
    if (this.props.editContractData) {
      this.setState({
        purgeFolderType: "Local",
        allpurgeFileInput: {
          PurgeFileName: this.props.editContractData.PurgeFileName,
          purgeFolderDescription:
            this.props.editContractData.purgeFolderDescription,
          purgeFolderType: this.props.editContractData.purgeFolderType,
          purgeFolderPath: this.props.editContractData.purgeFolderPath,
          S3Path: this.props.editContractData.S3Path,
        },
      });
    }
  }

  HandleSubFolder = () => {
    this.setState({ isSubFolderEnabled: !this.state.isSubFolderEnabled });
  };

  ChangeHandle = () => {
    this.setState({ isPurge: !this.state.isPurge });
  };

  handlePageChange = () => {
    let finalData = {
      ...this.state.allpurgeFileInput,
      purgeFolderType: this.state.purgeFolderType,
      noOfDaysRetain: this.state.noOfDaysRetain,
      isPurge: this.state.isPurge,
      isSubFolderEnabled: this.state.isSubFolderEnabled,
      defaultPurgeSettings: this.state.defaultPurgeSettings,
    };

    if (this.props.editContractData) {
      this.props.onUpdate(this.props.editContractData.id, finalData);
    } else {
      this.props.SaveData({ ...finalData });
      this.props.onclosePopup();
    }
    console.log("finaldata", finalData);
  };

  CheckBoxHandle = () => {
    this.setState({ defaultPurgeSettings: !this.state.defaultPurgeSettings });
  };

  handleChange = (e: RadioButtonChangeEvent) => {
    this.setState({ purgeFolderType: e.value });
  };

  handleInputChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    debugger;
    this.setState((prevState: Istate) => {
      return {
        allpurgeFileInput: {
          ...prevState.allpurgeFileInput,
          [name]: value,
        },
      };
    });
    console.log(this.state.allpurgeFileInput, "Create");
  };

  handleInputChangeCreate = (e: any) => {
    this.setState({ purgeFolderType: e.value });
  };

  handleInputChangeActive = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    debugger;
    this.setState((prevState: Istate) => {
      return {
        allpurgeFileInput: {
          ...prevState.allpurgeFileInput,
          [name]: value,
        },
      };
    });
    if (e.target.value.length > 0) {
      this.setState({ isDisable: true });
    } else this.setState({ isDisable: false });
    console.log(this.state.allpurgeFileInput, "Create");
  };

  render() {
    return (
      <div>
        <Dialog
          className={
            this.props.isEditContactStrategy
              ? "dialogpop dialogpop create-contactStrategy edit-cs"
              : "dialogpop create-contactStrategy"
          }
          width={600}
          height={580}
        >
          <p className="heading">
            <img src="/images/archive.svg" className="archivelogo" />

            {this.props.isEditContactStrategy ? (
              <label>Purge file</label>
            ) : (
              <Input
                autoFocus
                type="text"
                className="InputPop"
                aria-labelledby="AEPurge"
                id="AEPurge"
                name="PurgeFileName"
                placeholder={t("archive.purgefile.PurgeFileName", defaultNs)}
              />
            )}

            <button
              className="Cancelbtn"
              id="Cancel-ContactStrategy"
              name="Cancel-ContactStrategy"
              data-dismiss="modal"
              aria-label="Cancel-ContactStrategy"
              title={t("camp.copycampaign.btn.cancel", defaultNs)}
              onClick={this.props.onclosePopup}
            >
              {t("camp.copycampaign.btn.cancel", defaultNs)}
            </button>

            <button
              id="Create-ContactStrategy"
              name="Create-ContactStrategy"
              aria-label="Create-ContactStrategy"
              title={
                "Create" === "Create"
                  ? t("Create", defaultNs)
                  : t("Save", defaultNs)
              }
              className={this.state.isDisable ? "Createbtn" : "disablebtn"}
              onClick={() => {
                this.handlePageChange();
              }}
            >
              {this.props.btnName ? "Create" : "Update"}
            </button>
          </p>
          <div className="PurgeFolder">
            {t("archive.purgefile.description", defaultNs)}
          </div>

          <Input
            type="text"
            placeholder={t("archive.purgefile.Description", defaultNs)}
            className="AEPurgeInput"
            name="purgeFolderDescription"
            value={this.state.allpurgeFileInput.purgeFolderDescription || ""}
            onChange={this.handleInputChange}
          />

          <div className="Settings">
            {t("archive.purgefile.Type", defaultNs)}
          </div>
          <div className="RadioButton1">
            <div>
              <RadioButton
                label="Local"
                name="group1"
                value="Local"
                onClick={() => {
                  this.setState({
                    purgeFolderType: "Local",
                  });
                }}
                checked={this.state.purgeFolderType === "Local"}
                onChange={this.handleChange}
              />

              <RadioButton
                label="S3"
                name="group1"
                value="S3"
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  this.setState({
                    purgeFolderType: "S3",
                  });
                }}
                onChange={this.handleChange}
                checked={this.state.purgeFolderType === "S3"}
              />

              <RadioButton
                label="Shared Drive"
                name="group1"
                value="SharedDrive"
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  this.setState({
                    purgeFolderType: "SharedDrive",
                  });
                }}
                checked={this.state.purgeFolderType === "SharedDrive"}
                onChange={this.handleChange}
              />
              <br />
            </div>
          </div>
          {this.state.purgeFolderType == "Local" && (
            <>
              <div className="Access">
                {t("archive.purgefile.path", defaultNs)}
              </div>
              <Input
                type="text"
                placeholder={t("archive.purgefile.paths", defaultNs)}
                className="Access1"
                name="purgeFolderPath"
                value={this.state.allpurgeFileInput.purgeFolderPath || ""}
                onChange={this.handleInputChangeActive}
              />

              <div className="National">
                {t("archive.purgefile.call", defaultNs)}
                <Checkbox className="NationalInput" name="NationalInput" />
              </div>
            </>
          )}
          {this.state.purgeFolderType == "S3" && (
            <>
              <div className="S3Settings">
                {t("archive.purgefile.S3Settings", defaultNs)}
              </div>

              <DropDownList
                className="S3SettingsDrop"
                value={this.state.allpurgeFileInput.S3SettingsDrop || ""}
                name="S3SettingspurgeFolderTypeDrop"
              />

              <div className="Purge">
                {t("archive.purgefile.ArchiveS3", defaultNs)}
                <Checkbox
                  className="ArchiveS3"
                  name="defaultPurgeSettings"
                  value={
                    this.state.allpurgeFileInput.defaultPurgeSettings || ""
                  }
                  onChange={this.CheckBoxHandle}
                />
              </div>

              <div className="S3Path">
                {t("archive.purgefile.S3Path", defaultNs)}
              </div>
              <Input
                type="text"
                className="S3PathInput"
                name="purgeFolderPath"
                value={this.state.allpurgeFileInput.purgeFolderPath || ""}
                onChange={this.handleInputChangeActive}
                placeholder={t("archive.purgefile.S3Paths", defaultNs)}
              />

              <div className="s3SubFolderCheckbox">
                {t("archive.purgefile.SubFolderEnable", defaultNs)}
                <Checkbox
                  className="S3SubFolderCheckbox"
                  name="isSubFolderEnabled"
                  value={this.state.allpurgeFileInput.isSubFolderEnabled || ""}
                  onChange={this.HandleSubFolder}
                />
              </div>
            </>
          )}
          {this.state.purgeFolderType == "SharedDrive" && (
            <>
              <div className="S3Settings">
                {t("archive.purgefile.SharedDriveSettings", defaultNs)}
              </div>

              <DropDownList
                className="S3SettingsDrop"
                value={this.state.allpurgeFileInput.S3SettingsDrop || ""}
                name="S3SettingsDrop"
              />

              <div className="Purge">
                {t("archive.purgefile.ArchiveShared", defaultNs)}
                <Checkbox
                  className="shareDriveCheckbox"
                  name="defaultPurgeSettings"
                  value={
                    this.state.allpurgeFileInput.defaultPurgeSettings || ""
                  }
                  onChange={this.CheckBoxHandle}
                />
              </div>

              <div className="S3Path">
                {t("archive.purgefile.ArchiveSharedDrivePath", defaultNs)}
              </div>
              <Input
                type="text"
                className="S3PathInput"
                name="purgeFolderPath"
                value={this.state.allpurgeFileInput.purgeFolderPath || ""}
                onChange={this.handleInputChangeActive}
                placeholder={t("archive.purgefile.SharedDrive", defaultNs)}
              />

              <div className="subFolderCheckboxLabel">
                {t("archive.purgefile.SubFolderEnable", defaultNs)}
                <Checkbox
                  className="SubFolderCheckbox"
                  name="isSubFolderEnabled"
                  value={this.state.allpurgeFileInput.isSubFolderEnabled || ""}
                  onChange={this.HandleSubFolder}
                />
              </div>
            </>
          )}

          <div className="Retention">
            {t("archive.purgefile.RetensionDays", defaultNs)}

            <SlideCtrl
              className="slidectrl"
              isSliderRequired={true}
              min={1}
              name="noOfDaysRetain"
              max={100}
              onChangeValue={(e) => {
                this.setState({ noOfDaysRetain: e.value });
              }}
              value={this.state.noOfDaysRetain}
            />
          </div>

          <div className="Purge">
            {t("archive.purgefile.PurgeEnable", defaultNs)}
            <Checkbox
              className="PurgeInput"
              name="isPurge"
              value={this.state.allpurgeFileInput.isPurge || ""}
              onChange={this.ChangeHandle}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
