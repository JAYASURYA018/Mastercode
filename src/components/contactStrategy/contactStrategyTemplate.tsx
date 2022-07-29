import React, { useEffect } from "react";
import { Stepper } from '@progress/kendo-react-layout';
import { IstepperValue } from "../../interface/common/IstepperValue";
import { withTranslation } from 'react-i18next';
import ContactStrategyMode from '../../components/contactStrategy/contactStrategyMode';
import General from '../../components/contactStrategy/general';
import Outcome from '../../components/contactStrategy/outcome';
import { t } from "i18next";
import { IcallStrategiesMember, IcallStrategyOutComeInformation, IcallStrategyModeInformation } from "../../interface/contactStrategy/IcontactStrategy";
import ApiService from "../../services/api-manager";
import ApiConstants from "../../api-constants";
import toastrmsg from "../../services/toaster-manager";
import { GridItemChangeEvent } from "@progress/kendo-react-grid";
import { TabStrip, TabStripTab, TabStripSelectEventArguments } from '@progress/kendo-react-layout';

const defaultNs = { ns: ['camp', 'common', 'callstrategy'] };

interface Iprops {
	contactStrategyModel?: IcallStrategiesMember;
	contactStrategyModelChange?: (event: any, field: string) => void;
	onChangeModeSliderCtrltValue?: (event: any, id: string) => void;
	onChangeCallStrategyModeInfo?: (event: any, id: string) => void;
	modeList?: Array<any>;
	outcomeList?: Array<IcallStrategyOutComeInformation>;
	selectedChannelId?: number;
	getTelephonyOutcomeBasedOnChannel?: () => void;
	telephonyOutcomeRowClick?: (dataItem: any) => void;
	telephonyOutcomeItemChange?: (event?: GridItemChangeEvent) => void;
	telephonyOutcomeUndoEdit?: () => void;
	updateStateForSliderGrid?: (event?: any, field?: string, props?: any) => void;
	branchModeList?: Array<IcallStrategyModeInformation>;
	isEditContactStrategy?: boolean;
	selectedModeList?: Array<IcallStrategyModeInformation>;
	isAddContactStrategy?: boolean;
	modeGridData?: Array<IcallStrategyModeInformation>;
	isEditMode?: boolean;
	deleteCallStrategyMode?: (item: IcallStrategyModeInformation) => void;
	reorder?: (dataItem: any) => void;
	dragEnd?: (dataItem: any) => void;
	dragStart?: (dataItem: any) => void;
	addCopyMode?: (dataItem: any) => void;
	selectedModeTab?: number;
	onChangeSelectedModeTab?: (event: TabStripSelectEventArguments) => void;
	selectedCallModeInfo?: IcallStrategyModeInformation;
	onChangeOutcomeTabSelection?: (event: TabStripSelectEventArguments) => void;
	selectedOutcomeTab?: number;
	cancelMode?: (dataItem: any) => void;
	saveCopyContactStrategyMode?: (dataItem: any) => void;
	onTabSelectionChange?: (event: TabStripSelectEventArguments) => void;
	selectedContentTab?: number;
	addModesClick?: () => void;
	isAddMode?: boolean;
	editModeName?: () => void;
	isSaveContinue?: boolean;
	editCallStrategy?: (dataItem?: any) => void;
}

