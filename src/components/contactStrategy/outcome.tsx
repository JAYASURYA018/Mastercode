import { GridItemChangeEvent } from "@progress/kendo-react-grid";
import { TabStrip, TabStripSelectEventArguments, TabStripTab } from '@progress/kendo-react-layout';
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { IcallStrategyModeInformation, IcallStrategyOutComeInformation } from "../../interface/contactStrategy/IcontactStrategy";
import TelephonyOutcomeGrid from '../contactStrategy/telephonyOutcomeGrid';

const defaultNs = { ns: ['camp', 'common', 'callstrategy', 'sysconfig', 'bo'] };

interface Ioutcome {
	modeList?: Array<any>;
	modeNumber?: number;
	outcomeList?: Array<IcallStrategyOutComeInformation>;
	telephonyOutcomeRowClick?: (dataItem: any) => void;
	telephonyOutcomeItemChange?: (event?: GridItemChangeEvent) => void;
	telephonyOutcomeUndoEdit?: () => void;
	updateStateForSliderGrid?: (event?: any, field?: string, props?: any) => void;
	branchModeList?: Array<IcallStrategyModeInformation>;
	strategyType?: number;
	selectedModeList?: Array<IcallStrategyModeInformation>;
	isEditContactStrategy?: boolean;
	selectedOutcomeTab?: number;
	onChangeOutcomeTabSelection?: (event: TabStripSelectEventArguments) => void;
}

const Outcome = (props: Ioutcome) => {
/*	const [modeNameList, setModeNameList] = useState([]);*/
	const [selectedModeList, setSelectedModeList] = useState([]);

	useEffect(() => {
		/*let selectedModeData: any = [];*/
		//if (props.isEditContactStrategy) {
		//	selectedModeData = props.selectedModeList?.map(item => { return item.modeNumber; });
		//}
		//let data = (props.modeList != undefined && selectedModeData != undefined) ? props.modeList?.filter(item => !selectedModeData.includes(item.modeNumber)) : [];
		//setModeNameList(data);
		setSelectedModeList(props.selectedModeList);
	}, []);

	return (
		<>
			<div className="container-fluid">
				<div className="row my-2">
					<div className="col-md-3">
						<label aria-labelledby={"mode-length"} aria-describedby={"mode-length"} id={"mode-length"} className="px-1 mr-1">{t('callstrategy.callstrategylist.grid.header.ModesCount', defaultNs)} • {selectedModeList?.length}</label>
					</div>
					<div className="col-md-9 pl-0">
					</div>
				</div>
				<TabStrip
					selected={props.selectedOutcomeTab}
					onSelect={(e) => { props.onChangeOutcomeTabSelection(e) }}
					tabPosition="left" className="tab-content-add"
				>
					<TabStripTab disabled={true} title={
						<label className="px-1 mr-1">{t('camp.chain.mode', defaultNs)}</label>
					}>
					</TabStripTab>
					{selectedModeList.map((item, index) => {
						return (
							<TabStripTab  title={<span className={item.modeName ? 'icon-contact-strategy' : ''}><span>{item.modeName}</span></span>} key={index}>
								<div>
									<TelephonyOutcomeGrid outcomeList={props.outcomeList} telephonyOutcomeRowClick={props.telephonyOutcomeRowClick} telephonyOutcomeItemChange={props.telephonyOutcomeItemChange} telephonyOutcomeUndoEdit={props.telephonyOutcomeUndoEdit}
										updateStateForSliderGrid={props.updateStateForSliderGrid} branchModeList={props.branchModeList} strategyType={props.strategyType} />
								</div>
							</TabStripTab>
						);
					})}
				</TabStrip>
			</div>
		</>
	);
}

export default Outcome;