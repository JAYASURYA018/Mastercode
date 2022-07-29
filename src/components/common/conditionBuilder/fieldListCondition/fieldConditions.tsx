import React from "react";
import { Input } from "@progress/kendo-react-inputs";
import DropDownControl from "../../dropDownControl";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { OverlayTrigger, Popover } from "react-bootstrap";
import FieldListSelection from '../../conditionBuilder/fieldListCondition/fieldListSelection';
import OutcomeSelection from '../../conditionBuilder/fieldListCondition/outcomeSelection';
import ListIdSelection from '../../conditionBuilder/fieldListCondition/listIdSelection';
import GlobalListIdSelection from '../../conditionBuilder/fieldListCondition/globalListIdSelection';

const DropDown = DropDownControl(DropDownList);

const FieldConditions = (props: any) => {
	return (
		props.cssGroupConditionModel?.conditionType && (
			<div className="conditionbox mt-4 css-cbox">
				{props.fieldConditionsList.map(function (obj: any, index2: any) {
					return <div key={index2.toString()} className="row advance-condton">
						<div className="col-md-1 col-sm-1 p-0">
							{index2 > 0 && <DropDown data={[{ text: "And", value: "And" }, { text: "Or", value: "Or" }]}
								textField="text" onChange={(event: any) => props.onChangeLogicalConditionList(event, index2)}
								valueField="value" value={obj.logical} />}
						</div>
						<div className="col-md-1 col-sm-1 pr-0">
							<Input type="text" name="test" autoComplete="off" onChange={(event: any) => props.onChangeCompareFieldConditionList(event, index2, 'openBracket')} value={obj.openBracket} className="editable-css-text" aria-label="FieldCondition OpenBracket" />
						</div>
						<div className="col-md-2 col-sm-2 pr-0">
							<OverlayTrigger trigger="click" placement="bottom" rootClose={true} overlay={
								<Popover className="exp-builder" id={`popover-positioned-right`}>
									<Popover.Content>
										<FieldListSelection {...props} index={index2} />
										<OutcomeSelection {...props} index={index2} />
										<ListIdSelection {...props} index={index2} />
										<GlobalListIdSelection {...props} index={index2} />
									</Popover.Content>
								</Popover>
							}>
								<Input type="text" readOnly={true} style={{ cursor: "pointer" }} autoComplete="off" name="test" value={obj.field} onFocus={() => props.openFieldSelectionDialog(obj)}
									className="editable-css-text selection-menuitem cssfield-selection csscondition" placeholder="Select a Field" />
							</OverlayTrigger>

						</div>
						<div className="col-md-3 col-sm-3 pr-0" >
							<DropDown data={props.operatorList}
								textField="name" value={obj.compare}
								valueField="value" onChange={(event: any) => props.onChangeCompareFieldConditionList(event, index2, 'compare')} />
						</div>
						<div className="col-md-2 col-sm-2 pr-0">
							<Input type="text" name="test" autoComplete="off" onChange={(event: any) => props.onChangeCompareFieldConditionList(event, index2, 'value')} value={obj.value} placeholder="Enter a Value" className="editable-css-text csscondition" aria-label="fieldConditionValue" />
						</div>
						<div className="col-md-2 col-sm-2 pr-0">
							<Input type="text" name="test" autoComplete="off" onChange={(event: any) => props.onChangeCompareFieldConditionList(event, index2, 'closeBracket')} value={obj.closeBracket} className="editable-css-text csscondition" aria-label="FieldCondition CloseBracket" />
						</div>
						<div className="col-md-1 col-sm-2 pr-0">
							<i className="icon-tool-add" style={{ marginLeft: "2px" }} onClick={() => props.addFieldCondition(index2, props.pageName)}></i>
							<i className={`icon-tool-minus ${index2 == 0 ? 'disable-group-condition' : ''}`} onClick={() => props.removeFieldCondition(index2)} style={{ marginLeft: "2px" }}></i>
						</div>
					</div>
				}
				)}
			</div>
		)
	);
}

export default FieldConditions;