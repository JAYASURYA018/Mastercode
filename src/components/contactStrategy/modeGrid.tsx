import React, { useEffect, memo, Component, useState } from "react";
import {  IcallStrategyModeInformation } from "../../interface/contactStrategy/IcontactStrategy";
import { Grid, GridColumn as Column, GridCellProps, GridItemChangeEvent } from "@progress/kendo-react-grid";
import { t } from "i18next";
import moment from 'moment';
import DeleteConfirmationPopup from "../common/deleteConfirmationPopup";
import DropDownControl from "../common/dropDownControl";
import { DropDownList } from "@progress/kendo-react-dropdowns";

const DropDown = DropDownControl(DropDownList);

const defaultNs = { ns: ['camp', 'common', 'callstrategy', 'bo', 'sysconfig'] };

interface Iprops {
	modeGridData?: Array<IcallStrategyModeInformation>;
	itemChange?: (event: GridItemChangeEvent) => void;
	reorder?: (dataItem: any) => void;
	dragEnd?: (dataItem: any) => void;
	dragStart?: (dataItem: any) => void;
	deleteCallStrategyMode?: (item: IcallStrategyModeInformation) => void;
	addCopyMode?: (dataItem: any) => void;
	modeNameList?: Array<any>;
	cancelMode?: (dataItem: any) => void;
	onChangeCallStrategyModeInfo?: (event: any, id: string) => void;
	saveCopyContactStrategyMode?: (dataItem: any) => void;
	editCallStrategy?: (dataItem?: any) => void;
}

interface DragCellProps extends GridCellProps {
	reorder?: any;
	dragStart?: any;
	dragEnd?: any;
}


class DragCell extends Component<DragCellProps> {
	render() {
		return (
			<td
				onDragOver={(e: any) => {
					this.props.reorder(this.props.dataItem);
					e.preventDefault();
					e.dataTransfer.dropEffect = "copy";
				}}
				onDragEnd={(e) => {
					this.props.dragEnd(this.props.dataItem);
				}}
			>
				<span
					className="k-icon k-i-reorder"
					draggable={true}
					style={{ cursor: "move" }}
					onDragStart={(e) => {
						this.props.dragStart(this.props.dataItem);
						e.dataTransfer.setData("dragging", "");
					}}
				/>
			</td>
		);
	}
}

