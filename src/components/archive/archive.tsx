import * as React from "react";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import "../common/gridPagination";
import { Row } from "reactstrap";
import { Translation } from "react-i18next";
import { Button } from "@progress/kendo-react-buttons";
import SettingsMain from "./settingsMain";
import "./archiveTableGroups";
import _ from "underscore";
import "./_archive.scss";
import ApiService from "../../services/api-manager";
import ApiConstants from "../../api-constants";
import { IprocessMonitoringGrid } from "../../interface/archive/IprocessMonitoringGrid";
import ProcessMonitoringGrid from "./archiveProcessMonitoringGrid";
import ArchiveTableGroups from "./archiveTableGroups";
import Purgeconfiguration from "./purgeconfiguration";
import PurgeFile from "./purgeFile";

const defaultNs = { ns: ["aetools"] };

interface Istate {
  selectedTab: number;
  scheduleTime: any;
  endscheduleTime: any;
  dayChangeDropdown: any;
  isRequired: boolean;
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

class Archive extends React.Component<any, Istate> {
  public sourceGridData?: Array<IprocessMonitoringGrid>;

  constructor(props: any) {
    super(props);
  }
  state: Istate = {
    selectedTab: 0,
    scheduleTime: "",
    endscheduleTime: "",
    dayChangeDropdown: "",
    validationName: "",
    isRequired: false,
    isAcessKeyRequired: false,
    isSecretKeyRequired: false,
    isKmsRequired: false,
    isRegionEndKeyRequired: false,
    isEncryptKeyRequired: false,
    isSideKeyRequired: false,

    allDataObject: {
      archiveType: "",
      runType: "",
      dataBase: "",
      ipAddress: "",
      userId: "",
      password: "",
      sharedDrive: "",
      s3Url: "",
      awsAccessKey: "",
      awsSecretKey: "",
      kmsKey: "",
      dayOfWeek: "",
      isEndOfMonth: true,
      isPurge: true,
      isArchive: true,
      startTime: "",
      endTime: 0,
      dateOfMonth: 0,
      modifiedDate: 0,
      createdDate: 0,
      port: "",
      shareDriveName: "",
      shareDrivePassword: "",
      shareDriveUserName: "",
      utcOffset: 0,
      lcmDbName: "",
      lcmReportDbName: "",
      startDate: 0,
      endDate: 0,
      isAirFlowDeploy: true,
      amazonRegionEndPoint: "",
      amazonKMSEncrypt: "",
      amazonServerSideEncryptionMethod: "",
      authenticationDBType: 0,
      excludedDays: "",
    },
  };

  handleSelect = (e: TabStripSelectEventArguments) => {
    this.setState({ selectedTab: e.selected });
  };

  handleAllDataChange = (event: any) => {
    const target = event.target;

    const value = target.value;

    const name = target.name;
    console.log("value", value);
    console.log("name", name);
    // const temp={ [name]: value,}
    // const dummy = [event.target.name]: event.target.value,
    // this.setState({ isRequired: true });
    this.setState({ validationName: name });
    this.setState((prevState: Istate) => {
      return {
        allDataObject: {
          ...prevState.allDataObject,
          [name]: value,
        },
      };
    });
    if (value === "" && name === "s3Url") {
      this.setState({ isRequired: true });
    } else if (value === "" && name === "awsAccessKey") {
      this.setState({ isAcessKeyRequired: true, isRequired: false });
    } else {
      this.setState({ isRequired: false, isAcessKeyRequired: false });
      // this.setState({  isAcessKeyRequired: false});
    }

    console.log("nehaupadte", this.state.allDataObject);
  };
  timechange = (e: any) => {
    const newTime = e.value;
    // console.log("newTime", newTime.value);
    this.setState({ scheduleTime: newTime });
    console.log("scheduleTime", this.state.scheduleTime);
  };
  endTimeChange = (e: any) => {
    const newTime = e.value;
    // console.log("newTime", newTime.value);
    this.setState({ endscheduleTime: newTime });
    console.log("scheduleTime", this.state.endscheduleTime);
  };
  onDayChange = (event: any) => {
    const days = event.value;
    this.setState({ dayChangeDropdown: days });
    console.log("dayChangeDropdown", this.state.dayChangeDropdown);
  };

