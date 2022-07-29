import React from "react";
import { t } from "i18next";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Grid, GridColumn as Column, } from "@progress/kendo-react-grid";

const defaultNs = { ns: ['camp', 'common'] };

const BasicListIdSelection = (props: any) => {
	return (
		props.showListIDSelection &&
		<div style={{ width: "655px" }}>
			<div className="panel-default">
				<div className="panel-heading" onClick={props.backToFieldSelectionDialog}>
					<h4 className="panel-title cursor d-flex">
						<i className="icon-tool-left pl-2 primary" ></i> <span className="border-right mr-3"></span>
						<a role="button" className="accordion-toggle"><span>{t('css.conditionbuilder.fieldselection.contactlist.title', defaultNs)}</span></a>
					</h4>
				</div>
			</div>
			<div className="pull-right d-flex cursor">
				<span className="d-inline-block pr-6 border-right pr-3 self-center" onClick={() => props.applyListIdSelection(props.pageName, props.index, props.index1)}>{t('css.conditionbuilder.fieldselection.contactlist.buttonapply', defaultNs)}</span>
				<span className="pr-2 pl-3" onClick={() => document.body.click()}><i className="icon-pop-up-close"> </i></span>
			</div>
			<div style={{ clear: "both" }}></div>
			<div>
				<Grid style={{ height: "250px", width: "665px" }} data={props.listInfoData}>
					<Column
						width="50px"
						field="status"
						title=""
						headerCell={(cellProps) => <Checkbox id="listFieldValue-SelectAll" name="listFieldValue-SelectAll" aria-label="listFieldValue-SelectAll" defaultChecked={props.isAllLastOutcomeSelected}
							onChange={props.listIdHeaderSelectionChange} />}
						cell={(cellProps) => (
							<td className={cellProps.className} style={cellProps.style}>
								<Checkbox defaultChecked={cellProps.dataItem.status} id={"listFieldValue-Select" + cellProps.dataIndex} aria-label={"listFieldValue-Select" + cellProps.dataIndex}
									name={"listFieldValue-Select" + cellProps.dataIndex} onChange={(event) => props.listIdSelectionChange(event, cellProps.dataItem)} />
							</td>
						)}
					/>
					<Column
						width="250px"
						field="listIdDisplay"
						title={t('css.conditionbuilder.fieldselection.contactlist.grid.listid.heading', defaultNs)}
					/>
					<Column
						width="360px"
						field="sourceName"
						title={t('css.conditionbuilder.fieldselection.contactlist.grid.filename.heading', defaultNs)}
					/>
				</Grid>
			</div>
		</div>
	);
}

export default BasicListIdSelection;