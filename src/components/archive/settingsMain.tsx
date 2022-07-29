import React, { Component } from "react";
import { Translation, withTranslation } from "react-i18next";

import { Switch, SwitchChangeEvent } from "@progress/kendo-react-inputs";
import PurgeSettings from "./archivePurgeSettings";
import ArchiveSettings from "./archiveSettings";

import { propTypes } from "react-bootstrap/esm/Image";
import ApiConstants from "../../api-constants";
import ApiService from "../../services/api-manager";
import { number } from "prop-types";

const defaultNs = { ns: ["aetools"] };
interface Iprops {
  handleAllDataChange: (event: any) => void;
  timechange: (e: any) => void;
  endTimeChange: (e: any) => void;
  onDayChange: (e: any) => void;
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
  purge: boolean;
  archive: boolean;
}

class settingsMain extends Component<Iprops, Istate> {
  state: Istate = {
    purge: false,
    archive: false,
  };

  componentDidMount(): void {
    console.log(ApiConstants.archiveData);
    console.log(ApiConstants.callStrategy);

    ApiService.getAll(ApiConstants.archiveData)
      .then((response) => {
        if (response) {
          console.log(response);
        }
      })
      .catch((error) => {});
  }

  handlePurge = (event: SwitchChangeEvent) => {
    if (event.target.value === true) {
      this.setState({ purge: !this.state.purge });
    } else if (event.target.value === false) {
      this.setState({ purge: !this.state.purge });
    }
  };

  handleArchive = (event: SwitchChangeEvent) => {
    if (event.target.value === true) {
      this.setState({ archive: !this.state.archive });
    } else if (event.target.value === false) {
      this.setState({ archive: !this.state.archive });
    }
  };
  render() {
    return (
      <Translation ns={["aetools"]}>
        {(t) => (
          <div className=" pt-3 settingsContainer">
            <label
              id={"scheduling-lableArchive"}
              aria-labelledby={t("archive.scheduling", defaultNs)}
              className="w-100"
            >
              {t("archive.scheduling", defaultNs)}
            </label>
            <div className="row">
              <div className="col-md-2">
                <label
                  id={"scheduling-lablePrugeSwitch"}
                  aria-labelledby={t("archive.purge", defaultNs)}
                  className="pr-2"
                >
                  {t("archive.purge", defaultNs)}
                </label>
                <Switch onChange={this.handlePurge} />
              </div>
              <div className="col-md-10">
                <label
                  id={"scheduling-lableArchiveSwitch"}
                  aria-labelledby={t("aetools.archive.heading", defaultNs)}
                  className="pr-2"
                >
                  {t("aetools.archive.heading", defaultNs)}
                </label>
                <Switch onChange={this.handleArchive} />
              </div>
            </div>
            {this.state.archive && (
              <ArchiveSettings
                handleAllDataChange={this.props.handleAllDataChange}
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
            {this.state.purge && (
              <PurgeSettings
                handleAllDataChange={this.props.handleAllDataChange}
                timechange={this.props.timechange}
                onDayChange={this.props.onDayChange}
                endTimeChange={this.props.endTimeChange}
                allDataObject={this.props.allDataObject}
              />
            )}
          </div>
        )}
      </Translation>
    );
  }
}

export default withTranslation(["aetools"])(settingsMain);