  settingsSave = async () => {
    const result = this.state.scheduleTime;
    const tempdata = result.toISOString();
    const endresult = this.state.endscheduleTime;
    const endtempdata = endresult.toISOString();
    const data = {
      archiveType: "string",
      runType: "string",
      dataBase: this.state.allDataObject.dataBase,
      ipAddress: this.state.allDataObject.ipAddress,
      userId: this.state.allDataObject.userId,
      password: this.state.allDataObject.password,
      sharedDrive: this.state.allDataObject.sharedDrive,
      s3Url: this.state.allDataObject.s3Url,
      awsAccessKey: this.state.allDataObject.awsAccessKey,
      awsSecretKey: this.state.allDataObject.awsSecretKey,
      kmsKey: this.state.allDataObject.kmsKey,
      dayOfWeek: this.state.dayChangeDropdown,
      isEndOfMonth: true,
      isPurge: true,
      isArchive: true,
      startTime: tempdata,
      endTime: endtempdata,
      dateOfMonth: 0,
      modifiedDate: "2022-07-05T09:48:30.232Z",
      createdDate: "2022-07-05T09:48:30.232Z",
      port: this.state.allDataObject.port,
      shareDriveName: this.state.allDataObject.shareDriveName,
      shareDrivePassword: this.state.allDataObject.shareDrivePassword,
      shareDriveUserName: this.state.allDataObject.shareDriveUserName,
      utcOffset: 0,
      lcmDbName: "string",
      lcmReportDbName: "string",
      startDate: tempdata,
      endDate: endtempdata,
      isAirFlowDeploy: true,
      amazonRegionEndPoint: this.state.allDataObject.amazonRegionEndPoint,
      amazonKMSEncrypt: this.state.allDataObject.amazonKMSEncrypt,
      amazonServerSideEncryptionMethod:
        this.state.allDataObject.amazonServerSideEncryptionMethod,
      authenticationDBType: 0,
      excludedDays: "string",
    };

    await ApiService.post(ApiConstants.postSettingApi, data)
      .then((response) => {
        console.log("postsettingsdata", response);
      })
      .catch((error) => {
        console.log("sssavesettingerror", error);
      });
    console.log("postDataa", data);
  };
  render() {
    return (
      <div>
        <Translation ns={["aetools"]}>
          {(t) => (
            <div>
              <Row className="row page-heading">
                <div className="col-6">
                  <h4 className="d-flex align align-self-center">
                    {" "}
                    <div className="d-inline-block pt-0 pr-2 pl-3">
                      <img
                        src="./images/archive.svg"
                        className="archiveImage "
                      />
                    </div>
                    <span style={{ padding: "padding-top: 8px" }}>Archive</span>
                  </h4>
                </div>
                <div className="col-6 text-right">
                  {this.state.selectedTab === 0 && (
                    <>
                      <Button
                        type="button"
                        className="SaveButtonSettings"
                        onClick={() => this.settingsSave()}
                      >
                        Save
                      </Button>
                    </>
                  )}

                  <Button type="button" className="exitButtonSettings">
                    Exit
                  </Button>
                </div>
              </Row>
              <div className="outercontainer">
                <TabStrip
                  selected={this.state.selectedTab}
                  onSelect={this.handleSelect}
                >
                  <TabStripTab title="Settings">
                    <div>
                      <SettingsMain
                        handleAllDataChange={this.handleAllDataChange}
                        timechange={this.timechange}
                        onDayChange={this.onDayChange}
                        endTimeChange={this.endTimeChange}
                        isRequired={this.state.isRequired}
                        isAcessKeyRequired={this.state.isAcessKeyRequired}
                        isSecretKeyRequired={this.state.isSecretKeyRequired}
                        isKmsRequired={this.state.isKmsRequired}
                        isRegionEndKeyRequired={
                          this.state.isRegionEndKeyRequired
                        }
                        isEncryptKeyRequired={this.state.isEncryptKeyRequired}
                        isSideKeyRequired={this.state.isSideKeyRequired}
                        validationName={this.state.validationName}
                        allDataObject={{
                          archiveType: "",
                          runType: "",
                          dataBase: "",
                          ipAddress: "",
                          userId: "",
                          password: "",
                          sharedDrive: "",
                          s3Url: "",
                          awsAccessKey: "",
                          awsSecretKey: "",
                          kmsKey: "",
                          dayOfWeek: "",
                          isEndOfMonth: false,
                          isPurge: false,
                          isArchive: false,
                          startTime: undefined,
                          endTime: undefined,
                          dateOfMonth: undefined,
                          modifiedDate: undefined,
                          createdDate: undefined,
                          port: "",
                          shareDriveName: "",
                          shareDrivePassword: "",
                          shareDriveUserName: "",
                          utcOffset: undefined,
                          lcmDbName: "",
                          lcmReportDbName: "",
                          startDate: undefined,
                          endDate: undefined,
                          isAirFlowDeploy: false,
                          amazonRegionEndPoint: "",
                          amazonKMSEncrypt: "",
                          amazonServerSideEncryptionMethod: "",
                          authenticationDBType: undefined,
                          excludedDays: "",
                        }}
                      />
                    </div>
                  </TabStripTab>
                  <TabStripTab title="Table Groups">
                    <ArchiveTableGroups />
                  </TabStripTab>
                  <TabStripTab
                    title={t("archive.processMonitoring", defaultNs)}
                  >
                    <ProcessMonitoringGrid />
                  </TabStripTab>
                  <TabStripTab title="Purge Files Configuration">
                    <PurgeFile selected={this.props.selected} />
                  </TabStripTab>
                </TabStrip>
              </div>
            </div>
          )}
        </Translation>
      </div>
    );
  }
}

export default Archive;
