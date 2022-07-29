import React from "react";
import { t } from "i18next";
import { Grid, GridColumn as Column, } from "@progress/kendo-react-grid";
import { Checkbox } from "@progress/kendo-react-inputs";

const defaultNs = { ns: ['camp', 'common'] };

const ListIdSelection = (props: any) => {
	return (
		props.showListIDSelection &&
		<div style={{ width: "655px" }}>
			<div className="panel-default">
				<div className="panel-heading" onClick={props.backToFieldSelectionDialog}>
					<h4 className="panel-title">
						<i className="fa fa-angle-left"></i>
						<a role="button" className="accordion-toggle"><span>{t('mc.conditionbuilder.fieldselection.globallist.title', defaultNs)}</span></a>
					</h4>
				</div>
			</div>
			<div className="pull-right">
				<button className="primary k-button" onClick={() => props.applyListIdSelectionFieldCondition(props.pageName, props.index)}>{t('css.conditionbuilder.fieldselection.contactlist.buttonapply', defaultNs)}</button>
				<button className="k-button" onClick={() => document.body.click()}>{t('common.close', defaultNs)}</button>
			</div>
			<div style={{ clear: "both" }}></div>
			<div>
				<Grid style={{ height: "250px", width: "667px" }} data={props.listInfoData}>
					<Column
						width="50px"
						field="status"
						title=""
						headerCell={(cellProps) => <Checkbox id="listFieldValue-SelectAll" name="OutcomeFieldValue-SelectAll" aria-label="OutcomeFieldValue-SelectAll" defaultChecked={props.isAllListInfoSelected}
							onChange={props.listIdHeaderSelectionChange} />}
						cell={(cellProps) => (
							<td className={props.className} style={props.style}>
								<Checkbox defaultChecked={cellProps.dataItem.status} id={"listFieldValue-Select" + cellProps.dataIndex} aria-label={"OutcomeFieldValue-Select" + cellProps.dataIndex}
									name={"OutcomeFieldValue-Select" + cellProps.dataIndex} onChange={(event) => props.listIdSelectionChange(event, cellProps.dataItem)} />
							</td>
						)}
					/>
					<Column
						width="350px"
						field="listIdDisplay"
						title={t('css.conditionbuilder.fieldselection.contactlist.grid.listid.heading', defaultNs)}
					/>
					<Column
						width="250px"
						field="sourceName"
						title={t('css.conditionbuilder.fieldselection.contactlist.grid.filename.heading', defaultNs)}
					/>
				</Grid>
			</div>
		</div>
		);
}

export default ListIdSelection;