import React, { Component } from "react";
import {
  RadioGroup,
  Input,
  Slider,
  RadioButton,
} from "@progress/kendo-react-inputs";
import { t } from "i18next";
import ArchiveSettingsS3 from "./archiveSettingsS3";
import ArchiveSettingsshareddrive from "./archiveSettingsShareddrive";
import ArchiveSettingsdatabase from "./archiveSettingsDatabase";
const defaultNs = { ns: ["aetools"] };

interface Iprops {
  handleAllDataChange: (event: any) => void;
  isRequired?: boolean;
  isAcessKeyRequired: boolean;
  isSecretKeyRequired: boolean;
  isKmsRequired: boolean;
  isRegionEndKeyRequired: boolean;
  isEncryptKeyRequired: boolean;
  isSideKeyRequired: boolean;
  validationName?: string;
  allDataObject: {
    archiveType: string;
    runType: string;
    dataBase: string;
    ipAddress: string;
    userId: string;
    password: string;
    sharedDrive: string;
    s3Url: string;
    awsAccessKey: string;
    awsSecretKey: string;
    kmsKey: string;
    dayOfWeek: string;
    isEndOfMonth: boolean;
    isPurge: boolean;
    isArchive: boolean;
    startTime: any;
    endTime: any;
    dateOfMonth: any;
    modifiedDate: any;
    createdDate: any;
    port: string;
    shareDriveName: string;
    shareDrivePassword: string;
    shareDriveUserName: string;
    utcOffset: any;
    lcmDbName: string;
    lcmReportDbName: string;
    startDate: any;
    endDate: any;
    isAirFlowDeploy: boolean;
    amazonRegionEndPoint: string;
    amazonKMSEncrypt: string;
    amazonServerSideEncryptionMethod: string;
    authenticationDBType: any;
    excludedDays: string;
  };
}
interface Istate {
  S3: boolean;
  shareddrive: boolean;
  database: boolean;
  class: String;
}

export default class archiveSettings extends Component<Iprops> {
  state: Istate = {
    S3: false,
    shareddrive: false,
    database: false,
    class: undefined,
  };

  handleChangeArchive = (event: any) => {
    if (event.value === "S3") {
      this.setState({
        S3: true,
        shareddrive: false,
        database: false,
        class: "S3",
      });
    } else if (event.value === "shareddrive") {
      this.setState({
        S3: false,
        shareddrive: true,
        database: false,
        class: "shareddrive",
      });
    } else if (event.value === "database") {
      this.setState({
        S3: false,
        shareddrive: false,
        database: true,
        class: "database",
      });
    }
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-12">
            <label
              id={"archiveType-lableRadiobuttonsMain"}
              aria-labelledby={t("archive.archiveType", defaultNs)}
              className="pt-20 w-100"
            >
              {t("archive.archiveType", defaultNs)}
            </label>
            <div>
              <div className="buttonsradio">
                <div
                  className={
                    this.state.class === "S3"
                      ? "radiobuttonafter"
                      : "thirdbefore"
                  }
                >
                  <RadioButton
                    name="group1"
                    value="S3"
                    // checked={selectedValue === "first"}
                    label={t("archive.s3", defaultNs)}
                    onChange={this.handleChangeArchive}
                    // onChange={handleChange}
                  />
                </div>
                <div
                  className={
                    this.state.class === "shareddrive"
                      ? "radiobuttonafter"
                      : "thirdbefore"
                  }
                >
                  <RadioButton
                    name="group1"
                    value="shareddrive"
                    // checked={selectedValue === "second"}
                    label={t("archive.sharedDrive", defaultNs)}
                    onChange={this.handleChangeArchive}
                    // onChange={handleChange}
                  />
                </div>

                <div
                  className={
                    this.state.class === "database"
                      ? "radiobuttonafter"
                      : "thirdbefore"
                  }
                >
                  <RadioButton
                    name="group1"
                    value="database"
                    // checked={selectedValue === "third"}
                    label={t("archive.database", defaultNs)}
                    onChange={this.handleChangeArchive}
                    // onChange={handleChange}
                  />
                </div>
              </div>
              {/* <RadioGroup
              data={[{ value: 1 ,label:"S3"}, { value: 2 ,label:"sharedrive"}, { value: 3 ,label:"Database"}]}
              layout="horizontal"
              onChange={this.handleChangeArchive}
            /> */}
            </div>
          </div>
          {/* {this.state.S3 ? (
            <label
              className="radiobutton-lable"
              style={{ marginLeft: "33px" }}
              aria-labelledby={t("archive.s3", defaultNs)}
            >
              {t("archive.s3", defaultNs)}
            </label>
          ) : (
            <label
              className="radio-button"
              style={{ marginLeft: "33px" }}
              aria-labelledby={t("archive.s3", defaultNs)}
            >
              {" "}
              {t("archive.s3", defaultNs)}
            </label>
          )}

          {this.state.shareddrive ? (
            <label
              className="radiobutton-lable"
              // style={{"marginLeft":"60px"}}
              aria-labelledby={t("archive.sharedDrive", defaultNs)}
            >
              {" "}
              {t("archive.sharedDrive", defaultNs)}
            </label>
          ) : (
            <label
              className="radio-button"
              // style={{"marginLeft":"60px"}}
              aria-labelledby={t("archive.sharedDrive", defaultNs)}
            >
              {" "}
              {t("archive.sharedDrive", defaultNs)}
            </label>
          )}

          {this.state.database ? (
            <label
              className="radiobutton-lable"
              aria-labelledby={t("archive.database", defaultNs)}
            >
              {" "}
              {t("archive.database", defaultNs)}
            </label>
          ) : (
            <label
              className="radio-button"
              aria-labelledby={t("archive.database", defaultNs)}
            >
              {" "}
              {t("archive.database", defaultNs)}
            </label>
          )} */}
        </div>
        {this.state.S3 && (
          <ArchiveSettingsS3
            handleAllDataChange={this.props.handleAllDataChange}
            // S3Url={this.props.S3Url}
            allDataObject={this.props.allDataObject}
            isRequired={this.props.isRequired}
            isAcessKeyRequired={this.props.isAcessKeyRequired}
            isSecretKeyRequired={this.props.isSecretKeyRequired}
            isKmsRequired={this.props.isKmsRequired}
            isRegionEndKeyRequired={this.props.isRegionEndKeyRequired}
            isEncryptKeyRequired={this.props.isEncryptKeyRequired}
            isSideKeyRequired={this.props.isSideKeyRequired}
            validationName={this.props.validationName}
          />
        )}
        {this.state.shareddrive && (
          <ArchiveSettingsshareddrive
            handleAllDataChange={this.props.handleAllDataChange}
            allDataObject={this.props.allDataObject}
          />
        )}
        {this.state.database && (
          <ArchiveSettingsdatabase
            handleAllDataChange={this.props.handleAllDataChange}
            allDataObject={this.props.allDataObject}
          />
        )}
      </>
    );
  }
}
