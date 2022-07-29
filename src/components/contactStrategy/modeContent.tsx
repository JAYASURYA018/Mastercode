import React, { memo } from "react";
import { t } from "i18next";
import { Checkbox } from "@progress/kendo-react-inputs";
import { SlideCtrl } from "../common/sliderCtrl";
import { TimePicker } from "@progress/kendo-react-dateinputs";
import { IcallStrategyModeInformation } from "../../interface/contactStrategy/IcontactStrategy";

interface Iprops {
	modeNumber?: number;
	startTime?: Date;
	endTime?: Date;
	modeMaxRetry?: number;
	isPEWC: boolean;
	isWindowRetry: boolean;
	callBackCarryRetries: boolean;
	windowAttempts: number;
	windowDuration: number;
	strategyType: number;
	onChangeModeSliderCtrltValue?: (event: any, id: string) => void;
	onChangeCallStrategyModeInfo?: (event: any, id: string) => void;
	modeList?: Array<any>;
	selectedModeList?: Array<IcallStrategyModeInformation>;
}

const defaultNs = { ns: ['camp', 'common', 'callstrategy'] };

const ModeContent = (props: Iprops) => {

	return (
		<>
			<label className="title">{t('callStrategy.modeConfiguration', defaultNs)}</label>
			<div className="row">
				<div className="col-md-4">
					<label>{t('camp.label.Time_Range', defaultNs)}</label>
					<div className="timeRangepicker w-100">
						<TimePicker id="contactStrategy-startTime" name="contactStrategy-startTime" aria-label="Start Time" className="w-50" onChange={(event: any) => { props.onChangeCallStrategyModeInfo(event, 'startTime') }} value={props?.startTime} format="hh:mm a" />
						<TimePicker id="contactStrategy-endTime" name="contactStrategy-endTime" aria-label="End Time" className="w-50" onChange={(event: any) => { props.onChangeCallStrategyModeInfo(event, 'endTime') }} value={props?.endTime} format="hh:mm a" />
					</div>
				</div>
				<div className="col-md-6">
					<div className="row mt-24">
						<div className="col-md-3 NumericSlider">
							<label title={t('callstrategy.callstrategymodes.moderetries', defaultNs)} aria-label="Task ">{t('callstrategy.callstrategymodes.moderetries', defaultNs)} <br /> <span> 1–99</span> </label>
						</div>
						<div className="col-md-8 row m-0 pr-0">
							<SlideCtrl id="modeMaxRetry" name="modeMaxRetry" value={props.modeMaxRetry} isSliderRequired={false} min={1} max={99} onChangeValue={props.onChangeModeSliderCtrltValue}
								step={1} ariaLabel="Mode Max Retry" />
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12 mt-14">
					<Checkbox label={t('camp.tooltip.PEWC', defaultNs)} aria-label={t('camp.tooltip.PEWC', defaultNs)} name="contactStrategy-pewc" value={props.isPEWC} className="pr-3"
						onChange={(event: any) => { props.onChangeCallStrategyModeInfo(event, 'isPEWC') }} />
				</div>
			</div>
			{(props.strategyType === 2 || props.strategyType == 1) && <div className="row">
				<div className="col-md-12 mt-14">
					<Checkbox name="callbackSwitches" aria-label={t('callstrategy.callstrategymodes.CarryRetrieswhileswitchestoCallback', defaultNs)} label={t('callstrategy.callstrategymodes.CarryRetrieswhileswitchestoCallback', defaultNs)}
						value={props.callBackCarryRetries} className="pr-3" onChange={(event: any) => { props.onChangeCallStrategyModeInfo(event, 'callBackCarryRetries') }} />
				</div>
			</div>}
			{props.strategyType === 2 && <div className="row">
				<div className="col-md-12 mt-14">
					<Checkbox name="transitionRetry-contactStrategy" aria-label={t('callstrategy.callstrategymodes.transitionretry', defaultNs)} label={t('callstrategy.callstrategymodes.transitionretry', defaultNs)}
						value={props.isWindowRetry} className="pr-3" onChange={(event: any) => { props.onChangeCallStrategyModeInfo(event, 'isWindowRetry') }} />
				</div>
			</div>}
			{(props.strategyType === 2 && props.isWindowRetry) && <><div className="row mt-20">
				<div className="col-md-2 NumericSlider">
					<label title={t('callstrategy.callstrategymodes.transitiondurationdays', defaultNs)} aria-label="Window Duration ">{t('callstrategy.callstrategymodes.transitiondurationdays', defaultNs)} <br /> <span> 1–99</span> </label>
				</div>
				<div className="col-md-8 row m-0 pr-0">
					<SlideCtrl id="windowDuration" name="windowDuration" value={props.windowDuration} isSliderRequired={false} min={1} max={99} onChangeValue={props.onChangeModeSliderCtrltValue}
						step={1} ariaLabel={t('callstrategy.callstrategymodes.transitiondurationdays', defaultNs)} />
				</div>
			</div>
				<div className="row mt-16">
					<div className="col-md-2 NumericSlider">
						<label title={t('callstrategy.callstrategymodes.transitionattempts', defaultNs)} aria-label="Transition Attempts ">{t('callstrategy.callstrategymodes.transitionattempts', defaultNs)} <br /> <span> 1–99</span> </label>
					</div>
					<div className="col-md-8 row m-0 pr-0">
						<SlideCtrl id="windowAttempts" name="windowAttempts" value={props.windowAttempts} isSliderRequired={false} min={1} max={99} onChangeValue={props.onChangeModeSliderCtrltValue}
							step={1} ariaLabel={t('callstrategy.callstrategymodes.transitionattempts', defaultNs)} />
					</div>
				</div></>}
		</>
	);
}

export default memo(ModeContent);