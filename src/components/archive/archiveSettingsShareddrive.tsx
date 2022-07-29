import React, { Component } from "react";
import { RadioGroup, Input, Slider } from "@progress/kendo-react-inputs";
import { t } from "i18next";
const defaultNs = { ns: ["aetools"] };

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
class archiveSettingsshareddrive extends Component<Iprops> {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <label
              id={"shareddrive-lableIP/HostName"}
              aria-labelledby={t("archive.IP/HostName", defaultNs)}
              className="pt-20 w-100"
            >
              {t("archive.ipAddress", defaultNs)}
            </label>
            <Input
              placeholder={t(
                "archive.shareddrive.IP/HostName.placeholder",
                defaultNs
              )}
              className="archiveInput"
              name="shareDriveName"
              onChange={(e) => this.props.handleAllDataChange(e)}
            />
            <label
              id={"shareddrive-lableuserid"}
              aria-labelledby={t("archive.userid", defaultNs)}
              className="pt-20 w-100"
            >
              {t("archive.userId", defaultNs)}
            </label>
            <Input
              placeholder={t(
                "archive.shareddrive.userid.placeholder",
                defaultNs
              )}
              className="archiveInput"
              name="shareDriveUserName"
              onChange={(e) => this.props.handleAllDataChange(e)}
            />
            <label
              id={"shareddrive-lablepassword"}
              aria-labelledby={t("archive.password", defaultNs)}
              className="pt-20 w-100"
            >
              {t("archive.password", defaultNs)}
            </label>
            <Input
              placeholder={t(
                "archive.shareddrive.password.placeholder",
                defaultNs
              )}
              className="archiveInput"
              name="shareDrivePassword"
              onChange={(e) => this.props.handleAllDataChange(e)}
            />
            <label
              id={"shareddrive-lablepath"}
              aria-labelledby={t("archive.path", defaultNs)}
              className="pt-20 w-100"
            >
              {t("archive.path", defaultNs)}
            </label>
            <Input
              placeholder={t("archive.shareddrive.path.placeholder", defaultNs)}
              className="archiveInput"
              name="sharedDrive"
              onChange={(e) => this.props.handleAllDataChange(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default archiveSettingsshareddrive;
