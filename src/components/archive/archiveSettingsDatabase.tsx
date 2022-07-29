import React, { Component } from "react";
import {
  RadioGroup,
  Input,
  Slider,
  RadioButton,
} from "@progress/kendo-react-inputs";
import { t } from "i18next";
const defaultNs = { ns: ["aetools"] };

interface Istate {
  sql: boolean;
  windows: boolean;
  class: String;
}

interface Iprops {
  handleAllDataChange: (event: any) => void;

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
class archiveSettingsdatabase extends Component<Iprops> {
  state: Istate = {
    sql: false,
    windows: false,
    class: undefined,
  };

  handledatabaseChange = (event: any) => {
    if (event.value === "SQL") {
      this.setState({
        sql: true,
        windows: false,
        class: "SQL",
      });
    } else if (event.value === "windows") {
      this.setState({
        sql: false,
        windows: true,
        class: "windows",
      });
    }
  };
  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-12">
            <label
              id={"database-lableRadioMain"}
              aria-labelledby={t("archive.archiveType", defaultNs)}
              className="pt-20 w-100"
            >
              {t("archive.archiveType", defaultNs)}
            </label>
            {/* <RadioGroup
              data={[{ value: 5 }, { value: 6 }]}
              layout="horizontal"
              onChange={this.handledatabaseChange}
            /> */}
            <div className="buttonsradio">
              <div
                className={
                  this.state.class === "SQL"
                    ? "radiobuttonafter"
                    : "thirdbefore"
                }
              >
                <RadioButton
                  name="group2"
                  value="SQL"
                  // checked={selectedValue === "first"}
                  label={t("archive.SQL", defaultNs)}
                  onChange={this.handledatabaseChange}
                  // onChange={handleChange}
                />
              </div>
              <div
                className={
                  this.state.class === "windows"
                    ? "radiobuttonafter"
                    : "thirdbefore"
                }
              >
                <RadioButton
                  name="group2"
                  value="windows"
                  // checked={selectedValue === "second"}
                  label={t("archive.Windows", defaultNs)}
                  onChange={this.handledatabaseChange}
                  // onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* {this.state.sql ? (
            <label
              className="radiobutton-lable"
              aria-labelledby={t("archive.SQL", defaultNs)}
            >
              {" "}
              {t("archive.SQL", defaultNs)}
            </label>
          ) : (
            <label
              className="radio-button"
              aria-labelledby={t("archive.SQL", defaultNs)}
            >
              {" "}
              {t("archive.SQL", defaultNs)}
            </label>
          )}
          {this.state.windows ? (
            <label
              className="radiobutton-lable"
              style={{ marginLeft: "90px" }}
              aria-labelledby={t("archive.Windows", defaultNs)}
            >
              {" "}
              {t("archive.Windows", defaultNs)}
            </label>
          ) : (
            <label
              className="radio-button"
              style={{ marginLeft: "90px" }}
              aria-labelledby={t("archive.Windows", defaultNs)}
            >
              {" "}
              {t("archive.Windows", defaultNs)}
            </label>
          )} */}
        </div>
        {this.state.sql && (
          <div className="row">
            <div className="col-md-4">
              <label
                id={"database-lableSQLipaddress"}
                aria-labelledby={t("archive.ipaddress", defaultNs)}
                className="pt-20 w-100"
              >
                {t("archive.ipAddress", defaultNs)}
              </label>
              <Input
                placeholder={t("archive.SQL.ipaddress.placeholder", defaultNs)}
                className="archiveInput"
                name="ipAddress"
                onChange={(e) => this.props.handleAllDataChange(e)}
              />
              <label
                id={"database-lableSQLdatabase"}
                aria-labelledby={t("archive.database", defaultNs)}
                className="pt-20 w-100"
              >
                {t("archive.database", defaultNs)}
              </label>
              <Input
                placeholder={t("archive.SQL.database.placeholder", defaultNs)}
                className="archiveInput"
                name="dataBase"
                onChange={(e) => this.props.handleAllDataChange(e)}
              />
              <label
                id={"database-lableSQLuserid"}
                aria-labelledby={t("archive.userid", defaultNs)}
                className="pt-20 w-100"
              >
                {t("archive.userId", defaultNs)}
              </label>
              <Input
                placeholder={t("archive.SQL.userid.placeholder", defaultNs)}
                className="archiveInput"
                name="userId"
                // value={this.props.allDataObject["userid"]}
                onChange={(e) => this.props.handleAllDataChange(e)}
              />
            </div>
            <div className="col-md-8 pl-5">
              <label
                id={"database-lableSQLport"}
                aria-labelledby={t("archive.port", defaultNs)}
                className="pt-20 w-100"
              >
                {t("archive.port", defaultNs)}
              </label>
              <Input
                placeholder={t("archive.SQL.port.placeholder", defaultNs)}
                className="archiveInput"
                name="port"
                onChange={(e) => this.props.handleAllDataChange(e)}
              />
              <label
                id={"database-lableSQLpath"}
                aria-labelledby={t("archive.path", defaultNs)}
                className="pt-20 w-100"
              >
                {t("archive.path", defaultNs)}
              </label>
              <Input
                placeholder={t("archive.SQL.path.placeholder", defaultNs)}
                className="archiveInput"
                name="path"
                onChange={(e) => this.props.handleAllDataChange(e)}
              />
              <label
                id={"database-lableSQLpassword"}
                aria-labelledby={t("archive.password", defaultNs)}
                className="pt-20 w-100"
              >
                {t("archive.password", defaultNs)}
              </label>
              <Input
                placeholder={t("archive.SQL.password.placeholder", defaultNs)}
                className="archiveInput"
                name="password"
                onChange={(e) => this.props.handleAllDataChange(e)}
              />
            </div>
          </div>
        )}
        {this.state.windows && (
          <div className="row">
            <div className="col-md-12">
              <label
                id={"database-lableWindowsArchive"}
                aria-labelledby={t("archive.ipaddress", defaultNs)}
                className="pt-20 w-100"
              >
                {t("archive.ipAddress", defaultNs)}
              </label>
              <Input
                placeholder={t(
                  "archive.Windows.ipaddress.placeholder",
                  defaultNs
                )}
                className="archiveInput"
                name="ipAddress"
                onChange={(e) => this.props.handleAllDataChange(e)}
              />
              <label
                id={"database-lableWindowsport"}
                aria-labelledby={t("archive.port", defaultNs)}
                className="pt-20 w-100"
              >
                {t("archive.port", defaultNs)}
              </label>
              <Input
                placeholder={t("archive.Windows.port.placeholder", defaultNs)}
                className="archiveInput"
                name="port"
                onChange={(e) => this.props.handleAllDataChange(e)}
              />
              <label
                id={"database-lableWindowsdatabase"}
                aria-labelledby={t("archive.database", defaultNs)}
                className="pt-20 w-100"
              >
                {t("archive.database", defaultNs)}
              </label>
              <Input
                placeholder={t(
                  "archive.Windows.database.placeholder",
                  defaultNs
                )}
                className="archiveInput"
                name="dataBase"
                onChange={(e) => this.props.handleAllDataChange(e)}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default archiveSettingsdatabase;