const ModeGrid = (props: Iprops) => {
	const [isDeleteMode, setDeleteMode] = useState(false);
	const [selectedMode, setSelectedMode] = useState<IcallStrategyModeInformation>({})
	const gridWidth: number = 1300;
	const editField: string = "inEdit";
	const [modeNameList, setModeNameList] = useState([props.modeNameList]);

	useEffect(() => {
		setModeNameList(props.modeNameList)
	}, [props.modeNameList])

	const myDragCell = (cellProps: GridCellProps) => {
		return (
			<DragCell {...cellProps} reorder={props.reorder} dragEnd={props.dragEnd} dragStart={props.dragStart} />);
	}

	const channelTypeColumn = (cellProps: GridCellProps) => {
		return (<td>
			<i className={cellProps.dataItem.channelType === 1 ? "icon-sys-mode-sms" : cellProps.dataItem.channelType === 2 ? "icon-sys-mode-phone" : cellProps.dataItem.channelType === 3 ? "icon-sys-mode-email" : "icon-sys-mode-custom"}></i>
		</td>);
	};

	const deleteModeClick = (dataItem: any) => {
		setSelectedMode(dataItem);
		setDeleteMode(true);
	};

	const setPercentage = (percentage: any) => {
		return Math.round(gridWidth / 100) * percentage;
	};

	const myCommandCell = (cellProps: GridCellProps) => {
		const { dataItem } = cellProps;
		const inEdit = dataItem[editField];

		return inEdit ? (
			<td className="k-command-cell">
				<button className="k-grid-save-command no-btn" aria-label={"Save-BusinessParameter" + cellProps.dataIndex}
					name={"Save-ContactStrategyMode" + cellProps.dataIndex} id={"Save-ContactStrategyMode" + cellProps.dataIndex} onClick={() => { props.saveCopyContactStrategyMode(cellProps.dataItem) } }>
					<i className="k-primary fa fa-check" title="Apply" ></i>

				</button>
				<button className="k-grid-cancel-command no-btn" title="Cancel" aria-label={"Cancel-ContactStrategyMode" + cellProps.dataIndex} name={"Cancel-ContactStrategyMode" + cellProps.dataIndex} id={"Cancel-ContactStrategyMode" + cellProps.dataIndex}
					onClick={() => { props.cancelMode(dataItem) }}>
					<i className="k-primary icon-pop-up-close" title="Close" ></i>
				</button>
			</td>
		) : (
			<td className="k-command-cell">
					<button title="Edit" aria-label={"Edit-ContactStrategyMode" + cellProps.dataIndex} name={"Edit-ContactStrategyMode" + cellProps.dataIndex} id={"Edit-ContactStrategyMode" + cellProps.dataIndex} onClick={() => { props.editCallStrategy(cellProps.dataItem)} }>
					<i className="icon-tool-edit" title="Edit" />
				</button>
				<button title="Copy" aria-label={"Copy-ContactStrategyMode" + cellProps.dataIndex} name={"Copy-ContactStrategyMode" + cellProps.dataIndex} id={"Copy-ContactStrategyMode" + cellProps.dataIndex} onClick={() => { props.addCopyMode(cellProps) }}>
					<i className="icon-tool-clone" title="Copy" />
				</button>
				<button title="Delete" aria-label={"Delete-ContactStrategyMode" + cellProps.dataIndex} name={"Delete-ContactStrategyMode" + cellProps.dataIndex} id={"Delete-ContactStrategyMode" + cellProps.dataIndex} onClick={() => { deleteModeClick(dataItem) }}>
					<i className="icon-tool-delete" title="Delete" />
				</button>
			</td>
		);
	};

	const modeNameCellColumn = (cellProps: any) => {
		const { dataItem } = cellProps;
		return (
			<td>
				{dataItem.inEdit ? (
					<DropDown id={"Mode-Selection" + cellProps.dataIndex}
						name={"Mode-Selection" + cellProps.dataIndex} ariaLabelledBy={"Mode-Selection" + cellProps.dataIndex} data={modeNameList}
						textField="modeName"
						valueField="modeNumber"
						value={cellProps.dataItem.modeName}
						onChange={(event: any) => { onChangeGridColumn(event, cellProps); props.onChangeCallStrategyModeInfo(event,'modeName') }} />
				) : (
					dataItem.modeName
				)}
			</td>);
	}

	const onChangeGridColumn = (event: any, GridColumnProps: any) => {
		GridColumnProps.onChange({
			dataIndex: 0,
			dataItem: GridColumnProps.dataItem,
			field: GridColumnProps.field,
			syntheticEvent: event.syntheticEvent,
			value: event.value,
		});
	}

	const deleteModeItem = () => {
		props.deleteCallStrategyMode(selectedMode);
		setDeleteMode(false);
	};

	const closeDeleteMode = () => {
		setSelectedMode(undefined);
		setDeleteMode(false);
	};

	return (
		<>
			<Grid
				onItemChange={props.itemChange} className="cs-mode"
				editField={editField}
				data={props.modeGridData}>
				<Column
					title="" width="50px"
					cell={myDragCell} />
				<Column
					title="" width="50px"
					cell={channelTypeColumn} />
				<Column
					field="modeName" width={setPercentage(30)}
					title={t('camp.chain.mode', defaultNs)}
					editable={true}
					cell={modeNameCellColumn} />
				<Column field="startTime" title={t('camp.label.Time_Range', defaultNs)} width={setPercentage(27)} cell={(cellProps) => (
					<td className="p-0">{moment(new Date(cellProps.dataItem.startTime)).format("hh:mm A") + " - " + moment(new Date(cellProps.dataItem.endTime)).format("hh:mm A")}</td>
				)} />
				<Column field="modeMaxRetry" editable={false} title={t('callstrategy.retries', defaultNs)} width="180px" />
				<Column field="sequenceOrder" editable={false} title={t('callstrategy.modeWeightage', defaultNs)} />
				<Column
					title="Actions" width="130px"
					cell={myCommandCell}
				/>
			</Grid>
			{isDeleteMode && (<DeleteConfirmationPopup titleContent={t('common.delete.selection', defaultNs)} iconClass="icon-contact-strategy" description={t('callstrategy.Mode.action.delete.confirm', defaultNs)}
				contentName={selectedMode?.modeName} popUpCloseClick={closeDeleteMode} handleDeleteClick={deleteModeItem} cancelAriaLabel="cancel-Delete contact strategy Mode"
				cancelId="cancel-DeletecontactstrategyMode" cancelName="cancel-DeletecontactstrategyMode" deleteAriaLabel="Delete-contact strategy Mode" deleteId="Delete-contactstrategyMode" deleteName="Delete-contactstrategyMode" />)}
		</>
	);
}

export default memo(ModeGrid)