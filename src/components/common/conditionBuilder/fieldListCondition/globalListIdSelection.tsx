import React from "react";
import { t } from "i18next";
import { Grid, GridColumn as Column, } from "@progress/kendo-react-grid";
import { Checkbox } from "@progress/kendo-react-inputs";

const defaultNs = { ns: ['camp', 'common'] };

const GlobalListIdSelection = (props: any) => {
	return (
		props.showGlobalListIDSelection &&
		<div style={{ width: "555px" }}>
			<div className="panel-default">
				<div className="panel-heading" onClick={props.backToFieldSelectionDialog}>
					<h4 className="panel-title">

						<i className="fa fa-angle-left"></i>
						<a role="button" className="accordion-toggle"><span>{t('mc.conditionbuilder.fieldselection.globallist.title', defaultNs)}</span></a>
					</h4>
				</div>
			</div>
			<div className="pull-right">
				<button className="primary k-button" onClick={() => props.applyGlobalListIdSelectionFieldCondition(props.index)}>{t('css.conditionbuilder.fieldselection.contactlist.buttonapply', defaultNs)}</button>
				<button className="k-button" onClick={() => document.body.click()}>{t('common.close', defaultNs)}</button>
			</div>
			<div style={{ clear: "both" }}></div>
			<div>
				<Grid style={{ height: "250px", width: "566px" }} data={props.globalListIdData}>
					<Column
						width="55px"
						field="status"
						title=""
						headerCell={(cellProps) => <Checkbox id="GlobalListFieldValue-SelectAll" name="GlobalListFieldValue-SelectAll" aria-label="GlobalListFieldValue-SelectAll" defaultChecked={props.isAllGlobalListSelected}
							onChange={props.globalListHeaderSelectionChange} />}
						cell={(cellProps) => (
							<td className={props.className} style={props.style}>
								<Checkbox defaultChecked={cellProps.dataItem.status} id={"GlobalListFieldValue-Select" + cellProps.dataIndex} aria-label={"GlobalListFieldValue-Select" + cellProps.dataIndex}
									name={"GlobalListFieldValue-Select" + cellProps.dataIndex} onChange={(event) => props.globalListSelectionChange(event, cellProps.dataItem)} />
							</td>
						)}
					/>
					<Column
						width="500px"
						field="listIdDisplay"
						title={t('css.conditionbuilder.fieldselection.contactlist.grid.listid.heading', defaultNs)}
					/>
				</Grid>
			</div>
		</div>
		);
}

export default GlobalListIdSelection;