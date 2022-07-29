import React, { Component } from "react";
import { RadioGroup, Input, Slider } from "@progress/kendo-react-inputs";
import { t } from "i18next";
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

class ArchiveSettingsS3 extends Component<Iprops> {
  render() {
    const usernameValidationMessage: string =
      "Your username should contain only letters!";
    return (
      <>
        <div className="row">
          <div className="col-md-4">
            <label
              id={"S3-lableS3Url"}
              aria-labelledby={t("archive.S3Url", defaultNs)}
              className="pt-20 w-100"
            >
              {t("archive.S3Url", defaultNs)}
            </label>
            <Input
              placeholder={t("archive.S3Url.placeholder", defaultNs)}
              className="archiveInput"
              name="s3Url"
              onChange={(e) => this.props.handleAllDataChange(e)}
            />

            <label
              id={"S3-lableawsaccesskey"}
              aria-labelledby={t("archive.awsAccessKey", defaultNs)}
              className="pt-20 w-100"
            >
              {t("archive.awsAccessKey", defaultNs)}
            </label>
            <Input
              placeholder={t("archive.awsaccesskey.placeholder", defaultNs)}
              className="archiveInput"
              name="awsAccessKey"
              onChange={(e) => this.props.handleAllDataChange(e)}
            />

            <label
              id={"S3-lableawssecretkey"}
              aria-labelledby={t("archive.awssecretkey", defaultNs)}
              className="pt-20 w-100"
            >
              {t("archive.awsSecretKey", defaultNs)}
            </label>
            <Input
              placeholder={t("archive.awssecretkey.placeholder", defaultNs)}
              className="archiveInput"
              name="awsSecretKey"
              onChange={(e) => this.props.handleAllDataChange(e)}
            />

            <label
              id={"S3-lablekmskey"}
              aria-labelledby={t("archive.kmskey", defaultNs)}
              className="pt-20 w-100"
            >
              {t("archive.kmsKey", defaultNs)}
            </label>
            <Input
              placeholder={t("archive.kmskey.placeholder", defaultNs)}
              className="archiveInput"
              name="kmsKey"
              onChange={(e) => this.props.handleAllDataChange(e)}
            />
          </div>
          <div className="col-md-8 pl-5">
            <label
              id={"S3-lableamazonregionendpoint"}
              aria-labelledby={t("archive.amazonregionendpoint", defaultNs)}
              className="pt-20 w-100"
            >
              {t("archive.amazonRegionEndPoint", defaultNs)}
            </label>
            <Input
              placeholder={t(
                "archive.amazonregionendpoint.placeholder",
                defaultNs
              )}
              className="archiveInput"
              name="amazonRegionEndPoint"
              onChange={(e) => this.props.handleAllDataChange(e)}
            />
            <label
              id={"S3-lableamzonKMSEncrypt"}
              aria-labelledby={t("archive.amzonKMSEncrypt", defaultNs)}
              className="pt-20 w-100"
            >
              {t("archive.amzonKMSEncrypt", defaultNs)}
            </label>
            <Input
              placeholder={t("archive.amzonKMSEncrypt.placeholder", defaultNs)}
              className="archiveInput"
              name="amazonKMSEncrypt"
              onChange={(e) => this.props.handleAllDataChange(e)}
            />
            <label
              id={"S3-lableamazonServerSideEncryption"}
              aria-labelledby={t(
                "archive.amazonServerSideEncryption",
                defaultNs
              )}
              className="pt-20 w-100"
            >
              {t("archive.amazonServerSideEncryption", defaultNs)}
            </label>
            <Input
              placeholder={t(
                "archive.amazonServerSideEncryption.placeholder",
                defaultNs
              )}
              className="archiveInput"
              name="amazonServerSideEncryptionMethod"
              onChange={(e) => this.props.handleAllDataChange(e)}
            />
          </div>
        </div>
      </>
    );
  }
}

export default ArchiveSettingsS3;