const ContactStrategyTemplate = (props: Iprops) => {
	const stepperDefaultValue: Array<IstepperValue> = [
		{ label: t('callStrategy.general', defaultNs), isValid: undefined, text: '1' },
		{ label: t('callstrategy.callstrategylist.grid.Column.Modes.text', defaultNs), isValid: undefined, text: '2' },
		{ label: t('callstrategy.TelephonyOutcomes.grid.header.outcome', defaultNs), isValid: undefined, text: '3' }
	];
	const [value, setStep] = React.useState(0);
	const [steps, setSteps] = React.useState(stepperDefaultValue);

	const general = (
		<General isEditContactStrategy={props.isEditContactStrategy} strategyType={props.contactStrategyModel?.strategyType} description={props.contactStrategyModel?.description} restictedMultiEmailSMS={props.contactStrategyModel?.restictedMultiEmailSMS}
			contactStrategyModelChange={props.contactStrategyModelChange} />
	);

	const modes = (
		<ContactStrategyMode onChangeModeSliderCtrltValue={props.onChangeModeSliderCtrltValue} modeMaxRetry={props.selectedCallModeInfo?.modeMaxRetry} windowAttempts={props.selectedCallModeInfo?.windowAttempts}
			windowDuration={props.selectedCallModeInfo?.windowDuration} strategyType={props.contactStrategyModel?.strategyType} isWindowRetry={props.selectedCallModeInfo?.isWindowRetry}
			isPEWC={props.selectedCallModeInfo?.isPEWC} callBackCarryRetries={props.selectedCallModeInfo?.callBackCarryRetries} onChangeCallStrategyModeInfo={props.onChangeCallStrategyModeInfo}
			modeNumber={props.selectedCallModeInfo?.modeNumber} startTime={props.selectedCallModeInfo?.startTime} isEditMode={props.isEditMode} modeGridData={props.modeGridData} reorder={props.reorder}
			dragEnd={props.dragEnd} dragStart={props.dragStart} endTime={props.selectedCallModeInfo?.endTime} modeList={props.modeList} selectedModeList={props.selectedModeList} cancelMode={props.cancelMode}
			isEditContactStrategy={props.isEditContactStrategy} deleteCallStrategyMode={props.deleteCallStrategyMode} addCopyMode={props.addCopyMode} selectedModeTab={props.selectedModeTab} onChangeSelectedModeTab={props.onChangeSelectedModeTab}
			saveCopyContactStrategyMode={props.saveCopyContactStrategyMode} isAddContactStrategy={props.isAddContactStrategy} addModesClick={props.addModesClick} isAddMode={props.isAddMode}
			editModeName={props.editModeName} editCallStrategy={props.editCallStrategy} />
	);

	const outcome = (
		<Outcome modeList={props.modeList} modeNumber={props.selectedCallModeInfo?.modeNumber} outcomeList={props.outcomeList} telephonyOutcomeRowClick={props.telephonyOutcomeRowClick} telephonyOutcomeItemChange={props.telephonyOutcomeItemChange}
			telephonyOutcomeUndoEdit={props.telephonyOutcomeUndoEdit} updateStateForSliderGrid={props.updateStateForSliderGrid} branchModeList={props.branchModeList} strategyType={props.contactStrategyModel?.strategyType}
			selectedModeList={props.selectedModeList} isEditContactStrategy={props.isEditContactStrategy} selectedOutcomeTab={props.selectedOutcomeTab} onChangeOutcomeTabSelection={props.onChangeOutcomeTabSelection} />
	);

	useEffect(() => {
		//for (let i = 0; i < steps.length; i++) {
		//    preValidationForm[i]();
		//}
		if (props.isSaveContinue) {
			setStep(1);
		}
	}, [props.isSaveContinue, props.isEditMode]);

	useEffect(() => {
	}, [props.selectedCallModeInfo]);

	const handleChange = (e: any) => {
		// steps[e.value != 0 ? e.value - 1 : 0].isValid = _.isEmpty(formErrors[e.value != 0 ? e.value - 1 : 0]) ? false : Object.values(formErrors[e.value != 0 ? e.value - 1 : 0]).every(item => item != 'required');
		const currentSteps = steps;
		if (e.value == 1) {
			if (!props.contactStrategyModel.dialPlanName?.trim() && (props.isAddContactStrategy && !props.isSaveContinue)) {
				toastrmsg.toastMessage(t("callstrategy.error.Copy_Contact_Strategy_Name_field_cannot_be_empty", defaultNs), "error");
				return false;
			}
			if (!props.isEditContactStrategy && !props.isSaveContinue) {
				ApiService.getAll(ApiConstants.validateContactStrategyName + "?dialPlanName=" + props.contactStrategyModel.dialPlanName).then(data => {
					if (data == -50089) {
						toastrmsg.toastMessage(t("callstrategy.message.callstrategynameexists_50089", defaultNs), "error");
						return false;
					} else {
						setSteps(currentSteps);
						setStep(e.value);
					}
				}).catch(error => { });
			} else {
				setSteps(currentSteps);
				setStep(e.value);
			}
		} else if (e.value == 2) {
			if (props.contactStrategyModel.callStrategyModeInformation[0].modeNumber > 0) {
				props.getTelephonyOutcomeBasedOnChannel();
				setSteps(currentSteps);
				setStep(e.value);
			} else {
				toastrmsg.toastMessage(t("callstrategy.error.mode_Name_empty", defaultNs), "error");
				return false;
			}
		} else {
			setSteps(currentSteps);
			setStep(e.value);
		}
		//  preValidationForm[value]();
	};
	const lastStepIndex = steps.length - 1;
	const isLastStep = lastStepIndex === value;
	const isPreviousStepsValid = steps.slice(0, value).findIndex(currentStep => currentStep.isValid === false) === -1;
	const stepPages = [general, modes, outcome];

	const onStepSubmit = React.useCallback(event => {
		if (value == 0) {
			if (!props.contactStrategyModel.dialPlanName?.trim() && (props.isAddContactStrategy && !props.isSaveContinue)) {
				toastrmsg.toastMessage(t("callstrategy.error.Copy_Contact_Strategy_Name_field_cannot_be_empty", defaultNs), "error");
				return false;
			}
			if (!props.isEditContactStrategy && !props.isSaveContinue) {
				ApiService.getAll(ApiConstants.validateContactStrategyName + "?dialPlanName=" + props.contactStrategyModel.dialPlanName).then(data => {
					if (data == -50089) {
						toastrmsg.toastMessage(t("callstrategy.message.callstrategynameexists_50089", defaultNs), "error");
						return false;
					} else {
						setSteps(steps);
						setStep(() => Math.min(value + 1, lastStepIndex));
					}
				}).catch(error => { });
			}
			else {
				setSteps(steps);
				setStep(() => Math.min(value + 1, lastStepIndex));
			}
		} else if (value == 1) {
			if (props.contactStrategyModel.callStrategyModeInformation[0].modeNumber > 0) {
				props.getTelephonyOutcomeBasedOnChannel();
				setSteps(steps);
				setStep(() => Math.min(value + 1, lastStepIndex));
			} else {
				toastrmsg.toastMessage(t("callstrategy.error.mode_Name_empty", defaultNs), "error");
				return false;
			}
		} else {
			//for (let i = 0; i < steps.length; i++) {
			//    steps[i].isValid = _.isEmpty(formErrors[i]) == false && i == value ? Object.values(formErrors[i]).every(item => item != 'required') : steps[i].isValid
			//}
			setSteps(steps);
			setStep(() => Math.min(value + 1, lastStepIndex));
			//  preValidationForm[value]();
		}
	}, [steps, isLastStep, isPreviousStepsValid, value, lastStepIndex, props]);

	const onPrevClick = React.useCallback(event => {
		event.preventDefault();
		if (value == 3) {
			const currentSteps = steps;
			//const currentSteps = steps.map((currentStep, index) => ({
			//    ...currentStep,
			//    isValid: _.isEmpty(formErrors[index]) == false && index == value ? Object.values(formErrors[index]).every(item => item != 'required') : index == value ? false : currentStep.isValid
			//}));
			setSteps(currentSteps);
			//  preValidationForm[value]();
		}
		setStep(() => Math.max(value - 1, 0));
	}, [value, setStep, props]);


	return (
		props.isAddContactStrategy ? <div style={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
		}}>
			<Stepper value={value} onChange={handleChange} items={steps} />
			<div className="">{stepPages[value]}</div>
			<div className="col-md-12 text-center mb-3 mt-3">
				{value !== 0 ? <button className="k-button k-prev mr-4" style={{
					marginRight: '16px'
				}} onClick={onPrevClick}>
					<i className="fa fa-arrow-left" aria-hidden="true"></i>
				</button> : undefined}
				{!isLastStep && (<button className="k-button k-next" disabled={isLastStep ? !isPreviousStepsValid : false} onClick={onStepSubmit}>
					<i className="fa fa-arrow-right" aria-hidden="true"></i>
				</button>)}
			</div>
		</div> :
			<div>
				<TabStrip
					selected={props.selectedContentTab}
					onSelect={props.onTabSelectionChange}
					tabPosition="top" className=""
				>
					<TabStripTab title={t('callStrategy.general', defaultNs)}>
						<div>{stepPages[props.selectedContentTab]}</div>
					</TabStripTab>
					<TabStripTab title={t('callstrategy.callstrategylist.grid.Column.Modes.text', defaultNs)}>
						<div>{stepPages[props.selectedContentTab]}</div>
					</TabStripTab>
					<TabStripTab title={t('callstrategy.TelephonyOutcomes.grid.header.outcome', defaultNs)}>
						<div>{stepPages[props.selectedContentTab]}</div>
					</TabStripTab>
				</TabStrip>
			</div>
	);
}


export default withTranslation(['callstrategy', 'common', 'camp'])(ContactStrategyTemplate);