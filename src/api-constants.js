"use strict";
exports.__esModule = true;
var ApiConstants = {
  masterModel: "/api/gateway/master",
  homeDashboard: "/api/gateway/real-time-report",
  campaign: "api/gateway/campaign",
  campaignGroupDetails: "/api/gateway/campaign/details",
  campaignFlush: "api/gateway/campaign/flush-campaign",
  campaignStart: "api/gateway/campaign/start-campaign",
  campainStop: "api/gateway/campaign/stop-campaign",
  campaignGroup: "api/gateway/campaign/campaign-group",
  campaignModel: "api/gateway/campaign/campaign-model",
  campaignDeletedList: "api/gateway/campaign/deleted-campaign",
  campaignTimeZone: "api/gateway/campaign/timezone",
  campaignValidate: "api/gateway/campaign/validate-campaign-name",
  campaignBusiness: "api/gateway/campaign/business-parameter-model",
  campaignCallStrategy: "api/gateway/campaign/campaign-callstrategy",
  campaignStateLawGroup: "api/gateway/campaign/state-law",
  modifyBusinessParameters: "api/gateway/campaign/business-parameter",
  modifyUniqueBusinessParams: "api/gateway/campaign/unique-business-parameter",
  businessParameterSequence: "api/gateway/campaign/business-parameter-sequence",
  campaignStaticFieldMapping: "api/gateway/campaign/static-field-mappings",
  campaignEntireModel: "api/gateway/campaign/entire-campaign-model",
  group: "/api/gateway/group",
  groupTimezone: "/api/gateway/group/timezone",
  groupEdit: "/api/gateway/group/details",
  modifyGroupSequence: "api/gateway/group/campaign-group-sequence",
  users: "/api/gateway/users",
  editUser: "/api/gateway/users/detail",
  validateSalesForce: "/api/gateway/users/sales-force/credential-validation",
  roles: "/api/gateway/users/roles",
  entityRights: "/api/gateway/users/roles/entity-rights",
  rightsMapping: "/api/gateway/users/roles/right-mapping",
  getAuthInfo: "/api/account/authentication-details/",
  modifyUserMapped: "/api/gateway/users/mapping",
  getCustomFeatures: "/api/gateway/users/roles/custom-features?name=",
  getUserEntityRights: "/api/gateway/users/entity-rights",
  updateGridHiddenColumns: "api/gateway/master/grid-hidden-column",
  modes: "/api/gateway/modes",
  timezone: "/api/gateway/compliance/timezone",
  maptimezone: "/api/gateway/compliance/mapped-timezone",
  callStrategy: "/api/gateway/contactstrategy",
  modifyCampaignPercentage: "api/gateway/group/percentage",
  groupSyncStatus: "api/gateway/group/sync-twilio-status",
  groupSyncTwilioProjects: "api/gateway/group/sync-twilio-projects",
  modifyCampaignGroupEnable: "api/gateway/group/campaign-group-enable",
  areacode: "/api/gateway/compliance/area-code",
  refreshTime: "/api/gateway/compliance/refreshTime",
  uploadAreaZipCode: "/api/gateway/compliance/auto-upload",
  stateinfo: "/api/gateway/compliance/state-info",
  blockunblockstateinfo: "/api/gateway/compliance/block-unblock-state-info",
  email: "/api/gateway/other-settings/email-config",
  campaignTcpaConfig: "/api/gateway/campaign/tcpa-config",
  campaignIdentityAuthentication:
    "/api/gateway/campaign/identity-authentication",
  chatbotCredentials: "/api/gateway/campaign/chatbot-credentials",
  campaignTimeZoneRuntime: "api/gateway/campaign/time-zone-runtime",
  zipcode: "/api/gateway/compliance/zip-code",
  smsConfig: "api/gateway/other-settings/sms-config",
  getExpressionBuilder: "api/gateway/campaign/expression-builder",
  getCustomFeaturesConfig: "api/gateway/contacts/mu/custom-features",
  getALerterThreshold: "api/gateway/campaign/alerter-threshold",
  getOutcomeCategoryDetails: "api/gateway/campaign/outcome-category-detail",
  getAllOutcomeCategory: "api/gateway/campaign/outcome-category",
  serverScript: "api/gateway/campaign/server-script",
  listEnhancemennt: "api/gateway/contacts/mu/list-enhancement",
  downloadErrorRecords: "api/gateway/contacts/mu/mu-download-error-records",
  listStatusUpdate: "api/gateway/contacts/mu/list-status",
  scrubbedContactList: "api/gateway/contacts/mu/scrubed-contacts",
  getComplianceContacts: "api/gateway/contacts/compliance-contacts",
  manageContactsBuildCondition:
    "api/gateway/contacts/manage-contact-build-actions",
  url: "/api/gateway/url",
  profile: "/api/gateway/contacts/profile",
  profilecampaigngroup: "/api/gateway/contacts/profile-campaign-group",
  uploadContacts: "/api/gateway/contacts/mu/upload-contacts",
  getAutoUploadsListDetails: "/api/gateway/contacts/mu/auto-upload-list-detail",
  getScrubAutoUploadsListDetails:
    "/api/gateway/contacts/mu/scrub-auto-upload-list-detail",
  createUploadParam: "/api/gateway/contacts/mu/upload-param",
  getCampaignDetailsforNewProfile:
    "/api/gateway/contacts/mu/campaign-details-new-profile",
  getObjects: "/api/gateway/contacts/mu/objects",
  getCampaignDetails: "/api/gaeteway/contacts/getCampaignDetails",
  checkDirectoryExist: "/api/gateway/contacts/directory-exists",
  autouploadparam: "/api/gateway/contacts/mu/auto-upload-param",
  uploadjsonFile: "/api/gateway/contacts/mu/upload-json-file",
  fileServer: "/api/gateway/contacts/mu/file-server",
  deleteAutoUploadParam: "/api/gateway/contacts/auto-upload-parameter",
  formConditions: "api/gateway/contacts/form-verify-sql-query",
  contacts: "api/gateway/contacts",
  chainingMappingDetails: "api/gateway/campaign/chaining-mapping-details",
  chainingModel: "api/gateway/campaign/chaining",
  uploadFile: "/api/gateway/contacts/mu/upload-file-in-server",
  uploadJsonFile: "/api/gateway/contacts/mu/import-json-file-upload",
  getCustomerMasterforP2P: "/api/gateway/contacts/masters-p2p-status",
  getScrubBasicCondition: "/api/gateway/contacts/scrub/basic-condition",
  getAutoUploadsList: "/api/gateway/contacts/mu/auto-upload-list",
  getObjectData: "/api/gateway/contacts/mu/objects-data",
  getBusinessParamList: "api/gateway/campaign/business-parameter",
  targetChainingDetails: "api/gateway/campaign/target-chaining-details",
  twilioWorkFlows: "/api/gateway/campaign/twilio-workflow",
  twilioStudioFlows: "/api/gateway/campaign/twilio-studioflow",
  twilioIvrTemplate: "api/gateway/campaign/twilio-ivr-templates",
  emailConfig: "api/gateway/campaign/email-config",
  smsServerConfig: "api/gateway/campaign/sms-config",
  getGlobalUpload: "/api/gateway/contacts/gu/global-upload-list",
  settingGlobalUpload: "/api/gateway/contacts/gu/global-list-status",
  doquicksearch: "/api/gateway/compliance/quick-search",
  doquickupload: "/api/gateway/compliance/quick-upload",
  getRefreshedTime: "api/gateway/GetRefreshedTime",
  campaignRuntime: "/api/gateway/campaign/campaign-runtime",
  campaignCssSchedule: "/api/gateway/campaign/css-schedule",
  customFilterGroups: "api/gateway/campaign/css-all-filter-groups",
  selectionStrategy: "api/gateway/campaign/css-selection-strategy",
  businessOutcomeGroup: "api/gateway/campaign/css-business-outcome-group",
  copyCssGroup: "api/gateway/campaign/copy-css-group",
  cssBuildConditions: "api/gateway/campaign/css-build-condition",
  saveCssCondition: "api/gateway/campaign/save-css-group-operation",
  cssCustomFilterGroup: "api/gateaway/campaign/css-custom-filter-group",
  deleteCustomFilterGroup: "api/gateway/campaign/delete-css-group",
  cssCustomFilterCondition: "api/gateway/campaign/css-custom-filter-condition",
  cssFilterGroups: "/api/gateway/campaign/css-all-filter-groups",
  chainingCallStrategy: "/api/gateway/campaign/chaining-call-strategy",
  mappedGroups: "/api/gateway/campaign/mapped-groups",
  chainingOutcomes: "/api/gateway/campaign/chaining-outcomes",
  mappedOutcomes: "/api/gateway/campaign/mapped-outcomes",
  getBoGroup: "api/gateway/campaign/chaining-bo-group",
  getBoCampaign: "api/gateway/campaign/chaining-bo-campaign",
  getCssCondition: "api/gateway/campaign/unified-css/css-condition",
  updateManageContatcs: "/api/gateway/contacts/manage-contact",
  getGlobalContacts: "/api/gateway/contacts/gu/global-upload-contacts",
  getCampaignInfoforGlobalListID:
    "/api/gateway/contacts/gu/global-list-campaign-info",
  getDataSchemaForGU: "/api/gateway/contacts/gu/global-upload-data-scheme",
  emailTemplateModel: "api/gateway/email/template-model",
  emailTemplateList: "api/gateway/email/template-list",
  emailTemplate: "api/gateway/email/template",
  dayOfTheWeek: "/api/gateway/common/day-of-the-week-config",
  enableDefaultEmailTemplate:
    "/api/gateway/email/enable-default-email-template",
  holidayList: "/api/gateway/compliance/holidays",
  mapHoliday: "/api/gateway/campaign/map-holiday",
  getEmailSMSBuildCondition: "api/gateway/campaign/email-sms/build-condition",
  getMasterP2PStatus: "api/gateway/email/masters-p2p-status",
  saveAIQ: "/api/gateway/common/aiq-config",
  getPrediction: "/api/gateway/common/prediction",
  getGlobalUploadsCampaignDetails:
    "/api/gateway/contacts/gu/global-upload-campaigns",
  getGlobalProfileList: "/api/gateway/contacts/gu/profile-list",
  createGlobalProfile: "/api/gateway/contacts/gu/global-profile",
  deleteGlobalUploadCondition:
    "/api/gateway/contacts/gu/global-upload-condition",
  globalUploadConfig: "/api/gateway/contacts/gu/global-upload-config",
  customEmailTemplateMapping: "api/gateway/email/custom-email-template-mapping",
  getSubstitutionCustomVariable:
    "api/gateway/email/substitution-custom-variable",
  globalConditionEdit: "/api/gateway/contacts/gu/global-upload-condition-type",
  createFileInServer: "/api/gateway/contacts/gu/file-in-server",
  downloadUnmatchedRecordsGU:
    "/api/gateway/contacts/gu/download-unmatched-records",
  downloadErrorRecordsGU: "/api/gateway/contacts/gu/gu-download-error-records",
  businessoutcome: "/api/gateway/business-outcome",
  deleteparent: "/api/gateway/business-outcome/parent",
  validatebusinessOutcome: "/api/gateway/business-outcome/validate",
  deletechild: "/api/gateway/business-outcome/child",
  businessoutcomesync: "/api/gateway/business-outcome/sync-bsft-outcomes",
  businessoutcomedetails: "/api/gateway/business-outcome/details",
  parentOutcome: "/api/gateway/business-outcome/parent-details",
  childOutcome: "/api/gateway/business-outcome/child-details",
  fileAttachment: "/api/gateway/email/file-attachment",
  emailSmsFormConditionQuery:
    "/api/gateway/campaign/email-sms/form-condition-query",
  agents: "api/gateway/agents/twilio/agents",
  agentsWorkflow: "api/gateway/agents/twilio/workflows",
  getallAgent: "api/gateway/agents/all-campaign-groups",
  smsTemplateModel: "api/gateway/sms/template-model",
  smsTemplateList: "api/gateway/sms/template-list",
  smsTemplate: "api/gateway/sms/template",
  enableDefaultSmsTemplate: "api/gateway/sms/enable-default-sms-template",
  stateLaw: "/api/gateway/compliance/state-law",
  stateLawGroup: "/api/gateway/compliance/state-law-group",
  stateHolidays: "/api/gateway/compliance/state-law-holidays",
  stateLawZipCode: "/api/gateway/compliance/state-law-zip-code",
  stateLawAreaCode: "/api/gateway/compliance/state-law-area-code",
  getAllStates: "/api/gateway/compliance/all-state-law",
  mappedState: "/api/gateway/compliance/mapped-state",
  getHolidays: "api/gateway/compliance/holidays",
  deleteHolidays: "/api/gateway/compliance/holidays",
  contactStrategyTelephonyOutcome:
    "/api/gateway/contactstrategy/telephony-outcome",
  copyContactStrategyMode: "api/gateway/contactstrategy/copy-mode",
  copyContactStrategy: "api/gateway/contactstrategy/copy",
  checkEmailServer: "/api/gateway/campaign/check-email-server",
  categoryDetails: "/api/gateway/campaign/category-details",
  campaignCategory: "/api/gateway/campaign/campaign-category",
  getModeList: "api/gateway/modes/modelist",
  contactStrategyModel: "api/gateway/contactstrategy/contactstrategy-model",
  validateContactStrategyName: "api/gateway/contactstrategy/validate-name",
  getTelephonyOutcomeBasedOnChannel:
    "api/gateway/contactstrategy/telephonyoutcome-channel",
  widgetContentData: "api/gateway/real-time-report/widget-content-data",
  getTelephonyOutcomeList: "api/gateway/contactstrategy/telephonyoutcome-list",
  saveCallStrategy: "api/gateway/contactstrategy/save-callstrategy",
  deleteContactStrategyMode: "api/gateway/contactstrategy/mode",
  updateModeWeightage: "api/gateway/contactstrategy/mode-weightage",
  fileGlobalUpload: "/api/gateway/contacts/gu/file-global-upload",
  updateDataSchema: "/api/gateway/contacts/gu/global-upload-api-data-schema",
  arrangesequenceId: "/api/gateway/contacts/gu/arrange-sequenceId",
  mapHolidayToCampaign: "api/gateway/compliance/map-holiday-campaign",
  unMapHolidayFromCampaign: "api/gateway/compliance/unmap-holiday-campaign",
  dialerConfiguration: "api/gateway/dc/dialerConfiguration",
  dialerinitialLoad: "api/gateway/dc/dialerinitialLoad",
  dialerConfigurationID: "api/gateway/dc/dialerConfigurationID",
  syncDialerServer: "api/gateway/dc/syncDialerServer",
  dialerServerAgentSync: "api/gateway/dc/dialerServerAgentSync",
  checkLMRunningStatus: "api/gateway/dc/checkLMRunningStatus",
  checkCampaignRunning: "api/gateway/dc/checkCampaignRunning",
  modifyDialerServer: "api/gateway/dc/modifyDialerServer",
  getAgentDesktopConfig: "api/gateway/campaign/agent-desktop-configuration",
  updateAgentDesktopConfig: "api/gateway/campaign/update-agent-desktopconfig",
  getAllAgents: "api/gateway/historical-report/all-agents",
  getFormCondition: "api/gateway/contacts/form-verify-sql-query",
  getAllBuildConditions: "api/gateway/campaign/reassign-agent/build-condition",
  getReassignContacts: "api/gateway/contacts/re-assign/contacts",
  getTelephonyOutcomeCategory:
    "api/gateway/campaign/telephony-outcome-category",
  otherSettings: "/api/gateway/other-settings/dimension",
  domainCredentials: "/api/gateway/other-settings/domain-credentials",
  alterconfig: "api/gateway/other-settings/alerter-config",
  areaCodeSubstring: "api/gateway/other-settings/area-code-substring",
  dimensionDetail: "api/gateway/other-settings/dimension-detail",
  domainAreaCodeConfig: "api/gateway/other-settings/domain-area-code-config",
  alerterDemo: "api/gateway/other-settings/demo-credentials-alert",
  getIvrTemplates: "api/gateway/campaign/ivr-templates",
  getIvrTemplateModel: "api/gateway/campaign/edit-ivr-model",
  updateActiveIvrTemplate: "api/gateway/campaign/active-ivr-template",
  archiveData: "/api/gateway/archive/settings",
  coretableapi: "/api/gateway/archive/purge-core-tables",

  coretabledeleteapi: "/api/gateway/archive/purge-table-retention",

  repotingapi: "./api/gateway/archive/purge-reporting-tables",

  tablegroupupdateapi: "api/gateway/archive/purge-table-retention",

  postSettingApi: "/api/gateway/archive/settings",
  pocessmonotoring: "/api/gateway/archive/purge-log-masters",
  detailTable: "/api/gateway/archive/purge-log-details",
  getapisettings: "/api/gateway/archive/settings",

  purgefilepostapi: "/api/gateway/archive/purge-files",
  purgefilegetapi: "/api/gateway/archive/purge-files",
  purgeFileDelete: "api/gateway/archive/purge-files",

  purgefilepost: "/api/gateway/archive/purge-files",
  purgefileget: "/api/gateway/archive/purge-files",

  purgeFileSettings: "/api/gateway/archive/purge-file-settings",
  purgeFileSettingsPost: "/api/gateway/archive/purge-file-settings",

  purgeFileSettingsDelete: "api/gateway/archive/purge-file-settings",

  schedulereportgetapi: "/api/gateway/schedule-report",

  schedulereportPost: "/api/gateway/schedule-report",

  schedulereportDelete: "api/gateway/schedule-report",
};
exports["default"] = ApiConstants;
