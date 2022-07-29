import React, { Component } from "react";
import ApiService from "../../services/api-manager";
import ApiConstants from "../../api-constants";
import * as _ from "underscore";
import toastrmsg from "../../services/toaster-manager";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
import { t } from "i18next";
import ContactStrategyTemplate from '../../components/contactStrategy/contactStrategyTemplate';
import { IcallStrategiesMember, IcallStrategyOutComeInformation, IcallStrategyModeInformation } from "../../interface/contactStrategy/IcontactStrategy";
import { GridItemChangeEvent } from "@progress/kendo-react-grid";
import moment from 'moment';
import { TabStripSelectEventArguments } from "@progress/kendo-react-layout";

interface Istate {
	contactStrategyModel?: IcallStrategiesMember;
	modeList?: Array<any>;
	selectedChannelId?: number;
	pewcModelType?: string;
	branchModeList?: Array<IcallStrategyModeInformation>;
	selectedModeList?: Array<IcallStrategyModeInformation>;
	activeItem?: any;
	active?: any;
	selectedModeTab?: number;
	selectedCallModeInfo?: IcallStrategyModeInformation;
	selectedOutcomeTab?: number;
	selectedContentTab?: number;
	isSaveContinue?: boolean;
	isAddContactStrategy?: boolean;
	isAddMode?: boolean;
	isEditMode?: boolean;
	isEditContactStrategy?: boolean;
}

interface Iprops {
	isAddContactStrategy?: boolean;
	closeAddEditContactStrategy: () => void;
	dialer?: string;
	masterCallStrategiesListModel?: Array<IcallStrategiesMember>;
	callstrategyList?: () => void;
	selectedDialPlanName?: string;
	isEditContactStrategy?: boolean;
	selectedModeItem?: IcallStrategiesMember;
	isEditMode?: boolean;
	isAddMode?: boolean;
	addModesClick?: () => void;
}

const defaultNs: any = { ns: ['camp', 'common', 'callstrategy'] };

export class AddEditContactStrategy extends Component<Iprops, Istate> {
	public state: Istate = { selectedModeTab: 1, selectedOutcomeTab: 1 };
	public modeMembers = { modeNumber: 0, modeDescription: "Default", modeName: "Default" };
	public masterModeList: Array<any>;
	public masterContactStrategyModel?: IcallStrategiesMember;
	public operationFlag: string = "";
	public selectedCallstrategy?: string;
	public masterTelephonyOutcomeList: Array<IcallStrategyOutComeInformation>;
	public disableCallstrategyModes: boolean;
	public showAddAnotherMode: boolean;
	public selectedModeNumber: number;
	public tempSelectedModeNumber: number;
	public editField: string = "inEdit";
	public copyOriginalModeChannelId: number;
	public copyCallStrategyType: number;
	public sourceCallStrategyList: Array<IcallStrategiesMember>;

	constructor(props: any) {
		super(props);
		this.contactStrategyModelChange = this.contactStrategyModelChange.bind(this);
		this.onChangeCallStrategyModeInfo = this.onChangeCallStrategyModeInfo.bind(this);
		this.addAnotherCallStrategyModes = this.addAnotherCallStrategyModes.bind(this);
		this.onChangeSelectedModeTab = this.onChangeSelectedModeTab.bind(this);
		this.addCopyMode = this.addCopyMode.bind(this);
		this.cancelMode = this.cancelMode.bind(this);
		this.operationFlag = this.props.isAddContactStrategy ? "Create" : "Edit";
		this.selectedCallstrategy = this.props.selectedDialPlanName;
		this.state.selectedContentTab = this.props.isEditMode ? 1 : 0;
		this.sourceCallStrategyList = this.props.masterCallStrategiesListModel;
		this.state.isAddContactStrategy = this.props.isAddContactStrategy;
		this.state.isAddMode = this.props.isAddMode;
		this.state.isEditMode = this.props.isEditMode;
		this.state.isEditContactStrategy = this.props.isEditContactStrategy;
	}

	async componentDidMount() {
		this.setState({ selectedContentTab: this.state.selectedContentTab });
		//await this.getTCPAConfig();
		await this.getContactStrategyModel();
		await this.getAllMode();
		window.addEventListener('drop', () => { this.dragEnd(''); });
	}

	componentWillUnMount() {
		window.removeEventListener('drop', () => { this.dragEnd(''); });
	}

