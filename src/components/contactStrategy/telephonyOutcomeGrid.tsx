import React, { useEffect, memo } from "react";
import { IcallStrategyOutComeInformation, IcallStrategyModeInformation } from "../../interface/contactStrategy/IcontactStrategy";
import { Grid, GridColumn as Column, GridCellProps, GridItemChangeEvent } from "@progress/kendo-react-grid";
import { t } from "i18next";
import { Switch } from "@progress/kendo-react-inputs";
import { SlideCtrl } from "../common/sliderCtrl";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import DropDownControl from "../common/dropDownControl";

const DropDown = DropDownControl(DropDownList);

const defaultNs = { ns: ['camp', 'common', 'callstrategy', 'bo', 'sysconfig'] };

interface ItelephonyOutcomeProps {
	outcomeList?: Array<IcallStrategyOutComeInformation>;
	editField?: string;
	telephonyOutcomeRowClick?: (dataItem: any) => void;
	telephonyOutcomeItemChange?: (event?: GridItemChangeEvent) => void;
	telephonyOutcomeUndoEdit?: () => void;
	updateStateForSliderGrid?: (event?: any, field?: string, props?: any) => void;
	branchModeList?: Array<IcallStrategyModeInformation>;
	strategyType?: number;
}

const TelephonyOutcomeGrid = (props: ItelephonyOutcomeProps) => {

	useEffect(() => {
		window.addEventListener('click', (event: any) => {
			if (!findParent(event.target)) {
				props.telephonyOutcomeUndoEdit();
			}
		});
		return () => {
			window.removeEventListener('click', () => { });
		}
	}, []);

	const findParent = (el?: any) => {
		if (el?.tagName === 'BODY') return false;
		if (el?.parentElement?.className?.indexOf('k-grid-table') > -1) return true;
		return el?.parentElement != null ? findParent(el?.parentElement) : true;
	}

	const onChangeGridColumn = (event: any, onChangeGridColumnProps: any) => {
		onChangeGridColumnProps.onChange({
			dataIndex: 0,
			dataItem: onChangeGridColumnProps.dataItem,
			field: onChangeGridColumnProps.field,
			syntheticEvent: event.syntheticEvent,
			value: event.value,
		});
	}

	const retainPCBColumn = (cellProps: GridCellProps) => {
		const { dataItem } = cellProps;
		return (
			<td>
				{dataItem.inEdit ? (
					<Switch id={"retainPCB-" + cellProps.dataIndex} onLabel={t('camp.add.waitforagent.yes', defaultNs)} offLabel={t('camp.add.waitforagent.no', defaultNs)} disabled={(props.strategyType === 1 || props.strategyType === 2) ? true : false}
						name={"retainPCB-" + cellProps.dataIndex} ariaLabelledBy={"retainPCB-" + cellProps.dataIndex} onChange={(event) => onChangeGridColumn(event, cellProps)} checked={cellProps.dataItem.retainPCB} />
				) : (
					dataItem.retainPCB == true ? t('camp.add.waitforagent.yes', defaultNs) : t('camp.add.waitforagent.no', defaultNs)
				)}
			</td>);
	}

	const closeContactsColumn = (contactsColumnProps: GridCellProps) => {
		const { dataItem } = contactsColumnProps;
		return (
			<td>
				{dataItem.inEdit ? (
					<Switch id={"closeContacts-" + contactsColumnProps.dataIndex} onLabel={t('camp.add.waitforagent.yes', defaultNs)} offLabel={t('camp.add.waitforagent.no', defaultNs)}
						name={"closeContacts-" + contactsColumnProps.dataIndex} ariaLabelledBy={"closeContacts-" + contactsColumnProps.dataIndex} onChange={(event) => onChangeGridColumn(event, contactsColumnProps)} checked={contactsColumnProps.dataItem.closeContacts} />
				) : (
					dataItem.closeContacts == true ? t('camp.add.waitforagent.yes', defaultNs) : t('camp.add.waitforagent.no', defaultNs)
				)}
			</td>);
	}

	const removeModeColumn = (modeColumnProps: GridCellProps) => {
		const { dataItem } = modeColumnProps;
		return (
			<td>
				{dataItem.inEdit ? (
					<Switch id={"removeMode-" + modeColumnProps.dataIndex} onLabel={t('camp.add.waitforagent.yes', defaultNs)} offLabel={t('camp.add.waitforagent.no', defaultNs)}
						name={"removeMode-" + modeColumnProps.dataIndex} ariaLabelledBy={"removeMode-" + modeColumnProps.dataIndex} onChange={(event) => onChangeGridColumn(event, modeColumnProps)} checked={modeColumnProps.dataItem.removeMode} />
				) : (
					dataItem.removeMode == true ? t('camp.add.waitforagent.yes', defaultNs) : t('camp.add.waitforagent.no', defaultNs)
				)}
			</td>);
	}

	const beanchModeColumn = (cellProps: GridCellProps) => {
		const { dataItem } = cellProps;
		return (
			<td>
				{dataItem.inEdit ? (
					<DropDown data={props.branchModeList} valueField="modeNumber" disabled={props.strategyType === 1 ? true : false} textField="modeName" required={true} name={"branchMode" + cellProps.dataIndex} id={"branchMode" + cellProps.dataIndex}
						value={cellProps.dataItem.branchToMode} onChange={(event) => onChangeGridColumn(event, cellProps)} className="w-100" />
				) : (
					branchName(dataItem.branchToMode)
				)}
			</td>);
	}

	const leadScoreColumn = (leadScoreColumnProps: GridCellProps) => {
		const { dataItem } = leadScoreColumnProps;
		return (
			<td>
				{dataItem.inEdit ? (
					<SlideCtrl
						value={leadScoreColumnProps.dataItem.leadScore} isSliderRequired={false} min={1} max={99} step={1}
						aria-labelledby={"contactStrategy-LeadScore" + leadScoreColumnProps.dataIndex} id={"contactStrategy-LeadScore" + leadScoreColumnProps.dataIndex}
						name={"contactStrategy-LeadScore" + leadScoreColumnProps.dataIndex} aria-describedby={"contactStrategy-LeadScore" + leadScoreColumnProps.dataIndex}
						onChangeValue={onReturnValue} gridData={leadScoreColumnProps}
					/>
				) : (
					dataItem.leadScore == '' ? 0 : dataItem.leadScore
				)}
			</td>);
	}

	const adjustPriorityColumn = (adjustPriorityColumnProps: any) => {
		const { dataItem } = adjustPriorityColumnProps;
		return (
			<td>
				{dataItem.inEdit ? (
					<SlideCtrl
						value={adjustPriorityColumnProps.dataItem.adjustPriority} isSliderRequired={false} min={1} max={99} step={1}
						aria-labelledby={"contactStrategy-AdjustPriority" + adjustPriorityColumnProps.dataIndex} id={"contactStrategy-AdjustPriority" + adjustPriorityColumnProps.dataIndex}
						name={"contactStrategy-AdjustPriority" + adjustPriorityColumnProps.dataIndex} aria-describedby={"contactStrategy-AdjustPriority" + adjustPriorityColumnProps.dataIndex}
						onChangeValue={onReturnValue} gridData={adjustPriorityColumnProps}
					/>
				) : (
					dataItem.adjustPriority == '' ? 0 : dataItem.adjustPriority
				)}
			</td>);
	}

	const outcomeMaxRetriesColumn = (outcomeMaxRetriesColumnProps: any) => {
		const { dataItem } = outcomeMaxRetriesColumnProps;
		return (
			<td>
				{dataItem.inEdit ? (
					<SlideCtrl
						value={outcomeMaxRetriesColumnProps.dataItem.outcomeMaxRetries} isSliderRequired={false} min={1} max={99} step={1}
						aria-labelledby={"contactStrategy-MaxRetries" + outcomeMaxRetriesColumnProps.dataIndex} id={"contactStrategy-MaxRetries" + outcomeMaxRetriesColumnProps.dataIndex}
						name={"contactStrategy-MaxRetries" + outcomeMaxRetriesColumnProps.dataIndex} aria-describedby={"contactStrategy-MaxRetries" + outcomeMaxRetriesColumnProps.dataIndex}
						onChangeValue={onReturnValue} gridData={outcomeMaxRetriesColumnProps}
					/>
				) : (
					dataItem.outcomeMaxRetries == '' ? 0 : dataItem.outcomeMaxRetries
				)}
			</td>);
	}

	const onReturnValue = (event: any, field: string, sliderProps?: any) => {
		if (field === "contactStrategy-Days" + sliderProps.gridData.dataIndex) {
			props.updateStateForSliderGrid(event, 'rescheduleAfterDays', sliderProps);
		}
		else if (field === "contactStrategy-Hours" + sliderProps.gridData.dataIndex) {
			props.updateStateForSliderGrid(event, 'rescheduleAfterHours', sliderProps);
		}
		else if (field === "contactStrategy-Minute" + sliderProps.gridData.dataIndex) {
			props.updateStateForSliderGrid(event, 'rescheduleAfterMinutes', sliderProps);
		}
		else if (field === "contactStrategy-MaxRetries" + sliderProps.gridData.dataIndex) {
			props.updateStateForSliderGrid(event, 'outcomeMaxRetries', sliderProps);
		}
		else if (field === "contactStrategy-AdjustPriority" + sliderProps.gridData.dataIndex) {
			props.updateStateForSliderGrid(event, 'adjustPriority', sliderProps);
		}
		else if (field === "contactStrategy-LeadScore" + sliderProps.gridData.dataIndex) {
			props.updateStateForSliderGrid(event, 'leadScore', sliderProps);
		}

	}

	const convertDateTime = (data: any) => {
		data.dataItem.dhm = '<span>' + data.dataItem.rescheduleAfterDays + ' d </span><span>' + data.dataItem.rescheduleAfterHours + ' h </span><span>' + data.dataItem.rescheduleAfterMinutes + ' m </span>';
	}

	const rescheduleTimeColumn = (rescheduleTimeColumnProps: any) => {
		const { dataItem } = rescheduleTimeColumnProps;
		convertDateTime(rescheduleTimeColumnProps);
		return (
			<td className="reschedule-data">
				{dataItem.inEdit ? (
					<>  <SlideCtrl
						value={rescheduleTimeColumnProps.dataItem.rescheduleAfterDays} isSliderRequired={false} min={0} max={99} step={1}
						aria-labelledby={"contactStrategy-RescheduleDays" + rescheduleTimeColumnProps.dataIndex} id={"contactStrategy-Days" + rescheduleTimeColumnProps.dataIndex}
						name={"contactStrategy-Days" + rescheduleTimeColumnProps.dataIndex} aria-describedby={"contactStrategy-Days" + rescheduleTimeColumnProps.dataIndex} placeholder='Day'
						onChangeValue={onReturnValue} gridData={rescheduleTimeColumnProps}
					/>
						<SlideCtrl
							value={rescheduleTimeColumnProps.dataItem.rescheduleAfterHours} isSliderRequired={false} min={0} max={23} step={1}
							aria-labelledby={"contactStrategy-Hours" + rescheduleTimeColumnProps.dataIndex} id={"contactStrategy-Hours" + rescheduleTimeColumnProps.dataIndex} placeholder='Hr'
							name={"contactStrategy-Hours" + rescheduleTimeColumnProps.dataIndex} aria-describedby={"contactStrategy-Hours" + rescheduleTimeColumnProps.dataIndex}
							onChangeValue={onReturnValue} gridData={rescheduleTimeColumnProps}
						/>
						<SlideCtrl
							value={rescheduleTimeColumnProps.dataItem.rescheduleAfterMinutes} isSliderRequired={false} min={0} max={59} step={1}
							aria-labelledby={"contactStrategy-Minute" + rescheduleTimeColumnProps.dataIndex} id={"contactStrategy-Minute" + rescheduleTimeColumnProps.dataIndex} placeholder='Min'
							name={"contactStrategy-Minute" + rescheduleTimeColumnProps.dataIndex} aria-describedby={"contactStrategy-Minute" + rescheduleTimeColumnProps.dataIndex}
							onChangeValue={onReturnValue} gridData={rescheduleTimeColumnProps}
						/>
					</>
				) : (
					dataItem.dhm == '' || dataItem.dhm == undefined ? <>0d 0h 0m</> :
						dataItem.dhm != '' && dataItem.dhm != undefined ? <table><tr><td className={dataItem.rescheduleAfterDays == 0 ? 'gray' : ''}>{dataItem.rescheduleAfterDays} d</td>
							<td className={dataItem.rescheduleAfterHours == 0 ? 'gray' : ''}>{dataItem.rescheduleAfterHours} h</td><td className={dataItem.rescheduleAfterMinutes == 0 ? 'gray' : ''}>{dataItem.rescheduleAfterMinutes} m</td></tr></table> :
							undefined

				)}
			</td>);
	}

	const branchName = (modeNumber: number) => {
		for (let i = 0; i < props.branchModeList?.length; i++) {
			if (props.branchModeList[i].modeNumber == modeNumber) {
				return props.branchModeList[i].modeName == "Default" ? t('callstrategy.branchname', defaultNs) : props.branchModeList[i].modeName;
			}
		}
	}

	return (
		<>
			<Grid className="telephony-outcome-grid-cs cs-outcomes"
				onItemChange={props.telephonyOutcomeItemChange}
				editField={props.editField}
				data={props.outcomeList}
				onRowClick={props.telephonyOutcomeRowClick}>
				<Column
					title=""
					width="50px"
					cell={() => (
						<td><i className="icon-users-business-outcome blue"></i></td>)} />
				<Column
					field="callOutcomeDescription"
					title={t('bo.childoutcomes.outcome.heading', defaultNs)} />
				<Column
					field="dhm"
					title={t('bo.childoutcomes.rescheduleTime.heading.notime', defaultNs)}
					editable={true}
					cell={rescheduleTimeColumn}
					width="240px"
				/>
				<Column
					field="outcomeMaxRetries"
					title={t('bo.maxretry', defaultNs)}
					editable={true}
					cell={outcomeMaxRetriesColumn}
					width="68px" />
				<Column
					field="adjustPriority"
					title={t('callstrategy.TelephonyOutcomes.grid.header.priority', defaultNs)}
					editable={true}
					cell={adjustPriorityColumn}
					width="85px" />
				<Column
					field="leadScore"
					title={t('callstrategy.TelephonyOutcomes.grid.header.leadscore', defaultNs)}
					editable={true}
					cell={leadScoreColumn}
					width="85px" />
				<Column
					field="branchToMode"
					title={t('callstrategy.TelephonyOutcomes.grid.header.branchmode', defaultNs)}
					editable={true}
					cell={beanchModeColumn}
					width="85px" />
				<Column
					field="retainPCB"
					title={t('bo.retainpcb', defaultNs)}
					editable={true}
					cell={retainPCBColumn}
					width="85px" />
				<Column
					field="closeContacts"
					cell={closeContactsColumn}
					title={t('camp.CloseContacts', defaultNs)}
					width="85px"
					editable={true} />
				<Column
					field="removeMode"
					title={t('sysconfig.removemode', defaultNs)}
					cell={removeModeColumn}
					width="85px"
					editable={true} />
			</Grid>
		</>
	);

}

export default memo(TelephonyOutcomeGrid);