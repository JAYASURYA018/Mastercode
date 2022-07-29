import React, { Component, useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
import { Checkbox } from "@progress/kendo-react-inputs";

import {
  RadioButton,
  RadioButtonChangeEvent,
} from "@progress/kendo-react-inputs";
const defaultNs: any = { ns: ["camp", "common", "aetools"] };
import { t } from "i18next";
import { number } from "prop-types";

interface Iprops {
  onOpenPopup?: () => void;
  showTable: () => void;
  isEditContactStrategy: boolean;
  btnName: boolean;
  onclosePopup: any;
  saveData: any;
  onUpdate: any;
  editContractData: any;
  LoadSettingsTable: () => void;
}

let obj = {
  purgeFileSettingsName: "",
  awsAccessKey: "",
  awsSecretKey: "",
  kmsKey: "",
  amazonRegionEndPoint: "",
  amazonKMSEncrypt: false,
  amazonServerSideEncryptionMethod: "",
};

let object = {
  sharedDrive: "",
  shareDrivePassword: "",
  shareDriveUserName: "",
};

interface Istate {
  handlePageChange: any;

  value: boolean;
  isDisable: boolean;
  purgeFileSettingsType: string;
  s3Inputs: any;
  sharedDrive: any;
}

export default class PurgeSettingsPopup extends Component<Iprops, Istate> {
  state: Istate = {
    value: true,
    isDisable: false,
    purgeFileSettingsType: "S3",
    s3Inputs: obj,
    sharedDrive: object,
    handlePageChange: number,
  };

  componentDidMount(): void {
    if (this.props.editContractData) {
      this.setState({
        purgeFileSettingsType: "first",
        s3Inputs: {
          purgeFileSettingsName:
            this.props.editContractData.purgeFileSettingsName,
          awsAccessKey: this.props.editContractData.awsAccessKey,
          awsSecretKey: this.props.editContractData.awsSecretKey,
          kmsKey: this.props.editContractData.kmsKey,
          amazonRegionEndPoint: this.props.editContractData.regionEndPoint,
          amazonKMSEncrypt: this.props.editContractData.amazonKMSEncrypt,
          amazonServerSideEncryptionMethod:
            this.props.editContractData.amazonServerSideEncryptionMethod,
        },
        sharedDrive: {
          sharedDrive: this.props.editContractData.sharedDrive,
          shareDrivePassword: this.props.editContractData.shareDrivePassword,
          shareDriveUserName: this.props.editContractData.shareDriveUserName,
        },
      });
    }
  }

  handlePageChange = () => {
    let finalData = {
      ...this.state.s3Inputs,
      ...this.state.sharedDrive,
      purgeFileSettingsType: this.state.purgeFileSettingsType,
    };

    if (this.props.editContractData) {
      this.props.onUpdate(this.props.editContractData.id, finalData);
    } else {
      this.props.saveData({ ...finalData });
      this.props.onclosePopup();
    }

    console.log(finalData);
  };

  handleChange = (e: RadioButtonChangeEvent) => {
    this.setState({ purgeFileSettingsType: e.value });
  };

  handleInputChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState((prevState: Istate) => {
      return {
        s3Inputs: {
          ...prevState.s3Inputs,

          [name]: value,
        },
        sharedDrive: {
          ...prevState.sharedDrive,
          [name]: value,
        },
      };
    });
    console.log(this.state.s3Inputs);
    console.log(this.state.sharedDrive);
  };

  handleInputChangeCreate = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState((prevState: Istate) => {
      return {
        s3Inputs: {
          ...prevState.s3Inputs,

          [name]: value,
        },
        sharedDrive: {
          ...prevState.sharedDrive,
          [name]: value,
        },
      };
    });
    if (e.target.value.length > 0) {
      this.setState({ isDisable: true });
    } else this.setState({ isDisable: false });
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
                required
                aria-labelledby="contactStrategyId"
                id="purgeFileSettingsName"
                name="purgeFileSettingsName"
                value={this.state.s3Inputs["purgeFileSettingsName"] || ""}
                placeholder={t(
                  "archive.purgeFileSettings.lablel.settingname",
                  defaultNs
                )}
                onChange={this.handleInputChange}
              />
            )}
            <span className="right">
              <button
                className="k-button k-primary"
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
                className={
                  this.state.isDisable
                    ? "k-button k-primary"
                    : "k-button k-create"
                }
                onClick={() => {
                  this.handlePageChange();
                }}
              >
                {this.props.btnName ? "Create" : "Update"}
              </button>
            </span>
          </p>
          <div className="Settings">
            {t("archive.purgeFiles.Setting", defaultNs)}
          </div>
          <div className="RadioButton1">
            <div>
              <RadioButton
                label="S3"
                name="group1"
                value="S3"
                onClick={() => {
                  this.setState({
                    purgeFileSettingsType: "S3",
                  });
                }}
                onChange={this.handleChange}
                checked={this.state.purgeFileSettingsType === "S3"}
              />
              &nbsp; &nbsp; &nbsp;
              <RadioButton
                label="Shared Drive"
                name="group1"
                value="SharedDrive"
                onClick={() => {
                  this.setState({
                    purgeFileSettingsType: "SharedDrive",
                  });
                }}
                checked={this.state.purgeFileSettingsType === "SharedDrive"}
                onChange={this.handleChange}
              />
              <br />
            </div>
          </div>

          {this.state.purgeFileSettingsType == "S3" && (
            <>
              <div className="Access">
                {t("archive.purgeFileSettings.lablel.awsAccessKey", defaultNs)}
              </div>

              <Input
                type="text"
                placeholder={t("archive.purgeFiles.accesskey", defaultNs)}
                className="Access1"
                name="acceskey"
                value={this.state.s3Inputs.acceskey || ""}
                onChange={this.handleInputChange}
              />

              <div className="Secret">
                {t("archive.purgeFileSettings.lablel.awsSecretKey", defaultNs)}
              </div>
              <Input
                type="text"
                className="Secret1"
                placeholder={t("archive.purgeFiles.secretkey", defaultNs)}
                name="secretKey"
                value={this.state.s3Inputs.secretKey || ""}
                onChange={this.handleInputChange}
              />
              <div className="Region">
                {t(
                  "archive.purgeFileSettings.lablel.amazonRegionEndPoint",
                  defaultNs
                )}
              </div>
              <Input
                type="text"
                className="Region1"
                placeholder={t("archive.purgeFiles.regionend", defaultNs)}
                name="regionEndPoint"
                value={this.state.s3Inputs.regionEndPoint || ""}
                onChange={this.handleInputChange}
              />
              <div className="KMS">
                {t("archive.purgeFileSettings.lablel.kmsKey", defaultNs)}{" "}
              </div>
              <Input
                type="text"
                className="KMS1"
                placeholder={t("archive.purgeFiles.kmskey", defaultNs)}
                name="KMSkey"
                value={this.state.s3Inputs.KMSkey || ""}
                onChange={this.handleInputChange}
              />
              <div className="Encryption">
                {t(
                  "archive.purgeFileSettings.lablel.amazonServerSideEncryption",
                  defaultNs
                )}
              </div>
              <Input
                type="text"
                className="Encryption1"
                name="serverSideEncryption"
                value={this.state.s3Inputs.serverSideEncryption || ""}
                onChange={this.handleInputChangeCreate}
                placeholder={t("archive.purgeFiles.serverside", defaultNs)}
              />
              <div className="Encrypt">
                {t(
                  "archive.purgeFileSettings.lablel.amzonKMSEncrypt",
                  defaultNs
                )}
                <Checkbox className="Checkbox" />
              </div>
            </>
          )}

          {this.state.purgeFileSettingsType == "SharedDrive" && (
            <>
              <div className="HostMain">
                <div className="Host">
                  {t("archive.purgeFiles.host", defaultNs)}
                </div>
                <Input
                  type="text"
                  className="Host1"
                  name="Host"
                  value={this.state.sharedDrive.Host || ""}
                  onChange={this.handleInputChange}
                  placeholder={t("archive.purgeFiles.hostname", defaultNs)}
                />
                <br />
                <div className="User">
                  {t("archive.purgeFiles.user", defaultNs)}
                </div>
                <Input
                  type="text"
                  className="User1"
                  name="User"
                  onChange={this.handleInputChange}
                  value={this.state.sharedDrive.User || ""}
                  placeholder={t("archive.purgeFiles.id", defaultNs)}
                />
                <div className="Password">
                  {t("archive.purgeFiles.passsword", defaultNs)}
                </div>
                <Input
                  type="text"
                  className="Password1"
                  name="Password"
                  value={this.state.sharedDrive.Password || ""}
                  onChange={this.handleInputChangeCreate}
                  placeholder={t("archive.purgeFiles.passwordtype", defaultNs)}
                />
              </div>
            </>
          )}
        </Dialog>
      </div>
    );
  }
}