	getContactStrategyModel = async () => {
		await ApiService.getAll(ApiConstants.contactStrategyModel).then(data => {
			data.restictedMultiEmailSMS = false;
			if (data.callStrategyModeInformation.length > 0) {
				data.callStrategyModeInformation[0].startTime = new Date(moment().startOf('day').toString());
				data.callStrategyModeInformation[0].endTime = new Date(moment().endOf('day').subtract(59, 'seconds').toString());
			}
			this.masterContactStrategyModel = _.clone(data);
			this.masterContactStrategyModel.callStrategyModeInformation[0].modeNumber = undefined;
			this.getBranchModList(this.masterContactStrategyModel.callStrategyModeInformation, '');
			if (this.props.isEditContactStrategy) {
				this.state.contactStrategyModel = { ...this.props.selectedModeItem };
				this.state.contactStrategyModel.callStrategyModeInformation[0].startTime = new Date(this.state.contactStrategyModel.callStrategyModeInformation[0].startTime);
				this.state.contactStrategyModel.callStrategyModeInformation[0].endTime = new Date(this.state.contactStrategyModel.callStrategyModeInformation[0].endTime);
				this.state.selectedModeList = [...this.props.selectedModeItem?.callStrategyModeInformation];
			} else {
				this.state.contactStrategyModel = { ...data };
				this.state.selectedModeList = [...this.state.contactStrategyModel.callStrategyModeInformation];
			}
			this.setState({ contactStrategyModel: this.state.contactStrategyModel, selectedModeList: this.state.selectedModeList });
		}).catch(error => { toastrmsg.toastMessage(t('camp.crt.internalerror', defaultNs), 'error'); });
	}

	closeAddEditContactStrategyDialog = () => {
		this.props.closeAddEditContactStrategy();
	}

	getAllMode = async () => {
		await ApiService.getAll(ApiConstants.getModeList).then(data => {
			this.masterModeList = _.clone(data.modesList);
			this.setState({ modeList: data.modesList });
		}).catch(error => {
			toastrmsg.toastMessage(t('camp.crt.internalerror', defaultNs), 'error');
		});
	}

	getTelephonyOutcome = async () => {
		await ApiService.getAll(ApiConstants.contactStrategyTelephonyOutcome).then(data => {
		}).catch(() => {
			toastrmsg.toastMessage(t('camp.crt.internalerror', defaultNs), 'error');
		});
	}

	getTelephonyOutcomeList = async () => {
		await ApiService.getAll(ApiConstants.getTelephonyOutcomeList).then(data => {
		}).catch(() => {
			toastrmsg.toastMessage(t('camp.crt.internalerror', defaultNs), 'error');
		});
	}

	keyPress = (event: any) => {
		let pattern = "`~!#$%^&*()+={}[]\\\';,./{}|\":<>?";
		event = event || window.event;
		let charCode = event.keyCode || event.which;
		let charStr = String.fromCharCode(charCode);
		if (pattern.indexOf(charStr) != -1) {
			event.preventDefault();
		}
		else {
			return true;
		}
	}

