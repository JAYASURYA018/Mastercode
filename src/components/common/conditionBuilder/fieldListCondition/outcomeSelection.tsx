import React from "react";
import { t } from "i18next";
import { Grid, GridColumn as Column, } from "@progress/kendo-react-grid";
import { Checkbox } from "@progress/kendo-react-inputs";

const defaultNs = { ns: ['camp', 'common'] };

const OutcomeSelection = (props: any) => {
	return (
		props.showOutcomeSelection &&
		<div style={{ width: "580px" }}>
			<div className="panel-default">
				<div className="panel-heading" onClick={props.backToFieldSelectionDialog}>
					<h4 className="panel-title">

						<i className="fa fa-angle-left"></i>
						<a role="button" className="accordion-toggle"><span>{t('css.conditionbuilder.fieldselection.outcomelist.title', defaultNs)}</span></a>
					</h4>
				</div>
			</div>
			<div className="pull-right">
				<button className="primary k-button" onClick={() => props.applyLastoutcomeListFieldCondition(props.index)}>{t('css.conditionbuilder.fieldselection.contactlist.buttonapply', defaultNs)}</button>
				<button className="k-button" onClick={() => document.body.click()}>{t('common.close', defaultNs)}</button>
			</div>
			<div style={{ clear: "both" }}></div>
			<div>
				<Grid style={{ height: "250px", width: "530px" }} data={props.outcomeData}>
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
						width="400px"
						field="outComeDescription"
						title={t('camp.chain.Outcome', defaultNs)}
					/>
					<Column
						width="300px"
						field="channel"
						title={t('camp.ChannelType', defaultNs)}
					/>
				</Grid>
			</div>
		</div>
	);
}

export default OutcomeSelection;