import React from "react";
import { Input } from "@progress/kendo-react-inputs";
import DropDownControl from "../../dropDownControl";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { OverlayTrigger, Popover } from "react-bootstrap";
import BasicGlobalListIdSelection from '../basicFieldConditions/basicGlobalListIdSelection';
import BasicListIdSelection from '../basicFieldConditions/basicListIdSelection';
import BasicOutcomeSelection from '../basicFieldConditions/basicOutcomeSelection';
import BasicFieldListSelection from '../basicFieldConditions/basicFieldListSelection';

const DropDown = DropDownControl(DropDownList);

const BasicFieldConditions = (props: any) => {
	return (
		props.basicFieldConditionsList?.map(function (item: any, index: any) {
			return <div key={index.toString()} className={index == 0 ? 'next-group-condition' : 'first-group-condition'}>
				{!props.cssGroupConditionModel?.conditionType && (
					<div>
						<div className="row text-center">
							{index > 0 && (
								<Input disabled={true} style={{ width: "5%", backgroundColor: "white !important" }} value={item.logical}
									className={props?.enableCSSBuilderConditionText ? 'mc-condition-enable-operator border-0 ' : 'mc-condition-disabletext-type border-0'}
									type="text" />
							)}
						</div>
						<div className="css-operator col-md-6 col-sm-4 p-0">
							{props?.enableCSSBuilderConditionText == true && (
								<div>
									<div style={{ paddingTop: "5px", paddingLeft: "6px" }}>
										<button type="button" onClick={() => props.addGroupFieldCondition(index)} >
											<i className="icon-tool-add"></i></button>
										<button type="button" disabled={index == 0} onClick={() => props.removeGroupFieldCondition(index)}>
											<i className="icon-control-flush"></i></button>
									</div>
								</div>
							)}

							{props?.enableCSSBuilderConditionText == false && (
								<div className={index > 0 ? "col-md-3 col-sm-3 grpAddFc " : "col-md-3 col-sm-3 "}>
									<div>
										<i className="icon-tool-add" onClick={() => props.addGroupFieldCondition(index)} style={{ marginLeft: "2px" }}></i>
										{index > 0 && <i className={`icon-tool-minus ${index == 0 ? 'disable-group-condition' : ''}`} onClick={() => props.removeGroupFieldCondition(index)} style={{ marginLeft: "2px" }}></i>}
									</div>
								</div>
							)}
						</div>
					</div>
				)}
				{props.cssGroupConditionModel.conditionType == false && (
					<div style={{ clear: "both" }}></div>
				)}
				{props.cssGroupConditionModel.conditionType == false && (
					<div className="conditionbox css-cbox">
						{item.fieldConditionList?.map(function (data: any, index1: any) {
							return <div key={index1.toString()} className="row">
								<div className="css-operator col-md-1 col-sm-1 p-0">
									{index1 > 0 && <DropDown data={[{ text: "And", value: "And" }, { text: "Or", value: "Or" }]}
										textField="text" onChange={(event: any) => props.onChangeLogicalFieldConditionList(event, index, index1)}
										valueField="value" value={data.logical} />}
								</div>
								<div className="col-md-3 col-sm-3 pr-0">
									<OverlayTrigger trigger="click" placement="bottom" rootClose={true} overlay={
										<Popover className="exp-builder" id={`popover-positioned-right`}>
											<Popover.Content>
												<BasicFieldListSelection {...props} index={index} index1={index1} />
												<BasicOutcomeSelection {...props} index={index} index1={index1} />
												<BasicListIdSelection {...props} index={index} index1={index1} />
												<BasicGlobalListIdSelection {...props} index={index} index1={index1} />
											</Popover.Content>
										</Popover>
									}>
										<Input type="text" readOnly={true} style={{ cursor: "pointer" }} autoComplete="off" name="test" value={data.field} onFocus={() => props.openFieldSelectionDialog(data)}
											className="editable-css-text selection-menuitem cssfield-selection csscondition" placeholder="Select a Field" />
									</OverlayTrigger>
								</div>
								<div className="css-operator col-md-4 col-sm-4 pr-0" >
									<DropDown data={props.operatorList}
										textField="name" value={data.compare}
										valueField="value" onChange={(event: any) => props.onChangeCompareBasicFieldConditionList(event, index, index1)} />
								</div>
								<div className="col-md-3 col-sm-3 pr-0">
									<Input type="text" name="test" autoComplete="off" value={data.value} onChange={(event) => props.onChangeFieldConditionListValue(event, index, index1)} placeholder="Enter a Value" className="editable-css-text csscondition" aria-label="fieldConditionValue" />
								</div>
								<div className="col-md-1 col-sm-2 pr-0">
									<i className="icon-tool-add" style={{ marginLeft: "2px" }} onClick={() => props.addBasicFieldCondition(index, index1)}></i>
									{index1 > 0 && <i className={`icon-tool-minus ${index1 == 0 ? 'disable-group-condition' : ''}`} onClick={() => props.removeBasicFieldCondition(index, index1)} style={{ marginLeft: "2px" }}></i>}
								</div>
							</div>
						}
						)}
					</div>
				)}
			</div>
		})
	);
}

export default BasicFieldConditions;