	contactStrategyModelChange = (event: any, field: string) => {
		this.state.contactStrategyModel[field] = event.value;
		if (field === 'strategyType') {
			if (event.value == 1) {
				this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].modeMaxRetry = 1;
			}
			if (event.value != 2 && event.value != 1) {
				this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].callBackCarryRetries = false;
			}
		}
		this.state.selectedCallModeInfo = { ...this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1] };
		this.setState({ contactStrategyModel: this.state.contactStrategyModel, selectedCallModeInfo: this.state.selectedCallModeInfo })
	}

	onChangeModeSliderCtrltValue = (event: any, id: string) => {
		this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1][id] = event.value;
		this.state.selectedCallModeInfo = { ...this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1] };
		this.setState({ contactStrategyModel: this.state.contactStrategyModel, selectedCallModeInfo: this.state.selectedCallModeInfo });
	}

	onChangeCallStrategyModeInfo = (event: any, field: string) => {
		if (field === 'isWindowRetry') {
			if (event.value) {
				this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].windowAttempts = 1;
				this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].windowDuration = 1;
			}
			else {
				this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].windowAttempts = 0;
				this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].windowDuration = 0;
			}
		}
		else if (field === 'modeNumber') {
			let index = _.findIndex(_.clone(this.state.modeList), { "modeNumber": event.modeNumber });
			this.state.selectedChannelId = _.clone(this.state.modeList[index]).channelId;
			if (this.props.dialer?.toLowerCase() == "twilio") {
				this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].isPEWC = false;
			}
			else if (this.state.selectedChannelId === 1 || this.state.selectedChannelId === 3) {
				this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].isPEWC = false;
			}
			else if (this.state.pewcModelType == "manual" || this.state.pewcModelType == "clicker") {
				this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].isPEWC = true;
			}
			this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].modeName = event.modeName;
		}
		else if (field === 'modeName') {
			let index = _.findIndex(_.clone(this.state.modeList), { "modeNumber": event.value });
			this.state.selectedChannelId = _.clone(this.state.modeList[index]).channelId;
			this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].modeName = _.clone(this.state.modeList[index]).modeName;
			this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].channelType = _.clone(this.state.modeList[index]).channelId;
			this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].modeNumber = event.value;
		}
		if (field !== 'modeName') {
			this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1][field] = (field === 'modeNumber') ? event.modeNumber : event.value;
		}
		this.state.selectedCallModeInfo = { ...this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1] };
		this.setState({ contactStrategyModel: { ...this.state.contactStrategyModel }, selectedChannelId: this.state.selectedChannelId, selectedCallModeInfo: this.state.selectedCallModeInfo });
	}

	getTelephonyOutcomeBasedOnChannel = () => {
		const index: number = _.findIndex(_.clone(this.state.modeList), { "modeNumber": this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedOutcomeTab - 1].modeNumber });
		this.state.selectedChannelId = _.clone(this.state.modeList[index]).channelId;
		let params: any = {
			callStrategyType: this.state.contactStrategyModel.strategyType,
			selectedChannelId: this.state.selectedChannelId
		};
		ApiService.getAll(ApiConstants.getTelephonyOutcomeBasedOnChannel, params).then(data => {
			this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedOutcomeTab - 1].outComeInfoList = _.clone(data);
			this.setState({ contactStrategyModel: this.state.contactStrategyModel, selectedChannelId: this.state.selectedChannelId });
		}).catch(error => { });
	}

	getTCPAConfig = async () => {
		await ApiService.getAll(ApiConstants.campaignTcpaConfig).then((data) => {
			this.state.pewcModelType = data.tcpaConfig;
			this.setState({ pewcModelType: this.state.pewcModelType });
		}).catch((error) => {
			toastrmsg.toastMessage(("StatusCode_-1"), "error");
		});
	}

	telephonyOutcomeRowClick = (cellProps?: any) => {
		let data: Array<IcallStrategyOutComeInformation> = _.clone(this.state.contactStrategyModel?.callStrategyModeInformation[this.state.selectedOutcomeTab - 1]?.outComeInfoList.map((item: any) =>
			item.callOutcomeDescription === cellProps.dataItem.callOutcomeDescription ? { ...item, inEdit: true } : { ...item, inEdit: false }
		));
		this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedOutcomeTab - 1].outComeInfoList = data;
		this.setState({
			contactStrategyModel: this.state.contactStrategyModel
		});
	}


	telephonyOutcomeUndoEdit = () => {
		let editedData: Array<IcallStrategyOutComeInformation> = _.filter(this.state.contactStrategyModel?.callStrategyModeInformation[this.state.selectedOutcomeTab - 1]?.outComeInfoList, (item: any) => {
			if (item.inEdit === true) { return item; }
		});
		if (editedData.length > 0) {
			let data: Array<IcallStrategyOutComeInformation> = _.clone(this.state.contactStrategyModel?.callStrategyModeInformation[this.state.selectedOutcomeTab - 1]?.outComeInfoList.map((item: any) => {
				return { ...item, inEdit: false }
			}));
			this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedOutcomeTab - 1].outComeInfoList = data;
			this.setState({
				contactStrategyModel: this.state.contactStrategyModel
			});
		}
	}

	telephonyOutcomeItemChange = (event: GridItemChangeEvent) => {
		const field = event.field || "";
		const newData = this.state.contactStrategyModel?.callStrategyModeInformation[this.state.selectedOutcomeTab - 1]?.outComeInfoList.map((item: any) =>
			item.callOutcomeDescription === event.dataItem.callOutcomeDescription
				? { ...item, [field]: event.value }
				: item
		);
		this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedOutcomeTab - 1].outComeInfoList = newData;
		this.setState({ contactStrategyModel: this.state.contactStrategyModel });
	};

	updateStateForSliderGrid = (event?: any, field?: string, props?: any) => {
		props.gridData.dataItem[field] = event.value;
		this.state.contactStrategyModel.callStrategyModeInformation = this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedOutcomeTab - 1].outComeInfoList.map((item: any) => {
			return item.callOutcomeDescription == props.gridData.dataItem.callOutcomeDescription ? props.gridData.dataItem : item;
		});
		this.setState({ contactStrategyModel: this.state.contactStrategyModel });
	}

	getBranchModList = (callStrategyModes: any, selectedModeName: any) => {
		let branchtoModeArray: Array<IcallStrategyModeInformation> = [];
		branchtoModeArray.push(this.modeMembers);
		if (callStrategyModes.length > 0) {
			for (let i = 0; i < callStrategyModes.length; i++) {
				if (callStrategyModes[i].modeName != "" && callStrategyModes[i].modeName != null && callStrategyModes[i].modeName != undefined) {
					if (callStrategyModes[i].modeName != selectedModeName) {
						branchtoModeArray.push(callStrategyModes[i]);
					}
				}
			}
		}
		this.setState({ branchModeList: branchtoModeArray });
	}

	onChangeSelectedModeTab = (event: TabStripSelectEventArguments) => {
		let callModeInfo: IcallStrategyModeInformation = _.clone(this.state.contactStrategyModel.callStrategyModeInformation[event.selected - 1]);
		callModeInfo.startTime = new Date(callModeInfo.startTime);
		callModeInfo.endTime = new Date(callModeInfo.endTime);
		this.setState({ selectedModeTab: event.selected, selectedCallModeInfo: callModeInfo });
	}

	onChangeOutcomeTabSelection = (event: TabStripSelectEventArguments) => {
		if (this.state.contactStrategyModel.callStrategyModeInformation[event.selected - 1].modeNumber > 0) {
			let index = _.findIndex(_.clone(this.state.modeList), { "modeNumber": this.state.contactStrategyModel.callStrategyModeInformation[event.selected - 1].modeNumber });
			this.state.selectedChannelId = _.clone(this.state.modeList[index]).channelId;
			//this.getTelephonyOutcomeBasedOnChannel();
			this.state.selectedOutcomeTab = event.selected;
			this.state.selectedModeTab = event.selected;
			this.onChangeSelectedModeTab(event);
			this.setState({ selectedOutcomeTab: this.state.selectedOutcomeTab, selectedChannelId: this.state.selectedChannelId });
		} else {
			toastrmsg.toastMessage(t("callstrategy.error.mode_Name_empty", defaultNs), "error");
			return false;
		}
	}

	cancelMode = (item: any) => {
		item[this.editField] = false;
		let callStrategy: Array<IcallStrategiesMember> = [..._.where(this.props.masterCallStrategiesListModel, { "dialPlanName": this.state.contactStrategyModel?.dialPlanName })];
		let callStartegyModeInfo: Array<IcallStrategyModeInformation> = [...callStrategy[0].callStrategyModeInformation]
		for (let i = 0; i < callStartegyModeInfo.length; i++) {
			let j: number = callStartegyModeInfo.length - i;
			callStartegyModeInfo[i].weightage = j;
			let sequenceOrder = i;
			if (i >= 9) {
				sequenceOrder = sequenceOrder + 1;
				callStartegyModeInfo[i].sequenceOrder = sequenceOrder.toString();
			}
			else {
				sequenceOrder = sequenceOrder + 1;
				callStartegyModeInfo[i].sequenceOrder = ("0" + sequenceOrder).toString();
			}
		}
		this.state.contactStrategyModel.callStrategyModeInformation = [...callStartegyModeInfo];
		this.setState({ contactStrategyModel: this.state.contactStrategyModel });
	}

	saveCopyContactStrategyMode = (dataItem: IcallStrategyModeInformation) => {
		dataItem[this.editField] = false;
		let isFetchChannelBasedOutcome = false;
		if (this.copyOriginalModeChannelId != dataItem.channelType) {
			isFetchChannelBasedOutcome = true;
			dataItem.outComeInfoList = [];
		}
		let callStrategyModeInfo: Array<IcallStrategyModeInformation> = [];
		callStrategyModeInfo.push(dataItem);
		let params = {
			DialPlanName: this.state.contactStrategyModel.dialPlanName,
			callStrategyModeInformation: callStrategyModeInfo,
			IsFetchChannelBasedOutcome: isFetchChannelBasedOutcome,
			CallStrategyType: dataItem.strategyType,
			pageName: "Call Strategy",
			enterpriseId: 1,
			createUser: "1",
			operation: "Update",
			data: ""
		}
		ApiService.post(ApiConstants.copyContactStrategyMode, params).then(response => {
			if (response.returnValue == 50035) {
				this.props.callstrategyList();
				if (isFetchChannelBasedOutcome) {
					dataItem.outComeInfoList = response.callStrategyOutComeInformation;
				}
				toastrmsg.toastMessage(t("callstrategy.message.saveeditsuccess", defaultNs) + " " + dataItem.modeName + " " + t("callstrategy.message.saveaddsuccess.modeadded", defaultNs), "success");
			} else if ((response.ReturnValue == -50028) || (response.ReturnValue == -1)) {
				toastrmsg.toastMessage(t("callstrategy.message.errortransaction", defaultNs), "error");
			}
			else {
				toastrmsg.toastMessage(t("callstrategy.message.errortransaction", defaultNs), "error");
			}
		}).catch(error => { });
	}

	saveCallStrategy = (flag?: string) => {
		let modifyDescription = this.state.contactStrategyModel.description;
		this.state.contactStrategyModel.modeCount = this.state.contactStrategyModel.callStrategyModeInformation.length;
		let index = _.findIndex(this.state.modeList, { "modeNumber": this.state.contactStrategyModel.callStrategyModeInformation[0].modeNumber });
		this.state.contactStrategyModel.callStrategyModeInformation[0].modeName = this.state.modeList[index].modeName;
		this.state.contactStrategyModel.callStrategyModeInformation[0].channelType = this.state.modeList[index].channelId;
		this.state.contactStrategyModel.callStrategyModeInformation[0].outComeInfoList = _.clone(this.state.contactStrategyModel.callStrategyModeInformation[0].outComeInfoList);
		this.state.contactStrategyModel.callStrategyModeInformation[0].strategyType = this.state.contactStrategyModel.strategyType;
		this.state.contactStrategyModel.pageName = "Call Strategy";
		this.state.contactStrategyModel.enterpriseId = 1;
		this.state.contactStrategyModel.createUser = "1";
		this.state.contactStrategyModel.operation = this.props.isEditContactStrategy || this.state.isSaveContinue ? "Edit" : "Create";
		this.state.contactStrategyModel.data = "";
		this.state.contactStrategyModel.restictedMultiEmailSMS = this.state.contactStrategyModel.restictedMultiEmailSMS === true ? "Y" : "N";
		if (this.state.contactStrategyModel.strategyType == 1) {
			this.state.contactStrategyModel.callStrategyModeInformation[0].deleted = true;
		}
		let isIndex: number = _.findIndex(this.props.masterCallStrategiesListModel, { "dialPlanName": this.state.contactStrategyModel.dialPlanName });
		if (isIndex == -1) {
			this.state.contactStrategyModel.callStrategyModeInformation[0].weightage = -1;
		}
		else {
			let isModeIndex: number = _.findIndex(this.props.masterCallStrategiesListModel[isIndex].callStrategyModeInformation, { "modeNumber": this.state.contactStrategyModel.callStrategyModeInformation[0].modeNumber });
			if (isModeIndex === -1) {
				if (this.props.masterCallStrategiesListModel[isIndex].callStrategyModeInformation.length > 0) {
					let sorted = _.sortBy(this.props.masterCallStrategiesListModel[isIndex].callStrategyModeInformation, (item: IcallStrategyModeInformation) => {
						return item.weightage;
					});
					this.state.contactStrategyModel.callStrategyModeInformation[0].weightage = sorted[0].weightage - 1;
				}
				else {
					this.state.contactStrategyModel.callStrategyModeInformation[0].weightage = -1;
				}
			}
		}
		let params: IcallStrategiesMember = { ...this.state.contactStrategyModel };
		if (flag === "saveAndAddAnotherCallStrategyModes") {
			params.callStrategyModeInformation = [];
			params.callStrategyModeInformation.push({ ...this.state.contactStrategyModel.callStrategyModeInformation[0] });
		}
		ApiService.post(ApiConstants.saveCallStrategy, params).then(data => {
			if (data === 50040 || data === 50035) {
				if (flag !== "saveAndAddAnotherCallStrategyModes") {
					this.closeAddEditContactStrategyDialog();
				}
				if (this.operationFlag === 'Create') {
					this.state.contactStrategyModel.restictedMultiEmailSMS = this.state.contactStrategyModel.restictedMultiEmailSMS ? 'Y' : 'N';
					if (flag === "saveAndAddAnotherCallStrategyModes") {
						this.setState({ isSaveContinue: true, selectedContentTab: 1 });
						this.sourceCallStrategyList.push(this.state.contactStrategyModel);
						this.selectedCallstrategy = _.clone(this.state.contactStrategyModel.dialPlanName);
						this.addAnotherCallStrategyModes('saveAndAddAnotherCallStrategyModes');
					}
					else if (flag !== "saveAndAddAnotherCallStrategyModes") {
						toastrmsg.toastMessage(t("callstrategy.message.saveaddsuccess", defaultNs) + " " + this.state.contactStrategyModel.callStrategyModeInformation[0].modeName + " " + t("callstrategy.message.saveaddsuccess.modeadded", defaultNs), "success");
						this.props.callstrategyList();
					}
					else {
						toastrmsg.toastMessage(t("callstrategy.message.saveaddsuccess", defaultNs) + " " + this.state.contactStrategyModel.callStrategyModeInformation[0].modeName + " " + t("callstrategy.message.saveaddsuccess.modeadded", defaultNs), "success");
						if (modifyDescription != this.props.masterCallStrategiesListModel[isIndex].description) {
							this.props.callstrategyList();
						}
					}
				}
				else if (this.operationFlag === 'Edit') {
					this.props.callstrategyList();
					toastrmsg.toastMessage(t("callstrategy.message.saveaddsuccess", defaultNs) + " " + this.state.contactStrategyModel.callStrategyModeInformation[0].modeName + " " + t("callstrategy.message.saveaddsuccess.modeadded", defaultNs), "success");
				}
			}
			else if (data == -50034) {
				toastrmsg.toastMessage(t("callstrategy.message.callstrategyexists", defaultNs), "error");
			}
			else if (data == -50089) {
				toastrmsg.toastMessage(t("callstrategy.message.callstrategynameexists", defaultNs), "error");
			}
			else if ((data == -50028) || (data == -1)) {
				toastrmsg.toastMessage(t("callstrategy.message.errortransaction", defaultNs), "error");
			}
			else if (data == -50086) {
				toastrmsg.toastMessage(t("callstrategy.message.callstrategynameexists_50086", defaultNs), "error");
			}
			else if (data == -50087) {
				toastrmsg.toastMessage(t("callstrategy.message.callstrategynameexists_50087", defaultNs), "error");
			}
			else if (data == -50088) {
				toastrmsg.toastMessage(t("callstrategy.message.callstrategynameexists_50088", defaultNs), "error");
			}
		}).catch(error => {
			toastrmsg.toastMessage(t("callstrategy.message.error.savecallstrategy", defaultNs), "error");
		});
	}

	addAnotherCallStrategyModes = (flag?: string) => {
		let dialPlanName = this.selectedCallstrategy;
		this.disableCallstrategyModes = false;
		this.showAddAnotherMode = true;
		this.operationFlag = "Edit";
		this.selectedModeNumber = undefined;
		this.tempSelectedModeNumber = undefined;
		this.state.selectedChannelId = undefined;
		//ApiService.getAll(ApiConstants.getTelephonyOutcomeList).then(data => {
		//this.masterTelephonyOutcomeList = data;
		this.getAllMode();
		let callStrategy: Array<IcallStrategiesMember> = [..._.where(this.sourceCallStrategyList, { "dialPlanName": this.state.contactStrategyModel?.dialPlanName ? this.state.contactStrategyModel?.dialPlanName : dialPlanName })];
		this.state.contactStrategyModel = { ...callStrategy[0] };
		this.state.contactStrategyModel.restictedMultiEmailSMS = callStrategy[0].restictedMultiEmailSMS == "Y" ? true : false;
		/*this.state.contactStrategyModel.callStrategyModeInformation = [];*/
		let callStrategyModes: IcallStrategyModeInformation = { ...this.masterContactStrategyModel.callStrategyModeInformation[0] };
		callStrategyModes.startTime = new Date(moment().startOf('day').toString());
		callStrategyModes.endTime = new Date(moment().endOf('day').subtract(59, 'seconds').toString());
		callStrategyModes.modeNumber = 0;
		callStrategyModes.modeName = '';
		callStrategyModes.outComeInfoList = [];
		this.state.contactStrategyModel.callStrategyModeInformation = [...[callStrategyModes, ...this.state.contactStrategyModel.callStrategyModeInformation]];
		this.getBranchModList(_.clone(callStrategy[0].callStrategyModeInformation), "");
		this.state.selectedModeList = [...this.state.contactStrategyModel.callStrategyModeInformation];
		// this.state.contactStrategyModel.isSimple = self.viewData.CallStrategiesModel.StrategyType != 1 ? true : false;
		this.setState({
			contactStrategyModel: this.state.contactStrategyModel, selectedChannelId: this.state.selectedChannelId, selectedModeList: this.state.selectedModeList,
			selectedCallModeInfo: this.state.selectedModeList[0]
		});
		//}).catch(error => {
		//	toastrmsg.toastMessage(t("callstrategy.message.error.GetOutcomelist", defaultNs), "error");
		//});
	}

	validationContactStrategy = () => {
		if (!this.state.contactStrategyModel?.dialPlanName?.trim()) {
			return false;
		} else if (this.state.contactStrategyModel?.callStrategyModeInformation.length > 0 && this.state.contactStrategyModel?.callStrategyModeInformation[0].modeNumber === 0) {
			return false;
		} else {
			return true;
		}
	}

	deleteCallStrategyMode = (item: IcallStrategyModeInformation) => {
		let callstrategy: Array<IcallStrategiesMember> = _.clone(_.where(this.props.masterCallStrategiesListModel, { "dialPlanName": this.state.contactStrategyModel?.dialPlanName }));
		let callStrategyModes: Array<IcallStrategyModeInformation> = _.clone(callstrategy[0].callStrategyModeInformation);
		if (callStrategyModes.length > 0) {
			for (let i: number = 0; i < callStrategyModes.length; i++) {
				let branchModeCount: Array<IcallStrategyOutComeInformation> = [];
				if (callStrategyModes[i].modeNumber !== item.modeNumber) {
					branchModeCount = _.where(callStrategyModes[i].outComeInfoList, { "branchToMode": item.modeNumber });
					if (branchModeCount != null && branchModeCount != [] && branchModeCount != undefined && branchModeCount.length > 0) {
						toastrmsg.toastMessage(t("callstrategy.message.deletecallstrategymodes.branchmode", defaultNs), "error");
						return false;
					}
				}
			}
		}
		let params: any = {
			dialPlanName: this.state.contactStrategyModel?.dialPlanName,
			dialPlanType: item.strategyType,
			modeId: item.modeNumber
		}
		ApiService.delete(ApiConstants.deleteContactStrategyMode, params).then(response => {
			if (response.data === 0) {
				let modeIndex: number = _.findIndex(callstrategy[0].callStrategyModeInformation, { "modeNumber": item.modeNumber });
				let callStartegyModeInfo: Array<IcallStrategyModeInformation> = [...this.state.contactStrategyModel.callStrategyModeInformation];
				callStartegyModeInfo.splice(modeIndex, 1);
				for (let i = 0; i < callStartegyModeInfo.length; i++) {
					let sequenceOrder: number = i;
					if (i >= 9) {
						sequenceOrder = sequenceOrder + 1;
						callStartegyModeInfo[i].sequenceOrder = sequenceOrder.toString();
					}
					else {
						sequenceOrder = sequenceOrder + 1;
						callStartegyModeInfo[i].sequenceOrder = ("0" + (sequenceOrder)).toString();
					}
				}
				this.state.contactStrategyModel.callStrategyModeInformation = callStartegyModeInfo;
				this.props.callstrategyList();
				this.setState({ contactStrategyModel: this.state.contactStrategyModel });
			}
			else if (response.data == 1) {
				toastrmsg.toastMessage(t("callstrategy.message.deletecallstrategymodes.opencontacts", defaultNs), "error");
			}
			else if (response.data == -1) {
				toastrmsg.toastMessage(t("callstrategy.message.errortransaction", defaultNs), "error");
			}
		}).catch();
	}

	reorder = (item: any) => {
		if (this.state.activeItem === item) {
			return;
		}
		let reorderedData = [...this.state.contactStrategyModel.callStrategyModeInformation.slice()];
		let prevIndex = reorderedData.findIndex((p: any) => p === this.state.activeItem);
		let nextIndex = reorderedData.findIndex((p: any) => p === item);
		reorderedData.splice(prevIndex, 1);
		reorderedData.splice(
			nextIndex,
			0,
			this.state.activeItem || reorderedData[0]
		);
		for (let i = 0; i < reorderedData.length; i++) {
			let j: number = reorderedData.length - i;
			reorderedData[i].weightage = j;
			let sequenceOrder = i;
			if (i >= 9) {
				sequenceOrder = sequenceOrder + 1;
				reorderedData[i].sequenceOrder = sequenceOrder.toString();
			}
			else {
				sequenceOrder = sequenceOrder + 1;
				reorderedData[i].sequenceOrder = ("0" + sequenceOrder).toString();
			}
		}
		this.state.contactStrategyModel.callStrategyModeInformation = reorderedData;
		this.state.active = this.state.activeItem;
		this.setState({
			contactStrategyModel: this.state.contactStrategyModel,
			active: this.state.activeItem,
		});
	}

	dragStart = (item: any) => {
		this.setState({
			contactStrategyModel: this.state.contactStrategyModel,
			activeItem: item,
		});
	}


	dragEnd = async (item: any) => {
		let callStartegyModeInfo: Array<IcallStrategyModeInformation> = [...this.state.contactStrategyModel.callStrategyModeInformation];
		for (let i = 0; i < callStartegyModeInfo.length; i++) {
			let j: number = callStartegyModeInfo.length - i;
			callStartegyModeInfo[i].weightage = j;
			let sequenceOrder = i;
			if (i >= 9) {
				sequenceOrder = sequenceOrder + 1;
				callStartegyModeInfo[i].sequenceOrder = sequenceOrder.toString();
			}
			else {
				sequenceOrder = sequenceOrder + 1;
				callStartegyModeInfo[i].sequenceOrder = ("0" + sequenceOrder).toString();
			}
		}
		let params: any = {
			dialPlanName: this.state.contactStrategyModel?.dialPlanName,
			callStrategyModeInformation: callStartegyModeInfo
		};
		await ApiService.put(ApiConstants.updateModeWeightage, params).then(data => {
			this.props.callstrategyList();
		}).catch(error => {
			toastrmsg.toastMessage(t("callstrategy.message.error.updateweightage", defaultNs), "error");
		});
		this.state.contactStrategyModel.callStrategyModeInformation = callStartegyModeInfo;
	}

	addCopyMode = (item: any) => {
		this.copyCallStrategyType = this.state.contactStrategyModel.strategyType;
		const tempData: IcallStrategyModeInformation = { ...item.dataItem };
		this.copyOriginalModeChannelId = item.dataItem.channeltype;
		let newDataItem: any = { ...tempData };
		newDataItem.inEdit = true;
		newDataItem.modeNumber = 0;
		newDataItem.modeName = '';
		newDataItem.weightage = -1;
		newDataItem.channelType = 0;
		let callStartegyModeInfo: Array<IcallStrategyModeInformation> = [...[newDataItem, ...this.state.contactStrategyModel.callStrategyModeInformation]];
		for (let i = 0; i < callStartegyModeInfo.length; i++) {
			let j: number = callStartegyModeInfo.length - i;
			callStartegyModeInfo[i].weightage = j;
			let sequenceOrder = i;
			if (i >= 9) {
				sequenceOrder = sequenceOrder + 1;
				callStartegyModeInfo[i].sequenceOrder = sequenceOrder.toString();
			}
			else {
				sequenceOrder = sequenceOrder + 1;
				callStartegyModeInfo[i].sequenceOrder = ("0" + sequenceOrder).toString();
			}
		}
		this.state.contactStrategyModel.callStrategyModeInformation = [...callStartegyModeInfo];
		this.setState({
			contactStrategyModel: this.state.contactStrategyModel
		});
	}

	onTabSelectionChange = (event: TabStripSelectEventArguments) => {
		if (event.selected === 2 && (this.props.isAddMode || this.props.isAddContactStrategy) && ((this.state.selectedOutcomeTab - 1) === 0)) {
			if (this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedOutcomeTab - 1].modeNumber > 0) {
				this.getTelephonyOutcomeBasedOnChannel();
				this.state.selectedContentTab = event.selected;
			} else {
				toastrmsg.toastMessage(t("callstrategy.error.mode_Name_empty", defaultNs), "error");
				return false;
			}
		} else {
			this.state.selectedContentTab = event.selected;
		}
		this.setState({ selectedContentTab: this.state.selectedContentTab });
	}

	editModeName = () => {
		this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].modeName = '';
		this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1].modeNumber = 0;
		this.state.selectedCallModeInfo = { ...this.state.contactStrategyModel.callStrategyModeInformation[this.state.selectedModeTab - 1] };
		this.setState({ selectedCallModeInfo: this.state.selectedCallModeInfo, contactStrategyModel: this.state.contactStrategyModel });
	}

	editCallStrategy = (dataItem?: any) => {
		this.operationFlag = "Edit";
		this.state.isEditMode = true;
		let index = _.findIndex(_.clone(this.state.contactStrategyModel.callStrategyModeInformation), { "modeNumber": dataItem.modeNumber });
		this.state.contactStrategyModel.callStrategyModeInformation[index].startTime = new Date(this.state.contactStrategyModel.callStrategyModeInformation[index].startTime);
		this.state.contactStrategyModel.callStrategyModeInformation[index].endTime = new Date(this.state.contactStrategyModel.callStrategyModeInformation[index].endTime);
		this.state.selectedModeTab = index + 1;
		this.state.selectedCallModeInfo = { ...this.state.contactStrategyModel.callStrategyModeInformation[index] };
		this.state.selectedModeList = [...this.state.contactStrategyModel.callStrategyModeInformation];
		this.setState({
			selectedCallModeInfo: this.state.selectedCallModeInfo,
			selectedContentTab: 1, isEditMode: false, selectedModeList: this.state.selectedModeList
		});
	}



	render() {
		return (
			<>
				<Dialog className={this.props.isEditContactStrategy ? "dialogpop dialogpop create-contactStrategy edit-cs" : "dialogpop create-contactStrategy"}>
					<p className="heading">
						<i className="icon-contact-strategy-operator"></i>
						{this.props.isEditContactStrategy ?
							<label>{this.state.contactStrategyModel?.dialPlanName}</label> :
							<Input type="text" maxLength={64} required={true} onKeyPress={this.keyPress} aria-labelledby="contactStrategyId" id="contactStrategyId" name="contactStrategyId" aria-describedby="contactStrategyId"
								placeholder={t('callstrategy.callstrategyName.label', defaultNs)} value={this.state.contactStrategyModel?.dialPlanName} onChange={(event: any) => { this.contactStrategyModelChange(event, 'dialPlanName') }} />}
						<span className="right">
							<button className="k-button k-primary" id="Cancel-ContactStrategy" name="Cancel-ContactStrategy" aria-label="Cancel-ContactStrategy" title={t('camp.copycampaign.btn.cancel', defaultNs)} onClick={this.closeAddEditContactStrategyDialog}>{t('camp.copycampaign.btn.cancel', defaultNs)}</button>
							{!this.state.isEditContactStrategy && (<button className={this.validationContactStrategy() ? "k-button k-primary mr-16" : "k-button k-create mr-16"} id="CreateContinue-ContactStrategy" name="CreateContinue-ContactStrategy" aria-label="CreateContinue-ContactStrategy" onClick={() => { this.saveCallStrategy('saveAndAddAnotherCallStrategyModes') }} title="Create & Continue">{this.operationFlag === 'Create' ? t('common.createcontinue', defaultNs) : t('common.savecontinue', defaultNs)}</button>)}
							<button id="Create-ContactStrategy" name="Create-ContactStrategy" aria-label="Create-ContactStrategy" title={this.operationFlag === 'Create' ? t('common.create', defaultNs) : t('common.save', defaultNs)} className={this.validationContactStrategy() ? "k-button k-primary" : "k-button k-create"} onClick={() => { this.saveCallStrategy('') }}>{(this.state.isAddContactStrategy || !this.state.isAddMode) ? t('common.create', defaultNs) : t('common.save', defaultNs)}</button>
						</span>
					</p>
					<div className="example-config">
						<ContactStrategyTemplate contactStrategyModelChange={this.contactStrategyModelChange} contactStrategyModel={this.state.contactStrategyModel} onChangeModeSliderCtrltValue={this.onChangeModeSliderCtrltValue}
							onChangeCallStrategyModeInfo={this.onChangeCallStrategyModeInfo} modeList={this.state.modeList} outcomeList={this.state.contactStrategyModel?.callStrategyModeInformation[this.state.selectedOutcomeTab - 1]?.outComeInfoList} selectedChannelId={this.state.selectedChannelId}
							getTelephonyOutcomeBasedOnChannel={() => { this.getTelephonyOutcomeBasedOnChannel() }} telephonyOutcomeRowClick={this.telephonyOutcomeRowClick} telephonyOutcomeItemChange={this.telephonyOutcomeItemChange} telephonyOutcomeUndoEdit={this.telephonyOutcomeUndoEdit}
							updateStateForSliderGrid={this.updateStateForSliderGrid} branchModeList={this.state.branchModeList} isEditContactStrategy={this.state.isEditContactStrategy} selectedModeList={this.state.selectedModeList} onChangeOutcomeTabSelection={this.onChangeOutcomeTabSelection}
							isAddContactStrategy={this.state.isAddContactStrategy} isEditMode={this.state.isEditMode} modeGridData={this.state.contactStrategyModel?.callStrategyModeInformation} deleteCallStrategyMode={this.deleteCallStrategyMode} selectedOutcomeTab={this.state.selectedOutcomeTab}
							reorder={this.reorder} dragEnd={this.dragEnd} dragStart={this.dragStart} addCopyMode={this.addCopyMode} selectedModeTab={this.state.selectedModeTab} onChangeSelectedModeTab={this.onChangeSelectedModeTab} selectedCallModeInfo={this.state.selectedCallModeInfo}
							cancelMode={this.cancelMode} saveCopyContactStrategyMode={this.saveCopyContactStrategyMode} onTabSelectionChange={this.onTabSelectionChange} selectedContentTab={this.state.selectedContentTab} addModesClick={this.props.addModesClick} isAddMode={this.state.isAddMode}
							editModeName={this.editModeName} isSaveContinue={this.state.isSaveContinue} editCallStrategy={this.editCallStrategy} />
					</div>
				</Dialog>
			</>

		);
	}
}