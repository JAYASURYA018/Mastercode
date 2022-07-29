import React, { memo, useState, useEffect } from "react";
import { t } from "i18next";
import { TabStrip, TabStripTab, TabStripSelectEventArguments } from '@progress/kendo-react-layout';
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { IcallStrategyModeInformation } from "../../interface/contactStrategy/IcontactStrategy";
import ModeContent from '../contactStrategy/modeContent';
import ModeGrid from '../contactStrategy/modeGrid';

const defaultNs:any = { ns: ['camp', 'common', 'callstrategy'] };

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
	isEditContactStrategy?: boolean;
	isEditMode?: boolean;
	modeGridData?: Array<IcallStrategyModeInformation>;
	deleteCallStrategyMode?: (item: IcallStrategyModeInformation) => void;
	reorder?: (dataItem: any) => void;
	dragEnd?: (dataItem: any) => void;
	dragStart?: (dataItem: any) => void;
	addCopyMode?: (dataItem: any) => void;
	selectedModeTab?: number;
	onChangeSelectedModeTab?: (event: TabStripSelectEventArguments) => void;
	cancelMode?: (dataItem: any) => void;
	saveCopyContactStrategyMode?: (dataItem: any) => void;
	isAddContactStrategy?: boolean;
	addModesClick?: () => void;
	isAddMode?: boolean;
	editModeName?: () => void;
	editCallStrategy?: (dataItem?: any) => void;
}

const ContactStrategyMode = (props: Iprops) => {
	const [isShowModeDDL, setIsShowModeDDL] = useState(true);
	const [selectedModeName, setSelectedModeName] = useState("");
	const [modeNameList, setModeNameList] = useState([]);
	const [selectedModeList, setSelectedModeList] = useState(props.selectedModeList);

	const getAllMode = () => {
		let selectedModeData: any = [];
		if (props.isEditContactStrategy) {
			selectedModeData = props.selectedModeList?.map(item => { return item.modeNumber; });
		}
		let data = (props.modeList != undefined && selectedModeData != undefined) ? props.modeList?.filter(item => !selectedModeData.includes(item.modeNumber)) : [];
		setModeNameList(data);
		setSelectedModeList(props.selectedModeList);
	}

	useEffect(() => {
		getAllMode();
	}, []);

	useEffect(() => {
		setSelectedModeList(props.selectedModeList);
		getAllMode();
	}, [props.selectedModeList, props.modeList]);

	useEffect(() => {
		if (selectedModeName !== "") {
			setIsShowModeDDL(false);
		}
	}, [selectedModeName,props.isEditMode]);

	return (
		<div className="container">
			<div className="cs-edit-popup">
				<div className="row mt-21">
					<div className="col-md-10">
					</div>
					<div className="col-md-2 text-right">
						{props.isEditContactStrategy && props.isAddMode && (<button type="button" aria-label="add-mode" title={t('callStrategy.newMode', defaultNs)} name="add-mode" className="link-btn" onClick={() => { setIsShowModeDDL(!isShowModeDDL); props.addModesClick(); }}>+ {t('callStrategy.newMode', defaultNs)}
						</button>)}
					</div>
				</div>
				<div className="row my-2">
					<div className="col-md-3">
						<label aria-labelledby={"mode-length"} aria-describedby={"mode-length"} id={"mode-length"} className="px-1 mr-1">{t('callstrategy.callstrategylist.grid.header.ModesCount', defaultNs)} • {selectedModeList?.length}</label>
					</div>
					<div className="col-md-9 pl-0">
					</div>
				</div>
				{!props.isEditMode && (<TabStrip
					selected={props.selectedModeTab}
					onSelect={(e) => { props.onChangeSelectedModeTab(e) }}
					tabPosition="left" className="tab-content-add"
				>
					<TabStripTab disabled={true} title={<label className="px-1 mr-1">{t('camp.chain.mode', defaultNs)}</label>}>
					</TabStripTab>
					{selectedModeList.map((item, index) => {
						return (
							<TabStripTab title={!item.modeName ?
								<DropDownList id="Mode-Selection" aria-labelledby="Mode-Selection" aria-ariaDescribedBy="Mode-Selection" name="Mode-Selection" value={selectedModeName} onChange={(e) => { setSelectedModeName(e.target.value.modeName); props.onChangeCallStrategyModeInfo(e.target.value, 'modeNumber'); }} defaultValue={""}
									data={modeNameList} textField="modeName" dataItemKey="modeNumber" />
								:
								<>
									<span className={item.modeName ? 'icon-contact-strategy' : ''}><span>{item.modeName}</span></span>
									{(!props.isEditContactStrategy || props.isAddContactStrategy || props.isAddMode) && (index === 0) && (<i aria-labelledby={"edit-Mode" + index} className={'icon-tool-edit'} onClick={() => { props.editModeName() }}
										title={t('common.edit', defaultNs)}></i>)}</>} key={index}>
								<div className="add-modes-cspage pl-25" key={index}>
									<ModeContent onChangeModeSliderCtrltValue={props.onChangeModeSliderCtrltValue} modeMaxRetry={props.modeMaxRetry} windowAttempts={props.windowAttempts}
										windowDuration={props.windowDuration} strategyType={props.strategyType} isWindowRetry={props.isWindowRetry}
										isPEWC={props.isPEWC} callBackCarryRetries={props.callBackCarryRetries} onChangeCallStrategyModeInfo={props.onChangeCallStrategyModeInfo}
										modeNumber={props.modeNumber} startTime={props.startTime}
										endTime={props.endTime} modeList={props.modeList} selectedModeList={props.selectedModeList} />
								</div>
							</TabStripTab>
						);
					})}
				</TabStrip>)}
			</div> {props.isEditMode && (<ModeGrid modeGridData={props.modeGridData} deleteCallStrategyMode={props.deleteCallStrategyMode} reorder={props.reorder} dragEnd={props.dragEnd} dragStart={props.dragStart} addCopyMode={props.addCopyMode}
				modeNameList={modeNameList} cancelMode={props.cancelMode} onChangeCallStrategyModeInfo={props.onChangeCallStrategyModeInfo} saveCopyContactStrategyMode={props.saveCopyContactStrategyMode} editCallStrategy={props.editCallStrategy} />)}
		</div>
	);
}

export default memo(ContactStrategyMode);