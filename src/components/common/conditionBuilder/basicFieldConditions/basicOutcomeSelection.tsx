import React from "react";
import { t } from "i18next";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Grid, GridColumn as Column, } from "@progress/kendo-react-grid";

const defaultNs = { ns: ['camp', 'common'] };

const BasicOutcomeSelection = (props: any) => {
	return (props.showOutcomeSelection &&
		<div style={{ width: "580px" }}>
			<div className="panel-default">
				<div className="panel-heading " onClick={props.backToFieldSelectionDialog}>
					<h4 className="panel-title d-flex">
					<i className="icon-tool-left cursor pl-2 primary" ></i> <span className="border-right mr-3"></span>
						<a role="button" className="accordion-toggle"><span>{t('css.conditionbuilder.fieldselection.outcomelist.title', defaultNs)}</span></a>
					</h4>
				</div>
			</div>
		<div className="pull-right d-flex cursor">
			<span className="d-inline-block pr-3 border-right self-center" onClick={() => props.applyLastoutcomeList(props.index, props.index1)}>{t('css.conditionbuilder.fieldselection.contactlist.buttonapply', defaultNs)}</span>
			<span onClick={() => document.body.click()} className="pr-2 pl-2"><i className="icon-pop-up-close"> </i></span>
			</div>
			<div style={{ clear: "both" }}></div>
			<div>
				<Grid style={{ height: "250px", width: "590px" }} data={props.outcomeData}>
					<Column
						width="50px"
						field="status"
						title=""
						headerCell={(cellProps) => <Checkbox id="OutcomeFieldValue-SelectAll" name="OutcomeFieldValue-SelectAll" aria-label="OutcomeFieldValue-SelectAll" defaultChecked={props.isAllLastOutcomeSelected}
							onChange={props.lastOutcomeHeaderSelectionChange} />}
						cell={(cellProps) => (
							<td className={cellProps.className} style={cellProps.style}>
								<Checkbox defaultChecked={cellProps.dataItem.status} id={"OutcomeFieldValue-Select" + props.dataIndex} aria-label={"OutcomeFieldValue-Select" + cellProps.dataIndex}
									name={"OutcomeFieldValue-Select" + cellProps.dataIndex} onChange={(event) => props.lastOutcomeSelectionChange(event, cellProps.dataItem)} />
							</td>
						)}
					/>
					<Column
					field="outComeDescription"
					title={t('mc.conditionbuilder.fieldselection.outcomelist.grid.outcome.heading',defaultNs) }
					/>
					<Column
					width="230px"
					field="channel"
					title={t('camp.ChannelType',defaultNs) }
					/>
				</Grid>
			</div>
		</div>);
}

export default BasicOutcomeSelection;